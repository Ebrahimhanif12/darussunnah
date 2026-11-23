"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";

interface PostGalleryLightboxProps {
  images: string[];
  titleBn: string;
}

export function PostGalleryLightbox({
  images,
  titleBn,
}: PostGalleryLightboxProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = useCallback(() => setActiveIndex(null), []);
  const next = useCallback(
    () =>
      setActiveIndex((prev) =>
        prev === null ? null : (prev + 1) % images.length
      ),
    [images.length]
  );
  const prev = useCallback(
    () =>
      setActiveIndex((prev) =>
        prev === null ? null : (prev - 1 + images.length) % images.length
      ),
    [images.length]
  );

  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, close, next, prev]);

  if (images.length === 0) return null;

  return (
    <div className="mt-10 pt-8 border-t border-brand-primary/12">
      <h2 className="text-lg sm:text-xl font-bold text-ink-primary mb-4 flex items-center gap-2">
        <span className="w-1.5 h-5 rounded-full bg-brand-gold" />
        <span>এই কার্যক্রমের স্থিরচিত্রসমূহ</span>
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {images.map((src, idx) => (
          <button
            key={`${src}-${idx}`}
            type="button"
            onClick={() => setActiveIndex(idx)}
            className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-brand-dark border border-brand-primary/15 shadow-xs hover:shadow-lg transition-all cursor-pointer"
          >
            <Image
              src={src}
              alt={`${titleBn} — ছবি ${idx + 1}`}
              fill
              sizes="(max-width: 640px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors flex items-center justify-center">
              <span className="w-9 h-9 rounded-full bg-black/55 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4" />
              </span>
            </div>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {activeIndex !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={close}
              className="absolute inset-0 bg-black/88 backdrop-blur-xs"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative z-10 w-full max-w-4xl bg-brand-dark rounded-2xl overflow-hidden border border-brand-gold/40 shadow-2xl"
            >
              <button
                type="button"
                onClick={close}
                aria-label="বন্ধ করুন"
                className="absolute top-3.5 right-3.5 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-brand-primary text-white flex items-center justify-center border border-white/20 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={prev}
                    aria-label="পূর্ববর্তী ছবি"
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-brand-primary text-white flex items-center justify-center border border-white/20 cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    aria-label="পরবর্তী ছবি"
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-brand-primary text-white flex items-center justify-center border border-white/20 cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              <div className="relative w-full h-[60vh] sm:h-[70vh] bg-black">
                <Image
                  src={images[activeIndex]}
                  alt={`${titleBn} — ছবি ${activeIndex + 1}`}
                  fill
                  sizes="90vw"
                  className="object-contain"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
