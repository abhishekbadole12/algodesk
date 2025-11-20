"use client";

//
import { useEffect } from "react";
//
import { Search, TrendingDown, TrendingUp, X } from "lucide-react";
//
import { useInstrumentSearch } from "@/hooks/useInstrumentSearch";
import { useLTP } from "@/hooks/useLTP";
import { useAutoFillPrice } from "@/hooks/useAutoFillPrice";
//
import { formatOptionLabel } from "@/utils/formatTradingSymbol";
import { getPriceChangeStats } from "@/utils/getPriceChangeStats";

export default function ScriptSelector({ form }: any) {
  const { trade, search, updateTrade, updateSearch } = form;

  const results = useInstrumentSearch(search.query);

  const { ltp, open, close, loading } = useLTP(
    trade.selectedScript?.exchange,
    trade.selectedScript?.exchangeToken
  );

  const { change, percent, isUp } = getPriceChangeStats(ltp, open);

  // Auto-fill only when script changes (not on manual edit)
  useAutoFillPrice(form, ltp);

  /**
   * =============================
   * 🔹 Script Utility Helpers
   * =============================
   */
  const isOption = (segment: string) =>
    segment === "OPTSTK" || segment === "OPTIDX";

  const getLabel = (script: any) =>
    isOption(script.segment)
      ? formatOptionLabel(script).split(" ")[0]
      : script.tradingSymbol;

  const getName = (script: any) =>
    isOption(script.segment)
      ? formatOptionLabel(script).split(" ").slice(1).join(" ")
      : script.name;

  /**
   * =============================
   * 🔹 Handlers
   * =============================
   */
  const handleSelect = (script: any) => {
    updateTrade("selectedScript", script);

    // Set text input
    updateSearch("query", getLabel(script));

    // Close dropdown
    updateSearch("dropdownOpen", false);
  };

  const handleClear = () => {
    updateTrade("selectedScript", null);
    updateSearch("query", "");
  };

  // useEffect(() => {
  //   if (!selectedScript) return;
  //   setLimitPrice("");
  //   // Only set limit price if user has not typed anything
  //   if (ltp !== null) {
  //     setLimitPrice(ltp.toString());
  //   }
  // }, [selectedScript]);

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
            value={search.query}
            onChange={(e) => {
              updateSearch("query", e.target.value);
              updateSearch("dropdownOpen", true);
            }}
            onFocus={() => updateSearch("dropdownOpen", true)}
            className="w-full pl-9 pr-8 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground"
          />

          {trade.selectedScript && (
            <button
              onClick={handleClear}
              className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Dropdown */}
        {search.dropdownOpen && results.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
            {results.map((script) => (
              <button
                key={script.exchangeToken}
                onClick={() => handleSelect(script)}
                className="w-full text-left px-4 py-3 hover:bg-background relative border-b border-border cursor-pointer last:border-b-0 transition-colors"
              >
                <div className="flex items-start justify-between ">
                  <div className="flex-1">
                    <p className="text-xs font-medium text-muted-foreground">
                      {getLabel(script)}
                    </p>

                    <p className="text-xs text-foreground mt-0.5">
                      {getName(script)}
                    </p>
                  </div>
                </div>
                <p
                  className={`text-[10px] font-semibold px-1.5 py-[3px] rounded-bl-lg ml-2 whitespace-nowrap absolute bg-gray-700 top-0 right-0.5`}
                >
                  {script.exchange}
                </p>
              </button>
            ))}
          </div>
        )}

        {/* Selected Script Summary */}
        {trade.selectedScript && !search.dropdownOpen && (
          <div className="mt-2 p-3 bg-background border border-border rounded-lg">
            <div className="flex items-center justify-between">
              {/* Script Info */}
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {getLabel(trade.selectedScript)}
                </p>
                <p className="text-xs text-muted-foreground">
                  {getName(trade.selectedScript).length > 16
                    ? getName(trade.selectedScript).slice(0, 16) + "..."
                    : getName(trade.selectedScript)}
                </p>
              </div>

              {/* LTP + Change Display */}
              <div className="text-right">
                <p className="text-base font-bold text-foreground">₹ {ltp}</p>

                <div
                  className={`flex items-center justify-end gap-1 text-sm font-semibold ${
                    isUp
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {isUp ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  <span className="text-xs">
                    {isUp ? "+" : ""}
                    {change} ({isUp ? "+" : ""}
                    {percent}%)
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
