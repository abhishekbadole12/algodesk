import React from "react";
import Button from "../button";
import FormInput from "../../common/form/form-input";
import FormSelect from "../../common/form/form-select";
import { AlgorithmCode } from "@/types/enum/algorithm.enum";
//
import ScriptSelector from "./sections/script-selector";
import SideSelector from "./sections/side-selector";
import { ORDER_TYPE_OPTIONS } from "@/types/config/order-type";
import { ALGORITHM_PRESETS } from "@/constant/algorithm";

export default function SidebarBody({ form }) {
  const {
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
  } = form;

  return (
    <div className="flex-1 px-6 py-6 space-y-6 overflow-y-auto">
      {/* Script Section with Dropdown */}
      <ScriptSelector form={form}/>

      <SideSelector form={form} />

      {/* Quantity */}
      <FormInput
        label="Quantity"
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        placeholder="e.g. 50"
      />

      {/* Order Type */}
      <FormSelect
        label="Order Type"
        value={orderType}
        onChange={(e) => setOrderType(e.target.value)}
        options={ORDER_TYPE_OPTIONS}
      />

      {/* Limit Price */}
      <FormInput
        label="Limit Price"
        type="number"
        value={limitPrice}
        onChange={(e) => setLimitPrice(e.target.value)}
        placeholder="e.g. 225.50"
      />

      {/* Algorithm */}
      <FormSelect
        label="Algorithm"
        value={algorithm}
        onChange={(e) => setAlgorithm(e.target.value as AlgorithmCode)}
        options={ALGORITHM_PRESETS}
      />

      {/* Target & Stop Loss */}
      <div className="grid grid-cols-2 gap-3">
        <FormInput
          label="Target"
          type="number"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          placeholder="e.g. 230"
        />

        <FormInput
          label="Stop Loss"
          type="number"
          value={stopLoss}
          onChange={(e) => setStopLoss(e.target.value)}
          placeholder="e.g. 220"
        />
      </div>
    </div>
  );
}
