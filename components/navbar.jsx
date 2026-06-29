"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { LayoutDashboard, PenBox } from "lucide-react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import CurrencySelector from "@/components/currency-selector";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 24);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-3 z-50 px-3">
      <nav
        aria-label="Primary"
        className={[
          "mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-full px-4 sm:px-5 py-2.5 transition-all duration-300",
          scrolled
            ? "border border-[#e5e7eb] bg-white/75 backdrop-blur-xl shadow-premium"
            : "border border-transparent bg-white/40 backdrop-blur-sm",
        ].join(" ")}
      >
        <Link href="/" className="flex items-center" aria-label="Fintrak home">
          <Image
            src="/fintrak-logo.svg"
            alt="Fintrak"
            width={160}
            height={40}
            className="h-8 w-auto object-contain"
            priority
          />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <SignedOut>
            <a href="#features" className="text-[15px] font-medium text-[#374151] transition-colors hover:text-[#111827]">
              Features
            </a>
            <a href="#showcase" className="text-[15px] font-medium text-[#374151] transition-colors hover:text-[#111827]">
              Product
            </a>
            <a href="#testimonials" className="text-[15px] font-medium text-[#374151] transition-colors hover:text-[#111827]">
              Customers
            </a>
          </SignedOut>
        </div>

        <div className="flex items-center gap-2.5">
          <SignedIn>
            {/* display-currency switcher (saved to the user) */}
            <CurrencySelector />

            <Link href="/dashboard">
              <Button
                variant="outline"
                className="rounded-full border-[#e5e7eb] focus-visible:ring-2 focus-visible:ring-[#2563eb]"
              >
                <LayoutDashboard size={18} />
                <span className="hidden md:inline">Dashboard</span>
              </Button>
            </Link>
            <Link href="/transaction/create">
              <Button className="rounded-full bg-[#111827] hover:bg-[#111827]/90 focus-visible:ring-2 focus-visible:ring-[#2563eb]">
                <PenBox size={18} />
                <span className="hidden md:inline">Add Transaction</span>
              </Button>
            </Link>
            <UserButton appearance={{ elements: { avatarBox: "w-9 h-9" } }} />
          </SignedIn>

          <SignedOut>
            <SignInButton forceRedirectUrl="/dashboard">
              <Button
                variant="ghost"
                className="rounded-full text-[#374151] hover:bg-[#f8fafc] hover:text-[#111827]"
              >
                Log in
              </Button>
            </SignInButton>
            <Link href="/dashboard">
              <Button className="rounded-full bg-[#111827] px-5 shadow-premium-sm transition-transform hover:bg-[#111827]/90 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-[#2563eb]">
                Get started
              </Button>
            </Link>
          </SignedOut>
        </div>
      </nav>
    </header>
  );
}