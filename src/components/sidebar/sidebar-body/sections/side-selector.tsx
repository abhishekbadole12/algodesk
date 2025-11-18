import React from "react";
import Button from "../../button";

export default function SideSelector({form}) {
  const {side, setSide}=form
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-foreground">
        Side
      </label>
      <div className="flex gap-3">
        {["BUY", "SELL"].map((option, index) => (
          <Button key={index} label={option} side={side} setSide={setSide} />
        ))}
      </div>
    </div>
  );
}
