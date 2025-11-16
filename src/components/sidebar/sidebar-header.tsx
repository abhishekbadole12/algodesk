export default function SidebarHeader() {
  return (
    <div className="px-6 py-6 border-b border-border">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-linear-to-br from-primary to-primary/60 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">AD</span>
        </div>
        <div>
          <p className="font-bold text-foreground">
            Algo<span className="text-primary">Desk</span>
          </p>
          <p className="text-xs text-muted-foreground">Trading Platform</p>
        </div>
      </div>
    </div>
  );
}
