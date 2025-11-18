export async function logoutUser(): Promise<boolean> {
  try {
    const res = await fetch("/api/auth/logout");

    const data = await res.json();

    if (!data.status) {
      console.error("Logout failed:", data.message);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Logout error:", error);
    return false;
  }
}
