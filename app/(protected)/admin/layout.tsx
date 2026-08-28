import { requireAdmin } from "@/lib/auth/session";

// Admin-only subtree. Non-admins (and logged-out users) never see it exists.
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();
  return <>{children}</>;
}
