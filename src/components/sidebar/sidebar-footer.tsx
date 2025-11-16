export default function SidebarFooter({ onclick }) {
  return (
    <div className="px-6 py-4 border-t border-border">
      <button
        onClick={onclick}
        className="w-full bg-linear-to-r from-primary to-primary/80 text-primary-foreground font-bold py-3 rounded-lg cursor-pointer hover:shadow-lg transition-shadow text-sm uppercase tracking-wide"
      >
        Place Order
      </button>
    </div>
  );
}
