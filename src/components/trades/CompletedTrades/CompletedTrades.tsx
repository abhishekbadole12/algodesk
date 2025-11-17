"use client";

import { useState } from "react";
//
import { History } from "lucide-react";
//
import { useTradeBook } from "@/hooks/useTradeBook";
//
import { COMPLETED_TRADES_COLUMNS } from "@/constant/table";
//
import TableRow from "../../table/table-row";
import Table from "@/components/table/table";
//

export default function CompletedTradesTable() {
  const { trades, loading, error } = useTradeBook();

  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const handleToggleExpand = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <Table
      title="Completed Trades"
      Icon={History}
      columns={COMPLETED_TRADES_COLUMNS}
      isLoading={loading}
    >
      {trades.map((trade) => {
        return (
          <TableRow
            key={trade?.SEC_ID}
            entry={trade.ENTRY_OBJ}
            exit={trade.EXIT_OBJ}
              trade_status={trade.STATUS}   pnl_percent={trade.PNL_PERCENT}
            isExpandable
            pnl={trade.PNL}
            columns={COMPLETED_TRADES_COLUMNS}
            isExpanded={expanded[trade.SEC_ID]}
            onToggleExpand={handleToggleExpand}
          />
        );
      })}
    </Table>
  );
}
