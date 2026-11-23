import { Suspense } from "react";
import type { Metadata } from "next";
import { requireAdminSession } from "@/src/lib/supabase/server";
import {
  PostsManager,
  type AdminPostRow,
} from "@/src/components/admin/PostsManager";

export const metadata: Metadata = {
  title: "পোস্ট ব্যবস্থাপনা",
};

async function AdminPostsContent({
  searchParams,
}: {
  searchParams: Promise<{ new?: string }>;
}) {
  const [{ supabase }, sp] = await Promise.all([
    requireAdminSession(),
    searchParams,
  ]);

  const { data } = await supabase
    .from("posts")
    .select(
      "id, title, slug, excerpt, content, cover_image_url, gallery_images, category, author_name, published_at, is_published"
    )
    .order("published_at", { ascending: false });

  return (
    <PostsManager
      initialPosts={(data ?? []) as AdminPostRow[]}
      openNewOnMount={sp.new === "1"}
    />
  );
}

export default function AdminPostsPage({
  searchParams,
}: {
  searchParams: Promise<{ new?: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="py-12 text-center text-sm text-ink-muted">
          পোস্ট তালিকা লোড হচ্ছে...
        </div>
      }
    >
      <AdminPostsContent searchParams={searchParams} />
    </Suspense>
  );
}
