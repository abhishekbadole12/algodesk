"use client";

import React, { useState } from "react";

interface TooltipProps {
  text: string;
  children: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
}

export default function Tooltip({
  text,
  children,
  position = "top",
}: TooltipProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}

      {visible && (
        <div
          className={`
            absolute z-50 px-2 py-1 text-xs font-semibold rounded-md
            bg-neutral-800 backdrop-blur-sm
            border border-border shadow-lg
            text-muted-foreground
            whitespace-nowrap transition-opacity duration-150
            ${
              position === "top" && "bottom-full mb-2 left-1/2 -translate-x-1/2"
            }
            ${
              position === "bottom" && "top-full mt-2 left-1/2 -translate-x-1/2"
            }
            ${position === "left" && "right-full mr-2 top-1/2 -translate-y-1/2"}
            ${position === "right" && "left-full ml-2 top-1/2 -translate-y-1/2"}
          `}
        >
          {text}
        </div>
      )}
    </div>
  );
}
