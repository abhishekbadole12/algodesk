// utils/formatOptionLabel.ts
export interface InstrumentLike {
  tradingSymbol: string;
  expiry?: string;       // e.g. "18Nov2025"
  strike?: string;       // e.g. "26000" or "287.5"
  instrumentType?: string; // "CE" | "PE"
  name?: string;
}

const SHORT_MONTH_MAP: Record<string, string> = {
  A: "JAN", B: "FEB", C: "MAR", D: "APR", E: "MAY", F: "JUN",
  G: "JUL", H: "AUG", I: "SEP", J: "OCT", K: "NOV", L: "DEC",
  M: "JAN", N: "NOV"
};

function titleCaseMonth(month: string) {
  if (!month) return "";
  const m = month.slice(0,3);
  return m.charAt(0).toUpperCase() + m.slice(1).toLowerCase();
}

/**
 * Format an instrument into "SYMBOL DAY MON STRIKE TYPE"
 * Example output: "nifty 18 nov 26000 ce"
 */
export function formatOptionLabel(item: InstrumentLike): string {
  if (!item?.tradingSymbol) return "";

  const tradingSymbol = item.tradingSymbol.trim();
  const rawExpiry = item.expiry || "";
  const rawStrike = item.strike ?? "";
  const rawType = (item.instrumentType || "").toUpperCase();

  // 1) Extract day & month from expiry if available (preferred)
  let day = "";
  let month = "";

  if (rawExpiry) {
    // Matches "18Nov2025" or "1Jan2026" etc.
    const m = rawExpiry.match(/(\d{1,2})([A-Za-z]{3,})(\d{4})/);
    if (m) {
      day = m[1];
      month = titleCaseMonth(m[2]);
    }
  }

  // 2) Fallback: parse short code like "...25N18..." (YY M DD)
  if (!day || !month) {
    const short = tradingSymbol.match(/(\d{2})([A-Z])(\d{2})/i);
    if (short) {
      day = day || short[3];
      const mapped = SHORT_MONTH_MAP[short[2].toUpperCase()] || short[2].toUpperCase();
      month = month || titleCaseMonth(mapped);
    }
  }

  // 3) Further fallback - full month directly inside tradingSymbol e.g. "25NOV"
  if (!day || !month) {
    const full = tradingSymbol.match(/(\d{2})(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)/i);
    if (full) {
      day = day || full[1];
      month = month || titleCaseMonth(full[2]);
    }
  }

  // 4) Strike: prefer provided `strike` (keeps decimals)
  let strike = rawStrike;
  if (!strike) {
    // match strike just before CE/PE at the end OR last numeric group
    const s1 = tradingSymbol.match(/(\d+(?:\.\d+)?)(?=(CE|PE)$)/i);
    const s2 = tradingSymbol.match(/(\d+(?:\.\d+)?)(?!.*\d)/); // last number group
    strike = s1?.[0] ?? s2?.[0] ?? "";
  }

  // 5) Type: prefer instrumentType, fallback to suffix
  const type = rawType || (tradingSymbol.match(/(CE|PE)$/i)?.[0] ?? "").toUpperCase();

  // 6) Compute base symbol by removing the expiry+strike+type suffix reliably.
  // We'll remove the longest matching suffix that looks like:
  // - short expiry + strike + CE/PE  e.g. 25N1826000CE
  // - full month expiry + strike + CE/PE  e.g. 25NOV26000CE
  // - just strike + CE/PE  e.g. 26000CE or 287.5CE
  // Build a regex to remove these suffixes from the tradingSymbol.
  const sliceRegexes = [
    // 2 digits year + single letter month + 2 digits day + strike (digits or decimal) + CE/PE
    /(\d{2}[A-Z]\d{2}\d*(?:\.\d+)?(?:CE|PE))$/i,
    // 2 digits year + 3-letter month + optional year digits + strike + CE/PE
    /(\d{2}[A-Z]{3}\d*(?:\.\d+)?(?:CE|PE))$/i,
    // strike (int or decimal) + CE/PE at end
    /(\d+(?:\.\d+)?(?:CE|PE))$/i,
    // just CE/PE end (unlikely alone but safe)
    /(CE|PE)$/i
  ];

  let base = tradingSymbol;
  for (const rx of sliceRegexes) {
    if (rx.test(base)) {
      base = base.replace(rx, "");
      break;
    }
  }

  // If tradingSymbol includes non-letter separators, try trim again
  base = base.replace(/[^A-Za-z0-9 ]+/g, " ").trim();

  // If item.name is provided and non-empty, prefer it (cleaned)
  if (item.name && item.name.trim()) {
    base = item.name.trim();
  }

  // 7) Compose final label: "SYMBOL DAY MON STRIKE TYPE"
  const parts: string[] = [];
  if (base) parts.push(base.toUpperCase());
  if (day) parts.push(day.toUpperCase());
  if (month) parts.push(month.toUpperCase());
  if (strike) parts.push(String(strike).toUpperCase());
  if (type) parts.push(type.toUpperCase());

  return parts.join(" ").replace(/\s+/g, " ").trim();
}