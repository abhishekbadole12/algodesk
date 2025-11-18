// hooks/useSidebarForm.ts
import { useState } from "react";
import { AlgorithmCode } from "@/types/enum/algorithm.enum";

export function useSidebarForm() {
  const [searchInput, setSearchInput] = useState("");
  const [selectedScript, setSelectedScript] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const [side, setSide] = useState("BUY");
  const [quantity, setQuantity] = useState("");
  const [orderType, setOrderType] = useState("LIMIT");
  const [limitPrice, setLimitPrice] = useState("");
//   const [variety, setVariety] = useState("NORMAL");

  const [algorithm, setAlgorithm] = useState<AlgorithmCode>(
    AlgorithmCode.TARGET_1_STOPLOSS_1
  );

  const [target, setTarget] = useState("");
  const [stopLoss, setStopLoss] = useState("");

  return {
    searchInput,
    setSearchInput,
    selectedScript,
    setSelectedScript,
    showDropdown,
    setShowDropdown,

    side,
    setSide,
    quantity,
    setQuantity,
    orderType,
    setOrderType,
    limitPrice,
    setLimitPrice,
    algorithm,
    setAlgorithm,
    target,
    setTarget,
    stopLoss,
    setStopLoss,
    // variety,
    // setVariety,
  };
}
