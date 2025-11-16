import { Play, CheckCircle, ListTodo, Eye } from "lucide-react";
//
import { Tabs } from "./tabs.enum";

//

export const TAB_META = {
  [Tabs.ACTIVE]: {
    label: "Active Trades",
    icon: Play,
  },
  [Tabs.COMPLETED]: {
    label: "Completed Trades",
    icon: CheckCircle,
  },
  [Tabs.PENDING]: {
    label: "Pending Orders",
    icon: ListTodo,
  },
  [Tabs.WATCHLIST]: {
    label: "Watchlist",
    icon: Eye,
  },
};
