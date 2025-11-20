// hooks/useSidebarForm.ts

import { useState } from "react";
//
import { Algorithm } from "@/types/enum/algorithm.enum";
import { ORDER_TYPE, SIDE } from "@/types/orders/order.enums";
//

export function useSidebarForm() {
  /**
   * -----------------------------
   * 🔹 UI State (Not part of form)
   * -----------------------------
   */
  const [search, setSearch] = useState({
    query: "",
    dropdownOpen: false,
  });

  /**
   * -----------------------------
   * 🔹 Trade Form State
   * -----------------------------
   */
  const [trade, setTrade] = useState({
    side: SIDE.BUY,
    quantity: "",
    ordertype: ORDER_TYPE.LIMIT,
    price: "",
    selectedScript: null as any,
  });

  /**
   * -----------------------------
   * 🔹 Algorithm Config State
   * -----------------------------
   */
  const [algo, setAlgo] = useState({
    code: Algorithm.TARGET_1_STOPLOSS_1,
    target: "",
    stopLoss: "",
  });

  /**
   * -----------------------------
   * 🔹 Helper Setters (Cleaner API)
   * -----------------------------
   */
  const updateTrade = (field: string, value: any) =>
    setTrade((prev) => ({ ...prev, [field]: value }));

  const updateAlgo = (field: string, value: any) =>
    setAlgo((prev) => ({ ...prev, [field]: value }));

  const updateSearch = (field: string, value: any) =>
    setSearch((prev) => ({ ...prev, [field]: value }));

  return {
    // state
    search,
    trade,
    algo,

    // setters
    updateTrade,
    updateAlgo,
    updateSearch,
  };
}
