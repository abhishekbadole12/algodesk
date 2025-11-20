//
//
import FormInput from "../../common/form/form-input";
import FormSelect from "../../common/form/form-select";
import ScriptSelector from "./sections/script-selector";
import SideSelector from "./sections/side-selector";
//
import { ALGORITHM_PRESETS } from "@/constant/algorithm";
//
import { ORDER_TYPE_OPTIONS } from "@/types/config/order-type";
import { Algorithm } from "@/types/enum/algorithm.enum";
//

export default function SidebarBody({ form }: any) {
  const {
    // state
    trade,
    algo,

    // setters
    updateTrade,
    updateAlgo,
  } = form;

  return (
    <div className="flex-1 px-6 py-6 space-y-6 overflow-y-auto">
      {/* Script Section with Dropdown */}
      <ScriptSelector form={form} />

      {/* BUY / SELL */}
      <SideSelector form={form} />

      {/* Quantity */}
      <FormInput
        label="Quantity"
        name="quantity"
        type="number"
        value={trade.quantity}
        onChange={(e) => updateTrade("quantity", e.target.value)}
        placeholder="e.g. 50"
      />

      {/* Order Type */}
      <FormSelect
        label="Order Type"
        // name=""
        value={trade.ordertype}
        onChange={(e) => updateTrade("ordertype", e.target.value)}
        options={ORDER_TYPE_OPTIONS}
      />

      {/* Price */}
      <FormInput
        label="Price"
        name="price"
        type="number"
        value={trade.price}
        onChange={(e) => updateTrade("price", e.target.value)}
        placeholder="e.g. 225.50"
      />

      {/* Algorithm */}
      <FormSelect
        label="Algorithm"
        // name="algorithm"
        value={algo.code}
        onChange={(e) => updateAlgo("code", e.target.value as Algorithm)}
        options={ALGORITHM_PRESETS}
      />

      {/* Target & Stop Loss */}
      <div className="grid grid-cols-2 gap-3">
        <FormInput
          label="Target"
          type="number"
          name="target"
          value={algo.target}
          onChange={(e) => updateAlgo("target", e.target.value)}
          placeholder="e.g. 230"
        />

        <FormInput
          label="Stop Loss"
          type="number"
          name="stoploss"
          value={algo.stoploss}
          onChange={(e) => updateAlgo("stoploss", e.target.value)}
          placeholder="e.g. 220"
        />
      </div>
    </div>
  );
}
