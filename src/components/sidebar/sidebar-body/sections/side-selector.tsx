//
import Button from "../../button";
//
import { SIDE } from "@/types/order/order.enums";
//

const options = [
  {
    id: 1,
    value: SIDE.BUY,
  },
  { id: 2, value: SIDE.SELL },
];

export default function SideSelector({ form }: any) {
  const { trade, updateTrade } = form;

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-foreground">
        Side
      </label>

      <div className="flex gap-3">
        {options.map((option) => (
          <Button
            key={option.id}
            label={option.value}
            value={trade.side}
            onClick={() => updateTrade("side", option.value)}
          />
        ))}
      </div>
    </div>
  );
}
