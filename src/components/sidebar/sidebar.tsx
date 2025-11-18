"use client";

import { useState } from "react";
//
import SidebarHeader from "./sidebar-header";
import SidebarFooter from "./sidebar-footer";
//
// import { useInstrumentSearch } from "@/hooks/useInstrumentSearch";
//
import SidebarBody from "./sidebar-body/sidebar-body";
import { useSidebarForm } from "@/hooks/useSidebarForm";
import { usePlaceOrder } from "@/hooks/usePlaceTrade";
import { useOrderPayload } from "@/hooks/useOrderPayload";
//

export default function Sidebar() {
  const form = useSidebarForm();

  const { placeOrder, loading } = usePlaceOrder();

  const orderPayload = useOrderPayload(form);

  const handlePlaceOrder = async () => {
  if (!orderPayload) return alert("Select script first");

  await placeOrder(orderPayload);
};

  return (
    <aside className="w-80 bg-card border-r border-border flex flex-col overflow-y-auto">
      <SidebarHeader />

      {/* Form */}
      <SidebarBody form={form} />

      {/* Place Order Button */}
      <SidebarFooter loading={loading} onClick={handlePlaceOrder} />
    </aside>
  );
}
