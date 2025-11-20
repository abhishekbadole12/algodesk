// types/orders/order.types.ts

import {
  VARIETY,
  ORDER_TYPE,
  PRODUCT_TYPE,
  EXCHANGE,
  SIDE,
} from "./order.enums";

export interface IOrderPayload {
  variety: VARIETY;
  tradingsymbol: string;
  symboltoken: string;
  exchange: EXCHANGE;
  transactiontype: SIDE;
  ordertype: ORDER_TYPE;
  quantity: number;
  producttype: PRODUCT_TYPE;

  price?: number; // only for LIMIT orders
  triggerprice?: number | string;

  squareoff?: string;
  stoploss?: string;
  disclosedquantity?: string;
  duration: "DAY" | "IOC";
  ordertag?: string;
}

interface IOptions {
  label: string;
  value: VARIETY | ORDER_TYPE;
  status: boolean;
}

// Variety Options
export const VARIETY_OPTIONS: IOptions[] = [
  {
    label: "Normal",
    value: VARIETY.NORMAL,
    status: true,
  },
  {
    label: "After Market Order (AMO)",
    value: VARIETY.AMO,
    status: true,
  },
  {
    label: "Robo",
    value: VARIETY.ROBO,
    status: true,
  },
  {
    label: "Stop Loss",
    value: VARIETY.STOPLOSS,
    status: true,
  },
];

// Order Type Options
export const ORDER_TYPE_OPTIONS: IOptions[] = [
  {
    label: "Limit",
    value: ORDER_TYPE.LIMIT,
    status: true,
  },
  {
    label: "Market",
    value: ORDER_TYPE.MARKET,
    status: true,
  },
  {
    label: "Stop Loss",
    value: ORDER_TYPE.STOP_LOSS,
    status: true,
  },
  {
    label: "Stop Loss Market",
    value: ORDER_TYPE.STOP_LOSS_MARKET,
    status: true,
  },
];
