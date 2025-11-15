import { Heart, TrendingDown, TrendingUp } from "lucide-react";
import { WatchlistItem } from "@/types/watchlist";

interface Props {
  item: WatchlistItem;
  isSelected: boolean;
  onClick: () => void;
}

export default function WatchlistCard({ item, isSelected, onClick }: Props) {
  const isPositive = item.change >= 0;

  return (
    <button
      onClick={onClick}
      className={`text-left p-4 rounded-lg border transition-all ${
        isSelected
          ? "bg-primary/5 border-primary shadow-lg"
          : "bg-background border-border hover:border-primary/50 hover:bg-background/50"
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-bold text-foreground">{item.symbol}</h3>
          <p className="text-xs text-muted-foreground mt-1">Price</p>
        </div>
        <div className="text-muted-foreground hover:text-red-500 transition-colors">
          <Heart className="w-4 h-4" />
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xl font-bold text-foreground">
          ₹{item.price.toLocaleString()}
        </p>
        <div
          className={`flex items-center gap-1 text-sm font-semibold ${
            isPositive ? "text-green-500" : "text-red-500"
          }`}
        >
          {isPositive ? (
            <TrendingUp className="w-4 h-4" />
          ) : (
            <TrendingDown className="w-4 h-4" />
          )}
          <span>
            {isPositive ? "+" : ""}
            {item.change.toFixed(2)}% ({isPositive ? "+" : ""}₹
            {Math.abs(item.changeAmount).toLocaleString()})
          </span>
        </div>
      </div>
    </button>
  );
}
