export const activeTrades = [
  {
    id: 1,
    symbol: 'BANKNIFTY',
    exchange: 'NFO',
    side: 'BUY',
    quantity: 50,
    orderType: 'Limit',
    entryPrice: 220.50,
    status: 'executed',
    time: '10:30 AM',
    pnl: 450,
    pnlPercent: 2.45,
    legs: [
      { id: 'leg1', type: 'Entry', price: 220.50, status: 'executed', time: '10:30 AM' },
      { id: 'leg2', type: 'Target', price: 230.00, status: 'pending', time: '-' },
      { id: 'leg3', type: 'Stop Loss', price: 215.00, status: 'pending', time: '-' },
    ]
  },
  {
    id: 2,
    symbol: 'NIFTY',
    exchange: 'NFO',
    side: 'SELL',
    quantity: 100,
    orderType: 'Market',
    entryPrice: 230.25,
    status: 'pending',
    time: '11:15 AM',
    pnl: -150,
    pnlPercent: -0.65,
    legs: [
      { id: 'leg1', type: 'Entry', price: 230.25, status: 'pending', time: '11:15 AM' },
      { id: 'leg2', type: 'Target', price: 225.00, status: 'pending', time: '-' },
      { id: 'leg3', type: 'Stop Loss', price: 235.00, status: 'pending', time: '-' },
    ]
  },
  {
    id: 3,
    symbol: 'TCS',
    exchange: 'NSE',
    side: 'BUY',
    quantity: 75,
    orderType: 'Limit',
    entryPrice: 225.00,
    status: 'executed',
    time: '1:45 PM',
    pnl: 825,
    pnlPercent: 4.55,
    legs: [
      { id: 'leg1', type: 'Entry', price: 225.00, status: 'executed', time: '1:45 PM' },
      { id: 'leg2', type: 'Target', price: 235.00, status: 'executed', time: '2:30 PM' },
      { id: 'leg3', type: 'Stop Loss', price: 220.00, status: 'pending', time: '-' },
    ]
  },
]