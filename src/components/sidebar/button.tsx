import React from "react";

interface ButtonProps {
  label: "BUY" | "SELL" | string;
  side: string;
  setSide: (value: string) => void;
}

export default function Button({ label, side, setSide }: ButtonProps) {
  return (
    <button
      onClick={() => setSide(label)}
      className={`flex-1 py-2 px-3 rounded-lg font-semibold text-sm transition-all border cursor-pointer ${
        side === label
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
