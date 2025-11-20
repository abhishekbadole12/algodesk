import { useEffect, useState } from "react";

export function useLTP(exchange: "NSE" | "BSE", token: string) {
  const [state, setState] = useState({
    ltp: null,
    open: null,
    close: null,
    loading: false,
    error: null,
  });

  async function fetchLTP() {
    if (!token) return;
    setState((prev) => ({ ...prev, loading: true }));

    try {
      const res = await fetch("/api/ltp", {
        method: "POST",
        body: JSON.stringify({
          mode: "OHLC",
          exchangeTokens: { [exchange]: [token] },
        }),
      });

      const data = await res.json();
      const fetched = data.data.fetched?.[0];

      setState({
        ltp: fetched.ltp,
        open: fetched.open,
        close: fetched.close,
        loading: false,
        error: null,
      });
    } catch (e) {
      setState((prev) => ({
        ...prev,
        error: "Failed to fetch LTP",
        loading: false,
      }));
    }
  }

  useEffect(() => {
    fetchLTP();
    const interval = setInterval(fetchLTP, 2000);

    return () => clearInterval(interval);
  }, [token]);

  return state;
}
