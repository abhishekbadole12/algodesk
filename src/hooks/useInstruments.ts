"use client";

import { useEffect, useState } from "react";
//
import { Instrument } from "@/types/Instrument";
//

let cachedInstruments: Instrument[] | null = null;

export function useInstruments() {
  const [data, setData] = useState<Instrument[]>(cachedInstruments || []);
  const [loading, setLoading] = useState(!cachedInstruments);

  useEffect(() => {
    if (cachedInstruments) return; // already fetched ✔

    fetch("/api/instruments")
      .then(res => res.json())
      .then(json => {
        cachedInstruments = json;
        setData(json);
        setLoading(false);
      });
  }, []);

  return { data, loading };
}