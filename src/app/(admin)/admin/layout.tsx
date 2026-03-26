import type { ReactNode } from "react";
import { requireAdminUser } from "@/lib/auth/guard";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  await requireAdminUser();

  return <div className="min-h-screen bg-white">{children}</div>;
}
