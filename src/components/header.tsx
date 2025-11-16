import { User } from "@/types/user";
import { Clock, CheckCircle } from "lucide-react";
import FundsCard from "./FundsCard";

interface HeaderProps {
  isAuthenticated: boolean;
  user?: User | null;
}

export function Header({ isAuthenticated, user }: HeaderProps) {
  const date = new Date();
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const displayName = user?.name || user?.clientId || "User";

  return (
    <header className="bg-card border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Date */}
        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span className="text-sm font-medium">{formattedDate}</span>
        </div>

        {/* Balance & Auth Status */}
        <div className="flex items-center gap-3">
          {/* Welcome Text */}
          {isAuthenticated && (
            <div className="flex flex-col items-end mr-2">
              <p className="text-sm font-semibold">Welcome,</p>
              <p className="text-base font-bold">{displayName}</p>
            </div>
          )}

          {isAuthenticated && (
            <div className="flex items-center gap-2 px-3 py-1 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
              <span className="text-xs font-semibold text-green-600 dark:text-green-400">
                Authenticated
              </span>
            </div>
          )}

          <FundsCard />
        </div>
      </div>
    </header>
  );
}
