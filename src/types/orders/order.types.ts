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

// Variety Options
export const VARIETY_OPTIONS: { label: string; value: VARIETY }[] = [
  {
    label: "Normal",
    value: VARIETY.NORMAL,
  },
  {
    label: "After Market Order (AMO)",
    value: VARIETY.AMO,
  },
  {
    label: "Robo",
    value: VARIETY.ROBO,
  },
  {
    label: "Stop Loss",
    value: VARIETY.STOPLOSS,
  },
];

// Order Type Options
export const ORDER_TYPE_OPTIONS: { label: string; value: ORDER_TYPE }[] = [
  {
    label: "Limit",
    value: ORDER_TYPE.LIMIT,
  },
  {
    label: "Market",
    value: ORDER_TYPE.MARKET,
  },
  {
    label: "Stop Loss",
    value: ORDER_TYPE.STOP_LOSS,
  },
  {
    label: "Stop Loss Market",
    value: ORDER_TYPE.STOP_LOSS_MARKET,
  },
];

export const PRODUCT_TYPE_OPTIONS = Object.values(PRODUCT_TYPE).map(
  (value) => ({
    label: value,
    value: value,
  })
);

export const EXCHANGE_OPTIONS = Object.values(EXCHANGE).map((value) => ({
  label: value,
  value: value,
}));

export const SIDE_OPTIONS = Object.values(SIDE).map((value) => ({
  label: value,
  value: value,
}));
