import { Inter, Fraunces, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import { CurrencyProvider } from "@/components/currency-context";
import { getUserCurrency } from "@/lib/getUserCurrency";
import { auth } from "@clerk/nextjs/server";

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
  icons: {
    icon: "/favicon.svg",
  },
};

// Explicit viewport so the browser renders at true device width instead of
// falling back to a scaled ~980px virtual viewport (the "zoomed" bug).
export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children }) {
  // seed the client currency context with the user's saved choice;
  // for signed-in users the DATABASE is the source of truth, so the
  // provider only falls back to localStorage for signed-out visitors
  const { userId } = await auth();
  const currency = await getUserCurrency();

  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${inter.className} ${inter.variable} ${fraunces.variable} ${mono.variable}`}
        >
          <CurrencyProvider initialCode={currency} isSignedIn={!!userId}>
            <Header />
            <main className="min-h-screen">{children}</main>
            <Toaster richColors />
          </CurrencyProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}