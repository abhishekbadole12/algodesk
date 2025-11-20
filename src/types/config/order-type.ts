//
import { ORDER_TYPE } from "../orders/order.enums";
//

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
