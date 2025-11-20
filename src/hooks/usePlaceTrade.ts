"use client";

import { useState } from "react";
//
import { IOrderPayload } from "@/types/order/order.types";

export function usePlaceOrder() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<any>(null);

  const placeOrder = async (payload: IOrderPayload) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/orders/order-placement", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.error_msg || "Failed to place order");
        return null;
      }

      setResponse(data);
      return data;
    } catch (err: any) {
      setError(err.message || "Order placement failed");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { placeOrder, loading, error, response };
}
