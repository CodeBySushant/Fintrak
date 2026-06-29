import { Inter, Fraunces, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import { CurrencyProvider } from "@/components/currency-context";
import { getUserCurrency } from "@/lib/getUserCurrency";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-display",
});
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

export default async function RootLayout({ children }) {
  // seed the client currency context with the user's saved choice
  const currency = await getUserCurrency();

  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        </head>
        <body
          className={`${inter.className} ${inter.variable} ${fraunces.variable} ${mono.variable}`}
        >
          <CurrencyProvider initialCode={currency}>
            <Header />
            <main className="min-h-screen">{children}</main>
            <Toaster richColors />
          </CurrencyProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}