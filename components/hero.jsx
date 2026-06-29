"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardMock from "@/components/dashboard-preview";

export default function HeroSection() {
  return (
    <section className="relative pt-36 sm:pt-44 pb-20 sm:pb-28">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          {/* left: copy */}
          <div className="max-w-xl">
            <p className="kicker mb-5">Personal finance, clarified</p>

            <h1 className="display-xl text-[#111827]">
              See your money
              <br className="hidden sm:block" /> clearly.
            </h1>

            <p className="text-subtitle mt-6 text-[#6b7280]">
              Fintrak brings your income, expenses, budgets and receipts into a
              single view — with automatic categories and insights that actually
              make sense.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/dashboard" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="group h-12 w-full rounded-[14px] bg-[#111827] px-7 text-base hover:bg-[#111827]/90 focus-visible:ring-2 focus-visible:ring-[#2563eb] sm:w-auto"
                >
                  Get started free
                  <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
                </Button>
              </Link>
              <a href="#showcase" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 w-full rounded-[14px] border-[#e5e7eb] px-7 text-base text-[#111827] hover:bg-[#f8fafc] sm:w-auto"
                >
                  Take the tour
                </Button>
              </a>
            </div>

            {/* trust line — one quiet row, mono figure */}
            <div className="mt-8 flex items-center gap-3 text-sm text-[#6b7280]">
              <ShieldCheck className="h-4 w-4 text-[#10b981]" />
              <span>
                Bank-grade security ·{" "}
                <span className="font-num text-[#111827]">50,000+</span> people
                tracking with Fintrak
              </span>
            </div>
          </div>

          {/* right: product, flat and confident (no tilt, no floating cards) */}
          <div className="relative lg:-mr-6">
            <DashboardMock variant="compact" />
          </div>
        </div>
      </div>
    </section>
  );
}