import { RefreshCcw } from "lucide-react";

interface TableHeaderProps {
  title: string;
  Icon: React.ComponentType<{ className?: string }>;
  isLoading?: boolean;
  onReload?: () => void; // optional action button
}

export default function TableHeader({
  title,
  Icon,
  isLoading,
  onReload,
}: TableHeaderProps) {
  return (
    <div className="p-4 border-b border-border flex justify-between items-center bg-background/50 backdrop-blur-sm">
      {/* Left Section - Title */}
      <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
        <Icon className="w-5 h-5 text-primary" />
        {title}
      </h2>

      {/* Right Section - Actions */}
      <div className="flex items-center gap-3">
        {onReload && (
          <button
            onClick={onReload}
            disabled={isLoading}
            className={`p-2 rounded-md hover:bg-muted transition-colors border border-border ${
              !isLoading ? "disabled:opacity-50" : ""
            }`}
          >
            <RefreshCcw
              className={`w-4 h-4 transition-transform cursor-pointer ${
                isLoading
                  ? "animate-spin text-primary"
                  : "text-muted-foreground"
              }`}
            />
          </button>
        )}
      </div>
    </div>
  );
}
