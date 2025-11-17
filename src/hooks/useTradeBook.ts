import { useEffect, useState } from "react";
//
import { TradeBookItem } from "@/types/orders/tradebook.types";
//
import { formatCompletedTrades } from "@/utils/formatCompletedTrades";

export function useTradeBook() {
  const [trades, setTrades] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrades = async () => {
      try {
        const res = await fetch("/api/orders/tradebook");
        const data = await res.json();

        if (!data.success) {
          setError(data.error_msg);
          setLoading(false);
          return;
        }

        setTrades(formatCompletedTrades(data.data) || []);
      } catch (err: any) {
        setError(err.message || "Unable to fetch tradebook");
      } finally {
        setLoading(false);
      }
    };

    fetchTrades();
  }, []);

  return { trades, loading, error };
}
