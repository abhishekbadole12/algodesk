import { AuthProvider } from "@/context/AuthContext";
import { getSession } from "@/lib/session/session";

export default async function AuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  return <AuthProvider initialSession={session}>{children}</AuthProvider>;
}
