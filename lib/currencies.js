// ~30 common currencies. `iso2` is the country code shown in the navbar
// (US, IN, NP …); `locale` drives correct symbol + grouping via Intl.

export const CURRENCIES = [
  { code: "USD", iso2: "US", country: "United States", symbol: "$", flag: "🇺🇸", locale: "en-US" },
  { code: "INR", iso2: "IN", country: "India", symbol: "₹", flag: "🇮🇳", locale: "en-IN" },
  { code: "NPR", iso2: "NP", country: "Nepal", symbol: "रू", flag: "🇳🇵", locale: "ne-NP" },
  { code: "EUR", iso2: "EU", country: "Eurozone", symbol: "€", flag: "🇪🇺", locale: "de-DE" },
  { code: "GBP", iso2: "GB", country: "United Kingdom", symbol: "£", flag: "🇬🇧", locale: "en-GB" },
  { code: "JPY", iso2: "JP", country: "Japan", symbol: "¥", flag: "🇯🇵", locale: "ja-JP" },
  { code: "CNY", iso2: "CN", country: "China", symbol: "¥", flag: "🇨🇳", locale: "zh-CN" },
  { code: "AUD", iso2: "AU", country: "Australia", symbol: "A$", flag: "🇦🇺", locale: "en-AU" },
  { code: "CAD", iso2: "CA", country: "Canada", symbol: "C$", flag: "🇨🇦", locale: "en-CA" },
  { code: "CHF", iso2: "CH", country: "Switzerland", symbol: "CHF", flag: "🇨🇭", locale: "de-CH" },
  { code: "SGD", iso2: "SG", country: "Singapore", symbol: "S$", flag: "🇸🇬", locale: "en-SG" },
  { code: "AED", iso2: "AE", country: "United Arab Emirates", symbol: "د.إ", flag: "🇦🇪", locale: "ar-AE" },
  { code: "SAR", iso2: "SA", country: "Saudi Arabia", symbol: "﷼", flag: "🇸🇦", locale: "ar-SA" },
  { code: "HKD", iso2: "HK", country: "Hong Kong", symbol: "HK$", flag: "🇭🇰", locale: "zh-HK" },
  { code: "NZD", iso2: "NZ", country: "New Zealand", symbol: "NZ$", flag: "🇳🇿", locale: "en-NZ" },
  { code: "ZAR", iso2: "ZA", country: "South Africa", symbol: "R", flag: "🇿🇦", locale: "en-ZA" },
  { code: "BRL", iso2: "BR", country: "Brazil", symbol: "R$", flag: "🇧🇷", locale: "pt-BR" },
  { code: "MXN", iso2: "MX", country: "Mexico", symbol: "$", flag: "🇲🇽", locale: "es-MX" },
  { code: "RUB", iso2: "RU", country: "Russia", symbol: "₽", flag: "🇷🇺", locale: "ru-RU" },
  { code: "KRW", iso2: "KR", country: "South Korea", symbol: "₩", flag: "🇰🇷", locale: "ko-KR" },
  { code: "IDR", iso2: "ID", country: "Indonesia", symbol: "Rp", flag: "🇮🇩", locale: "id-ID" },
  { code: "MYR", iso2: "MY", country: "Malaysia", symbol: "RM", flag: "🇲🇾", locale: "ms-MY" },
  { code: "THB", iso2: "TH", country: "Thailand", symbol: "฿", flag: "🇹🇭", locale: "th-TH" },
  { code: "PHP", iso2: "PH", country: "Philippines", symbol: "₱", flag: "🇵🇭", locale: "en-PH" },
  { code: "VND", iso2: "VN", country: "Vietnam", symbol: "₫", flag: "🇻🇳", locale: "vi-VN" },
  { code: "BDT", iso2: "BD", country: "Bangladesh", symbol: "৳", flag: "🇧🇩", locale: "bn-BD" },
  { code: "PKR", iso2: "PK", country: "Pakistan", symbol: "₨", flag: "🇵🇰", locale: "en-PK" },
  { code: "LKR", iso2: "LK", country: "Sri Lanka", symbol: "රු", flag: "🇱🇰", locale: "si-LK" },
  { code: "TRY", iso2: "TR", country: "Türkiye", symbol: "₺", flag: "🇹🇷", locale: "tr-TR" },
  { code: "NGN", iso2: "NG", country: "Nigeria", symbol: "₦", flag: "🇳🇬", locale: "en-NG" },
];

const DEFAULT = CURRENCIES[0];

const byCode = CURRENCIES.reduce((acc, c) => {
  acc[c.code] = c;
  return acc;
}, {});

export function getCurrency(code) {
  return byCode[code] || DEFAULT;
}

export function isValidCurrency(code) {
  return Boolean(byCode[code]);
}

/**
 * Format a number as currency for display. Symbol-only — no conversion.
 * Uses Intl so each currency gets the right symbol, grouping and decimals
 * (e.g. JPY/KRW show 0 decimals automatically).
 */
export function formatCurrency(amount, code = "USD") {
  const c = getCurrency(code);
  const n = Number(amount) || 0;
  try {
    return new Intl.NumberFormat(c.locale, {
      style: "currency",
      currency: c.code,
      maximumFractionDigits: 2,
    }).format(n);
  } catch {
    return `${c.symbol}${n.toFixed(2)}`;
  }
}