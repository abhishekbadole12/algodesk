import { AlertCircle, CheckCircle, ChevronDown } from "lucide-react";

interface TradeRowProps {
  trade: any; // *
  isExpanded: boolean;
  onToggleExpand: () => void;
}

export default function TradeRow({
  trade,
  isExpanded,
  onToggleExpand,
}: TradeRowProps) {
  const isProfitable = trade.pnl >= 0;

  return (
    <>
      <tr className="border-b border-border hover:bg-background transition-colors">
        <td className="py-3 px-3">
          <button
            onClick={() => onToggleExpand(trade.id)}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          </button>
        </td>

        <td className="py-3 px-3">
          <div>
            <p className="font-semibold text-foreground">{trade.symbol}</p>
            <p className="text-xs text-muted-foreground">{trade.exchange}</p>
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

        <td className="py-3 px-3 text-foreground text-sm">{trade.orderType}</td>

        <td className="py-3 px-3 text-foreground font-semibold">
          ₹{trade.entryPrice.toFixed(2)}
        </td>

        <td className="py-3 px-3 text-foreground">{trade.quantity}</td>

        <td className="py-3 px-3">
          <div
            className={`font-semibold ${
              isProfitable
                ? "text-green-600 dark:text-green-400"
                : "text-red-600 dark:text-red-400"
            }`}
          >
            <p>₹{Math.abs(trade.pnl).toLocaleString()}</p>
            <p className="text-xs">
              {isProfitable ? "+" : ""}
              {trade.pnlPercent.toFixed(2)}%
            </p>
          </div>
        </td>

        <td className="py-3 px-3">
          <div className="flex items-center gap-2">
            {trade.status === "executed" ? (
              <>
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-green-600 dark:text-green-400 font-medium text-sm">
                  Executed
                </span>
              </>
            ) : (
              <>
                <AlertCircle className="w-4 h-4 text-yellow-500" />
                <span className="text-yellow-600 dark:text-yellow-400 font-medium text-sm">
                  Pending
                </span>
              </>
            )}
          </div>
        </td>

        <td className="py-3 px-3 text-muted-foreground text-sm">
          {trade.time}
        </td>
      </tr>

      {isExpanded && (
        <tr className="border-b border-border bg-background/50">
          <td colSpan={10} className="py-4 px-3">
            <div className="space-y-2 pl-6">
              <p className="text-sm font-semibold text-foreground mb-3">
                Trade Legs
              </p>
              <div className="space-y-2">
                {trade.legs.map((leg) => (
                  <div
                    key={leg.id}
                    className="flex items-center justify-between bg-card border border-border p-3 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-xs font-bold px-2 py-1 rounded ${
                          leg.type === "Entry"
                            ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                            : leg.type === "Target"
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                        }`}
                      >
                        {leg.type}
                      </span>
                      <p className="font-semibold text-foreground">
                        ₹{leg.price.toFixed(2)}
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        {leg.status === "executed" ? (
                          <>
                            <CheckCircle className="w-3 h-3 text-green-500" />
                            <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                              Executed
                            </span>
                          </>
                        ) : (
                          <>
                            <AlertCircle className="w-3 h-3 text-yellow-500" />
                            <span className="text-xs text-yellow-600 dark:text-yellow-400 font-medium">
                              Pending
                            </span>
                          </>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground w-16 text-right">
                        {leg.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
