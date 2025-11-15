'use client'

import { useState } from 'react'
import { Settings, Search, X } from 'lucide-react'

// Mock script data for search dropdown
const scriptsDatabase = [
  { id: 1, symbol: 'BANKNIFTY', exchange: 'NFO', name: 'Bank Nifty Index' },
  { id: 2, symbol: 'NIFTY', exchange: 'NFO', name: 'Nifty 50 Index' },
  { id: 3, symbol: 'TCS', exchange: 'NSE', name: 'Tata Consultancy Services' },
  { id: 4, symbol: 'INFY', exchange: 'NSE', name: 'Infosys Limited' },
  { id: 5, symbol: 'HDFC', exchange: 'NSE', name: 'HDFC Bank Limited' },
  { id: 6, symbol: 'RELIANCE', exchange: 'NSE', name: 'Reliance Industries' },
  { id: 7, symbol: 'MARUTI', exchange: 'BSE', name: 'Maruti Suzuki India' },
  { id: 8, symbol: 'WIPRO', exchange: 'NSE', name: 'Wipro Limited' },
]

export function Sidebar() {
  const [searchInput, setSearchInput] = useState('')
  const [selectedScript, setSelectedScript] = useState(null)
  const [showDropdown, setShowDropdown] = useState(false)
  const [side, setSide] = useState('BUY')
  const [quantity, setQuantity] = useState('50')
  const [orderType, setOrderType] = useState('Limit')
  const [limitPrice, setLimitPrice] = useState('225.50')
  const [algorithm, setAlgorithm] = useState('Target ₹1 / SL ₹1')
  const [target, setTarget] = useState('230')
  const [stopLoss, setStopLoss] = useState('220')

  // Filter scripts based on search input
  const filteredScripts = scriptsDatabase.filter(script =>
    script.symbol.toLowerCase().includes(searchInput.toLowerCase()) ||
    script.name.toLowerCase().includes(searchInput.toLowerCase())
  )

  const handleScriptSelect = (script) => {
    setSelectedScript(script)
    setSearchInput(script.symbol)
    setShowDropdown(false)
  }

  const handleClearScript = () => {
    setSelectedScript(null)
    setSearchInput('')
    setShowDropdown(false)
  }

  return (
    <aside className="w-80 bg-card border-r border-border flex flex-col overflow-y-auto">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-linear-to-br from-primary to-primary/60 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">AD</span>
          </div>
          <div>
            <p className="font-bold text-foreground">Algo<span className="text-primary">Desk</span></p>
            <p className="text-xs text-muted-foreground">Trading Platform</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 px-6 py-6 space-y-6 overflow-y-auto">
        {/* Script Section with Dropdown */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-foreground">Script</label>
          <div className="relative">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                placeholder="Search script..."
                value={searchInput}
                onChange={(e) => {
                  setSearchInput(e.target.value)
                  setShowDropdown(true)
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
                        <p className="font-semibold text-foreground text-sm">{script.symbol}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{script.name}</p>
                      </div>
                      <span className={`text-xs font-bold px-2 py-1 rounded ml-2 whitespace-nowrap ${
                        script.exchange === 'NFO' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                        script.exchange === 'BSE' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' :
                        'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                      }`}>
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
                    <p className="font-semibold text-foreground text-sm">{selectedScript.symbol}</p>
                    <p className="text-xs text-muted-foreground">{selectedScript.name}</p>
                  </div>
                  <span className={`text-xs font-bold px-2 py-1 rounded ${
                    selectedScript.exchange === 'NFO' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                    selectedScript.exchange === 'BSE' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' :
                    'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                  }`}>
                    {selectedScript.exchange}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Side Selection */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-foreground">Side</label>
          <div className="flex gap-3">
            {['BUY', 'SELL'].map((option) => (
              <button
                key={option}
                onClick={() => setSide(option)}
                className={`flex-1 py-2 px-3 rounded-lg font-semibold text-sm transition-all ${
                  side === option
                    ? option === 'BUY'
                      ? 'bg-green-600 text-white'
                      : 'bg-red-600 text-white'
                    : 'bg-background border border-border text-foreground hover:border-primary'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-foreground">Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="e.g. 50"
            className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground"
          />
        </div>

        {/* Order Type */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-foreground">Order Type</label>
          <select
            value={orderType}
            onChange={(e) => setOrderType(e.target.value)}
            className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground appearance-none cursor-pointer"
          >
            <option>Limit</option>
            <option>Market</option>
            <option>Stop</option>
          </select>
        </div>

        {/* Limit Price */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-foreground flex items-center gap-2">
            Limit Price
            <button className="text-muted-foreground hover:text-foreground" title="Set price limit">
              <Settings className="w-3 h-3" />
            </button>
          </label>
          <input
            type="number"
            value={limitPrice}
            onChange={(e) => setLimitPrice(e.target.value)}
            placeholder="e.g. 225.50"
            className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground"
          />
        </div>

        {/* Algorithm */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-foreground">Algorithm</label>
          <select
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value)}
            className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground appearance-none cursor-pointer"
          >
            <option>Target ₹1 / SL ₹1</option>
            <option>VWAP</option>
            <option>DMA</option>
          </select>
        </div>

        {/* Target & Stop Loss */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-foreground">Target</label>
            <input
              type="number"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder="e.g. 230"
              className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-foreground">Stop Loss</label>
            <input
              type="number"
              value={stopLoss}
              onChange={(e) => setStopLoss(e.target.value)}
              placeholder="e.g. 220"
              className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground"
            />
          </div>
        </div>
      </div>

      {/* Place Order Button */}
      <div className="px-6 py-4 border-t border-border">
        <button className="w-full bg-linear-to-r from-primary to-primary/80 text-primary-foreground font-bold py-3 rounded-lg hover:shadow-lg transition-shadow text-sm uppercase tracking-wide">
          Place Order
        </button>
      </div>
    </aside>
  )
}
