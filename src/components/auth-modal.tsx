'use client'

import { useState } from 'react'
import { X, Lock, Mail } from 'lucide-react'

export function AuthModal({ isOpen, onClose, onAuthSuccess }) {
  const [step, setStep] = useState('login') // 'login' | 'otp'
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLoginSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      setStep('otp')
    }, 1000)
  }

  const handleOtpSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      onAuthSuccess()
      setStep('login')
      setEmail('')
      setOtp('')
    }, 1000)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      {/* Modal Container */}
      <div className="bg-card border border-border rounded-xl shadow-2xl w-full max-w-md p-8 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'login' ? (
          <>
            {/* Login Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">Welcome Back</h1>
              <p className="text-muted-foreground text-sm">Sign in to your AlgoDesk account</p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white font-semibold py-2 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 cursor-disabled"
              >
                {loading ? 'Sending OTP...' : 'Continue'}
              </button>
            </form>

            {/* Footer */}
            <p className="text-center text-xs text-muted-foreground mt-6">
              By signing in, you agree to our Terms of Service and Privacy Policy
            </p>
          </>
        ) : (
          <>
            {/* OTP Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">Verify OTP</h1>
              <p className="text-muted-foreground text-sm">We've sent a code to {email}</p>
            </div>

            {/* OTP Form */}
            <form onSubmit={handleOtpSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">OTP Code</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="000000"
                    maxLength="6"
                    className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-center text-2xl tracking-widest font-mono"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || otp.length !== 6}
                className="w-full bg-primary text-white font-semibold py-2 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {loading ? 'Verifying...' : 'Verify OTP'}
              </button>

              <button
                type="button"
                onClick={() => setStep('login')}
                className="w-full text-primary font-semibold py-2 rounded-lg hover:bg-primary/10 transition-colors"
              >
                Back to Login
              </button>
            </form>

            {/* Resend OTP */}
            <p className="text-center text-xs text-muted-foreground mt-6">
              Didn't receive the code? <button className="text-primary hover:underline font-semibold">Resend</button>
            </p>
          </>
        )}
      </div>
    </div>
  )
}
