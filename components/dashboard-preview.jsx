"use client";

import React from "react";
import {
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  Wallet,
  ShoppingBag,
  Car,
  Home,
} from "lucide-react";

/* ---- tiny inline area chart (no chart lib) -------------------------- */
function AreaChart({ accent = "#111827" }) {
  const points = [38, 30, 42, 34, 48, 40, 55, 47, 62, 58, 70, 66];
  const w = 320;
  const h = 104;
  const max = Math.max(...points) + 10;
  const step = w / (points.length - 1);
  const coords = points.map((p, i) => [i * step, h - (p / max) * h]);
  const line = coords
    .map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`)
    .join(" ");
  const area = `${line} L${w},${h} L0,${h} Z`;

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className="w-full h-auto"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="ftArea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.10" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#ftArea)" />
      <path
        d={line}
        fill="none"
        stroke={accent}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          strokeDasharray: 1000,
          strokeDashoffset: 1000,
          animation: "ftDraw 1.8s cubic-bezier(0.22,1,0.36,1) forwards",
        }}
      />
      <circle
        cx={coords[coords.length - 1][0]}
        cy={coords[coords.length - 1][1]}
        r="3.5"
        fill={accent}
      />
    </svg>
  );
}

/* ---- conic donut for category breakdown ---------------------------- */
function Donut() {
  const bg =
    "conic-gradient(#111827 0 42%, #10b981 42% 68%, #f59e0b 68% 86%, #e5e7eb 86% 100%)";
  return (
    <div className="relative h-[88px] w-[88px] shrink-0">
      <div className="h-full w-full rounded-full" style={{ background: bg }} />
      <div className="absolute inset-[13px] rounded-full bg-white flex flex-col items-center justify-center">
        <span className="text-[10px] text-[#6b7280]">spent</span>
        <span className="font-num text-sm font-semibold text-[#111827]">68%</span>
      </div>
    </div>
  );
}

const TX = [
  { icon: Home, name: "Apartment rent", cat: "Housing", amt: -1450, color: "#ef4444" },
  { icon: Wallet, name: "Salary", cat: "Income", amt: 5200, color: "#10b981" },
  { icon: ShoppingBag, name: "Whole Foods", cat: "Groceries", amt: -86.4, color: "#84cc16" },
  { icon: Car, name: "Shell fuel", cat: "Transport", amt: -52.1, color: "#f97316" },
];

export default function DashboardMock({ variant = "full" }) {
  const compact = variant === "compact";

  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white shadow-premium"
      role="img"
      aria-label="Fintrak dashboard preview showing balance, savings trend, category breakdown and recent transactions"
    >
      {/* chrome — neutral, no colored traffic lights */}
      <div className="flex items-center gap-2 border-b border-[#e5e7eb] px-5 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#e5e7eb]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#e5e7eb]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#e5e7eb]" />
        <span className="ml-3 font-num text-xs text-[#9ca3af]">
          fintrak.app/dashboard
        </span>
      </div>

      <div className="p-5 sm:p-6 space-y-5">
        {/* balance row */}
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs font-medium text-[#6b7280]">Total balance</p>
            <p className="font-num mt-1 text-2xl sm:text-[28px] font-semibold tracking-tight text-[#111827]">
              $48,920.50
            </p>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full border border-[#10b981]/20 bg-[#10b981]/[0.06] px-2.5 py-1 text-xs font-semibold text-[#10b981]">
            <TrendingUp className="h-3.5 w-3.5" />
            <span className="font-num">+12.4%</span>
          </span>
        </div>

        {/* savings chart */}
        <div className="rounded-xl border border-[#e5e7eb] p-4">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm font-semibold text-[#111827]">Savings trend</p>
            <p className="text-xs text-[#6b7280]">Last 12 months</p>
          </div>
          <AreaChart />
        </div>

        {!compact && (
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-[#e5e7eb] p-4">
              <p className="mb-3 text-sm font-semibold text-[#111827]">
                Spending by category
              </p>
              <div className="flex items-center gap-4">
                <Donut />
                <ul className="space-y-1.5 text-xs">
                  <li className="flex items-center gap-2 text-[#374151]">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#111827]" /> Housing
                  </li>
                  <li className="flex items-center gap-2 text-[#374151]">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#10b981]" /> Groceries
                  </li>
                  <li className="flex items-center gap-2 text-[#374151]">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#f59e0b]" /> Transport
                  </li>
                  <li className="flex items-center gap-2 text-[#6b7280]">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#e5e7eb]" /> Other
                  </li>
                </ul>
              </div>
            </div>

            <div className="rounded-xl border border-[#e5e7eb] p-4">
              <p className="mb-3 text-sm font-semibold text-[#111827]">
                Monthly budget
              </p>
              <div className="space-y-3">
                {[
                  ["Groceries", "$420 / $600", 70, "#10b981"],
                  ["Dining", "$310 / $350", 88, "#f59e0b"],
                  ["Shopping", "$540 / $500", 100, "#ef4444"],
                ].map(([label, val, pct, color]) => (
                  <div key={label}>
                    <div className="mb-1 flex justify-between text-xs text-[#6b7280]">
                      <span>{label}</span>
                      <span className="font-num">{val}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-[#f1f5f9]">
                      <div
                        className="h-1.5 rounded-full"
                        style={{ width: `${pct}%`, background: color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* recent transactions */}
        <div className="rounded-xl border border-[#e5e7eb] p-4">
          <p className="mb-3 text-sm font-semibold text-[#111827]">
            Recent transactions
          </p>
          <ul className="divide-y divide-[#f1f5f9]">
            {(compact ? TX.slice(0, 3) : TX).map((t, i) => {
              const Icon = t.icon;
              const positive = t.amt > 0;
              return (
                <li key={i} className="flex items-center gap-3 py-2.5">
                  <span
                    className="grid h-9 w-9 place-items-center rounded-lg"
                    style={{ background: `${t.color}14` }}
                  >
                    <Icon className="h-4 w-4" style={{ color: t.color }} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-[#111827]">
                      {t.name}
                    </p>
                    <p className="text-xs text-[#6b7280]">{t.cat}</p>
                  </div>
                  <span
                    className={`font-num inline-flex items-center gap-0.5 text-sm font-semibold ${
                      positive ? "text-[#10b981]" : "text-[#111827]"
                    }`}
                  >
                    {positive ? (
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    ) : (
                      <ArrowDownRight className="h-3.5 w-3.5 text-[#9ca3af]" />
                    )}
                    {positive ? "+" : "-"}$
                    {Math.abs(t.amt).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}