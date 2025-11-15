export interface TradeLeg {
  id: string
  type: string
  price: number
  status: string
  time: string
}

export interface ActiveTrade {
  id: number
  symbol: string
  exchange: string
  side: string
  quantity: number
  orderType: string
  entryPrice: number
  status: string
  time: string
  pnl: number
  pnlPercent: number
  legs: TradeLeg[]
}