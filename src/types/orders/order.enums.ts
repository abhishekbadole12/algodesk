// types/orders/order.enums.ts

export enum VARIETY {
  NORMAL = "NORMAL",
  AMO = "AMO",
  ROBO = "ROBO",
  STOPLOSS = "STOPLOSS",
}

export enum ORDER_TYPE {
  MARKET = "MARKET",
  LIMIT = "LIMIT",
  STOP_LOSS = "STOP_LOSS",
  STOP_LOSS_MARKET = "STOPLOSS_MARKET",
}

export enum PRODUCT_TYPE {
  INTRADAY = "INTRADAY",
  DELIVERY = "DELIVERY",
  CARRYFORWARD = "CARRYFORWARD",
  MARGIN = "MARGIN",
}

export enum EXCHANGE {
  NSE = "NSE",
  BSE = "BSE",
//   NFO = "NFO",
}

export enum SIDE {
  BUY = "BUY",
  SELL = "SELL",
}
