"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  CheckCircle2,
  Edit3,
  ExternalLink,
  Eye,
  EyeOff,
  ImagePlus,
  Images,
  Loader2,
  Newspaper,
  Plus,
  Search,
  Sparkles,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import {
  deletePostAction,
  savePostAction,
  togglePostPublishedAction,
  type PostInput,
} from "@/app/admin/actions";

export interface AdminPostRow {
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
  is_published: boolean;
}

const POST_CATEGORIES = [
  "সংবাদ ও কার্যক্রম",
  "অনুষ্ঠান ও মাহফিল",
  "শিক্ষা ও অর্জন",
  "ক্যাম্পাস বার্তা",
  "প্রশিক্ষণ",
] as const;

const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

function toDateInputValue(iso?: string): string {
  const d = iso ? new Date(iso) : new Date();
  if (Number.isNaN(d.getTime())) return new Date().toISOString().slice(0, 10);
  return d.toISOString().slice(0, 10);
}

function generateSlugFromTitle(title: string): string {
  const ascii = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 60);

  if (ascii.length >= 3) {
    return ascii;
  }

  const now = new Date();
  const stamp = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(
    2,
    "0"
  )}${String(now.getDate()).padStart(2, "0")}`;
  const rand = Math.random().toString(36).slice(2, 6);
  return `darussunnah-post-${stamp}-${rand}`;
}

function createEmptyPost(): PostInput {
  return {
    title: "",
    slug: "",
    category: "সংবাদ ও কার্যক্রম",
    author_name: "মিডিয়া ও প্রকাশনা বিভাগ",
    excerpt: "",
    content: "",
    cover_image_url: "",
    gallery_images: [],
    published_at: toDateInputValue(),
    is_published: true,
  };
}

export function PostsManager({
  initialPosts,
  openNewOnMount = false,
}: {
  initialPosts: AdminPostRow[];
  openNewOnMount?: boolean;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [filterStatus, setFilterStatus] = useState<
    "all" | "published" | "draft"
  >("all");
  const [query, setQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(openNewOnMount);
  const [slugTouched, setSlugTouched] = useState(false);
  const [formState, setFormState] = useState<PostInput>(createEmptyPost);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [toast, setToast] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const showToast = (type: "success" | "error", text: string) => {
    setToast({ type, text });
    setTimeout(() => {
      setToast((curr) => (curr?.text === text ? null : curr));
    }, 4500);
  };

  const openCreateModal = () => {
    setFormState(createEmptyPost());
    setSlugTouched(false);
    setUploadError(null);
    setModalOpen(true);
  };

  const openEditModal = (post: AdminPostRow) => {
    setFormState({
      id: post.id,
      oldSlug: post.slug,
      title: post.title,
      slug: post.slug,
      category: post.category,
      author_name: post.author_name || "মিডিয়া ও প্রকাশনা বিভাগ",
      excerpt: post.excerpt,
      content: post.content,
      cover_image_url: post.cover_image_url || "",
      gallery_images: post.gallery_images ?? [],
      published_at: toDateInputValue(post.published_at),
      is_published: post.is_published,
    });
    setSlugTouched(true);
    setUploadError(null);
    setModalOpen(true);
  };

  const validateImageFile = (file: File): string | null => {
    if (!ALLOWED_TYPES.has(file.type)) {
      return `"${file.name}" সঠিক ফরম্যাট নয়। শুধুমাত্র JPG, PNG বা WebP ছবি নির্বাচন করুন।`;
    }
    if (file.size > MAX_SIZE_BYTES) {
      return `"${file.name}" এর আকার ৫ মেগাবাইটের বেশি। অনুগ্রহ করে ৫MB এর কম আকারের ছবি দিন।`;
    }
    return null;
  };

  const uploadSingleImage = async (file: File): Promise<string> => {
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/admin/upload", {
      method: "POST",
      body: fd,
    });
    const data = (await res.json()) as { publicUrl?: string; error?: string };
    if (!res.ok || !data.publicUrl) {
      throw new Error(data.error || "ছবি আপলোড করা যায়নি।");
    }
    return data.publicUrl;
  };

  const removeFromBucket = async (url?: string) => {
    if (!url || !url.includes("/storage/v1/object/public/post-images/")) return;
    try {
      await fetch("/api/admin/upload", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
    } catch {
      // Non-blocking cleanup
    }
  };

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    setUploadError(null);
    const err = validateImageFile(file);
    if (err) {
      setUploadError(err);
      return;
    }

    setUploadingCover(true);
    try {
      const previousUrl = formState.cover_image_url;
      const publicUrl = await uploadSingleImage(file);
      setFormState((prev) => ({ ...prev, cover_image_url: publicUrl }));
      if (previousUrl && previousUrl !== publicUrl) {
        await removeFromBucket(previousUrl);
      }
      showToast("success", "কভার ছবি সফলভাবে আপলোড হয়েছে।");
    } catch (error) {
      setUploadError(
        error instanceof Error ? error.message : "কভার ছবি আপলোড ব্যর্থ হয়েছে।"
      );
    } finally {
      setUploadingCover(false);
    }
  };

  const handleRemoveCover = async () => {
    const currentUrl = formState.cover_image_url;
    setFormState((prev) => ({ ...prev, cover_image_url: "" }));
    await removeFromBucket(currentUrl);
  };

  const handleGalleryUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(e.target.files || []);
    e.target.value = "";
    if (files.length === 0) return;

    setUploadError(null);
    for (const file of files) {
      const err = validateImageFile(file);
      if (err) {
        setUploadError(err);
        return;
      }
    }

    setUploadingGallery(true);
    try {
      const uploadedUrls: string[] = [];
      for (const file of files) {
        const url = await uploadSingleImage(file);
        uploadedUrls.push(url);
      }
      setFormState((prev) => ({
        ...prev,
        gallery_images: [...prev.gallery_images, ...uploadedUrls],
      }));
      showToast(
        "success",
        `${uploadedUrls.length}টি গ্যালারি ছবি সফলভাবে আপলোড হয়েছে।`
      );
    } catch (error) {
      setUploadError(
        error instanceof Error
          ? error.message
          : "গ্যালারি ছবি আপলোড ব্যর্থ হয়েছে।"
      );
    } finally {
      setUploadingGallery(false);
    }
  };

  const handleRemoveGalleryImage = async (urlToRemove: string) => {
    setFormState((prev) => ({
      ...prev,
      gallery_images: prev.gallery_images.filter((u) => u !== urlToRemove),
    }));
    await removeFromBucket(urlToRemove);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const payload: PostInput = {
        ...formState,
        slug: formState.slug.trim() || generateSlugFromTitle(formState.title),
      };
      const res = await savePostAction(payload);
      if (res.success) {
        setModalOpen(false);
        showToast("success", res.message);
        router.refresh();
      } else {
        showToast("error", res.message);
      }
    });
  };

  const handleTogglePublished = (post: AdminPostRow) => {
    startTransition(async () => {
      const res = await togglePostPublishedAction(
        post.id,
        post.slug,
        !post.is_published
      );
      showToast(res.success ? "success" : "error", res.message);
      if (res.success) router.refresh();
    });
  };

  const handleDelete = (post: AdminPostRow) => {
    const confirmed = window.confirm(
      `আপনি কি নিশ্চিতভাবে "${post.title}" পোস্টটি ও এর আপলোডকৃত ছবিসমূহ মুছে ফেলতে চান?`
    );
    if (!confirmed) return;

    startTransition(async () => {
      const res = await deletePostAction(post.id, post.slug);
      showToast(res.success ? "success" : "error", res.message);
      if (res.success) router.refresh();
    });
  };

  const filtered = initialPosts.filter((p) => {
    if (filterStatus === "published" && !p.is_published) return false;
    if (filterStatus === "draft" && p.is_published) return false;
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      p.title.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.slug.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-ink-primary flex items-center gap-2">
            <Newspaper className="w-6 h-6 text-brand-primary" />
            পোস্ট / সংবাদ ও কার্যক্রম ব্যবস্থাপনা
          </h2>
          <p className="text-sm text-ink-muted mt-0.5">
            কভার ছবি ও গ্যালারি ছবিসহ নতুন সংবাদ, মাহফিল ও কার্যক্রম প্রকাশ করুন।
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateModal}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-brand-primary hover:bg-brand-dark text-white font-bold text-sm shadow-sm transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-brand-gold-bright" />
          <span>নতুন পোস্ট লিখুন</span>
        </button>
      </div>

      {/* Toast */}
      {toast && (
        <div
          role="status"
          className={`p-4 rounded-xl border text-sm font-semibold flex items-center justify-between gap-3 shadow-xs ${
            toast.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-800"
              : "bg-red-50 border-red-200 text-red-700"
          }`}
        >
          <div className="flex items-center gap-2">
            {toast.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 shrink-0" />
            )}
            <span>{toast.text}</span>
          </div>
          <button
            type="button"
            onClick={() => setToast(null)}
            className="opacity-70 hover:opacity-100 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-2xl border border-brand-primary/12 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
        <div className="inline-flex rounded-xl bg-surface-sage p-1 self-start">
          {[
            { key: "all", label: `সকল (${initialPosts.length})` },
            {
              key: "published",
              label: `প্রকাশিত (${initialPosts.filter((p) => p.is_published).length})`,
            },
            {
              key: "draft",
              label: `খসড়া (${initialPosts.filter((p) => !p.is_published).length})`,
            },
          ].map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() =>
                setFilterStatus(tab.key as "all" | "published" | "draft")
              }
              className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                filterStatus === tab.key
                  ? "bg-brand-primary text-white"
                  : "text-ink-body hover:text-brand-primary"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-68">
          <Search className="w-4 h-4 text-ink-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="পোস্ট খুঁজুন..."
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-brand-primary/20 bg-surface-ivory/50 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
          />
        </div>
      </div>

      {/* Posts List */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-brand-primary/12 p-12 text-center">
          <Newspaper className="w-10 h-10 text-ink-muted/40 mx-auto mb-3" />
          <p className="text-ink-muted font-medium">কোনো পোস্ট পাওয়া যায়নি।</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((post) => {
            const thumb = post.cover_image_url || "/madrasahPic1.jpg";
            const galleryCount = post.gallery_images?.length ?? 0;

            return (
              <div
                key={post.id}
                className="bg-white rounded-2xl border border-brand-primary/12 p-4 sm:p-5 shadow-xs hover:border-brand-gold/60 transition-all flex flex-col md:flex-row gap-4 md:items-center"
              >
                {/* Thumbnail Preview */}
                <div className="relative w-full md:w-36 h-40 md:h-24 rounded-xl overflow-hidden bg-brand-dark shrink-0 border border-brand-primary/10">
                  <Image
                    src={thumb}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 144px"
                    className="object-cover"
                  />
                  {galleryCount > 0 && (
                    <span className="absolute bottom-1.5 right-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded bg-black/70 text-white text-[10px] font-semibold">
                      <Images className="w-3 h-3 text-brand-gold-bright" />
                      {galleryCount}
                    </span>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-surface-sage text-brand-primary border border-brand-primary/15">
                      {post.category}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        post.is_published
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-slate-100 text-slate-600 border border-slate-200"
                      }`}
                    >
                      {post.is_published ? "প্রকাশিত" : "খসড়া (ড্রাফট)"}
                    </span>
                    <span className="text-xs text-ink-muted">
                      {toDateInputValue(post.published_at)}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-ink-primary leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-ink-muted mt-1 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <p className="text-[11px] font-mono text-ink-muted/80 mt-1 truncate">
                    /posts/{post.slug}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  {post.is_published && (
                    <Link
                      href={`/posts/${post.slug}`}
                      target="_blank"
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-surface-sage text-brand-primary hover:bg-brand-primary/15 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>দেখুন</span>
                    </Link>
                  )}

                  <button
                    type="button"
                    disabled={isPending}
                    onClick={() => handleTogglePublished(post)}
                    className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
                      post.is_published
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                        : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200"
                    }`}
                  >
                    {post.is_published ? (
                      <>
                        <EyeOff className="w-3.5 h-3.5" />
                        <span>খসড়া করুন</span>
                      </>
                    ) : (
                      <>
                        <Eye className="w-3.5 h-3.5" />
                        <span>প্রকাশ করুন</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    disabled={isPending}
                    onClick={() => openEditModal(post)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-brand-primary/10 text-brand-primary hover:bg-brand-primary hover:text-white transition-colors cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>সম্পাদনা</span>
                  </button>

                  <button
                    type="button"
                    disabled={isPending}
                    onClick={() => handleDelete(post)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-red-50 text-red-700 hover:bg-red-600 hover:text-white border border-red-200 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>মুছুন</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Create / Edit Post Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() =>
              !isPending && !uploadingCover && !uploadingGallery && setModalOpen(false)
            }
            className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
          />

          <div className="relative z-10 w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-brand-primary/15 overflow-hidden max-h-[92vh] flex flex-col">
            <div className="bg-brand-primary text-white px-6 py-4 flex items-center justify-between border-b-2 border-brand-gold">
              <h3 className="text-lg font-bold">
                {formState.id ? "পোস্ট সম্পাদনা করুন" : "নতুন পোস্ট লিখুন"}
              </h3>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form
              onSubmit={handleSave}
              className="p-6 overflow-y-auto space-y-5 text-sm"
            >
              {uploadError && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{uploadError}</span>
                </div>
              )}

              {/* Title */}
              <div>
                <label className="block font-semibold text-ink-primary mb-1">
                  শিরোনাম *
                </label>
                <input
                  type="text"
                  required
                  value={formState.title}
                  onChange={(e) => {
                    const nextTitle = e.target.value;
                    setFormState((prev) => ({
                      ...prev,
                      title: nextTitle,
                      slug: slugTouched
                        ? prev.slug
                        : generateSlugFromTitle(nextTitle),
                    }));
                  }}
                  placeholder="পোস্ট বা সংবাদের শিরোনাম লিখুন"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-primary/20 bg-surface-ivory/50 focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
                />
              </div>

              {/* Slug + Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="font-semibold text-ink-primary">
                      স্লাগ (URL Slug) *
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setSlugTouched(true);
                        setFormState((prev) => ({
                          ...prev,
                          slug: generateSlugFromTitle(prev.title),
                        }));
                      }}
                      className="inline-flex items-center gap-1 text-xs text-brand-primary font-semibold hover:underline cursor-pointer"
                    >
                      <Sparkles className="w-3 h-3" />
                      অটো তৈরি
                    </button>
                  </div>
                  <input
                    type="text"
                    required
                    value={formState.slug}
                    onChange={(e) => {
                      setSlugTouched(true);
                      setFormState({ ...formState, slug: e.target.value });
                    }}
                    placeholder="annual-mahfil-2026"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-primary/20 bg-surface-ivory/50 font-mono text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-ink-primary mb-1">
                    ক্যাটাগরি *
                  </label>
                  <select
                    value={formState.category}
                    onChange={(e) =>
                      setFormState({ ...formState, category: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-primary/20 bg-surface-ivory/50 focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
                  >
                    {POST_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Author + Published Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-ink-primary mb-1">
                    প্রতিবেদক / বিভাগ
                  </label>
                  <input
                    type="text"
                    value={formState.author_name}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        author_name: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-primary/20 bg-surface-ivory/50 focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-ink-primary mb-1">
                    প্রকাশের তারিখ *
                  </label>
                  <input
                    type="date"
                    required
                    value={formState.published_at}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        published_at: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-primary/20 bg-surface-ivory/50 focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
                  />
                </div>
              </div>

              {/* Cover Photo Upload */}
              <div className="p-4 rounded-2xl bg-surface-ivory border border-brand-primary/15 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="font-bold text-ink-primary">
                      কভার ছবি (Cover Photo)
                    </p>
                    <p className="text-xs text-ink-muted">
                      JPG, PNG অথবা WebP • সর্বোচ্চ ৫ মেগাবাইট (Supabase Storage
                      `post-images`)
                    </p>
                  </div>

                  <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-primary hover:bg-brand-dark text-white text-xs font-bold cursor-pointer transition-colors">
                    {uploadingCover ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Upload className="w-4 h-4 text-brand-gold-bright" />
                    )}
                    <span>
                      {uploadingCover
                        ? "আপলোড হচ্ছে..."
                        : formState.cover_image_url
                          ? "ছবি পরিবর্তন করুন"
                          : "কভার ছবি আপলোড"}
                    </span>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      disabled={uploadingCover}
                      onChange={handleCoverUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {formState.cover_image_url && (
                  <div className="relative w-full h-48 sm:h-56 rounded-xl overflow-hidden bg-brand-dark border border-brand-primary/15">
                    <Image
                      src={formState.cover_image_url}
                      alt="কভার ছবি প্রিভিউ"
                      fill
                      sizes="(max-width: 768px) 100vw, 640px"
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveCover}
                      className="absolute top-2.5 right-2.5 inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>সরান</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Gallery Photos Upload */}
              <div className="p-4 rounded-2xl bg-surface-ivory border border-brand-primary/15 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="font-bold text-ink-primary">
                      গ্যালারি ছবিসমূহ (একাধিক ছবি)
                    </p>
                    <p className="text-xs text-ink-muted">
                      একসাথে একাধিক ছবি নির্বাচন করতে পারবেন (প্রতিটি সর্বোচ্চ
                      ৫MB)
                    </p>
                  </div>

                  <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-surface-sage text-brand-primary border border-brand-primary/25 text-xs font-bold cursor-pointer transition-colors">
                    {uploadingGallery ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <ImagePlus className="w-4 h-4 text-brand-gold" />
                    )}
                    <span>
                      {uploadingGallery ? "আপলোড হচ্ছে..." : "গ্যালারি ছবি যোগ করুন"}
                    </span>
                    <input
                      type="file"
                      multiple
                      accept="image/jpeg,image/png,image/webp"
                      disabled={uploadingGallery}
                      onChange={handleGalleryUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {formState.gallery_images.length > 0 && (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                    {formState.gallery_images.map((url, idx) => (
                      <div
                        key={`${url}-${idx}`}
                        className="relative aspect-square rounded-xl overflow-hidden bg-brand-dark border border-brand-primary/15 group"
                      >
                        <Image
                          src={url}
                          alt={`গ্যালারি ছবি ${idx + 1}`}
                          fill
                          sizes="160px"
                          className="object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveGalleryImage(url)}
                          aria-label="ছবি সরান"
                          className="absolute top-1.5 right-1.5 w-7 h-7 rounded-lg bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow cursor-pointer"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Excerpt */}
              <div>
                <label className="block font-semibold text-ink-primary mb-1">
                  সংক্ষিপ্ত বিবরণ *
                </label>
                <textarea
                  rows={2}
                  required
                  value={formState.excerpt}
                  onChange={(e) =>
                    setFormState({ ...formState, excerpt: e.target.value })
                  }
                  placeholder="পোস্টের ২–৩ লাইনের সংক্ষিপ্ত সারমর্ম লিখুন"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-primary/20 bg-surface-ivory/50 focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
                />
              </div>

              {/* Content */}
              <div>
                <label className="block font-semibold text-ink-primary mb-1">
                  বিস্তারিত লেখা *
                </label>
                <textarea
                  rows={7}
                  required
                  value={formState.content}
                  onChange={(e) =>
                    setFormState({ ...formState, content: e.target.value })
                  }
                  placeholder="সম্পূর্ণ সংবাদ বা প্রতিবেদন লিখুন (নতুন অনুচ্ছেদের জন্য Enter চাপুন)"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-primary/20 bg-surface-ivory/50 focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
                />
              </div>

              {/* Publish Toggle */}
              <label className="inline-flex items-center gap-2 cursor-pointer font-semibold text-ink-primary">
                <input
                  type="checkbox"
                  checked={formState.is_published}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      is_published: e.target.checked,
                    })
                  }
                  className="w-4 h-4 accent-brand-primary"
                />
                <span>প্রকাশিত (পাবলিক ওয়েবসাইটে দেখাবে)</span>
              </label>

              {/* Footer Buttons */}
              <div className="pt-4 border-t border-brand-primary/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-surface-sage text-ink-primary font-semibold cursor-pointer"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  disabled={isPending || uploadingCover || uploadingGallery}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-primary hover:bg-brand-dark disabled:opacity-60 text-white font-bold cursor-pointer"
                >
                  {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                  <span>
                    {formState.id
                      ? "পরিবর্তন সংরক্ষণ করুন"
                      : "পোস্ট সংরক্ষণ করুন"}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
