import { Suspense } from "react";
import type { Metadata } from "next";
import { requireAdminSession } from "@/src/lib/supabase/server";
import { AdminShell } from "@/src/components/admin/AdminShell";

export const metadata: Metadata = {
  title: {
    default: "অ্যাডমিন ড্যাশবোর্ড",
    template: "%s | অ্যাডমিন প্যানেল",
  },
  robots: { index: false, follow: false },
};

async function AuthenticatedAdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await requireAdminSession();

  return (
    <AdminShell userEmail={user.email || "অ্যাডমিন"}>{children}</AdminShell>
  );
}

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-surface-ivory text-brand-primary font-semibold text-sm">
          অ্যাডমিন সেশন যাচাই করা হচ্ছে...
        </div>
      }
    >
      <AuthenticatedAdminShell>{children}</AuthenticatedAdminShell>
    </Suspense>
  );
}
