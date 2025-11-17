export interface TradeBookResponse {
  status: boolean;
  message: string;
  errorcode: string;
  data: TradeBookItem[] | null;
}

export interface TradeBookItem {
  ALGO_ID: string;
  BUY_SELL: "BUY" | "SELL";
  CLIENT_ID: string;
  ENCASH_FLG: "Y" | "N";
  EXCHANGE: "NSE" | "BSE";
  EXCH_ORDER_NUMBER: string;
  EXPIRY_DATE: string;
  FULL_SYMBOL: string;
  GTC_FLG: "Y" | "N";
  INSTRUMENT_NAME: string;
  MKT_PROTECT_FLG: "Y" | "N";
  MKT_PROTECT_VAL: number;
  MKT_TYPE: string;
  OPT_TYPE: string;
  ORDER_DATE_TIME: string;
  ORDER_NUMBER: string;
  ORDER_TYPE: string;
  PAN_NO: string;
  PARTICIPANT_TYPE: string;
  PRICE: number;
  PRODUCT: string;
  QUANTITY: number;
  R: number;
  REMARKS1: string;
  REMARKS2: string;
  SEC_ID: string;
  SEGMENT: string;
  SETTLOR: string;
  SOURCE_FLG: string;
  STRIKE_PRICE: number;
  SYMBOL: string;
  TRADE_NUMBER: string;
  TRADE_VALUE: number;
}
