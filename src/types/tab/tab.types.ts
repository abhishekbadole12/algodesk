//
import { CheckCircle, Eye, ListTodo, Play } from "lucide-react";
//
import { Tabs } from "./tab.enums";
//

interface IOptions {
  label: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  status: boolean;
}

export const TAB_META: Record<Tabs, IOptions> = {
  [Tabs.ACTIVE]: {
    label: "Active Trades",
    Icon: Play,
    status: true,
  },
  [Tabs.COMPLETED]: {
    label: "Completed Trades",
    Icon: CheckCircle,
    status: true,
  },
  [Tabs.PENDING]: {
    label: "Pending Orders",
    Icon: ListTodo,
    status: false,
  },
  [Tabs.WATCHLIST]: {
    label: "Watchlist",
    Icon: Eye,
    status: false,
  },
};
