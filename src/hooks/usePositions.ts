"use client";

import { useEffect, useState } from "react";
import type { Position } from "@/types/positions";

export function usePositions() {
  const [positions, setPositions] = useState<Position[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPositions() {
      try {
        const res = await fetch("/api/positions");
        const data = await res.json();

        if (!data.success) {
          setError(data.error_msg);
          setLoading(false);
          return;
        }

        setPositions(data || []);
      } catch (err: any) {
        setError(err.message || "Failed to load positions");
      } finally {
        setLoading(false);
      }
    }

    fetchPositions();
  }, []);

  return { positions, loading, error };
}
