"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Clock,
  CheckCircle,
  AlertCircle,
  Heart,
  Play,
  ListTodo,
  Eye,
} from "lucide-react";
//
import TabButton from "@/components/common/TabButton";
import TradeRow from "@/components/trades/ActiveTrades/TradeRow";
import CompletedTradesTable from "@/components/trades/CompletedTrades/CompletedTradesTable";
import PendingOrdersTable from "@/components/trades/PendingOrders/PendingOrderCard";
import WatchlistCard from "@/components/watchlist/WatchlistCard";
import DetailPanel from "@/components/watchlist/DetailPanel";
//
import { watchlistItems } from "@/data/dummy/watchlist.mock";
import { activeTrades } from "@/data/dummy/activeTrades.mock";
import { recentOrders } from "@/data/dummy/recentOrders.mock";
import { completedTrades } from "@/data/dummy/completedTrades.mock";
import { pendingOrders } from "@/data/dummy/pendingOrders.mock";
//
import { Tabs } from "@/enum/tabs.enum";
import { TAB_META } from "@/enum/tabs.meta";
//

interface IMainContent {
  activeTab: Tabs | string;
}

export default function MainContent({ activeTab }: IMainContent) {
  const router = useRouter();

  const [selectedItem, setSelectedItem] = useState(watchlistItems[0]);
  const [expandedTrades, setExpandedTrades] = useState({});

  const handleToggleExpand = (tradeId) => {
    setExpandedTrades((prev) => ({
      ...prev,
      [tradeId]: !prev[tradeId],
    }));
  };

  // Handle tab click + update URL
  const handleTabChange = (tab: Tabs) => {
    router.push(`/?tab=${tab}`, { scroll: false });
  };

  return (
    <main className="flex-1 overflow-y-auto bg-background p-6 space-y-6">
      {/* Tab Navigation System */}
      <div className="flex gap-2 border-b border-border pb-4">
        {Object.values(Tabs).map((tab) => {
          const meta = TAB_META[tab];
          const Icon = meta.icon;

          return (
            <TabButton
              key={tab}
              label={meta.label}
              icon={Icon}
              isActive={activeTab === tab}
              onClick={() => handleTabChange(tab)}
            />
          );
        })}
      </div>

      {/* Conditional Rendering Based on Active Tab */}
      {activeTab === Tabs.ACTIVE && (
        <>
          {/* Active Trades Table */}
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="p-4 border-b border-border">
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                <Play className="w-5 h-5 text-primary" />
                Active Trades
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-background/50">
                    <th className="text-left py-3 px-3 text-muted-foreground font-semibold"></th>
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
                      Qty
                    </th>
                    <th className="text-left py-3 px-3 text-muted-foreground font-semibold">
                      P&L
                    </th>
                    <th className="text-left py-3 px-3 text-muted-foreground font-semibold">
                      Status
                    </th>
                    <th className="text-left py-3 px-3 text-muted-foreground font-semibold">
                      Time
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {activeTrades.map((trade) => (
                    <TradeRow
                      key={trade.id}
                      trade={trade}
                      isExpanded={expandedTrades[trade.id]}
                      onToggleExpand={handleToggleExpand}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Recent Orders
              </h2>
              <button className="text-sm text-primary hover:underline">
                View all
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-3 text-muted-foreground font-semibold">
                      Symbol
                    </th>
                    <th className="text-left py-3 px-3 text-muted-foreground font-semibold">
                      Side
                    </th>
                    <th className="text-left py-3 px-3 text-muted-foreground font-semibold">
                      Qty
                    </th>
                    <th className="text-left py-3 px-3 text-muted-foreground font-semibold">
                      Price
                    </th>
                    <th className="text-left py-3 px-3 text-muted-foreground font-semibold">
                      Status
                    </th>
                    <th className="text-left py-3 px-3 text-muted-foreground font-semibold">
                      Time
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-border hover:bg-background transition-colors"
                    >
                      <td className="py-3 px-3 font-semibold text-foreground">
                        {order.symbol}
                      </td>
                      <td className="py-3 px-3">
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${
                            order.side === "BUY"
                              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                          }`}
                        >
                          {order.side}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-foreground">
                        {order.quantity}
                      </td>
                      <td className="py-3 px-3 text-foreground">
                        ₹{order.price.toFixed(2)}
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2">
                          {order.status === "executed" ? (
                            <>
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span className="text-green-600 dark:text-green-400 font-medium">
                                Executed
                              </span>
                            </>
                          ) : (
                            <>
                              <AlertCircle className="w-4 h-4 text-yellow-500" />
                              <span className="text-yellow-600 dark:text-yellow-400 font-medium">
                                Pending
                              </span>
                            </>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-3 text-muted-foreground">
                        {order.time}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {activeTab === Tabs.COMPLETED && (
        <CompletedTradesTable trades={completedTrades} />
      )}

      {activeTab === Tabs.PENDING && (
        <PendingOrdersTable orders={pendingOrders} />
      )}

      {activeTab === Tabs.WATCHLIST && (
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <Heart className="w-5 h-5 text-primary" />
              My Watchlist
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {watchlistItems.map((item) => (
                <WatchlistCard
                  key={item.id}
                  item={item}
                  isSelected={selectedItem?.id === item.id}
                  onClick={() => setSelectedItem(item)}
                />
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              Details
            </h2>
            <DetailPanel item={selectedItem} />
          </div>
        </div>
      )}
    </main>
  );
}
