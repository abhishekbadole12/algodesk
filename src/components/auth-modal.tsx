"use client";

import { FormEvent, useState } from "react";
import { X, Lock, Mail } from "lucide-react";
//
import { useAuth } from "@/context/AuthContext";
//
import { AUTH_STEPS, AuthStep } from "@/constant/authSteps";
//

type LoginFormValues = {
  clientCode: string;
  password: string;
};
interface AuthModalProps {
  isOpen: boolean;
}

export default function AuthModal({ isOpen }: AuthModalProps) {
  const { login, verifyOtp, logout } = useAuth();

  const [step, setStep] = useState<AuthStep>(AUTH_STEPS.LOGIN);
  const [formData, setFormData] = useState<LoginFormValues>({
    clientCode: "",
    password: "",
  }); // 1st Form state
  const [otp, setOtp] = useState(""); // 2nd Form State
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // -----------------------------
  // LOGIN HANDLER - using AuthContext
  // -----------------------------
  const handleLoginSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const { status, message } = await login(formData);

    if (!status) {
      setLoading(false);
      console.log(message);
      return;
    }

    // Login success → move to OTP step
    setMessage(message);
    setStep(AUTH_STEPS.OTP);
    setLoading(false);
  };

  // -----------------------------
  // OTP HANDLER - using AuthContext
  // -----------------------------
  const handleOtpSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const { status, message } = await verifyOtp(otp);

    if (!status) {
      setLoading(false);
      console.log(message);
      return;
    }

    // OTP success → Authenticated successfully
    setMessage("");
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      {/* Modal Container */}
      <div className="bg-card border border-border rounded-xl shadow-2xl w-full max-w-md p-8 relative">
        {/* Close Button */}
        {/* <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-5 h-5" />
        </button> */}

        {/* -------------------- LOGIN STEP -------------------- */}
        {step === AUTH_STEPS.LOGIN && (
          <>
            {/* Login Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Welcome Back
              </h1>
              <p className="text-muted-foreground text-sm">
                Sign in to your AlgoDesk account
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Mobile Number / Client Code
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <input
                    type="number"
                    name="clientCode"
                    value={formData.clientCode}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }))
                    }
                    placeholder="9177XXXX08"
                    className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }))
                    }
                    placeholder="XXXXXX"
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
                {loading ? "Sending OTP..." : "Continue"}
              </button>
            </form>

            {/* Footer */}
            <p className="text-center text-xs text-muted-foreground mt-6">
              By signing in, you agree to our Terms of Service and Privacy
              Policy
            </p>
          </>
        )}

        {/* -------------------- OTP STEP -------------------- */}
        {step === AUTH_STEPS.OTP && (
          <>
            {/* OTP Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Verify OTP
              </h1>
              <p className="text-muted-foreground text-sm">{message}</p>
            </div>

            {/* OTP Form */}
            <form onSubmit={handleOtpSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  OTP Code
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-4 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) =>
                      setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                    }
                    placeholder="000000"
                    maxLength={6}
                    className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-center text-2xl tracking-widest font-mono"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                // disabled={loading || otp.length < 3}
                className="w-full bg-primary text-white font-semibold py-2 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>

              <button
                type="button"
                onClick={() => setStep(AUTH_STEPS.LOGIN)}
                className="w-full text-primary font-semibold py-2 rounded-lg hover:bg-primary/10 transition-colors"
              >
                Back to Login
              </button>
            </form>

            {/* Resend OTP */}
            <p className="text-center text-xs text-muted-foreground mt-6">
              Didn't receive the code?{" "}
              <button className="text-primary hover:underline font-semibold">
                Resend
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
