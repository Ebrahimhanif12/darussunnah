"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  ExternalLink,
  FileText,
  Pin,
  Search,
  X,
} from "lucide-react";
import {
  NOTICE_CATEGORIES,
  NOTICES as STATIC_NOTICES,
  type Notice,
  type NoticeCategory,
} from "@/src/data/notices";
import { SectionHeader } from "@/src/components/SectionHeader";
import { StaggerContainer, StaggerItem } from "@/src/components/MotionPrimitives";

interface NoticeBoardSectionProps {
  mode?: "preview" | "full";
  notices?: Notice[];
}

const CATEGORY_STYLES: Record<NoticeCategory, string> = {
  ভর্তি: "bg-emerald-50 text-emerald-800 border-emerald-200",
  পরীক্ষা: "bg-amber-50 text-amber-800 border-amber-200",
  ছুটি: "bg-sky-50 text-sky-800 border-sky-200",
  "মাহফিল ও অনুষ্ঠান": "bg-purple-50 text-purple-800 border-purple-200",
  সাধারণ: "bg-slate-100 text-slate-700 border-slate-200",
};

export function NoticeBoardSection({
  mode = "preview",
  notices = STATIC_NOTICES,
}: NoticeBoardSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<
    "সকল" | NoticeCategory
  >("সকল");
  const [query, setQuery] = useState("");
  const [activeNotice, setActiveNotice] = useState<Notice | null>(null);

  const filteredNotices = notices.filter((notice) => {
    const matchesCat =
      selectedCategory === "সকল" || notice.category === selectedCategory;
    const q = query.trim().toLowerCase();
    const matchesSearch =
      !q ||
      notice.titleBn.toLowerCase().includes(q) ||
      notice.summaryBn.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  const displayedNotices =
    mode === "preview" ? filteredNotices.slice(0, 4) : filteredNotices;

  return (
    <section
      id="notices"
      className={
        mode === "preview"
          ? "py-16 md:py-20 bg-surface-sage/60 border-y border-brand-primary/10"
          : "py-12 md:py-16 bg-surface-ivory"
      }
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {mode === "preview" && (
          <SectionHeader
            eyebrow="নোটিশ বোর্ড"
            title="সাম্প্রতিক বিজ্ঞপ্তি ও ঘোষণা"
            subtitle="ভর্তি, পরীক্ষা, ছুটি এবং জামিয়ার সকল গুরুত্বপূর্ণ আনুষ্ঠানিক বিজ্ঞপ্তি এখান থেকে সরাসরি দেখুন।"
          />
        )}

        {/* Filter & Search Bar in full mode */}
        {mode === "full" && (
          <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-brand-primary/12 shadow-xs">
            <div className="flex flex-wrap gap-2">
              {NOTICE_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-brand-primary text-white shadow-xs"
                      : "bg-surface-sage text-ink-body hover:bg-brand-primary/10 hover:text-brand-primary"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-ink-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="নোটিশ খুঁজুন..."
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-brand-primary/20 bg-surface-ivory/50 text-sm text-ink-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary"
              />
            </div>
          </div>
        )}

        {/* Notices Grid */}
        {displayedNotices.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-brand-primary/10">
            <FileText className="w-10 h-10 text-ink-muted/50 mx-auto mb-3" />
            <p className="text-ink-muted font-medium">
              আপনার অনুসন্ধানের সাথে মিলে এমন কোনো নোটিশ পাওয়া যায়নি।
            </p>
          </div>
        ) : (
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {displayedNotices.map((notice) => (
              <StaggerItem key={notice.id}>
                <article className="h-full bg-white rounded-2xl border border-brand-primary/12 p-5 sm:p-6 shadow-xs hover:shadow-md hover:border-brand-gold/60 transition-all duration-300 flex gap-4 group">
                  {/* Date Box */}
                  <div className="shrink-0 w-16 sm:w-20 rounded-xl bg-gradient-to-b from-brand-primary to-brand-dark text-white flex flex-col items-center justify-center p-2 text-center border-b-[3px] border-brand-gold self-start">
                    <span className="text-xl sm:text-2xl font-bold leading-none">
                      {notice.dayBn}
                    </span>
                    <span className="text-[11px] sm:text-xs text-brand-gold-soft mt-1 font-medium">
                      {notice.monthYearBn}
                    </span>
                  </div>

                  {/* Notice Content */}
                  <div className="flex-1 min-w-0 flex flex-col">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                          CATEGORY_STYLES[notice.category]
                        }`}
                      >
                        {notice.category}
                      </span>
                      {notice.isPinned && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-red-50 text-red-700 border border-red-200">
                          <Pin className="w-3 h-3" />
                          জরুরি
                        </span>
                      )}
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-ink-primary group-hover:text-brand-primary transition-colors leading-snug">
                      {notice.titleBn}
                    </h3>

                    <p className="mt-2 text-sm text-ink-muted leading-relaxed line-clamp-2 text-justify">
                      {notice.summaryBn}
                    </p>

                    <div className="mt-auto pt-4 flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 text-xs text-ink-muted">
                        <Calendar className="w-3.5 h-3.5 text-brand-gold" />
                        {notice.dateBn}
                      </span>
                      <button
                        type="button"
                        onClick={() => setActiveNotice(notice)}
                        className="inline-flex items-center gap-1 text-sm font-semibold text-brand-primary hover:text-brand-secondary cursor-pointer"
                      >
                        <span>বিস্তারিত পড়ুন</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                      </button>
                    </div>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}

        {mode === "preview" && (
          <div className="mt-9 text-center">
            <Link
              href="/notices"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-primary hover:bg-brand-dark text-white font-semibold text-sm sm:text-base shadow-sm transition-colors"
            >
              <span>সকল নোটিশ দেখুন</span>
              <ArrowRight className="w-4 h-4 text-brand-gold-bright" />
            </Link>
          </div>
        )}
      </div>

      {/* Notice Details Modal */}
      <AnimatePresence>
        {activeNotice && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveNotice(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.2 }}
              className="relative z-10 w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-brand-primary/15 overflow-hidden max-h-[88vh] flex flex-col"
            >
              <div className="bg-brand-primary text-white px-6 py-4 flex items-start justify-between gap-4 border-b-2 border-brand-gold">
                <div>
                  <div className="flex items-center gap-2 text-xs text-brand-gold-soft mb-1">
                    <span>{activeNotice.category}</span>
                    <span>•</span>
                    <span>প্রকাশিত: {activeNotice.dateBn}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold leading-snug">
                    {activeNotice.titleBn}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveNotice(null)}
                  aria-label="বন্ধ করুন"
                  className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center shrink-0 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto space-y-4 text-sm sm:text-base text-ink-body leading-relaxed text-justify">
                {activeNotice.bodyBn.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
                {activeNotice.attachmentUrl && (
                  <div className="pt-2">
                    <a
                      href={activeNotice.attachmentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-sage hover:bg-brand-primary hover:text-white text-brand-primary font-semibold text-sm border border-brand-primary/20 transition-colors"
                    >
                      <FileText className="w-4 h-4" />
                      <span>সংযুক্ত ফাইল / বিজ্ঞপ্তি দেখুন</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}

                <div className="pt-4 mt-4 border-t border-brand-primary/10 text-sm font-semibold text-brand-primary">
                  আদেশক্রমে: {activeNotice.issuedByBn}
                </div>
              </div>

              <div className="px-6 py-3.5 bg-surface-ivory border-t border-brand-primary/10 flex justify-end">
                <button
                  type="button"
                  onClick={() => setActiveNotice(null)}
                  className="px-5 py-2 rounded-lg bg-brand-primary hover:bg-brand-dark text-white text-sm font-semibold cursor-pointer transition-colors"
                >
                  বন্ধ করুন
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
