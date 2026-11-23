import { cacheLife, cacheTag } from "next/cache";
import {
  NOTICES as STATIC_NOTICES,
  type Notice,
  type NoticeCategory,
} from "@/src/data/notices";
import {
  STATIC_POSTS,
  type Post,
  type PostCategory,
} from "@/src/data/posts";
import { getSupabaseClient, resolvePostImageUrl } from "./supabase";

const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
const BN_MONTHS_FULL = [
  "জানুয়ারি",
  "ফেব্রুয়ারি",
  "মার্চ",
  "এপ্রিল",
  "মে",
  "জুন",
  "জুলাই",
  "আগস্ট",
  "সেপ্টেম্বর",
  "অক্টোবর",
  "নভেম্বর",
  "ডিসেম্বর",
];
const BN_MONTHS_SHORT = [
  "জানু",
  "ফেব্রু",
  "মার্চ",
  "এপ্রি",
  "মে",
  "জুন",
  "জুলাই",
  "আগ",
  "সেপ্টে",
  "অক্টো",
  "নভে",
  "ডিসে",
];

function toBnDigits(value: string | number): string {
  return String(value)
    .split("")
    .map((ch) => (ch >= "0" && ch <= "9" ? BN_DIGITS[Number(ch)] : ch))
    .join("");
}

function formatBanglaDateParts(isoString: string): {
  dateBn: string;
  dayBn: string;
  monthYearBn: string;
} {
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) {
    return { dateBn: "সম্প্রতি", dayBn: "০১", monthYearBn: "২০২৬" };
  }
  const day = String(date.getUTCDate()).padStart(2, "0");
  const monthIdx = date.getUTCMonth();
  const year = date.getUTCFullYear();

  return {
    dateBn: `${toBnDigits(day)} ${BN_MONTHS_FULL[monthIdx]} ${toBnDigits(year)}`,
    dayBn: toBnDigits(day),
    monthYearBn: `${BN_MONTHS_SHORT[monthIdx]} ${toBnDigits(year)}`,
  };
}

function splitParagraphs(text: string): string[] {
  return text
    .split(/\r?\n\s*\r?\n|\r?\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

interface NoticeRow {
  id: string;
  title: string;
  category: string;
  summary: string;
  content: string;
  issued_by: string | null;
  published_at: string;
  is_pinned: boolean | null;
  is_urgent: boolean | null;
  attachment_url: string | null;
}

interface PostRow {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image_url: string | null;
  gallery_images: string[] | null;
  category: string;
  author_name: string | null;
  published_at: string;
}

const VALID_NOTICE_CATEGORIES: NoticeCategory[] = [
  "ভর্তি",
  "পরীক্ষা",
  "ছুটি",
  "মাহফিল ও অনুষ্ঠান",
  "সাধারণ",
];

const VALID_POST_CATEGORIES: PostCategory[] = [
  "সংবাদ ও কার্যক্রম",
  "অনুষ্ঠান ও মাহফিল",
  "শিক্ষা ও অর্জন",
  "ক্যাম্পাস বার্তা",
  "প্রশিক্ষণ",
];

function mapNoticeRow(row: NoticeRow): Notice {
  const { dateBn, dayBn, monthYearBn } = formatBanglaDateParts(
    row.published_at
  );
  const category = VALID_NOTICE_CATEGORIES.includes(
    row.category as NoticeCategory
  )
    ? (row.category as NoticeCategory)
    : "সাধারণ";

  const body = splitParagraphs(row.content);

  return {
    id: row.id,
    titleBn: row.title,
    category,
    dateBn,
    dayBn,
    monthYearBn,
    isPinned: Boolean(row.is_pinned),
    isUrgent: Boolean(row.is_urgent),
    summaryBn: row.summary,
    bodyBn: body.length > 0 ? body : [row.summary],
    issuedByBn:
      row.issued_by ||
      "কর্তৃপক্ষ, আল জামিয়াতুল ইসলামিয়া দারুস সুন্নাহ, হ্নীলা",
    attachmentUrl: row.attachment_url || undefined,
  };
}

function mapPostRow(row: PostRow): Post {
  const { dateBn } = formatBanglaDateParts(row.published_at);
  const category = VALID_POST_CATEGORIES.includes(row.category as PostCategory)
    ? (row.category as PostCategory)
    : "সংবাদ ও কার্যক্রম";

  const cover = resolvePostImageUrl(row.cover_image_url);
  const gallery = (row.gallery_images ?? [])
    .filter((img) => Boolean(img && img.trim()))
    .map((img) => resolvePostImageUrl(img));

  const body = splitParagraphs(row.content);

  return {
    id: row.id,
    titleBn: row.title,
    slug: row.slug,
    excerptBn: row.excerpt,
    contentBn: body.length > 0 ? body : [row.excerpt],
    coverImageUrl: cover,
    galleryImages: gallery,
    category,
    authorBn: row.author_name || "মিডিয়া ও প্রকাশনা বিভাগ",
    publishedAt: row.published_at,
    dateBn,
  };
}

/**
 * Fetches published notices from Supabase with graceful fallback to static data.
 */
export async function getNotices(): Promise<Notice[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag("notices");

  const supabase = getSupabaseClient();
  if (!supabase) {
    return STATIC_NOTICES;
  }

  try {
    const { data, error } = await supabase
      .from("notices")
      .select(
        "id, title, category, summary, content, issued_by, published_at, is_pinned, is_urgent, attachment_url"
      )
      .eq("is_published", true)
      .order("is_pinned", { ascending: false })
      .order("published_at", { ascending: false });

    if (error || !data || data.length === 0) {
      return STATIC_NOTICES;
    }

    return (data as NoticeRow[]).map(mapNoticeRow);
  } catch {
    return STATIC_NOTICES;
  }
}

/**
 * Fetches published posts from Supabase with graceful fallback to static data.
 */
export async function getPosts(): Promise<Post[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag("posts");

  const supabase = getSupabaseClient();
  if (!supabase) {
    return STATIC_POSTS;
  }

  try {
    const { data, error } = await supabase
      .from("posts")
      .select(
        "id, title, slug, excerpt, content, cover_image_url, gallery_images, category, author_name, published_at"
      )
      .eq("is_published", true)
      .order("published_at", { ascending: false });

    if (error || !data || data.length === 0) {
      return STATIC_POSTS;
    }

    return (data as PostRow[]).map(mapPostRow);
  } catch {
    return STATIC_POSTS;
  }
}

/**
 * Fetches a single published post by slug from Supabase with static fallback.
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  "use cache";
  cacheLife("minutes");
  cacheTag("posts");

  const decodedSlug = decodeURIComponent(slug);
  const supabase = getSupabaseClient();

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("posts")
        .select(
          "id, title, slug, excerpt, content, cover_image_url, gallery_images, category, author_name, published_at"
        )
        .eq("is_published", true)
        .eq("slug", decodedSlug)
        .maybeSingle();

      if (!error && data) {
        return mapPostRow(data as PostRow);
      }
    } catch {
      // Fall through to static lookup below
    }
  }

  return STATIC_POSTS.find((p) => p.slug === decodedSlug) ?? null;
}
