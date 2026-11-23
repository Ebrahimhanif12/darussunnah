"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
} from "lucide-react";
import {
  GALLERY_CATEGORIES,
  GALLERY_ITEMS,
  type GalleryCategory,
} from "@/src/data/gallery";
import { SectionHeader } from "@/src/components/SectionHeader";
import { StaggerContainer, StaggerItem } from "@/src/components/MotionPrimitives";

interface GallerySectionProps {
  mode?: "preview" | "full";
}

export function GallerySection({ mode = "preview" }: GallerySectionProps) {
  const [selectedCategory, setSelectedCategory] =
    useState<GalleryCategory>("সকল");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const items =
    mode === "preview"
      ? GALLERY_ITEMS.filter((i) => i.featured)
      : GALLERY_ITEMS.filter(
          (i) => selectedCategory === "সকল" || i.category === selectedCategory
        );

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const showNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? null : (prev + 1) % items.length
    );
  }, [items.length]);

  const showPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? null : (prev - 1 + items.length) % items.length
    );
  }, [items.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxIndex, closeLightbox, showNext, showPrev]);

  const activeItem =
    lightboxIndex !== null && items[lightboxIndex]
      ? items[lightboxIndex]
      : null;

  return (
    <section
      id="gallery"
      className={
        mode === "preview"
          ? "py-16 md:py-24 bg-white"
          : "py-12 md:py-16 bg-surface-ivory"
      }
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {mode === "preview" && (
          <SectionHeader
            eyebrow="ফটো গ্যালারি"
            title="স্থিরচিত্রে জামিয়ার ক্যাম্পাস ও শিক্ষাঙ্গন"
            subtitle="আমাদের ঐতিহ্যবাহী ছদর গেইট, পুকুরঘাট, মসজিদ, পাঠদান হলরুম এবং আধুনিক কম্পিউটার ল্যাবের কিছু খণ্ডচিত্র।"
          />
        )}

        {mode === "full" && (
          <div className="mb-8 flex flex-wrap justify-center gap-2">
            {GALLERY_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat);
                  setLightboxIndex(null);
                }}
                className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-brand-primary text-white border-brand-primary shadow-xs"
                    : "bg-white text-ink-body border-brand-primary/15 hover:bg-surface-sage hover:text-brand-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Responsive Masonry-feel Grid */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item, idx) => (
            <StaggerItem key={item.id}>
              <button
                type="button"
                onClick={() => setLightboxIndex(idx)}
                className="group relative w-full h-64 sm:h-72 rounded-2xl overflow-hidden bg-brand-dark border border-brand-primary/15 shadow-xs hover:shadow-xl transition-all duration-300 text-left cursor-pointer block"
              >
                <Image
                  src={item.src}
                  alt={item.titleBn}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

                <span className="absolute top-3.5 left-3.5 px-2.5 py-1 rounded-full bg-brand-dark/75 backdrop-blur-xs border border-brand-gold/40 text-brand-gold-soft text-[11px] font-semibold">
                  {item.category}
                </span>

                <span className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-white/15 backdrop-blur-xs text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-4 h-4" />
                </span>

                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 text-white">
                  <h3 className="text-sm sm:text-base font-bold leading-snug">
                    {item.titleBn}
                  </h3>
                  <p className="mt-1 text-xs text-white/80 line-clamp-2">
                    {item.captionBn}
                  </p>
                </div>
              </button>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {mode === "preview" && (
          <div className="mt-10 text-center">
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-primary hover:bg-brand-dark text-white font-semibold text-sm sm:text-base shadow-sm transition-colors"
            >
              <span>সম্পূর্ণ ফটো গ্যালারি দেখুন</span>
              <ArrowRight className="w-4 h-4 text-brand-gold-bright" />
            </Link>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeItem && lightboxIndex !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeLightbox}
              className="absolute inset-0 bg-black/88 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative z-10 w-full max-w-4xl bg-brand-dark rounded-2xl overflow-hidden border border-brand-gold/40 shadow-2xl"
            >
              <button
                type="button"
                onClick={closeLightbox}
                aria-label="বন্ধ করুন"
                className="absolute top-3.5 right-3.5 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-brand-primary text-white flex items-center justify-center border border-white/20 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {items.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={showPrev}
                    aria-label="পূর্ববর্তী ছবি"
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-brand-primary text-white flex items-center justify-center border border-white/20 cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={showNext}
                    aria-label="পরবর্তী ছবি"
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-brand-primary text-white flex items-center justify-center border border-white/20 cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              <div className="relative w-full h-[55vh] sm:h-[65vh] bg-black flex items-center justify-center">
                <Image
                  src={activeItem.src}
                  alt={activeItem.titleBn}
                  fill
                  sizes="90vw"
                  className="object-contain"
                />
              </div>

              <div className="p-4 sm:p-5 bg-brand-dark text-white border-t border-white/10">
                <span className="inline-block text-xs font-semibold text-brand-gold-soft mb-1">
                  {activeItem.category}
                </span>
                <h3 className="text-base sm:text-lg font-bold">
                  {activeItem.titleBn}
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-white/80 leading-relaxed">
                  {activeItem.captionBn}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
