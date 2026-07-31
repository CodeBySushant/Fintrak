"use client";

import { useCurrency } from "@/components/currency-context";

// Tiny client component so SERVER components (account page, etc.) can
// render live-converted, locale-formatted amounts. `value` must be in
// the base currency (INR).
export default function Amount({ value, className }) {
  const { format } = useCurrency();
  return <span className={className}>{format(value)}</span>;
}
