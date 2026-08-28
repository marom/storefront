import { requireSession } from "@/lib/auth/session";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

// Gate: every route in this group requires a valid session, or it redirects to /login.
export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireSession();

  return (
    <>
      <SiteHeader userEmail={session.email} isAdmin={session.role === "ROLE_ADMIN"} />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">{children}</main>
      <SiteFooter />
    </>
  );
}
