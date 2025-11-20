export function getPriceChangeStats(ltp: number, open: number) {
  if (ltp == null || open == null) return { change: 0, percent: 0, isUp: true };

  const change = ltp - open;          // Correct calculation
  const percent = (change / open) * 100;

  return {
    change: Number(change.toFixed(2)),
    percent: Number(percent.toFixed(2)),
    isUp: change >= 0,
  };
}