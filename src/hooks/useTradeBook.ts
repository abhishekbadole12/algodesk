import { useEffect, useState, useCallback } from "react";
import { TradeBookItem } from "@/types/orders/tradebook.types";
import { formatCompletedTrades } from "@/utils/formatCompletedTrades";

export function useTradeBook() {
  const [trades, setTrades] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTrades = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("/api/orders/tradebook", {
        cache: "no-store",
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.error_msg);
        setTrades([]);
        return;
      }

      setTrades(formatCompletedTrades(data.data) || []);
    } catch (err: any) {
      setError(err.message || "Unable to fetch tradebook");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTrades();
  }, [fetchTrades]);

  return {
    trades,
    loading,
    error,
    reload: fetchTrades, // 🔄 exposing reload
  };
}