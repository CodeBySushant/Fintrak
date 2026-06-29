"use client";

import React, { createContext, useContext, useState } from "react";
import { getCurrency, formatCurrency } from "@/lib/currencies";

const CurrencyContext = createContext(null);

export function CurrencyProvider({ initialCode = "USD", children }) {
  const [code, setCode] = useState(initialCode);

  const value = {
    code,
    setCode, // optimistic local update; the server action persists it
    currency: getCurrency(code),
    format: (amount) => formatCurrency(amount, code),
  };

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
      code: "USD",
      setCode: () => {},
      currency: getCurrency("USD"),
      format: (amount) => formatCurrency(amount, "USD"),
    };
  }
  return ctx;
}