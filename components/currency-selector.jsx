"use client";

import React, { useMemo, useState, useTransition } from "react";
import { Check, ChevronDown, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { CURRENCIES } from "@/lib/currencies";
import { useCurrency } from "@/components/currency-context";
import { updateUserCurrency } from "@/actions/currency";

export default function CurrencySelector() {
  const { code, setCode, currency } = useCurrency();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return CURRENCIES;
    return CURRENCIES.filter(
      (c) =>
        c.country.toLowerCase().includes(q) ||
        c.code.toLowerCase().includes(q) ||
        c.iso2.toLowerCase().includes(q) ||
        c.symbol.toLowerCase().includes(q)
    );
  }, [query]);

  const choose = (c) => {
    const prev = code;
    setCode(c.code); // optimistic
    setOpen(false);
    setQuery("");
    startTransition(async () => {
      try {
        await updateUserCurrency(c.code);
        router.refresh(); // re-render server amounts in the new currency
      } catch (e) {
        setCode(prev); // roll back on failure
        toast.error("Couldn't save your currency. Please try again.");
      }
    });
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label="Change display currency"
          disabled={pending}
          className="inline-flex items-center gap-1.5 rounded-full border border-[#e5e7eb] bg-white px-3 py-2 text-sm font-medium text-[#111827] transition-colors hover:bg-[#f8fafc] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb] disabled:opacity-60"
        >
          <span className="text-base leading-none">{currency.flag}</span>
          <span>{currency.iso2}</span>
          <ChevronDown className="h-3.5 w-3.5 text-[#9ca3af]" />
        </button>
      </PopoverTrigger>

      <PopoverContent align="end" className="w-72 p-0">
        <div className="border-b border-[#e5e7eb] p-2">
          <div className="relative">
            <Search className="pointer-events-none absolute left-2.5 top-2.5 h-4 w-4 text-[#9ca3af]" />
            <Input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search country or currency"
              className="pl-8"
            />
          </div>
        </div>

        <ul className="max-h-72 overflow-y-auto py-1">
          {results.map((c) => (
            <li key={c.code}>
              <button
                type="button"
                onClick={() => choose(c)}
                className="flex w-full items-center justify-between gap-2 px-3 py-2 text-left text-sm hover:bg-[#f8fafc]"
              >
                <span className="flex min-w-0 items-center gap-2">
                  <span className="text-base leading-none">{c.flag}</span>
                  <span className="truncate text-[#111827]">{c.country}</span>
                  <span className="shrink-0 text-xs text-[#6b7280]">
                    ({c.code} — {c.symbol})
                  </span>
                </span>
                {c.code === code && (
                  <Check className="h-4 w-4 shrink-0 text-[#2563eb]" />
                )}
              </button>
            </li>
          ))}
          {results.length === 0 && (
            <li className="px-3 py-6 text-center text-sm text-[#9ca3af]">
              No matches
            </li>
          )}
        </ul>
      </PopoverContent>
    </Popover>
  );
}