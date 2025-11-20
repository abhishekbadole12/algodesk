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
import CompletedTradesTable from "@/components/trades/CompletedTrades/CompletedTrades";
import PendingOrdersTable from "@/components/trades/PendingOrders/PendingOrderCard";
import WatchlistCard from "@/components/watchlist/WatchlistCard";
import DetailPanel from "@/components/watchlist/DetailPanel";
import ActiveTrade from "@/components/trades/ActiveTrades/active-trade";
//
import { watchlistItems } from "@/data/dummy/watchlist.mock";
import { completedTrades } from "@/data/dummy/completedTrades.mock";
import { pendingOrders } from "@/data/dummy/pendingOrders.mock";
//

//
import { TAB_META } from "@/types/tab/tab.types";
import { Tabs } from "@/types/tab/tab.enums";
//

interface IMainContent {
  activeTab: Tabs;
}

export default function MainContent({ activeTab }: IMainContent) {
  const router = useRouter();

  // const { positions, loading, error } = usePositions();

  const [selectedItem, setSelectedItem] = useState(watchlistItems[0]);
  const [expandedTrades, setExpandedTrades] = useState<Record<string, boolean>>(
    {}
  );

  const handleToggleExpand = (tradeId: string) => {
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
      {/* ---------------- TAB NAVIGATION ---------------- */}
      <div className="flex gap-2 border-b border-border pb-4">
        {Object.values(Tabs).map((tab) => {
          const meta = TAB_META[tab]; 
          const Icon = meta.Icon;

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

      {/* ---------------- ACTIVE TRADES ---------------- */}
      {activeTab === Tabs.ACTIVE && <ActiveTrade />}

      {activeTab === Tabs.COMPLETED && <CompletedTradesTable />}

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
