import { TradeBookItem } from "@/types/orders/tradebook.types";

export function formatCompletedTrades(trades: TradeBookItem[]): any[] {
  const grouped: Record<string, TradeBookItem[]> = {};

  // Group all trades by SEC_ID
  for (const t of trades) {
    if (!grouped[t.SEC_ID]) grouped[t.SEC_ID] = [];
    grouped[t.SEC_ID].push(t);
  }

  const result: any[] = [];

  for (const secId in grouped) {
    const items = grouped[secId];

    // Sort by time so first = entry, second = exit
    items.sort(
      (a, b) =>
        new Date(a.ORDER_DATE_TIME).getTime() -
        new Date(b.ORDER_DATE_TIME).getTime()
    );

    const entry = items[1];
    const exit = items[0]; // undefined if not closed

    // 🟡 Only entry exists → OPEN trade
    if (items.length === 1) {
      result.push({
        SEC_ID: secId,
        SETTLOR: entry.SETTLOR,
        ENTRY_OBJ: entry,
        EXIT_OBJ: null,
        PNL: 0,
        PNL_PERCENT: 0,
        STATUS: "OPEN",
      });
      continue;
    }

    // Prices
    const entryPrice = entry.PRICE;
    const exitPrice = exit.PRICE;

    // Qty (BOTH BUY & SELL qty same)
    const qty = entry.QUANTITY;

    // 🟢 Long OR Short completed trade
    const pnl =
      (exit.PRICE - entry.PRICE) *
      (entry.BUY_SELL === "BUY" ? entry.QUANTITY : -entry.QUANTITY);

    //  PNL %
    const pnlPercent =
      entry.BUY_SELL === "BUY"
        ? ((exitPrice - entryPrice) / entryPrice) * 100
        : ((entryPrice - exitPrice) / entryPrice) * 100;

    result.push({
      SEC_ID: secId,
      SETTLOR: entry.SETTLOR,
      ENTRY_OBJ: entry,
      EXIT_OBJ: exit,
      PNL: pnl,
      PNL_PERCENT: pnlPercent,
      STATUS: "CLOSED",
    });
  }

  return result;
}
