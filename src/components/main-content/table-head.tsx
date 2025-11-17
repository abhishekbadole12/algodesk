export default function TableHead({ columns }: { columns: string[] }) {
  return (
    <thead>
      <tr className="border-b border-border bg-background/50">
        {columns.map((col) => (
          <th
            key={col}
            className="text-left py-3 px-3 text-muted-foreground font-semibold"
          >
            {col}
          </th>
        ))}
      </tr>
    </thead>
  );
}