export default function TableHeader({
  title,
  Icon,
}: {
  title: string;
  Icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="p-4 border-b border-border">
      <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
        <Icon className="w-5 h-5 text-primary" />
        {title}
      </h2>
    </div>
  );
}
