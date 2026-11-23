"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Info,
} from "lucide-react";
import { HERO_SLIDES, SITE_INFO } from "@/src/data/siteInfo";

export function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(nextSlide, 5500);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  const slide = HERO_SLIDES[current];

  return (
    <section
      aria-label="জামিয়া পরিচিতি স্লাইডশো"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full h-[500px] sm:h-[560px] md:h-[620px] overflow-hidden bg-brand-dark"
    >
      {/* Background Slide Image with Smooth Crossfade & Subtle Ken Burns */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0.25, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0.2 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={slide.image}
            alt={slide.alt}
            fill
            priority={current === 0}
            sizes="100vw"
            className="object-cover object-center"
          />
          {/* Rich emerald-to-charcoal gradient overlay for crisp Bangla readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#062716]/92 via-[#07331d]/75 to-[#07331d]/45" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#062716]/85 via-transparent to-black/25" />
        </motion.div>
      </AnimatePresence>

      {/* Content Overlay */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="max-w-2xl py-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-gold/20 border border-brand-gold/50 backdrop-blur-xs text-brand-gold-soft text-xs sm:text-sm font-semibold mb-4">
                <span className="w-2 h-2 rounded-full bg-brand-gold-bright animate-pulse" />
                <span>{slide.eyebrow}</span>
              </div>

              <h2 className="text-2xl sm:text-4xl md:text-[2.85rem] font-bold text-white leading-[1.22] drop-shadow-sm">
                {slide.title}
              </h2>

              <p className="mt-4 text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-xl">
                {slide.subtitle}
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3 sm:gap-4">
                <Link
                  href="/admission"
                  className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 rounded-xl bg-brand-gold hover:bg-brand-gold-bright text-brand-dark font-bold text-sm sm:text-base shadow-lg shadow-black/25 transition-all hover:-translate-y-0.5"
                >
                  <GraduationCap className="w-5 h-5" />
                  <span>ভর্তি তথ্য দেখুন</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 rounded-xl bg-white/12 hover:bg-white/22 text-white border border-white/30 backdrop-blur-xs font-semibold text-sm sm:text-base transition-all hover:-translate-y-0.5"
                >
                  <Info className="w-4 h-4 text-brand-gold-soft" />
                  <span>আমাদের সম্পর্কে জানুন</span>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Subtle Arabic Motto Watermark */}
          <p
            dir="rtl"
            className="hidden sm:block mt-8 font-arabic text-base text-brand-gold-soft/80"
          >
            {SITE_INFO.mottoAr} — {SITE_INFO.mottoBn}
          </p>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        type="button"
        onClick={prevSlide}
        aria-label="পূর্ববর্তী স্লাইড"
        className="hidden sm:flex absolute left-4 lg:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/35 hover:bg-brand-primary border border-white/25 text-white items-center justify-center backdrop-blur-xs transition-colors cursor-pointer"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        type="button"
        onClick={nextSlide}
        aria-label="পরবর্তী স্লাইড"
        className="hidden sm:flex absolute right-4 lg:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/35 hover:bg-brand-primary border border-white/25 text-white items-center justify-center backdrop-blur-xs transition-colors cursor-pointer"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Slide Indicator Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-black/30 backdrop-blur-xs px-3 py-1.5 rounded-full border border-white/15">
        {HERO_SLIDES.map((s, idx) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setCurrent(idx)}
            aria-label={`স্লাইড ${idx + 1}`}
            aria-current={idx === current ? "true" : undefined}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              idx === current
                ? "w-7 bg-brand-gold-bright"
                : "w-2 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
