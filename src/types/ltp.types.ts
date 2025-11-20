export interface ILTPRequest {
  mode: "LTP" | "OHLC";
  exchangeTokens: {
    NSE?: string[];
    BSE?: string[];
  };
}

export interface IFetchedLTP {
  exchange: "NSE" | "BSE";
  tradingSymbol: string;
  symbolToken: string;
  ltp: number;
  open?: number;
  high?: number;
  low?: number;
  close?: number;
}

export interface ILTPResponse {
  status: string;
  message: string;
  errorcode: string;
  data: {
    fetched: IFetchedLTP[];
    unfetched: any[];
  };
}