import { TradeBookItem } from "./orders/tradebook.types";

export interface TradeLeg {
  id: string;
  type: string;
  price: number;
  status: string;
  time: string;
}

export interface ActiveTrade {
  id: number;
  symbol: string;
  exchange: string;
  side: string;
  quantity: number;
  orderType: string;
  entryPrice: number;
  status: string;
  time: string;
  pnl: number;
  pnlPercent: number;
  legs: TradeLeg[];
}

export interface ITrade {
  SEC_ID: string;
  SETTLOR: string;
  ENTRY_OBJ: TradeBookItem[] | null;
  EXIT_OBJ: TradeBookItem[] | null;
  PNL: number;
  PNL_PERCENT: number;
  STATUS: "OPEN" | "CLOSED" | "PARTIAL";
  DIRECTION: "LONG" | "SHORT";
  TRADE_DURATION: string| null;
  LEGS: TradeBookItem[];
}
