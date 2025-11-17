import { TradeBookItem } from "@/types/orders/tradebook.types";
import { AlertCircle, CheckCircle, ChevronDown } from "lucide-react";

interface TradeRowProps {
  entry: TradeBookItem;
  exit: TradeBookItem;
  trade_status: string;
  pnl: number;
  pnl_percent: any;
  columns: string[];
  isExpandable: boolean;
  isExpanded?: boolean;
  onToggleExpand?: (id: string) => void;
}

export default function TableRow({
  entry,
  exit,
  pnl,
  pnl_percent,
  trade_status,
  columns,
  isExpandable = true,
  isExpanded,
  onToggleExpand = () => {},
}: TradeRowProps) {
  const isProfitable = pnl >= 0;

  return (
    <>
      <tr className="border-b border-border hover:bg-background transition-colors">
        {isExpandable && (
          <td className="py-3 px-3">
            <button
              onClick={() => onToggleExpand(entry.SEC_ID)}
              className="text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
            >
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  isExpanded ? "rotate-180" : ""
                }`}
              />
            </button>
          </td>
        )}

        {columns &&
          columns.map((col, index) => {
            switch (col) {
              case "Symbol":
                return (
                  <td key={index} className="py-3 px-3">
                    <div>
                      <p className="font-semibold text-foreground">
                        {entry.SYMBOL}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {entry.EXCHANGE}
                      </p>
                    </div>
                  </td>
                );

              case "Side":
                return (
                  <td key={index} className="py-3 px-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        entry.BUY_SELL === "BUY"
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                      }`}
                    >
                      {entry.BUY_SELL?.toUpperCase()}
                    </span>
                  </td>
                );

              case "Order Type":
                return (
                  <td key={index} className="py-3 px-3 text-foreground text-sm">
                    {entry.ORDER_TYPE}
                  </td>
                );

              case "Entry Price":
                return (
                  <td
                    key={index}
                    className="py-3 px-3 text-foreground font-semibold"
                  >
                    ₹{entry.PRICE.toFixed(2)}
                  </td>
                );

              case "Exit Price":
                return (
                  <td
                    key={index}
                    className="py-3 px-3 text-foreground font-semibold"
                  >
                    ₹{exit.PRICE?.toFixed(2)}
                  </td>
                );

              case "Qty":
                return (
                  <td key={index} className="py-3 px-3 text-foreground">
                    {entry.QUANTITY}
                  </td>
                );

              case "P&L":
                return (
                  <td key={index} className="py-3 px-3">
                    <div
                      className={`font-semibold ${
                        isProfitable
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      <p>₹{pnl.toFixed(2)}</p>
                      <p className="text-xs">
                        {isProfitable ? "+" : ""}
                        {pnl_percent.toFixed(2)}%
                      </p>
                    </div>
                  </td>
                );

              case "Status":
                return (
                  <td key={index} className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      {true ? (
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
                );

              case "Time":
                return (
                  <td
                    key={index}
                    className="py-3 px-3 text-muted-foreground text-sm"
                  >
                    {entry.ORDER_DATE_TIME.split(" ")[1]}
                  </td>
                );

              case "Entry Time":
                return (
                  <td
                    key={index}
                    className="py-3 px-3 text-muted-foreground text-sm"
                  >
                    {entry.ORDER_DATE_TIME.split(" ")[1]}
                  </td>
                );

              case "Exit Time":
                return (
                  <td
                    key={index}
                    className="py-3 px-3 text-muted-foreground text-sm"
                  >
                    {exit ? exit.ORDER_DATE_TIME.split(" ")[1] : "-"}
                  </td>
                );

              default:
              // return <td key={col}></td>;
            }
          })}
      </tr>

      {isExpandable && isExpanded && (
        <tr className="border-b border-border bg-background/50">
          <td colSpan={10} className="py-4 px-3">
            <div className="space-y-2 pl-6">
              <p className="text-sm font-semibold text-foreground mb-3">
                Trade Legs
              </p>
              <div className="space-y-2">
                {[exit].map((leg) => (
                  <div
                    key={leg.SEC_ID}
                    className="flex items-center justify-between bg-card border border-border p-3 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-xs font-bold px-2 py-1 rounded ${
                          leg.BUY_SELL === "Entry"
                            ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                            : leg.BUY_SELL === "Target"
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                        }`}
                      >
                        {leg.BUY_SELL}
                      </span>
                      <p className="font-semibold text-foreground">
                        ₹{leg.PRICE.toFixed(2)}
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        {trade_status === "CLOSED" ? (
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
                        {leg.ORDER_DATE_TIME.split(" ")[1]}
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
