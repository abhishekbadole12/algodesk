"use client";

import { useEffect, useState } from "react";

export function useFunds() {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadFunds() {
      try {
        const res = await fetch("/api/funds");
        const json = await res.json();

        if (!json.status) {
          setError(json.message || "Error fetching funds");
        } else {
          setData(json.data); // array of fund objects
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadFunds();
  }, []);

  return { data, isLoading, error };
}