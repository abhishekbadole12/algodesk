"use client";

import { useInstrumentSearch } from "@/hooks/useInstrumentSearch";
import { formatOptionLabel } from "@/utils/formatTradingSymbol";
import { Search, X } from "lucide-react";
import React from "react";

export default function ScriptSelector({ form }) {
  const {
    searchInput,
    setSearchInput,
    selectedScript,
    setSelectedScript,
    showDropdown,
    setShowDropdown,
  } = form;

  const results = useInstrumentSearch(searchInput);

  const handleSelect = (script) => {
    const label =
      script.segment === "OPTSTK" || script.segment === "OPTIDX"
        ? formatOptionLabel(script.tradingSymbol)
        : script.tradingSymbol;

    setSelectedScript(script);
    setSearchInput(label);
    setShowDropdown(false);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-foreground">
        Script
      </label>
      <div className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            placeholder="Search script..."
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
              setShowDropdown(true);
            }}
            onFocus={() => setShowDropdown(true)}
            className="w-full pl-9 pr-8 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground"
          />

          {selectedScript && (
            <button
              onClick={() => {
                setSelectedScript(null);
                setSearchInput("");
              }}
              className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {showDropdown && results.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
            {results.map((script) => (
              <button
                key={script.exchangeToken}
                onClick={() => handleSelect(script)}
                className="w-full text-left px-4 py-3 hover:bg-background border-b border-border cursor-pointer last:border-b-0 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-semibold text-foreground text-sm">
                      {script.segment === "OPTSTK" ||
                      script.segment === "OPTIDX"
                        ? formatOptionLabel(script)
                        : script.tradingSymbol}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {script.name}
                    </p>
                  </div>
                  <span
                    className={`text-xs font-bold px-2 py-1 rounded ml-2 whitespace-nowrap ${
                      script.exchange === "NFO"
                        ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                        : script.exchange === "BSE"
                        ? "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
                        : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                    }`}
                  >
                    {script.exchange}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Show selected script info */}
        {selectedScript && !showDropdown && (
          <div className="mt-2 p-3 bg-background border border-border rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-foreground text-sm">
                  {selectedScript.tradingSymbol}
                </p>
                <p className="text-xs text-muted-foreground">
                  {selectedScript.name}
                </p>
              </div>
              <span
                className={`text-xs font-bold px-2 py-1 rounded ${
                  selectedScript.exchange === "NFO"
                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                    : selectedScript.exchange === "BSE"
                    ? "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
                    : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                }`}
              >
                {selectedScript.exchange}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
