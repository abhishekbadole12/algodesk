//
import { AlertCircle, CheckCircle, ChevronDown } from "lucide-react";
//
import { TradeBookItem } from "@/types/order/tradebook.types";

interface TradeRowProps {
  direction: "SHORT" | "LONG";
  legs: TradeBookItem[]; // full timeline legs
  entryLegs: TradeBookItem[]; // entry legs only
  exitLegs: TradeBookItem[]; // exit legs only
  pnl: number;
  pnl_percent: any;
  trade_duration: any;
  trade_status: string;
  columns: string[];
  isExpandable: boolean;
  isExpanded?: boolean;
  onToggleExpand?: (id: string) => void;
}

export default function TableRow({
  direction,
  legs,
  entryLegs,
  exitLegs,
  pnl,
  pnl_percent,
  trade_duration,
  trade_status,
  columns,
  isExpandable = true,
  isExpanded,
  onToggleExpand = () => {},
}: TradeRowProps) {
  const isProfitable = pnl >= 0;

  const firstLeg = legs[0];
  const lastLeg = legs[legs.length - 1];

  const totalQty = legs.reduce((sum, t) => sum + t.QUANTITY, 0);

  return (
    <>
      {/* ======================== MAIN ROW ======================== */}
      <tr className="border-b border-border hover:bg-background transition-colors">
        {isExpandable && (
          <td className="py-3 px-3">
            <button
              onClick={() => onToggleExpand(firstLeg.SEC_ID)}
              className="text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
            >
              {legs.length > 0 ? (
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    isExpanded ? "rotate-180" : ""
                  }`}
                />
              ) : (
                ""
              )}
            </button>
          </td>
        )}

        {columns?.map((col, index) => {
          switch (col) {
            case "Symbol":
              return (
                <td key={index} className="py-3 px-3">
                  <div>
                    <p className="font-semibold">{firstLeg.SYMBOL}</p>
                    <p className="text-xs text-muted-foreground">
                      {firstLeg.EXCHANGE}
                    </p>
                  </div>
                </td>
              );

            case "Side":
              return (
                <td key={index} className="py-3 px-3">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      direction === "LONG"
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                    }`}
                  >
                    {direction}
                  </span>
                </td>
              );

            case "Order Type":
              return (
                <td key={index} className="py-3 px-3 text-foreground text-sm">
                  {firstLeg.ORDER_TYPE}
                </td>
              );

            case "Entry Price":
              return (
                <td
                  key={index}
                  className="py-3 px-3 text-foreground font-semibold"
                >
                  ₹{firstLeg.PRICE.toFixed(2)}
                </td>
              );

            case "Exit Price":
              return (
                <td
                  key={index}
                  className="py-3 px-3 text-foreground font-semibold"
                >
                  {exitLegs.length > 0
                    ? `₹${exitLegs[exitLegs.length - 1].PRICE.toFixed(2)}`
                    : "-"}
                </td>
              );

            case "Qty":
              return (
                <td key={index} className="py-3 px-3 text-foreground">
                  {totalQty}
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
                    {exitLegs.length === 0 ? (
                      "-"
                    ) : (
                      <>
                        <p>₹ {pnl.toFixed(2)}</p>
                        {/* <p className="text-xs">
                          {isProfitable ? "+" : ""}
                          {pnl_percent.toFixed(2)}%
                        </p> */}
                      </>
                    )}
                  </div>
                </td>
              );

            case "Status":
              return (
                <td key={index} className="py-3 px-3">
                  <div className="flex items-center gap-2">
                    {trade_status === "CLOSED" ? (
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

            case "Trade Duration":
              return (
                <td
                  key={index}
                  className="py-3 px-3 text-muted-foreground text-sm"
                >
                  {trade_duration}
                </td>
              );

            case "Entry Time":
              return (
                <td
                  key={index}
                  className="py-3 px-3 text-muted-foreground text-sm"
                >
                  {firstLeg.ORDER_DATE_TIME.split(" ")[1]}{" "}
                </td>
              );

            case "Exit Time":
              return (
                <td
                  key={index}
                  className="py-3 px-3 text-muted-foreground text-sm"
                >
                  {exitLegs.length > 0
                    ? exitLegs[exitLegs.length - 1].ORDER_DATE_TIME.split(
                        " "
                      )[1]
                    : "-"}{" "}
                </td>
              );

            default:
              return null;
          }
        })}
      </tr>

      {/* ======================== EXPANDED TRADE LEGS ======================== */}
      {isExpandable && isExpanded && (
        <tr className="border-b border-border bg-background/50">
          <td colSpan={10} className="py-4 px-3">
            <div className="space-y-2 pl-6">
              <p className="text-sm font-semibold text-foreground mb-3">
                Trade Timeline (Legs)
              </p>

              <div className="space-y-2 px-6">
                {legs.map((leg, i) => {
                  const type =
                    leg.BUY_SELL.toUpperCase() ===
                    (direction === "LONG" ? "BUY" : "SELL")
                      ? "ENTRY"
                      : "EXIT";

                  return (
                    <TradeLegCard
                      key={i}
                      leg={leg}
                      type={type}
                      trade_status={trade_status}
                    />
                  );
                })}
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

function TradeLegCard({
  leg,
  type,
  trade_status,
}: {
  leg: TradeBookItem;
  type: "ENTRY" | "EXIT";
  trade_status: string;
}) {
  return (
    <div className="flex items-center justify-between bg-card border border-border p-3 rounded-lg">
      <div className="flex items-center gap-3">
        <span
          className={`text-xs font-bold px-2 py-1 rounded ${
            type === "ENTRY"
              ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
              : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
          }`}
        >
          {type}
        </span>

        <p className="font-semibold">₹{leg.PRICE.toFixed(2)}</p>
        <p className="text-xs text-muted-foreground">Qty: {leg.QUANTITY}</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          {trade_status === "CLOSED" ? (
            <>
              <CheckCircle className="w-3 h-3 text-green-500" />
              <span className="text-xs text-green-600 font-medium">
                Executed
              </span>
            </>
          ) : (
            <>
              <AlertCircle className="w-3 h-3 text-yellow-500" />
              <span className="text-xs text-yellow-600 font-medium">
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
  );
}
