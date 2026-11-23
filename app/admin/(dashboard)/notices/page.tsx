import { Suspense } from "react";
import type { Metadata } from "next";
import { requireAdminSession } from "@/src/lib/supabase/server";
import {
  NoticesManager,
  type AdminNoticeRow,
} from "@/src/components/admin/NoticesManager";

export const metadata: Metadata = {
  title: "নোটিশ ব্যবস্থাপনা",
};

async function AdminNoticesContent({
  searchParams,
}: {
  searchParams: Promise<{ new?: string }>;
}) {
  const [{ supabase }, sp] = await Promise.all([
    requireAdminSession(),
    searchParams,
  ]);

  const { data } = await supabase
    .from("notices")
    .select(
      "id, title, category, summary, content, issued_by, published_at, is_pinned, is_urgent, is_published, attachment_url"
    )
    .order("is_pinned", { ascending: false })
    .order("published_at", { ascending: false });

  return (
    <NoticesManager
      initialNotices={(data ?? []) as AdminNoticeRow[]}
      openNewOnMount={sp.new === "1"}
    />
  );
}

export default function AdminNoticesPage({
  searchParams,
}: {
  searchParams: Promise<{ new?: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="py-12 text-center text-sm text-ink-muted">
          নোটিশ তালিকা লোড হচ্ছে...
        </div>
      }
    >
      <AdminNoticesContent searchParams={searchParams} />
    </Suspense>
  );
}
