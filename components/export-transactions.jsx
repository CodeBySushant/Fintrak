"use client";

import { useState } from "react";
import { Download, FileText, Table2, Loader2 } from "lucide-react";
import { format as formatDate } from "date-fns";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCurrency } from "@/components/currency-context";

// ------------------------------------------------------------------
// Export transactions as CSV or PDF, in the user's selected currency.
//
// - `transactions`: serialized transactions with amounts in base INR
// - `title`: heading used in the PDF and the file name
//   (e.g. "Savings Account" or "All Transactions")
//
// CSV: raw signed numbers + a Currency column (spreadsheet-friendly,
//      UTF-8 BOM so Excel opens ₹/é/etc. correctly).
// PDF: jsPDF + autotable, loaded on demand so the libraries never
//      enter the main bundle. Amounts use "Amount (INR)" style column
//      headers because jsPDF's built-in fonts can't draw the ₹ glyph.
// ------------------------------------------------------------------

const csvEscape = (value) => {
  const s = String(value ?? "");
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

const slug = (s) =>
  String(s || "transactions")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export default function ExportTransactions({ transactions = [], title }) {
  const { code, convert, currency } = useCurrency();
  const [busy, setBusy] = useState(false);

  const hasData = transactions.length > 0;

  // Rows sorted oldest-first read naturally in a statement
  const buildRows = () => {
    const sorted = [...transactions].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
    return sorted.map((t) => {
      const amount = convert(t.amount);
      const signed = t.type === "EXPENSE" ? -amount : amount;
      return {
        date: formatDate(new Date(t.date), "dd MMM yyyy"),
        description: t.description || "—",
        category: t.category,
        type: t.type,
        signed,
        recurring: t.isRecurring ? "Yes" : "No",
      };
    });
  };

  const totals = () => {
    let income = 0;
    let expense = 0;
    for (const t of transactions) {
      const amt = convert(t.amount);
      if (t.type === "INCOME") income += amt;
      else expense += amt;
    }
    return { income, expense, net: income - expense };
  };

  const baseFileName = () =>
    `fintrak-${slug(title)}-${formatDate(new Date(), "yyyy-MM-dd")}`;

  const downloadBlob = (blob, fileName) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  // number with locale grouping but WITHOUT a currency symbol —
  // used in the PDF where the ₹ glyph isn't available
  const num = (n) =>
    new Intl.NumberFormat(currency.locale, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(n);

  const exportCSV = () => {
    try {
      const rows = buildRows();
      const header = [
        "Date",
        "Description",
        "Category",
        "Type",
        `Amount (${code})`,
        "Currency",
        "Recurring",
      ];
      const lines = [
        header.join(","),
        ...rows.map((r) =>
          [
            r.date,
            csvEscape(r.description),
            r.category,
            r.type,
            r.signed.toFixed(2), // plain number: SUM()-able in Excel
            code,
            r.recurring,
          ].join(",")
        ),
      ];
      // \uFEFF = UTF-8 BOM so Excel decodes the file correctly
      const blob = new Blob(["\uFEFF" + lines.join("\n")], {
        type: "text/csv;charset=utf-8;",
      });
      downloadBlob(blob, `${baseFileName()}.csv`);
      toast.success(`Exported ${rows.length} transactions as CSV`);
    } catch (e) {
      console.error(e);
      toast.error("CSV export failed");
    }
  };

  const exportPDF = async () => {
    setBusy(true);
    try {
      // load on demand — keeps ~400KB of PDF code out of the main bundle
      const [{ jsPDF }, autoTableModule] = await Promise.all([
        import("jspdf"),
        import("jspdf-autotable"),
      ]);
      const autoTable = autoTableModule.default;

      const rows = buildRows();
      const { income, expense, net } = totals();

      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();

      // Header
      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.setTextColor(17, 24, 39);
      doc.text("Fintrak", 14, 18);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      doc.setTextColor(107, 114, 128);
      doc.text(title || "Transactions", 14, 25);
      doc.setFontSize(9);
      doc.text(
        `Generated ${formatDate(new Date(), "dd MMM yyyy, HH:mm")}  ·  Currency: ${code}`,
        pageWidth - 14,
        18,
        { align: "right" }
      );

      // Summary strip
      doc.setFontSize(10);
      doc.setTextColor(17, 24, 39);
      doc.text(
        `Income: ${num(income)}    Expenses: ${num(expense)}    Net: ${num(net)}`,
        14,
        34
      );

      autoTable(doc, {
        startY: 40,
        head: [
          ["Date", "Description", "Category", "Type", `Amount (${code})`],
        ],
        body: rows.map((r) => [
          r.date,
          r.description,
          r.category,
          r.type === "EXPENSE" ? "Expense" : "Income",
          num(r.signed),
        ]),
        styles: { fontSize: 9, cellPadding: 2.5, textColor: [17, 24, 39] },
        headStyles: { fillColor: [17, 24, 39], textColor: 255 },
        alternateRowStyles: { fillColor: [248, 250, 252] },
        columnStyles: { 4: { halign: "right" } },
        didParseCell: (data) => {
          // red expenses in the amount column
          if (
            data.section === "body" &&
            data.column.index === 4 &&
            String(data.cell.raw).startsWith("-")
          ) {
            data.cell.styles.textColor = [239, 68, 68];
          }
        },
        margin: { left: 14, right: 14 },
      });

      // Page numbers
      const pageCount = doc.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(156, 163, 175);
        doc.text(
          `Page ${i} of ${pageCount}`,
          pageWidth - 14,
          doc.internal.pageSize.getHeight() - 8,
          { align: "right" }
        );
      }

      doc.save(`${baseFileName()}.pdf`);
      toast.success(`Exported ${rows.length} transactions as PDF`);
    } catch (e) {
      console.error(e);
      toast.error("PDF export failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="rounded-full"
          disabled={!hasData || busy}
          title={hasData ? "Export transactions" : "No transactions to export"}
        >
          {busy ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Download className="h-4 w-4" />
          )}
          <span className="hidden sm:inline">Export</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={exportCSV}>
          <Table2 className="mr-2 h-4 w-4" />
          Export as CSV
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportPDF}>
          <FileText className="mr-2 h-4 w-4" />
          Export as PDF
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
