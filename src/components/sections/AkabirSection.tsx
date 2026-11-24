"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen } from "lucide-react";
import {
  AKABIR_ARABIC_SUBTITLE,
  AKABIR_DUA_BN,
  AKABIR_SCHOLARS,
  type AkabirScholar,
} from "@/src/data/akabir";
import { FadeInUp, toBengaliNumber } from "@/src/components/MotionPrimitives";

function IslamicFinial({ size = "md" }: { size?: "lg" | "md" }) {
  const isLg = size === "lg";
  return (
    <div
      className="flex items-center justify-center pointer-events-none select-none"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 64 26"
        className={isLg ? "w-16 h-6" : "w-12 h-5"}
        fill="none"
      >
        <path
          d="M4 22C16 22 24 14 32 4C40 14 48 22 60 22"
          stroke="#D4A024"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M16 22C23 22 27 17 32 10C37 17 41 22 48 22"
          stroke="#0B4D2C"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <polygon
          points="32,1 35,6 32,11 29,6"
          fill="#D4A024"
          stroke="#0B4D2C"
          strokeWidth="0.9"
        />
        <circle cx="10" cy="21" r="1.8" fill="#D4A024" />
        <circle cx="54" cy="21" r="1.8" fill="#D4A024" />
      </svg>
    </div>
  );
}

interface ScholarFrameProps {
  scholar: AkabirScholar;
  tier: 1 | 2 | 3;
  delay: number;
}

function ScholarPortraitFrame({ scholar, tier, delay }: ScholarFrameProps) {
  const isTier1 = tier === 1;
  const isTier2 = tier === 2;

  const outerRadius = isTier1
    ? "rounded-t-[140px] rounded-b-2xl"
    : isTier2
      ? "rounded-t-[112px] rounded-b-2xl"
      : "rounded-t-[2.25rem] sm:rounded-t-[2.75rem] rounded-b-xl";

  const innerRadius = isTier1
    ? "rounded-t-[132px] rounded-b-[14px]"
    : isTier2
      ? "rounded-t-[105px] rounded-b-[14px]"
      : "rounded-t-[2rem] sm:rounded-t-[2.45rem] rounded-b-[10px]";

  const photoRadius = isTier1
    ? "rounded-t-[126px] rounded-b-[10px]"
    : isTier2
      ? "rounded-t-[99px] rounded-b-[10px]"
      : "rounded-t-[1.8rem] sm:rounded-t-[2.2rem] rounded-b-[8px]";

  const imageSizes = isTier1
    ? "(max-width: 640px) 248px, 280px"
    : isTier2
      ? "(max-width: 640px) 46vw, 240px"
      : "(max-width: 640px) 46vw, (max-width: 1024px) 30vw, 230px";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: 0.55,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="h-full"
    >
      <Link
        href={`/akabir/${scholar.slug}`}
        aria-label={`${scholar.name} — ${scholar.designation}`}
        className="group flex flex-col h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A024] focus-visible:ring-offset-4 focus-visible:ring-offset-[#FAF9F5] rounded-2xl"
      >
        {/* Top Ornamental Finial for Tier 1 & Tier 2 */}
        {isTier1 && (
          <div className="-mb-1.5 relative z-10 shrink-0">
            <IslamicFinial size="lg" />
          </div>
        )}
        {isTier2 && (
          <div className="-mb-1 relative z-10 shrink-0">
            <IslamicFinial size="md" />
          </div>
        )}

        {/* Outer Antique Gold Gradient Frame */}
        <div
          className={`relative flex-1 flex flex-col p-[3px] ${outerRadius} bg-gradient-to-b from-[#E5BC54] via-[#D4A024] to-[#9E7212] ${
            isTier1
              ? "shadow-[0_18px_42px_-12px_rgba(11,77,44,0.38)]"
              : isTier2
                ? "shadow-[0_14px_32px_-12px_rgba(11,77,44,0.3)]"
                : "shadow-[0_8px_22px_-10px_rgba(11,77,44,0.22)] hover:shadow-[0_14px_30px_-10px_rgba(11,77,44,0.34)]"
          } transition-shadow duration-300`}
        >
          {/* Inner Deep Emerald Matting */}
          <div
            className={`relative flex-1 flex flex-col bg-[#0B4D2C] ${
              isTier1 ? "p-2 sm:p-2.5" : isTier2 ? "p-1.5 sm:p-2" : "p-1.5"
            } ${innerRadius}`}
          >
            {/* Delicate Inner Hairline Gold Border */}
            <div
              className={`relative flex-1 flex flex-col overflow-hidden border border-[#D4A024]/70 bg-[#07331d] ${photoRadius}`}
            >
              {/* Portrait Viewport */}
              <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#0a3f24]">
                <Image
                  src={scholar.photo}
                  alt={`${scholar.name} — ${scholar.designation}`}
                  fill
                  sizes={imageSizes}
                  priority={isTier1}
                  className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.07]"
                />

                {/* Subtle Precedence Crest (top-right on Tier 3, subtle top-center shimmer on Tier 1) */}
                <span
                  className={`absolute top-2.5 right-2.5 z-10 inline-flex items-center justify-center rounded-full bg-[#07331d]/80 backdrop-blur-[2px] border border-[#D4A024]/70 text-[#f5e9c8] font-bold leading-none ${
                    isTier1
                      ? "w-7 h-7 text-xs"
                      : isTier2
                        ? "w-6 h-6 text-[11px]"
                        : "w-6 h-6 text-[10px]"
                  }`}
                >
                  {toBengaliNumber(scholar.precedence)}
                </span>

                {/* Desktop Hover Slide-Up Dark Emerald Gradient Overlay */}
                <div
                  className="hidden md:flex flex-col justify-end absolute inset-0 bg-gradient-to-t from-[#062a17]/96 via-[#0B4D2C]/82 to-transparent p-3.5 lg:p-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 group-focus-visible:opacity-100 group-focus-visible:translate-y-0 transition-all duration-300 ease-out"
                >
                  <div className="w-8 h-[2px] bg-[#D4A024] rounded-full mb-2" />
                  <h3
                    className={`font-bold text-white leading-snug ${
                      isTier1
                        ? "text-base"
                        : isTier2
                          ? "text-[15px]"
                          : "text-sm"
                    }`}
                  >
                    {scholar.name}
                  </h3>
                  <p className="mt-1 text-xs text-[#f5e9c8]/95 leading-snug line-clamp-2">
                    {scholar.designation}
                  </p>
                  <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-[#E5BC54]">
                    <span>বিস্তারিত জীবনী</span>
                    <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </div>

              {/* Mobile Compact Caption Strip (always cleanly readable without hover) */}
              <div className="md:hidden flex-1 flex flex-col justify-center bg-gradient-to-b from-[#0B4D2C] to-[#07331d] border-t border-[#D4A024]/55 px-2.5 py-2.5 text-center">
                <h3
                  className={`font-bold text-white leading-snug ${
                    isTier1 ? "text-sm" : "text-[12px]"
                  } line-clamp-2`}
                >
                  {scholar.name}
                </h3>
                <p
                  className={`mt-0.5 text-[#f5e9c8]/85 leading-snug ${
                    isTier1 ? "text-[11px]" : "text-[10px]"
                  } line-clamp-2`}
                >
                  {scholar.designation}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function AkabirSection() {
  const ordered = [...AKABIR_SCHOLARS].sort(
    (a, b) => a.precedence - b.precedence,
  );
  const tier1 = ordered.find((s) => s.precedence === 1);
  const tier2 = ordered.filter((s) => s.precedence === 2 || s.precedence === 3);
  const tier3 = ordered.filter((s) => s.precedence >= 4);

  return (
    <section
      id="akabir"
      className="relative py-16 md:py-24 bg-gradient-to-b from-white via-[#FAF9F5] to-[#eef5f0]/55 border-y border-[#0B4D2C]/10 overflow-hidden"
    >
      {/* Subtle Islamic Motif & Ambient Radiance */}
      <div
        className="absolute inset-0 islamic-pattern opacity-60 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[38rem] max-w-full h-64 bg-[#D4A024]/8 blur-3xl rounded-full pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <FadeInUp className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs sm:text-sm font-semibold tracking-wide mb-3 bg-[#0B4D2C]/8 text-[#0B4D2C] border border-[#0B4D2C]/15">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4A024]" />
            চিরস্মরণীয় মুরব্বিয়ানে কেরাম
          </span>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-ink-primary leading-snug">
            স্মরণীয় আকাবির ও উলামায়ে কেরাম (রহ.)
          </h2>

          <p
            dir="rtl"
            className="mt-2 font-arabic text-xl sm:text-2xl text-[#0B4D2C] tracking-wide"
          >
            {AKABIR_ARABIC_SUBTITLE}
          </p>

          {/* Ornamental Gold Divider */}
          <div
            className="mt-3.5 flex items-center justify-center gap-2"
            aria-hidden="true"
          >
            <span className="h-[2px] w-12 rounded-full bg-gradient-to-r from-transparent to-[#D4A024]" />
            <span className="w-2.5 h-2.5 rotate-45 bg-[#D4A024] rounded-[2px]" />
            <span className="h-[2px] w-12 rounded-full bg-gradient-to-l from-transparent to-[#D4A024]" />
          </div>

          <p className="mt-4 text-sm sm:text-base text-ink-muted leading-relaxed">
            যাঁদের অক্লান্ত ত্যাগ, নিশীথ রাতের কান্না ও ইলমি সাধনায় শতবর্ষী
            জামিয়া দারুস সুন্নাহ আজ এক সুবৃহৎ মহীরুহে পরিণত হয়েছে—সেই সকল
            মরহুম আকাবিরদের প্রতি গভীর শ্রদ্ধাঞ্জলি।
          </p>
        </FadeInUp>

        {/* Hierarchical Precedence Collage */}
        <div className="space-y-2 sm:space-y-3">
          {/* Tier 1: Centerpiece (photo_01) */}
          {tier1 && (
            <div className="w-full max-w-[235px] sm:max-w-[265px] md:max-w-[280px] mx-auto">
              <ScholarPortraitFrame scholar={tier1} tier={1} delay={0.05} />
            </div>
          )}

          {/* Subtle Golden Lineage Connector: Tier 1 -> Tier 2 */}
          <div
            className="flex flex-col items-center py-1.5 sm:py-2"
            aria-hidden="true"
          >
            <span className="w-[1.5px] h-5 sm:h-6 bg-gradient-to-b from-[#D4A024] to-[#0B4D2C]/50" />
            <span className="w-2 h-2 rotate-45 bg-[#D4A024] ring-4 ring-[#FAF9F5]" />
          </div>

          {/* Tier 2: Symmetrical Pair Directly Below Tier 1 (photo_2 & photo_3) */}
          <div className="grid grid-cols-2 gap-3.5 sm:gap-8 md:gap-12 max-w-[360px] sm:max-w-[490px] md:max-w-[530px] mx-auto">
            {tier2.map((scholar, index) => (
              <ScholarPortraitFrame
                key={scholar.id}
                scholar={scholar}
                tier={2}
                delay={0.14 + index * 0.08}
              />
            ))}
          </div>

          {/* Ornamental Gold Filigree Separator: Tier 2 -> Tier 3 */}
          <div
            className="flex items-center justify-center gap-3 py-5 sm:py-7 max-w-md mx-auto"
            aria-hidden="true"
          >
            <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#D4A024]/60 to-[#D4A024]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#0B4D2C]" />
            <span className="w-2.5 h-2.5 rotate-45 border border-[#D4A024] bg-[#FAF9F5]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#0B4D2C]" />
            <span className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#D4A024]/60 to-[#D4A024]" />
          </div>

          {/* Tier 3: Uniform Balanced Grid (photo_4 -> photo_11 in exact order) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5 md:gap-6 max-w-5xl mx-auto">
            {tier3.map((scholar, index) => (
              <ScholarPortraitFrame
                key={scholar.id}
                scholar={scholar}
                tier={3}
                delay={0.08 + index * 0.055}
              />
            ))}
          </div>
        </div>

        {/* Desktop Interaction Hint */}
        <p className="hidden md:block text-center text-xs text-ink-muted mt-7">
          যেকোনো মরহুম আলেমের ছবির ওপর মাউস রাখলে নাম ও পরিচয় দেখা যাবে এবং
          ক্লিক করলে পূর্ণাঙ্গ জীবনী পড়া যাবে।
        </p>

        {/* CTA Button & Dignified Closing Dua */}
        <FadeInUp delay={0.12} className="mt-10 md:mt-12 text-center space-y-7">
          <div>
            <Link
              href="/akabir"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#07331d] via-[#0B4D2C] to-[#0f5c35] hover:from-[#062917] hover:to-[#0B4D2C] text-white font-bold text-sm sm:text-base border-2 border-[#D4A024] shadow-[0_10px_28px_-10px_rgba(11,77,44,0.55)] hover:shadow-[0_14px_32px_-8px_rgba(11,77,44,0.65)] hover:-translate-y-0.5 transition-all duration-300"
            >
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-[#E5BC54]" />
              <span>সকল আকাবিরের বিস্তারিত জীবনী দেখুন</span>
              <ArrowRight className="w-4 h-4 text-[#E5BC54]" />
            </Link>
          </div>

          {/* Dignified Closing Dua Line */}
          <div className="max-w-2xl mx-auto rounded-2xl bg-white/85 border border-[#D4A024]/45 px-5 py-4 sm:px-8 sm:py-5 shadow-xs">
            <p className="text-sm sm:text-base md:text-lg font-semibold text-[#0B4D2C] leading-relaxed">
              “{AKABIR_DUA_BN}”
            </p>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}
