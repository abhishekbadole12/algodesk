import { OrderType } from "../enum/order-type.enum";

export const ORDER_TYPE_OPTIONS: { code: OrderType; label: string }[] = [
  {
    code: OrderType.LIMIT,
    label: "Limit",
  },
  {
    code: OrderType.MARKET,
    label: "Market",
  },
  {
    code: OrderType.STOP,
    label: "Stop",
  },
];