"use client";

import React, { createContext, useContext, useState } from "react";
import type { User } from "@/types/user";
import { useInstruments } from "@/hooks/useInstruments";

interface LoginFormValues {
  clientCode: string;
  password: string;
}

interface ApiResponse {
  status: boolean;
  message: string;
  errorcode?: string;
  data?: any;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (
    formData: LoginFormValues
  ) => Promise<ApiResponse | { status: boolean; message: string }>;
  verifyOtp: (
    otp: string
  ) => Promise<ApiResponse | { status: boolean; message: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({
  children,
  initialSession,
}: {
  children: React.ReactNode;
  initialSession: any;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!initialSession?.user
  );
  const [user, setUser] = useState<User | null>(initialSession?.user || null);
  const { data, loading } = useInstruments();

  // -----------------------------
  // LOGIN (STEP 1)
  // -----------------------------
  const login = async (formData: { clientCode: string; password: string }) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const response: ApiResponse = await res.json();

    if (response.status) {
      sessionStorage.setItem("refreshToken", response.data.refreshToken);
      return { status: response.status, message: response.message };
    }
    return { status: response.status, message: response.message };
  };

  // -----------------------------
  // VERIFY OTP (STEP 2)
  // -----------------------------
  const verifyOtp = async (otp: string) => {
    const refreshToken = sessionStorage.getItem("refreshToken");

    const res = await fetch("/api/auth/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        otp,
        refreshToken,
      }),
    });

    const response: ApiResponse = await res.json();

    if (response.status && response.message === "SUCCESS") {
      setIsAuthenticated(true);
      setUser(response.data);
      return { status: response.status, message: response.message };
    }

    return { status: response.status, message: response.message };
  };

  // -----------------------------
  // LOGOUT
  // -----------------------------
  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    sessionStorage.removeItem("refreshToken");
    setIsAuthenticated(false);
    setUser(null);
  };

  const value: AuthContextType = {
    isAuthenticated,
    user,
    login,
    verifyOtp,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
