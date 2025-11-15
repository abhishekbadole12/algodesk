"use server";

import { cookies } from "next/headers";

const SESSION_COOKIE = "algodesk-session";

export async function createSession(token: string, user: any) {
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE, JSON.stringify({
    token,
    user,
  }), {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export async function getSession() {
  const cookieStore = await cookies();
  const raw = cookieStore.get(SESSION_COOKIE)?.value;

  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export async function destroySession() {
  const cookieStore = await cookies();

  cookieStore.delete(SESSION_COOKIE);
}