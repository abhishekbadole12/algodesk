import { Loader2 } from "lucide-react";

export default function SidebarFooter({ loading, onClick }) {
  return (
    <div className="px-6 py-4 border-t border-border">
      <button
        onClick={onClick}
        disabled={loading}
        className="w-full bg-primary text-white py-3 rounded-lg uppercase font-bold flex items-center justify-center gap-2"
      >
        {loading && <Loader2 className="animate-spin h-5 w-5" />}
        Place Order
      </button>
    </div>
  );
}
