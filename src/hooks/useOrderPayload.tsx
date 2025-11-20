//
import { useEffect, useState } from "react";
//
import { PRODUCT_TYPE, VARIETY } from "@/types/orders/order.enums";
import { IOrderPayload } from "@/types/orders/order.types";
//

export function useOrderPayload(form: any) {
  const [orderPayload, setOrderPayload] = useState<IOrderPayload | null>(null);

  useEffect(() => {
    if (!form.selectedScript) return;

    setOrderPayload({
      variety: VARIETY.NORMAL,
      tradingsymbol: form.selectedScript.tradingSymbol,
      symboltoken: form.selectedScript.exchangeToken,
      exchange: form.selectedScript.exchange,
      transactiontype: form.side,
      ordertype: form.orderType,
      quantity: Number(form.quantity),
      price: form.orderType === "LIMIT" ? Number(form.limitPrice) : undefined,
      triggerprice: "0",
      squareoff: "0",
      stoploss: form.stoploss ? form.limitPrice : "0",
      duration: "DAY",
      producttype: PRODUCT_TYPE.INTRADAY,
      disclosedquantity: "0",
      ordertag:""
    });
  }, [
    form.selectedScript,
    form.side,
    form.orderType,
    form.quantity,
    form.limitPrice,
  ]);

  return orderPayload;
}
