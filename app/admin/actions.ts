"use server";

import { revalidatePath, updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/src/lib/supabase/server";
import { POST_IMAGES_BUCKET } from "@/src/lib/supabase";

export interface ActionResult {
  success: boolean;
  message: string;
}

function extractBucketPath(urlOrPath?: string | null): string | null {
  if (!urlOrPath) return null;
  const marker = `/storage/v1/object/public/${POST_IMAGES_BUCKET}/`;
  const idx = urlOrPath.indexOf(marker);
  if (idx !== -1) {
    return decodeURIComponent(urlOrPath.slice(idx + marker.length));
  }
  return null;
}

async function getAuthenticatedAdmin() {
  const supabase = await createServerSupabaseClient();
  if (!supabase) {
    return {
      error: "Supabase পরিবেশ কনফিগার করা হয়নি (.env.local যাচাই করুন)।",
      supabase: null,
      user: null,
    };
  }

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return {
      error: "আপনার সেশন মেয়াদোত্তীর্ণ হয়েছে। অনুগ্রহ করে পুনরায় লগইন করুন।",
      supabase: null,
      user: null,
    };
  }

  return { error: null, supabase, user };
}

function revalidateNoticeRoutes() {
  updateTag("notices");
  revalidatePath("/");
  revalidatePath("/notices");
  revalidatePath("/admin");
  revalidatePath("/admin/notices");
}

function revalidatePostRoutes(slug?: string, oldSlug?: string) {
  updateTag("posts");
  revalidatePath("/");
  revalidatePath("/posts");
  if (slug) revalidatePath(`/posts/${slug}`);
  if (oldSlug && oldSlug !== slug) revalidatePath(`/posts/${oldSlug}`);
  revalidatePath("/admin");
  revalidatePath("/admin/posts");
}

// ============================================================================
// AUTH ACTIONS
// ============================================================================

export async function loginAdminAction(
  _prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");

  if (!email || !password) {
    return {
      success: false,
      message: "অনুগ্রহ করে ইমেইল এবং পাসওয়ার্ড প্রদান করুন।",
    };
  }

  const supabase = await createServerSupabaseClient();
  if (!supabase) {
    return {
      success: false,
      message:
        "Supabase সংযোগ কনফিগার করা হয়নি। অনুগ্রহ করে .env.local ফাইলে URL ও Anon Key যুক্ত করুন।",
    };
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return {
      success: false,
      message: "ইমেইল অথবা পাসওয়ার্ড সঠিক নয়। অনুগ্রহ করে আবার চেষ্টা করুন।",
    };
  }

  redirect("/admin");
}

export async function logoutAdminAction() {
  const supabase = await createServerSupabaseClient();
  if (supabase) {
    await supabase.auth.signOut();
  }
  redirect("/admin/login");
}

// ============================================================================
// NOTICE CRUD ACTIONS
// ============================================================================

export interface NoticeInput {
  id?: string;
  title: string;
  category: string;
  summary: string;
  content: string;
  issued_by: string;
  published_at: string;
  is_pinned: boolean;
  is_urgent: boolean;
  is_published: boolean;
  attachment_url?: string;
}

export async function saveNoticeAction(
  input: NoticeInput
): Promise<ActionResult> {
  const auth = await getAuthenticatedAdmin();
  if (auth.error || !auth.supabase) {
    return { success: false, message: auth.error || "অনুমতি নেই।" };
  }

  const title = input.title.trim();
  const summary = input.summary.trim();
  const content = input.content.trim();

  if (!title || !summary || !content) {
    return {
      success: false,
      message: "শিরোনাম, সারসংক্ষেপ এবং বিস্তারিত বিবরণ পূরণ করা বাধ্যতামূলক।",
    };
  }

  const publishedAtIso = input.published_at
    ? new Date(input.published_at).toISOString()
    : new Date().toISOString();

  const payload = {
    title,
    category: input.category || "সাধারণ",
    summary,
    content,
    issued_by:
      input.issued_by.trim() ||
      "কর্তৃপক্ষ, আল জামিয়াতুল ইসলামিয়া দারুস সুন্নাহ, হ্নীলা",
    published_at: publishedAtIso,
    is_pinned: Boolean(input.is_pinned),
    is_urgent: Boolean(input.is_urgent),
    is_published: Boolean(input.is_published),
    attachment_url: input.attachment_url?.trim() || null,
  };

  if (input.id) {
    const { error } = await auth.supabase
      .from("notices")
      .update(payload)
      .eq("id", input.id);

    if (error) {
      return {
        success: false,
        message: `নোটিশ হালনাগাদ করা যায়নি: ${error.message}`,
      };
    }

    revalidateNoticeRoutes();
    return { success: true, message: "নোটিশ সফলভাবে হালনাগাদ করা হয়েছে।" };
  }

  const { error } = await auth.supabase.from("notices").insert(payload);

  if (error) {
    return {
      success: false,
      message: `নতুন নোটিশ সংরক্ষণ করা যায়নি: ${error.message}`,
    };
  }

  revalidateNoticeRoutes();
  return { success: true, message: "নতুন নোটিশ সফলভাবে যোগ করা হয়েছে।" };
}

export async function toggleNoticeFieldAction(
  id: string,
  field: "is_pinned" | "is_published",
  nextValue: boolean
): Promise<ActionResult> {
  const auth = await getAuthenticatedAdmin();
  if (auth.error || !auth.supabase) {
    return { success: false, message: auth.error || "অনুমতি নেই।" };
  }

  const { error } = await auth.supabase
    .from("notices")
    .update({ [field]: nextValue })
    .eq("id", id);

  if (error) {
    return {
      success: false,
      message: `অবস্থা পরিবর্তন করা যায়নি: ${error.message}`,
    };
  }

  revalidateNoticeRoutes();

  if (field === "is_pinned") {
    return {
      success: true,
      message: nextValue
        ? "নোটিশটি পিন করা হয়েছে।"
        : "নোটিশের পিন সরানো হয়েছে।",
    };
  }

  return {
    success: true,
    message: nextValue
      ? "নোটিশটি প্রকাশিত করা হয়েছে।"
      : "নোটিশটি খসড়া (ড্রাফট) হিসেবে রাখা হয়েছে।",
  };
}

export async function deleteNoticeAction(id: string): Promise<ActionResult> {
  const auth = await getAuthenticatedAdmin();
  if (auth.error || !auth.supabase) {
    return { success: false, message: auth.error || "অনুমতি নেই।" };
  }

  const { error } = await auth.supabase.from("notices").delete().eq("id", id);

  if (error) {
    return {
      success: false,
      message: `নোটিশ মুছে ফেলা যায়নি: ${error.message}`,
    };
  }

  revalidateNoticeRoutes();
  return { success: true, message: "নোটিশ স্থায়ীভাবে মুছে ফেলা হয়েছে।" };
}

// ============================================================================
// POST CRUD ACTIONS
// ============================================================================

export interface PostInput {
  id?: string;
  oldSlug?: string;
  title: string;
  slug: string;
  category: string;
  author_name: string;
  excerpt: string;
  content: string;
  cover_image_url?: string;
  gallery_images: string[];
  published_at: string;
  is_published: boolean;
}

function normalizeSlug(raw: string): string {
  const cleaned = raw
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\u0980-\u09ff\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  return cleaned || `post-${Date.now()}`;
}

export async function savePostAction(input: PostInput): Promise<ActionResult> {
  const auth = await getAuthenticatedAdmin();
  if (auth.error || !auth.supabase) {
    return { success: false, message: auth.error || "অনুমতি নেই।" };
  }

  const title = input.title.trim();
  const excerpt = input.excerpt.trim();
  const content = input.content.trim();
  const slug = normalizeSlug(input.slug || title);

  if (!title || !excerpt || !content) {
    return {
      success: false,
      message: "শিরোনাম, সংক্ষিপ্ত বিবরণ এবং বিস্তারিত লেখা পূরণ করা বাধ্যতামূলক।",
    };
  }

  const publishedAtIso = input.published_at
    ? new Date(input.published_at).toISOString()
    : new Date().toISOString();

  const galleryImages = (input.gallery_images || [])
    .map((u) => u.trim())
    .filter(Boolean);

  const payload = {
    title,
    slug,
    category: input.category || "সংবাদ ও কার্যক্রম",
    author_name: input.author_name.trim() || "মিডিয়া ও প্রকাশনা বিভাগ",
    excerpt,
    content,
    cover_image_url: input.cover_image_url?.trim() || null,
    gallery_images: galleryImages,
    published_at: publishedAtIso,
    is_published: Boolean(input.is_published),
  };

  if (input.id) {
    const { error } = await auth.supabase
      .from("posts")
      .update(payload)
      .eq("id", input.id);

    if (error) {
      if (error.code === "23505") {
        return {
          success: false,
          message:
            "এই স্লাগ (Slug) ইতিমধ্যে ব্যবহৃত হয়েছে। অনুগ্রহ করে ভিন্ন একটি স্লাগ দিন।",
        };
      }
      return {
        success: false,
        message: `পোস্ট হালনাগাদ করা যায়নি: ${error.message}`,
      };
    }

    revalidatePostRoutes(slug, input.oldSlug);
    return { success: true, message: "পোস্ট সফলভাবে হালনাগাদ করা হয়েছে।" };
  }

  const { error } = await auth.supabase.from("posts").insert(payload);

  if (error) {
    if (error.code === "23505") {
      return {
        success: false,
        message:
          "এই স্লাগ (Slug) ইতিমধ্যে ব্যবহৃত হয়েছে। অনুগ্রহ করে ভিন্ন একটি স্লাগ দিন।",
      };
    }
    return {
      success: false,
      message: `নতুন পোস্ট সংরক্ষণ করা যায়নি: ${error.message}`,
    };
  }

  revalidatePostRoutes(slug);
  return { success: true, message: "নতুন পোস্ট সফলভাবে সংরক্ষণ করা হয়েছে।" };
}

export async function togglePostPublishedAction(
  id: string,
  slug: string,
  nextValue: boolean
): Promise<ActionResult> {
  const auth = await getAuthenticatedAdmin();
  if (auth.error || !auth.supabase) {
    return { success: false, message: auth.error || "অনুমতি নেই।" };
  }

  const { error } = await auth.supabase
    .from("posts")
    .update({ is_published: nextValue })
    .eq("id", id);

  if (error) {
    return {
      success: false,
      message: `পোস্টের অবস্থা পরিবর্তন করা যায়নি: ${error.message}`,
    };
  }

  revalidatePostRoutes(slug);
  return {
    success: true,
    message: nextValue
      ? "পোস্টটি প্রকাশিত করা হয়েছে।"
      : "পোস্টটি খসড়া (ড্রাফট) হিসেবে রাখা হয়েছে।",
  };
}

export async function deletePostAction(
  id: string,
  slug: string
): Promise<ActionResult> {
  const auth = await getAuthenticatedAdmin();
  if (auth.error || !auth.supabase) {
    return { success: false, message: auth.error || "অনুমতি নেই।" };
  }

  // Fetch images first so we can remove uploaded bucket files cleanly
  const { data: postRow } = await auth.supabase
    .from("posts")
    .select("cover_image_url, gallery_images")
    .eq("id", id)
    .maybeSingle();

  const { error } = await auth.supabase.from("posts").delete().eq("id", id);

  if (error) {
    return {
      success: false,
      message: `পোস্ট মুছে ফেলা যায়নি: ${error.message}`,
    };
  }

  if (postRow) {
    const pathsToDelete = new Set<string>();
    const coverPath = extractBucketPath(postRow.cover_image_url);
    if (coverPath) pathsToDelete.add(coverPath);
    for (const img of postRow.gallery_images ?? []) {
      const p = extractBucketPath(img);
      if (p) pathsToDelete.add(p);
    }
    if (pathsToDelete.size > 0) {
      await auth.supabase.storage
        .from(POST_IMAGES_BUCKET)
        .remove(Array.from(pathsToDelete));
    }
  }

  revalidatePostRoutes(slug);
  return { success: true, message: "পোস্ট এবং সংশ্লিষ্ট ছবি মুছে ফেলা হয়েছে।" };
}
