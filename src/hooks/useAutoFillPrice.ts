import { ALGORITHM_PRESETS } from "@/types/config/algorithm-presets";
import { useRef, useEffect } from "react";

export function useAutoFillPrice(form, ltp) {
  const lastTokenRef = useRef<string | null>(null);

  useEffect(() => {
    if (!form.selectedScript) return;
    if (ltp == null) return;

    const token = form.selectedScript.exchangeToken;

    // Prevent repeated execution for the same script
    if (lastTokenRef.current === token) return;

    // --- AUTO-APPLY ONLY ONCE PER SCRIPT ---
    if (!form.isLimitPriceTouched) {
      form.setLimitPrice(ltp.toString());
    }

    // --- AUTO APPLY ALGO TARGET & STOPLOSS ---
    const preset = ALGORITHM_PRESETS.find((p) => p.code === form.algorithm);

    if (preset && preset.code !== "CUSTOM") {
      form.setTarget((ltp + preset.target).toFixed(2));
      form.setStopLoss((ltp - preset.stoploss).toFixed(2));
    }

    lastTokenRef.current = token;
  }, [form.selectedScript?.exchangeToken, ltp, form.algorithm]);
}
