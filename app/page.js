import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ScanLine } from "lucide-react";

import { Button } from "@/components/ui/button";
import HeroSection from "@/components/hero";
import DashboardMock from "@/components/dashboard-preview";
import { Reveal, AnimatedCounter } from "@/components/landing-motion";
import {
  trustStats,
  featuresData,
  howItWorksData,
  benefitsData,
  testimonialsData,
  footerSections,
} from "@/data/landing";

/* ---- per-feature visuals (flat, hairline) -------------------------- */
function AnalyticsVisual() {
  const bars = [40, 64, 52, 78, 60, 88, 72];
  return (
    <div className="rounded-2xl border border-[#e5e7eb] bg-white p-6">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm font-semibold text-[#111827]">Spending overview</p>
        <span className="text-xs text-[#6b7280]">This quarter</span>
      </div>
      <div className="flex h-40 items-end gap-3">
        {bars.map((h, i) => (
          <div key={i} className="flex-1">
            <div
              className="w-full rounded-t-[3px] bg-[#111827]"
              style={{ height: `${h}%`, opacity: i === bars.length - 1 ? 1 : 0.22 + i * 0.1 }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function ReceiptVisual() {
  return (
    <div className="rounded-2xl border border-[#e5e7eb] bg-white p-6">
      <div className="flex items-center gap-2 text-[#111827]">
        <ScanLine className="h-5 w-5" />
        <span className="text-sm font-semibold">Scanning receipt</span>
      </div>
      <div className="mt-4 space-y-2">
        {[
          ["Merchant", "Whole Foods Market"],
          ["Amount", "$86.40"],
          ["Date", "Jun 28, 2026"],
          ["Category", "Groceries"],
        ].map(([k, v], i) => (
          <div
            key={k}
            className="flex items-center justify-between border-b border-[#f1f5f9] pb-2 last:border-0"
          >
            <span className="text-xs text-[#6b7280]">{k}</span>
            <span className={`text-sm font-medium text-[#111827] ${i === 1 ? "font-num" : ""}`}>
              {v}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function BudgetVisual() {
  const rows = [
    ["Groceries", 70, "#10b981"],
    ["Transport", 45, "#111827"],
    ["Dining", 88, "#f59e0b"],
    ["Shopping", 100, "#ef4444"],
  ];
  return (
    <div className="rounded-2xl border border-[#e5e7eb] bg-white p-6">
      <p className="mb-4 text-sm font-semibold text-[#111827]">Monthly budgets</p>
      <div className="space-y-4">
        {rows.map(([label, pct, color]) => (
          <div key={label}>
            <div className="mb-1.5 flex justify-between text-xs text-[#6b7280]">
              <span>{label}</span>
              <span className="font-num">{pct}%</span>
            </div>
            <div className="h-2 rounded-full bg-[#f1f5f9]">
              <div className="h-2 rounded-full" style={{ width: `${pct}%`, background: color }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const spotlightVisuals = [<AnalyticsVisual key="a" />, <ReceiptVisual key="r" />, <BudgetVisual key="b" />];

export default function LandingPage() {
  const spotlights = featuresData.slice(0, 3);
  const gridFeatures = featuresData.slice(3);

  return (
    <div className="min-h-screen bg-white">
      <HeroSection />

      {/* ---------------- Trust strip ---------------- */}
      <section aria-label="Fintrak by the numbers" className="border-y border-[#e5e7eb]">
        <div className="container mx-auto px-4 py-10">
          <Reveal className="grid grid-cols-2 gap-y-8 sm:grid-cols-5">
            {trustStats.map((s, i) => (
              <div key={i} className="text-center">
                <div className="font-num text-2xl font-semibold tracking-tight text-[#111827] sm:text-3xl">
                  <AnimatedCounter
                    value={s.value}
                    prefix={s.prefix || ""}
                    suffix={s.suffix || ""}
                    decimals={s.decimals || 0}
                  />
                </div>
                <div className="mt-1 text-[13px] text-[#6b7280]">{s.label}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ---------------- Features ---------------- */}
      <section id="features" className="py-24 sm:py-32" aria-labelledby="features-title">
        <div className="container mx-auto px-4">
          <Reveal className="max-w-2xl">
            <h2 id="features-title" className="display-lg text-[#111827]">
              Tools that do the quiet work
            </h2>
            <p className="text-subtitle mt-4 text-[#6b7280]">
              Each one runs in the background, so your money always makes sense
              without the busywork.
            </p>
          </Reveal>

          <div className="mt-20 space-y-24">
            {spotlights.map((feature, i) => {
              const reversed = i % 2 === 1;
              return (
                <Reveal key={i} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                  <div className={reversed ? "lg:order-2" : ""}>
                    <span className="font-num text-xs text-[#9ca3af]">
                      0{i + 1}
                    </span>
                    <h3 className="font-display mt-2 text-2xl font-medium tracking-tight text-[#111827] sm:text-[28px]">
                      {feature.title}
                    </h3>
                    <p className="mt-3 max-w-md text-[17px] leading-relaxed text-[#6b7280]">
                      {feature.description}
                    </p>
                    <Link
                      href="/dashboard"
                      className="group mt-6 inline-flex items-center gap-1.5 text-[15px] font-semibold text-[#111827] transition-colors hover:text-[#2563eb]"
                    >
                      Try it now
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                  <div className={reversed ? "lg:order-1" : ""}>{spotlightVisuals[i]}</div>
                </Reveal>
              );
            })}
          </div>

          {/* remaining features — minimal, hairline-topped columns */}
          <Reveal className="mt-24 grid gap-x-10 gap-y-12 sm:grid-cols-3">
            {gridFeatures.map((feature, i) => (
              <div key={i} className="border-t border-[#e5e7eb] pt-5">
                <h3 className="text-base font-semibold text-[#111827]">{feature.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-[#6b7280]">
                  {feature.description}
                </p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ---------------- Showcase ---------------- */}
      <section id="showcase" aria-labelledby="showcase-title" className="bg-[#f8fafc] py-24 sm:py-32">
        <div className="container mx-auto px-4">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 id="showcase-title" className="display-lg text-[#111827]">
              Your whole financial life, on one screen
            </h2>
            <p className="text-subtitle mt-4 text-[#6b7280]">
              Balances, budgets, savings and recent activity — always live,
              always legible.
            </p>
          </Reveal>
          <Reveal delay={100} className="mx-auto mt-14 max-w-4xl">
            <DashboardMock variant="full" />
          </Reveal>
        </div>
      </section>

      {/* ---------------- How it works (real sequence → numbered) ---------------- */}
      <section className="py-24 sm:py-32" aria-labelledby="how-title">
        <div className="container mx-auto px-4">
          <Reveal className="max-w-2xl">
            <h2 id="how-title" className="display-lg text-[#111827]">
              Set up in minutes
            </h2>
          </Reveal>
          <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-[#e5e7eb] bg-[#e5e7eb] md:grid-cols-3">
            {howItWorksData.map((step, i) => (
              <Reveal key={i} delay={i * 100} className="bg-white p-8">
                <span className="font-num text-sm text-[#9ca3af]">0{i + 1}</span>
                <h3 className="mt-3 text-lg font-semibold text-[#111827]">{step.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-[#6b7280]">
                  {step.description}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Benefits — ledger comparison ---------------- */}
      <section className="bg-[#f8fafc] py-24 sm:py-32" aria-labelledby="benefits-title">
        <div className="container mx-auto px-4">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 id="benefits-title" className="display-lg text-[#111827]">
              Before and after
            </h2>
          </Reveal>

          <Reveal className="mx-auto mt-12 max-w-3xl overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white">
            <div className="grid grid-cols-2 border-b border-[#e5e7eb]">
              <div className="px-6 py-4 text-sm font-semibold text-[#9ca3af]">
                Before Fintrak
              </div>
              <div className="border-l border-[#e5e7eb] px-6 py-4 text-sm font-semibold text-[#111827]">
                With Fintrak
              </div>
            </div>
            {benefitsData.without.map((item, i) => (
              <div key={i} className="grid grid-cols-2 border-b border-[#f1f5f9] last:border-0">
                <div className="flex items-start gap-3 px-6 py-4 text-[15px] text-[#6b7280]">
                  <span className="font-num mt-0.5 text-[#9ca3af]">—</span>
                  {item}
                </div>
                <div className="flex items-start gap-3 border-l border-[#e5e7eb] px-6 py-4 text-[15px] font-medium text-[#111827]">
                  <span className="font-num mt-0.5 text-[#10b981]">+</span>
                  {benefitsData.with[i]}
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ---------------- Testimonials — editorial ---------------- */}
      <section id="testimonials" className="py-24 sm:py-32" aria-labelledby="testimonials-title">
        <div className="container mx-auto px-4">
          <Reveal className="max-w-2xl">
            <h2 id="testimonials-title" className="display-lg text-[#111827]">
              In their words
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-x-10 gap-y-12 md:grid-cols-3">
            {testimonialsData.map((t, i) => (
              <Reveal key={i} delay={i * 100} className="border-t border-[#111827] pt-6">
                <p className="font-display text-[19px] leading-relaxed text-[#111827]">
                  {t.quote}
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <Image
                    src={t.image}
                    alt={t.name}
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full object-cover grayscale"
                  />
                  <div>
                    <div className="text-sm font-semibold text-[#111827]">{t.name}</div>
                    <div className="text-xs text-[#6b7280]">{t.role}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- CTA — dark, no glow, asymmetric ---------------- */}
      <section className="px-4 pb-24" aria-labelledby="cta-title">
        <Reveal className="container mx-auto">
          <div className="rounded-2xl bg-[#030712] px-8 py-16 sm:px-14 sm:py-20">
            <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
              <div className="max-w-xl">
                <h2 id="cta-title" className="display-lg text-white">
                  Start tracking in a few minutes
                </h2>
                <p className="text-subtitle mt-4 text-white/55">
                  Free to start, no card required. Bring your accounts into one
                  clear view today.
                </p>
              </div>
              <Link href="/dashboard" className="shrink-0">
                <Button
                  size="lg"
                  className="group h-12 rounded-[14px] bg-white px-8 text-base font-semibold text-[#111827] hover:bg-white/90 focus-visible:ring-2 focus-visible:ring-white"
                >
                  Get started free
                  <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
                </Button>
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ---------------- Footer ---------------- */}
      <footer className="border-t border-[#e5e7eb] bg-white">
        <div className="container mx-auto px-4 py-16">
          <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
            <div>
              <Image
                src="/fintrak-logo.png"
                alt="Fintrak"
                width={140}
                height={36}
                className="h-8 w-auto object-contain"
              />
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#6b7280]">
                A calmer way to track income, manage budgets and grow savings.
              </p>
            </div>

            {footerSections.map((section) => (
              <div key={section.title}>
                <h3 className="text-sm font-semibold text-[#111827]">{section.title}</h3>
                <ul className="mt-4 space-y-3">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-[#6b7280] transition-colors hover:text-[#111827]"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-[#e5e7eb] pt-8 sm:flex-row">
            <p className="font-num text-xs text-[#9ca3af]">
              © {new Date().getFullYear()} Fintrak
            </p>
            <p className="text-xs text-[#9ca3af]">Made with 💗 by CodebySushant</p>
          </div>
        </div>
      </footer>
    </div>
  );
}