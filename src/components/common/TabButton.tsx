

export default function TabButton({ label, icon: Icon, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
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