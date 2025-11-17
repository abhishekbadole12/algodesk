"use client";

import { useState, useEffect, useRef } from "react";


export function useInstrumentSearch(query: string) {
  const [results, setResults] = useState<any[]>([]);
  const [data, setData] = useState<any[]>([]);
  const workerRef = useRef<Worker | null>(null);

  // Load CSV data once
  useEffect(() => {
    fetch("/api/instruments")
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  // Create worker only in browser
  useEffect(() => {
    const worker = new Worker(
      new URL("../workers/instrumentSearch.worker.ts", import.meta.url),
      { type: "module" }
    );

    workerRef.current = worker;

    worker.onmessage = (e) => {
      setResults(e.data);
    };

    return () => worker.terminate();
  }, []);

  // Debounce query
  const [debounced, setDebounced] = useState(query);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(query), 300);
    return () => clearTimeout(t);
  }, [query]);

  // Send work to the worker
  useEffect(() => {
    if (!workerRef.current) return;
    if (!data.length) return;

    workerRef.current.postMessage({
      data,
      query: debounced,
    });
  }, [debounced, data]);

  return results;
}