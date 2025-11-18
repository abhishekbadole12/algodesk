"use client";

import Table from "@/components/table/table";
import TableRow from "@/components/table/table-row";
import { ACTIVE_TRADES_COLUMNS } from "@/constant/table";
import { useTradeBook } from "@/hooks/useTradeBook";
import { Play } from "lucide-react";
import React, { useState } from "react";

export default function ActiveTrade() {
  const { trades, loading, error, reload } = useTradeBook();

  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const handleToggleExpand = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <>
      <Table
        title="Active Trades"
        Icon={Play}
        columns={ACTIVE_TRADES_COLUMNS}
        isLoading={loading}
        onReload={reload}
      >
        {trades
          .filter((t) => t.STATUS === "OPEN")
          .map((trade) => (
            <TableRow
              key={trade?.SEC_ID}
              entry={trade.ENTRY_OBJ}
              exit={trade.EXIT_OBJ}
              trade_status={trade.STATUS}
              isExpandable
              pnl={trade.PNL}
              direction={trade.direction}
              trade_duration={trade.DURATION}
              pnl_percent={trade.PNL_PERCENT}
              columns={ACTIVE_TRADES_COLUMNS}
              isExpanded={expanded[trade.SEC_ID]}
              onToggleExpand={handleToggleExpand}
            />
          ))}
      </Table>

      {/* Recent Orders */}
      {/* <Table title="Recent Orders" Icon={Clock} columns={RECENT_ORDERS_COLUMNS}>
        {recentOrders.map((order) => (
          <TradeRow
            key={order.id}
            trade={order}
            columns={RECENT_ORDERS_COLUMNS}
            isExpandable={false}
          />
        ))}
      </Table> */}
    </>
  );
}
