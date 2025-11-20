//
import { SIDE } from "@/types/order/order.enums";
//

interface ButtonProps {
  label: SIDE;
  value: SIDE;
  onClick: () => void;
}

export default function Button({ label, value, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 py-2 px-3 rounded-lg font-semibold text-sm transition-all border cursor-pointer ${
        value === label
          ? label === "BUY"
            ? "bg-green-600 text-white"
            : "bg-red-600 text-white"
          : "bg-background border-border text-foreground hover:border-primary"
      }`}
    >
      {label}
    </button>
  );
}
