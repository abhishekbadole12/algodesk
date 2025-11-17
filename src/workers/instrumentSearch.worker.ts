export default {} as unknown as Worker;

self.onmessage = (e) => {
  const { data, query } = e.data;

  if (!query.trim()) {
    self.postMessage([]);
    return;
  }

  const parts = query.toUpperCase().trim().split(" ");

  const matched = data.filter((item: any) => {
    const combined = [
      item.tradingSymbol,
      item.name,
      item.exchange,
      item.expiry,
    ]
      .filter(Boolean)
      .join(" ")
      .toUpperCase();

    return parts.every((p: string) => combined.includes(p));
  });

  const equities = matched.filter(
    (i: any) =>
      ["EQ", "EQUITY"].includes(i.instrumentType?.toUpperCase()) &&
      ["NSE", "BSE"].includes(i.exchange?.toUpperCase())
  );

  const options = matched.filter(
    (i: any) =>
      i.exchange?.toUpperCase() === "NFO" &&
      ["CE", "PE", "OPTIDX", "OPTSTK"].includes(i.instrumentType?.toUpperCase())
  );

  // sort options by expiry
  options.sort((a: any, b: any) => {
    if (!a.expiry || !b.expiry) return 0;
    return new Date(a.expiry).getTime() - new Date(b.expiry).getTime();
  });

  const ordered = [...equities, ...options];

  // remove duplicates
  const unique = Array.from(
    new Map(ordered.map((i: any) => [i.exchangeToken, i])).values()
  );

  self.postMessage(unique.slice(0, 50));
};