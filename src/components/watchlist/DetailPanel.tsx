
export default function DetailPanel({ item }) {
  if (!item) {
    return (
      <div className="bg-card border border-border rounded-lg p-6 flex items-center justify-center h-full">
        <p className="text-muted-foreground text-center">
          Select a symbol to view details
        </p>
      </div>
    );
  }

  const isPositive = item.change >= 0;

  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-bold text-foreground">{item.symbol}</h2>
          <div
            className={`text-sm font-semibold px-3 py-1 rounded ${
              isPositive
                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
            }`}
          >
            {isPositive ? "+" : ""}
            {item.change.toFixed(2)}%
          </div>
        </div>
        <p className="text-3xl font-bold text-foreground">
          ₹{item.price.toLocaleString()}
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          {isPositive ? "+" : ""}₹{Math.abs(item.changeAmount).toLocaleString()}{" "}
          from previous close
        </p>
      </div>

      <div className="h-px bg-border"></div>

      {/* Price Details Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">
            Open
          </p>
          <p className="text-lg font-bold text-foreground">
            ₹{item.open.toLocaleString()}
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">
            Close
          </p>
          <p className="text-lg font-bold text-foreground">
            ₹{item.close.toLocaleString()}
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">
            Day High
          </p>
          <p className="text-lg font-bold text-foreground">
            ₹{item.high.toLocaleString()}
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">
            Day Low
          </p>
          <p className="text-lg font-bold text-foreground">
            ₹{item.low.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="h-px bg-border"></div>

      {/* Volume & Market Data */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Volume</p>
          <p className="font-semibold text-foreground">{item.volume}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Avg Volume</p>
          <p className="font-semibold text-foreground">{item.avgVolume}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Market Cap</p>
          <p className="font-semibold text-foreground">{item.marketCap}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">P/E Ratio</p>
          <p className="font-semibold text-foreground">{item.pe}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Day Range</p>
          <p className="font-semibold text-foreground">{item.dayRange}</p>
        </div>
      </div>

      <div className="h-px bg-border"></div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button className="py-2 px-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors text-sm">
          Buy {item.symbol}
        </button>
        <button className="py-2 px-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors text-sm">
          Sell {item.symbol}
        </button>
      </div>
    </div>
  );
}
