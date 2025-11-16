"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
//
import Button from "./button";
import SidebarHeader from "./sidebar-header";
import SidebarFooter from "./sidebar-footer";
//
import FormInput from "../common/form/form-input";
import FormSelect from "../common/form/form-select";
//
import { scriptsDatabase } from "@/data/dummy/instruments.mock";
//

export default function Sidebar() {
  const [searchInput, setSearchInput] = useState("");
  const [selectedScript, setSelectedScript] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [side, setSide] = useState("BUY");
  const [quantity, setQuantity] = useState("50");
  const [orderType, setOrderType] = useState("Limit");
  const [limitPrice, setLimitPrice] = useState("225.50");
  const [algorithm, setAlgorithm] = useState("Target ₹1 / SL ₹1");
  const [target, setTarget] = useState("230");
  const [stopLoss, setStopLoss] = useState("220");

  // Filter scripts based on search input
  const filteredScripts = scriptsDatabase.filter(
    (script) =>
      script.symbol.toLowerCase().includes(searchInput.toLowerCase()) ||
      script.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  const handleScriptSelect = (script) => {
    setSelectedScript(script);
    setSearchInput(script.symbol);
    setShowDropdown(false);
  };

  const handleClearScript = () => {
    setSelectedScript(null);
    setSearchInput("");
    setShowDropdown(false);
  };

  const handleTradeButtonClick = () => {
    console.log("Trade button clicked");
  };

  return (
    <aside className="w-80 bg-card border-r border-border flex flex-col overflow-y-auto">
      <SidebarHeader />

      {/* Form */}
      <div className="flex-1 px-6 py-6 space-y-6 overflow-y-auto">
        {/* Script Section with Dropdown */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-foreground">
            Script
          </label>
          <div className="relative">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                placeholder="Search script..."
                value={searchInput}
                onChange={(e) => {
                  setSearchInput(e.target.value);
                  setShowDropdown(true);
                }}
                onFocus={() => setShowDropdown(true)}
                className="w-full pl-9 pr-8 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground"
              />
              {selectedScript && (
                <button
                  onClick={handleClearScript}
                  className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {showDropdown && filteredScripts.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
                {filteredScripts.map((script) => (
                  <button
                    key={script.id}
                    onClick={() => handleScriptSelect(script)}
                    className="w-full text-left px-4 py-3 hover:bg-background border-b border-border last:border-b-0 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-semibold text-foreground text-sm">
                          {script.symbol}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {script.name}
                        </p>
                      </div>
                      <span
                        className={`text-xs font-bold px-2 py-1 rounded ml-2 whitespace-nowrap ${
                          script.exchange === "NFO"
                            ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                            : script.exchange === "BSE"
                            ? "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
                            : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        }`}
                      >
                        {script.exchange}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Show selected script info */}
            {selectedScript && !showDropdown && (
              <div className="mt-2 p-3 bg-background border border-border rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-foreground text-sm">
                      {selectedScript.symbol}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {selectedScript.name}
                    </p>
                  </div>
                  <span
                    className={`text-xs font-bold px-2 py-1 rounded ${
                      selectedScript.exchange === "NFO"
                        ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                        : selectedScript.exchange === "BSE"
                        ? "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
                        : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                    }`}
                  >
                    {selectedScript.exchange}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Side Selection */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-foreground">
            Side
          </label>
          <div className="flex gap-3">
            {["BUY", "SELL"].map((option, index) => (
              <Button
                key={index}
                label={option}
                side={side}
                setSide={setSide}
              />
            ))}
          </div>
        </div>

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
          options={["Limit", "Market", "Stop"]}
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
          onChange={(e) => setAlgorithm(e.target.value)}
          options={["Target ₹1 / SL ₹1", "VWAP", "DMA"]}
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

      {/* Place Order Button */}
      <SidebarFooter onclick={() => handleTradeButtonClick()} />
    </aside>
  );
}
