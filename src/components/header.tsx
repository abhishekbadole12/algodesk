import { Clock, IndianRupee, CheckCircle } from 'lucide-react'

export function Header({ isAuthenticated }) {
  const date = new Date()
  const formattedDate = date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  })

  return (
    <header className="bg-card border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Date */}
        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span className="text-sm font-medium">{formattedDate}</span>
        </div>

        {/* Balance & Auth Status */}
        <div className="flex items-center gap-3">
          {isAuthenticated && (
            <div className="flex items-center gap-2 px-3 py-1 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
              <span className="text-xs font-semibold text-green-600 dark:text-green-400">Authenticated</span>
            </div>
          )}
          
          <div className="flex items-center gap-3 bg-primary/10 px-4 py-2 rounded-lg">
            <IndianRupee className="w-5 h-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Total Balance</p>
              <p className="text-lg font-bold text-primary">₹1,192.60</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
