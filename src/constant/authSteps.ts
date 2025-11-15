export const AUTH_STEPS = {
  LOGIN: "LOGIN",
  OTP: "OTP",
  SUCCESS: "SUCCESS",
} as const;

export type AuthStep = (typeof AUTH_STEPS)[keyof typeof AUTH_STEPS];