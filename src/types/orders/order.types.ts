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

  price?: number;  // only for LIMIT orders
  triggerprice?: number | string;

  squareoff?: string;
  stoploss?: string;
  disclosedquantity?: string;
  duration: "DAY" | "IOC";
  ordertag?: string;
}
