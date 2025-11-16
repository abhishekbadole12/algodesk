interface TabButtonProps {
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  isActive: boolean;
  onClick: () => void;
}

export default function TabButton({
  label,
  icon: Icon,
  isActive,
  onClick,
}: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all cursor-pointer ${
        isActive
          ? "bg-primary text-white"
          : "bg-background text-muted-foreground hover:text-foreground hover:bg-background/80"
      }`}
    >
      <Icon className="w-4 h-4" />
      {label}
    </button>
  );
}
