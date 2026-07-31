// ------------------------------------------------------------------
// Live exchange rates (server-side).
//
// All amounts in the DB are stored in BASE_CURRENCY (INR).
// Rates map: 1 INR -> X units of <code>.
//
// Provider: open.er-api.com — free, no API key, daily updates.
// Cached via Next's fetch cache for 1 hour so we never hammer the API.
// A static fallback table keeps the app usable if the API is down.
// ------------------------------------------------------------------

import { BASE_CURRENCY } from "@/lib/currencies";

const API_URL = `https://open.er-api.com/v6/latest/${BASE_CURRENCY}`;

// Approximate fallback rates (1 INR -> X). Only used if the live API fails.
const FALLBACK_RATES = {
  INR: 1,
  USD: 0.0115,
  EUR: 0.0106,
  GBP: 0.009,
  JPY: 1.78,
  CNY: 0.083,
  AUD: 0.0175,
  CAD: 0.0158,
  CHF: 0.0102,
  SGD: 0.0154,
  AED: 0.0422,
  SAR: 0.0431,
  HKD: 0.0897,
  NZD: 0.019,
  ZAR: 0.208,
  BRL: 0.0635,
  MXN: 0.215,
  RUB: 0.92,
  KRW: 15.9,
  IDR: 187,
  MYR: 0.0512,
  THB: 0.395,
  PHP: 0.66,
  VND: 292,
  BDT: 1.37,
  PKR: 3.2,
  LKR: 3.44,
  TRY: 0.44,
  NGN: 17.8,
  NPR: 1.6,
};

/**
 * Fetch live rates with base = INR.
 * Returns { base, rates, fetchedAt, live } — `live` is false when the
 * fallback table had to be used.
 */
export async function getExchangeRates() {
  try {
    const res = await fetch(API_URL, {
      // Next.js data cache: re-fetch at most once per hour.
      next: { revalidate: 3600 },
    });

    if (!res.ok) throw new Error(`Rates API responded ${res.status}`);

    const json = await res.json();
    if (json?.result !== "success" || !json?.rates) {
      throw new Error("Rates API returned an unexpected payload");
    }

    return {
      base: BASE_CURRENCY,
      rates: json.rates,
      fetchedAt: json.time_last_update_unix
        ? json.time_last_update_unix * 1000
        : Date.now(),
      live: true,
    };
  } catch (error) {
    console.error("Exchange rates fetch failed, using fallback:", error.message);
    return {
      base: BASE_CURRENCY,
      rates: FALLBACK_RATES,
      fetchedAt: Date.now(),
      live: false,
    };
  }
}

/** Convert an amount FROM base (INR) TO the given currency. */
export function convertFromBase(amount, code, rates) {
  const n = Number(amount) || 0;
  if (code === BASE_CURRENCY) return n;
  const rate = rates?.[code];
  return rate ? n * rate : n;
}

/** Convert an amount FROM the given currency TO base (INR) for storage. */
export function convertToBase(amount, code, rates) {
  const n = Number(amount) || 0;
  if (code === BASE_CURRENCY) return n;
  const rate = rates?.[code];
  return rate ? n / rate : n;
}

/**
 * One-shot server helper: convert a base-INR amount to `code` and format
 * it with the right locale/symbol. Used by emails and background jobs.
 */
export async function formatInCurrency(baseAmount, code) {
  const { formatCurrency } = await import("@/lib/currencies");
  const { rates } = await getExchangeRates();
  return formatCurrency(convertFromBase(baseAmount, code, rates), code);
}
