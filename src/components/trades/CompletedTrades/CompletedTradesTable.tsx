"use client";

import { History } from "lucide-react";
//
import TableHead from "@/components/main-content/table-head";
//
import { useTradeBook } from "@/hooks/useTradeBook";
//
import { COMPLETED_TRADES_COLUMNS } from "@/constant/table";
//
import TradeRow from "../ActiveTrades/TradeRow";
import { useState } from "react";
//

export default function CompletedTradesTable() {
  const { trades, loading, error } = useTradeBook();

  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const handleToggleExpand = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

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
          <TableHead columns={COMPLETED_TRADES_COLUMNS} />

          <tbody>
            {loading && (
              <tr>
                <td
                  colSpan={10}
                  className="p-4 text-center text-muted-foreground"
                >
                  Loading…
                </td>
              </tr>
            )}

            {trades.map((trade) => {
              return (
                <TradeRow
                  key={trade?.SEC_ID}
                  entry={trade.ENTRY_OBJ}
                  exit={trade.EXIT_OBJ}
                  isExpandable
                  pnl={trade.PNL}
                  columns={COMPLETED_TRADES_COLUMNS}
                  isExpanded={expanded[trade.SEC_ID]}
                  onToggleExpand={handleToggleExpand}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
