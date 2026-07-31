"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { toast } from "sonner";
import {
  getCurrency,
  formatCurrency,
  isValidCurrency,
  BASE_CURRENCY,
  DEFAULT_CURRENCY,
} from "@/lib/currencies";

// ------------------------------------------------------------------
// Global currency store.
//
// - `code`      : the user's selected display currency (INR by default)
// - `rates`     : live rates, base INR (1 INR -> X of code)
// - `convert()` : base-INR amount -> selected-currency amount
// - `format()`  : base-INR amount -> localized string ("₹1,25,000.50")
// - `formatRaw()`: format a value ALREADY in the selected currency
//
// Every financial value in the app is stored in INR and should be
// rendered through `format()` so switching country updates the whole
// UI instantly — no refresh needed.
// ------------------------------------------------------------------

const CurrencyContext = createContext(null);

const LS_CODE_KEY = "fintrak.currency";
const LS_RATES_KEY = "fintrak.rates";
const RATES_TTL_MS = 60 * 60 * 1000; // 1 hour

function readCachedRates() {
  try {
    const raw = localStorage.getItem(LS_RATES_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed?.rates || !parsed?.cachedAt) return null;
    if (Date.now() - parsed.cachedAt > RATES_TTL_MS) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function CurrencyProvider({
  initialCode = DEFAULT_CURRENCY,
  isSignedIn = false,
  children,
}) {
  const [code, setCodeState] = useState(initialCode);
  const [rates, setRates] = useState(null);
  const [ratesLoading, setRatesLoading] = useState(true);

  // Fast paint for signed-out visitors: restore their last-used currency
  // from localStorage. Signed-in users NEVER restore from localStorage —
  // their database preference (initialCode) is the source of truth, which
  // prevents a stale local value from overriding what they saved.
  useEffect(() => {
    if (!isSignedIn && initialCode === DEFAULT_CURRENCY) {
      try {
        const saved = localStorage.getItem(LS_CODE_KEY);
        if (saved && isValidCurrency(saved) && saved !== code) {
          setCodeState(saved);
        }
      } catch {}
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep the localStorage copy in sync with the DB value for signed-in
  // users so a later signed-out visit starts from their real preference.
  useEffect(() => {
    if (isSignedIn) {
      try {
        localStorage.setItem(LS_CODE_KEY, initialCode);
      } catch {}
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignedIn, initialCode]);

  // Load rates: cached copy first (instant), then refresh from the API.
  useEffect(() => {
    const cached = readCachedRates();
    if (cached) {
      setRates(cached.rates);
      setRatesLoading(false);
    }

    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/exchange-rates");
        if (!res.ok) throw new Error("rates fetch failed");
        const data = await res.json();
        if (cancelled || !data?.rates) return;
        setRates(data.rates);
        try {
          localStorage.setItem(
            LS_RATES_KEY,
            JSON.stringify({ rates: data.rates, cachedAt: Date.now() })
          );
        } catch {}
      } catch (e) {
        // keep whatever we have (cached rates or null -> base passthrough)
        console.error("Could not refresh exchange rates:", e);
      } finally {
        if (!cancelled) setRatesLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  // Persist selection locally for instant restore on next visit.
  const setCode = useCallback((next) => {
    if (!isValidCurrency(next)) return;
    setCodeState(next);
    try {
      localStorage.setItem(LS_CODE_KEY, next);
    } catch {}
  }, []);

  const convert = useCallback(
    (baseAmount) => {
      const n = Number(baseAmount) || 0;
      if (code === BASE_CURRENCY) return n;
      const rate = rates?.[code];
      return rate ? n * rate : n;
    },
    [code, rates]
  );

  const value = useMemo(() => {
    const currency = getCurrency(code);
    return {
      code,
      currency,
      rates,
      ratesLoading,
      setCode, // optimistic local update; the server action persists it
      convert, // base (INR) -> selected currency (number)
      format: (baseAmount) => formatCurrency(convert(baseAmount), code),
      formatRaw: (amount) => formatCurrency(amount, code),
      notifyChanged: () =>
        toast.success(
          `Currency updated to ${currency.country} — ${currency.code} (${currency.symbol})`
        ),
    };
  }, [code, rates, ratesLoading, setCode, convert]);

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  // graceful fallback if a component renders outside the provider
  if (!ctx) {
    return {
      code: DEFAULT_CURRENCY,
      currency: getCurrency(DEFAULT_CURRENCY),
      rates: null,
      ratesLoading: false,
      setCode: () => {},
      convert: (amount) => Number(amount) || 0,
      format: (amount) => formatCurrency(amount, DEFAULT_CURRENCY),
      formatRaw: (amount) => formatCurrency(amount, DEFAULT_CURRENCY),
      notifyChanged: () => {},
    };
  }
  return ctx;
}
