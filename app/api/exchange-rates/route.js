import { NextResponse } from "next/server";
import { getExchangeRates } from "@/lib/exchange-rates";

// Serves the (server-cached) live rates to the client CurrencyContext.
// The upstream fetch inside getExchangeRates() is cached for 1 hour,
// so this endpoint is cheap to call.
export async function GET() {
  const data = await getExchangeRates();

  return NextResponse.json(data, {
    headers: {
      // let browsers/CDN reuse the response briefly too
      "Cache-Control": "public, max-age=300, stale-while-revalidate=3600",
    },
  });
}
