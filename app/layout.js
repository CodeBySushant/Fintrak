import { Inter, Fraunces, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

// Display serif — used only for headlines, with restraint.
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-display",
});

// Monospaced, tabular figures — every money value uses this. The signature.
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
});

export const metadata = {
  title: "Fintrak — See your money clearly",
  description:
    "Fintrak brings income, expenses, budgets and receipts into one place, with automatic categories and insights that make sense.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="icon" href="/logo-sm.png" sizes="any" />
        </head>
        <body
          className={`${inter.className} ${inter.variable} ${fraunces.variable} ${mono.variable}`}
        >
          <Header />
          <main className="min-h-screen">{children}</main>
          <Toaster richColors />
          {/*
            Old global footer removed: the landing page ships its own footer.
            For in-app pages add a small footer to app/(main)/layout.js.
          */}
        </body>
      </html>
    </ClerkProvider>
  );
}