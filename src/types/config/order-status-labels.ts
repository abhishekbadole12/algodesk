import { OrderStatus } from "../enum/order-status.enum";


export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  [OrderStatus.ORDER_PLACED]: "Order Placed",
  [OrderStatus.ORDER_PENDING]: "Pending",
  [OrderStatus.ACTIVE]: "Active",
  [OrderStatus.PARTIALLY_FILLED]: "Partially Filled",
  [OrderStatus.FILLED]: "Filled",
  [OrderStatus.COMPLETED]: "Completed",
  [OrderStatus.REJECTED]: "Rejected",
  [OrderStatus.CANCELLED]: "Cancelled",
};