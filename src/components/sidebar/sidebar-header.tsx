import { LogOut } from "lucide-react";
import Tooltip from "../common/tooltip";
import { logoutUser } from "@/lib/auth/logout";

export default function SidebarHeader() {
  const handleLogout = async () => {
    await logoutUser();
  };

  return (
    <div className="px-6 py-6 border-b border-border">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-linear-to-br from-primary to-primary/60 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">AD</span>
          </div>
          <div>
            <p className="font-bold text-foreground">
              Algo<span className="text-primary">Desk</span>
            </p>
            <p className="text-xs text-muted-foreground">Trading Platform</p>
          </div>
        </div>

        {/* Right: Logout Button */}
        <Tooltip text="Logout" position="bottom">
          <button
            onClick={handleLogout}
            className="p-2 rounded-md hover:bg-accent transition cursor-pointer"
          >
            <LogOut size={18} />
          </button>
        </Tooltip>
      </div>
    </div>
  );
}
