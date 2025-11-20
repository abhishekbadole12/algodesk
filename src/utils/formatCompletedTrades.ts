import { TradeBookItem } from "@/types/orders/tradebook.types";
import { ITrade } from "@/types/trade";

export function formatCompletedTrades(trades: TradeBookItem[]): ITrade[] {
  const grouped: Record<string, TradeBookItem[]> = {};

  // Group by SEC_ID
  for (const t of trades) {
    if (!grouped[t.SEC_ID]) grouped[t.SEC_ID] = [];
    grouped[t.SEC_ID].push(t);
  }

  const result: ITrade[] = [];

  function parseTime(t: TradeBookItem) {
    const [datePart, timePart] = t.ORDER_DATE_TIME.split(" ");
    const [dd, mm, yyyy] = datePart.split("-");
    return new Date(`${yyyy}-${mm}-${dd} ${timePart}`).getTime();
  }

  for (const secId in grouped) {
    const items = grouped[secId];

    // Sort time → real trading timeline
    items.sort((a, b) => parseTime(a) - parseTime(b));

    // Direction determined by FIRST TRADE
    const first = items[0];
    const direction = first.BUY_SELL.toUpperCase() === "BUY" ? "LONG" : "SHORT";

    // FIFO Stack for entries
    let fifo: { qty: number; price: number }[] = [];
    let closedPNL = 0;
    let closedQty = 0;

    // Track open legs
    let openLegs: TradeBookItem[] = [];
    let closedLegs: TradeBookItem[] = [];

    for (const leg of items) {
      const side = leg.BUY_SELL.toUpperCase();
      const qty = leg.QUANTITY;
      const price = leg.PRICE;

      if (
        (direction === "LONG" && side === "BUY") ||
        (direction === "SHORT" && side === "SELL")
      ) {
        // ENTRY LEG
        fifo.push({ qty, price });
        openLegs.push(leg);
      } else {
        // EXIT LEG → match FIFO
        let remaining = qty;
        closedLegs.push(leg);

        while (remaining > 0 && fifo.length > 0) {
          let entry = fifo[0];
          const matchedQty = Math.min(entry.qty, remaining);

          // Calculate PNL piece-wise
          if (direction === "LONG") {
            closedPNL += (price - entry.price) * matchedQty;
          } else {
            closedPNL += (entry.price - price) * matchedQty;
          }

          entry.qty -= matchedQty;
          remaining -= matchedQty;
          closedQty += matchedQty;

          if (entry.qty === 0) fifo.shift();
        }
      }
    }

    const openQty = fifo.reduce((s, f) => s + f.qty, 0);

    const STATUS = closedQty === 0 ? "OPEN" : openQty === 0 ? "CLOSED" : "PARTIAL";

    const firstTime = parseTime(items[0]);
    const lastTime = closedLegs.length
      ? parseTime(closedLegs[closedLegs.length - 1])
      : null;

    const duration =
      lastTime === null
        ? "-"
        : `${Math.floor((lastTime - firstTime) / 60000)} min ${Math.floor(
            ((lastTime - firstTime) % 60000) / 1000
          )} sec`;

    result.push({
      SEC_ID: secId,
      SETTLOR: first.SETTLOR,
      ENTRY_OBJ: openLegs,
      EXIT_OBJ: closedLegs,
      PNL: closedPNL,
      PNL_PERCENT:
        openLegs.length > 0
          ? (closedPNL / openLegs[0].PRICE) * 100
          : 0,
      STATUS,
      DIRECTION: direction,
      TRADE_DURATION: duration,
      LEGS: items, // full timeline list
    });
  }

  return result;
}