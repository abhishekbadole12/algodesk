import { History } from "lucide-react";

export default function CompletedTradesTable({ trades }) {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <History className="w-5 h-5 text-primary" />
          Completed Trades
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-background/50">
              <th className="text-left py-3 px-3 text-muted-foreground font-semibold">
                Symbol
              </th>
              <th className="text-left py-3 px-3 text-muted-foreground font-semibold">
                Side
              </th>
              <th className="text-left py-3 px-3 text-muted-foreground font-semibold">
                Order Type
              </th>
              <th className="text-left py-3 px-3 text-muted-foreground font-semibold">
                Entry Price
              </th>
              <th className="text-left py-3 px-3 text-muted-foreground font-semibold">
                Exit Price
              </th>
              <th className="text-left py-3 px-3 text-muted-foreground font-semibold">
                Qty
              </th>
              <th className="text-left py-3 px-3 text-muted-foreground font-semibold">
                P&L
              </th>
              <th className="text-left py-3 px-3 text-muted-foreground font-semibold">
                Entry Time
              </th>
              <th className="text-left py-3 px-3 text-muted-foreground font-semibold">
                Exit Time
              </th>
            </tr>
          </thead>
          <tbody>
            {trades.map((trade) => (
              <tr
                key={trade.id}
                className="border-b border-border hover:bg-background transition-colors"
              >
                <td className="py-3 px-3">
                  <div>
                    <p className="font-semibold text-foreground">
                      {trade.symbol}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {trade.exchange}
                    </p>
                  </div>
                </td>
                <td className="py-3 px-3">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      trade.side === "BUY"
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                    }`}
                  >
                    {trade.side}
                  </span>
                </td>
                <td className="py-3 px-3 text-foreground text-sm">
                  {trade.orderType}
                </td>
                <td className="py-3 px-3 text-foreground font-semibold">
                  ₹{trade.entryPrice.toFixed(2)}
                </td>
                <td className="py-3 px-3 text-foreground font-semibold">
                  ₹{trade.exitPrice.toFixed(2)}
                </td>
                <td className="py-3 px-3 text-foreground">{trade.quantity}</td>
                <td className="py-3 px-3">
                  <div
                    className={`font-semibold ${
                      trade.pnl >= 0
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    <p>₹{Math.abs(trade.pnl).toLocaleString()}</p>
                    <p className="text-xs">{trade.pnlPercent.toFixed(2)}%</p>
                  </div>
                </td>
                <td className="py-3 px-3 text-muted-foreground text-sm">
                  {trade.entryTime}
                </td>
                <td className="py-3 px-3 text-muted-foreground text-sm">
                  {trade.exitTime}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
