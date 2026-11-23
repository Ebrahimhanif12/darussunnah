"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  Bell,
  CheckCircle2,
  Edit3,
  Eye,
  EyeOff,
  Loader2,
  Pin,
  PinOff,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";
import {
  deleteNoticeAction,
  saveNoticeAction,
  toggleNoticeFieldAction,
  type NoticeInput,
} from "@/app/admin/actions";

export interface AdminNoticeRow {
  id: string;
  title: string;
  category: string;
  summary: string;
  content: string;
  issued_by: string | null;
  published_at: string;
  is_pinned: boolean;
  is_urgent: boolean;
  is_published: boolean;
  attachment_url: string | null;
}

const CATEGORIES = [
  "ভর্তি",
  "পরীক্ষা",
  "ছুটি",
  "মাহফিল ও অনুষ্ঠান",
  "সাধারণ",
] as const;

function toDateInputValue(iso?: string): string {
  const d = iso ? new Date(iso) : new Date();
  if (Number.isNaN(d.getTime())) return new Date().toISOString().slice(0, 10);
  return d.toISOString().slice(0, 10);
}

function createEmptyNotice(): NoticeInput {
  return {
    title: "",
    category: "সাধারণ",
    summary: "",
    content: "",
    issued_by: "কর্তৃপক্ষ, আল জামিয়াতুল ইসলামিয়া দারুস সুন্নাহ, হ্নীলা",
    published_at: toDateInputValue(),
    is_pinned: false,
    is_urgent: false,
    is_published: true,
    attachment_url: "",
  };
}

export function NoticesManager({
  initialNotices,
  openNewOnMount = false,
}: {
  initialNotices: AdminNoticeRow[];
  openNewOnMount?: boolean;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [filterStatus, setFilterStatus] = useState<"all" | "published" | "draft">("all");
  const [query, setQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(openNewOnMount);
  const [formState, setFormState] = useState<NoticeInput>(createEmptyNotice);
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
    setFormState(createEmptyNotice());
    setModalOpen(true);
  };

  const openEditModal = (notice: AdminNoticeRow) => {
    setFormState({
      id: notice.id,
      title: notice.title,
      category: notice.category,
      summary: notice.summary,
      content: notice.content,
      issued_by:
        notice.issued_by ||
        "কর্তৃপক্ষ, আল জামিয়াতুল ইসলামিয়া দারুস সুন্নাহ, হ্নীলা",
      published_at: toDateInputValue(notice.published_at),
      is_pinned: notice.is_pinned,
      is_urgent: notice.is_urgent,
      is_published: notice.is_published,
      attachment_url: notice.attachment_url || "",
    });
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const res = await saveNoticeAction(formState);
      if (res.success) {
        setModalOpen(false);
        showToast("success", res.message);
        router.refresh();
      } else {
        showToast("error", res.message);
      }
    });
  };

  const handleToggle = (
    id: string,
    field: "is_pinned" | "is_published",
    nextValue: boolean
  ) => {
    startTransition(async () => {
      const res = await toggleNoticeFieldAction(id, field, nextValue);
      showToast(res.success ? "success" : "error", res.message);
      if (res.success) router.refresh();
    });
  };

  const handleDelete = (notice: AdminNoticeRow) => {
    const confirmed = window.confirm(
      `আপনি কি নিশ্চিতভাবে "${notice.title}" নোটিশটি মুছে ফেলতে চান?`
    );
    if (!confirmed) return;

    startTransition(async () => {
      const res = await deleteNoticeAction(notice.id);
      showToast(res.success ? "success" : "error", res.message);
      if (res.success) router.refresh();
    });
  };

  const filtered = initialNotices.filter((n) => {
    if (filterStatus === "published" && !n.is_published) return false;
    if (filterStatus === "draft" && n.is_published) return false;
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      n.title.toLowerCase().includes(q) ||
      n.summary.toLowerCase().includes(q) ||
      n.category.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-ink-primary flex items-center gap-2">
            <Bell className="w-6 h-6 text-brand-primary" />
            নোটিশ ব্যবস্থাপনা
          </h2>
          <p className="text-sm text-ink-muted mt-0.5">
            সকল প্রকাশিত ও খসড়া নোটিশ যোগ, সম্পাদনা, পিন বা প্রকাশ করুন।
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateModal}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-brand-primary hover:bg-brand-dark text-white font-bold text-sm shadow-sm transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-brand-gold-bright" />
          <span>নতুন নোটিশ যোগ করুন</span>
        </button>
      </div>

      {/* Toast Notification */}
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
            { key: "all", label: `সকল (${initialNotices.length})` },
            {
              key: "published",
              label: `প্রকাশিত (${initialNotices.filter((n) => n.is_published).length})`,
            },
            {
              key: "draft",
              label: `খসড়া (${initialNotices.filter((n) => !n.is_published).length})`,
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
            placeholder="নোটিশ খুঁজুন..."
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-brand-primary/20 bg-surface-ivory/50 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
          />
        </div>
      </div>

      {/* Notices List */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-brand-primary/12 p-12 text-center">
          <Bell className="w-10 h-10 text-ink-muted/40 mx-auto mb-3" />
          <p className="text-ink-muted font-medium">কোনো নোটিশ পাওয়া যায়নি।</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((notice) => (
            <div
              key={notice.id}
              className="bg-white rounded-2xl border border-brand-primary/12 p-5 shadow-xs hover:border-brand-gold/60 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4"
            >
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-surface-sage text-brand-primary border border-brand-primary/15">
                    {notice.category}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      notice.is_published
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-slate-100 text-slate-600 border border-slate-200"
                    }`}
                  >
                    {notice.is_published ? "প্রকাশিত" : "খসড়া (ড্রাফট)"}
                  </span>
                  {notice.is_pinned && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                      <Pin className="w-3 h-3" />
                      পিন করা
                    </span>
                  )}
                  <span className="text-xs text-ink-muted">
                    তারিখ: {toDateInputValue(notice.published_at)}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-ink-primary leading-snug">
                  {notice.title}
                </h3>
                <p className="text-xs sm:text-sm text-ink-muted mt-1 line-clamp-2">
                  {notice.summary}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button
                  type="button"
                  disabled={isPending}
                  onClick={() =>
                    handleToggle(notice.id, "is_pinned", !notice.is_pinned)
                  }
                  title={notice.is_pinned ? "পিন সরান" : "পিন করুন"}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
                    notice.is_pinned
                      ? "bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100"
                      : "bg-white text-ink-body border-brand-primary/15 hover:bg-surface-sage"
                  }`}
                >
                  {notice.is_pinned ? (
                    <>
                      <PinOff className="w-3.5 h-3.5" />
                      <span>আনপিন</span>
                    </>
                  ) : (
                    <>
                      <Pin className="w-3.5 h-3.5" />
                      <span>পিন</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  disabled={isPending}
                  onClick={() =>
                    handleToggle(
                      notice.id,
                      "is_published",
                      !notice.is_published
                    )
                  }
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
                    notice.is_published
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                      : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200"
                  }`}
                >
                  {notice.is_published ? (
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
                  onClick={() => openEditModal(notice)}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-brand-primary/10 text-brand-primary hover:bg-brand-primary hover:text-white transition-colors cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>সম্পাদনা</span>
                </button>

                <button
                  type="button"
                  disabled={isPending}
                  onClick={() => handleDelete(notice)}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-red-50 text-red-700 hover:bg-red-600 hover:text-white border border-red-200 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>মুছুন</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create / Edit Notice Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => !isPending && setModalOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
          />
          <div className="relative z-10 w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-brand-primary/15 overflow-hidden max-h-[90vh] flex flex-col">
            <div className="bg-brand-primary text-white px-6 py-4 flex items-center justify-between border-b-2 border-brand-gold">
              <h3 className="text-lg font-bold">
                {formState.id ? "নোটিশ সম্পাদনা করুন" : "নতুন নোটিশ যোগ করুন"}
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
              className="p-6 overflow-y-auto space-y-4 text-sm"
            >
              <div>
                <label className="block font-semibold text-ink-primary mb-1">
                  শিরোনাম *
                </label>
                <input
                  type="text"
                  required
                  value={formState.title}
                  onChange={(e) =>
                    setFormState({ ...formState, title: e.target.value })
                  }
                  placeholder="নোটিশের শিরোনাম লিখুন"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-primary/20 bg-surface-ivory/50 focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-ink-primary mb-1">
                    বিভাগ / ক্যাটাগরি *
                  </label>
                  <select
                    value={formState.category}
                    onChange={(e) =>
                      setFormState({ ...formState, category: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-primary/20 bg-surface-ivory/50 focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
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

              <div>
                <label className="block font-semibold text-ink-primary mb-1">
                  সারসংক্ষেপ *
                </label>
                <textarea
                  rows={2}
                  required
                  value={formState.summary}
                  onChange={(e) =>
                    setFormState({ ...formState, summary: e.target.value })
                  }
                  placeholder="নোটিশ কার্ড ও টিকারে প্রদর্শিত সংক্ষিপ্ত বিবরণ"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-primary/20 bg-surface-ivory/50 focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
                />
              </div>

              <div>
                <label className="block font-semibold text-ink-primary mb-1">
                  বিস্তারিত বিবরণ *
                </label>
                <textarea
                  rows={6}
                  required
                  value={formState.content}
                  onChange={(e) =>
                    setFormState({ ...formState, content: e.target.value })
                  }
                  placeholder="সম্পূর্ণ নোটিশ লিখুন (নতুন অনুচ্ছেদের জন্য Enter চাপুন)"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-primary/20 bg-surface-ivory/50 focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-ink-primary mb-1">
                    আদেশক্রমে / প্রচারকারী
                  </label>
                  <input
                    type="text"
                    value={formState.issued_by}
                    onChange={(e) =>
                      setFormState({ ...formState, issued_by: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-primary/20 bg-surface-ivory/50 focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-ink-primary mb-1">
                    সংযুক্তি URL (ঐচ্ছিক PDF/ছবি লিংক)
                  </label>
                  <input
                    type="url"
                    value={formState.attachment_url || ""}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        attachment_url: e.target.value,
                      })
                    }
                    placeholder="https://..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-primary/20 bg-surface-ivory/50 focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-5 pt-2">
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
                  <span>প্রকাশিত (পাবলিক সাইটে দেখাবে)</span>
                </label>

                <label className="inline-flex items-center gap-2 cursor-pointer font-semibold text-ink-primary">
                  <input
                    type="checkbox"
                    checked={formState.is_pinned}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        is_pinned: e.target.checked,
                        is_urgent: e.target.checked,
                      })
                    }
                    className="w-4 h-4 accent-brand-primary"
                  />
                  <span>পিন / জরুরি হিসেবে শীর্ষে রাখুন</span>
                </label>
              </div>

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
                  disabled={isPending}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-primary hover:bg-brand-dark disabled:opacity-60 text-white font-bold cursor-pointer"
                >
                  {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                  <span>
                    {formState.id ? "পরিবর্তন সংরক্ষণ করুন" : "নোটিশ প্রকাশ করুন"}
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
