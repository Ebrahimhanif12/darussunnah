"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Landmark,
  Sparkles,
} from "lucide-react";
import {
  AKABIR_ARABIC_SUBTITLE,
  AKABIR_DUA_BN,
  AKABIR_SCHOLARS,
} from "@/src/data/akabir";
import { FadeInUp, toBengaliNumber } from "@/src/components/MotionPrimitives";

export function AkabirDetailList() {
  const ordered = [...AKABIR_SCHOLARS].sort(
    (a, b) => a.precedence - b.precedence,
  );
  const featured = ordered.filter((s) => s.precedence <= 3);
  const others = ordered.filter((s) => s.precedence >= 4);

  return (
    <section className="py-12 md:py-20 bg-[#FAF9F5] relative overflow-hidden">
      <div
        className="absolute inset-0 islamic-pattern opacity-45 pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Dignified Intro Strip */}
        <FadeInUp className="mb-10 md:mb-12">
          <div className="rounded-2xl bg-white border border-[#0B4D2C]/12 shadow-xs p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-1">
              <p
                dir="rtl"
                className="font-arabic text-lg text-[#0B4D2C] text-left"
              >
                {AKABIR_ARABIC_SUBTITLE}
              </p>
              <p className="text-sm sm:text-base text-ink-body leading-relaxed">
                জামিয়ার প্রতিষ্ঠা, বিকাশ ও ইলমি ঐতিহ্য রক্ষায় অগ্রণী ভূমিকা
                পালনকারী{" "}
                <strong className="text-[#0B4D2C]">
                  {toBengaliNumber(ordered.length)} জন স্মরণীয় আকাবির ও মরহুম
                  উলামায়ে কেরামের
                </strong>{" "}
                পরিচিতি ও জীবনী ক্রমানুসারে উপস্থাপন করা হলো।
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 self-start sm:self-center shrink-0 px-3.5 py-1.5 rounded-full bg-[#eef5f0] text-[#0B4D2C] border border-[#0B4D2C]/15 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-[#D4A024]" />
              ক্রমানুযায়ী বিন্যস্ত (১ — {toBengaliNumber(ordered.length)})
            </span>
          </div>
        </FadeInUp>

        {/* Featured Founding Akabir (Precedence 1 - 3) */}
        <div className="mb-14">
          <FadeInUp className="mb-6 flex items-center gap-3">
            <span className="h-6 w-1.5 rounded-full bg-[#D4A024]" />
            <h2 className="text-xl sm:text-2xl font-bold text-ink-primary">
              প্রতিষ্ঠাতা ও প্রধান রাহবার আকাবির (রহ.)
            </h2>
          </FadeInUp>

          <div className="space-y-6 sm:space-y-8">
            {featured.map((scholar, index) => (
              <motion.article
                key={scholar.id}
                id={scholar.id}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="scroll-mt-24 rounded-3xl bg-white border border-[#D4A024]/45 shadow-md hover:shadow-lg transition-shadow overflow-hidden"
              >
                <div className="h-1.5 bg-gradient-to-r from-[#07331d] via-[#D4A024] to-[#0B4D2C]" />

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 p-5 sm:p-7 md:p-8 items-center">
                  {/* Left: Ornate Arched Portrait Frame (clickable) */}
                  <div className="md:col-span-4 lg:col-span-3 flex flex-col items-center">
                    <Link
                      href={`/akabir/${scholar.slug}`}
                      aria-label={`${scholar.name.trim()} — বিস্তারিত জীবনী`}
                      className="group/portrait block w-full max-w-[215px] sm:max-w-[230px] p-[3px] rounded-t-[120px] rounded-b-2xl bg-gradient-to-b from-[#E5BC54] via-[#D4A024] to-[#9E7212] shadow-md hover:shadow-xl transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A024] focus-visible:ring-offset-4"
                    >
                      <div className="bg-[#0B4D2C] p-2 rounded-t-[114px] rounded-b-[14px]">
                        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-t-[106px] rounded-b-[10px] border border-[#D4A024]/70 bg-[#07331d]">
                          <Image
                            src={scholar.photo}
                            alt={scholar.name.trim()}
                            fill
                            sizes="(max-width: 768px) 220px, 230px"
                            priority={scholar.precedence === 1}
                            className="object-cover object-top transition-transform duration-500 ease-out group-hover/portrait:scale-105"
                          />
                        </div>
                      </div>
                    </Link>
                    <span
                      dir="rtl"
                      className="mt-3 font-arabic text-base text-[#0B4D2C]"
                    >
                      رحمه الله تعالى
                    </span>
                  </div>

                  {/* Right: Summary & Link to Full Biography */}
                  <div className="md:col-span-8 lg:col-span-9 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#0B4D2C] text-[#f5e9c8] text-xs font-bold">
                        ক্রম ০{toBengaliNumber(scholar.precedence)}
                      </span>
                      {scholar.era && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f5e9c8]/75 text-[#07331d] border border-[#D4A024]/40 text-xs font-semibold">
                          <Calendar className="w-3.5 h-3.5 text-[#0B4D2C]" />
                          {scholar.era}
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl sm:text-2xl md:text-[1.65rem] font-bold text-ink-primary leading-snug">
                      <Link
                        href={`/akabir/${scholar.slug}`}
                        className="hover:text-[#0B4D2C] transition-colors"
                      >
                        {scholar.name}
                      </Link>
                    </h3>
                    <p className="mt-1.5 text-sm sm:text-base font-semibold text-[#0B4D2C]">
                      {scholar.designation}
                    </p>

                    <div className="mt-4 pl-4 border-l-[3px] border-[#D4A024] bg-[#FAF9F5] rounded-r-xl py-3 pr-4">
                      <p className="text-sm sm:text-[15px] font-medium text-ink-primary leading-relaxed">
                        {scholar.shortBio}
                      </p>
                    </div>

                    <div className="mt-5">
                      <Link
                        href={`/akabir/${scholar.slug}`}
                        className="group/btn inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0B4D2C] hover:bg-[#07331d] text-white font-semibold text-sm border border-[#D4A024]/60 shadow-xs transition-colors"
                      >
                        <span>পূর্ণাঙ্গ জীবনী পড়ুন</span>
                        <ArrowRight className="w-4 h-4 text-[#E5BC54] transition-transform duration-200 group-hover/btn:translate-x-0.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Remaining Respected Akabir (Precedence 4 - 11) */}
        <div>
          <FadeInUp className="mb-6 flex items-center gap-3">
            <span className="h-6 w-1.5 rounded-full bg-[#0B4D2C]" />
            <h2 className="text-xl sm:text-2xl font-bold text-ink-primary">
              স্মরণীয় উলামায়ে কেরাম ও মুরব্বিয়ানে জামিয়া (রহ.)
            </h2>
          </FadeInUp>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-7">
            {others.map((scholar, index) => (
              <motion.article
                key={scholar.id}
                id={scholar.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{
                  duration: 0.48,
                  delay: (index % 2) * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="scroll-mt-24 h-full rounded-2xl bg-white border border-[#0B4D2C]/14 hover:border-[#D4A024]/70 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col"
              >
                <div className="h-1 bg-gradient-to-r from-[#0B4D2C] via-[#D4A024] to-[#156e3b]" />

                <div className="p-5 sm:p-6 flex-1 flex flex-col">
                  <div className="flex flex-col sm:flex-row gap-5 items-center sm:items-start">
                    {/* Framed Portrait (clickable) */}
                    <Link
                      href={`/akabir/${scholar.slug}`}
                      aria-label={`${scholar.name.trim()} — বিস্তারিত জীবনী`}
                      className="group/portrait block w-[140px] sm:w-[132px] shrink-0 p-[2.5px] rounded-t-[2.25rem] rounded-b-xl bg-gradient-to-b from-[#E5BC54] via-[#D4A024] to-[#9E7212] shadow-sm hover:shadow-lg transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A024] focus-visible:ring-offset-2"
                    >
                      <div className="bg-[#0B4D2C] p-1.5 rounded-t-[2.05rem] rounded-b-[10px]">
                        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-t-[1.85rem] rounded-b-[8px] border border-[#D4A024]/65 bg-[#07331d]">
                          <Image
                            src={scholar.photo}
                            alt={scholar.name.trim()}
                            fill
                            sizes="140px"
                            className="object-cover object-top transition-transform duration-500 ease-out group-hover/portrait:scale-105"
                          />
                        </div>
                      </div>
                    </Link>

                    {/* Header Info */}
                    <div className="flex-1 min-w-0 text-center sm:text-left">
                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#eef5f0] text-[#0B4D2C] border border-[#0B4D2C]/15 text-xs font-bold">
                          ক্রম{" "}
                          {scholar.precedence < 10 ? "০" : ""}
                          {toBengaliNumber(scholar.precedence)}
                        </span>
                        <span
                          dir="rtl"
                          className="font-arabic text-sm text-[#0B4D2C]/90"
                        >
                          رحمه الله
                        </span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold text-ink-primary leading-snug">
                        <Link
                          href={`/akabir/${scholar.slug}`}
                          className="hover:text-[#0B4D2C] transition-colors"
                        >
                          {scholar.name}
                        </Link>
                      </h3>
                      <p className="mt-1 text-sm font-semibold text-[#0B4D2C]">
                        {scholar.designation}
                      </p>

                      {scholar.era && (
                        <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-ink-muted bg-[#FAF9F5] border border-[#D4A024]/30 px-2.5 py-1 rounded-md">
                          <Calendar className="w-3.5 h-3.5 text-[#D4A024] shrink-0" />
                          <span>{scholar.era}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Short Bio & Link to Full Details Page */}
                  <div className="mt-4 pt-4 border-t border-[#0B4D2C]/10 flex-1 flex flex-col justify-between gap-4">
                    <p className="text-sm text-ink-body leading-relaxed">
                      {scholar.shortBio}
                    </p>
                    <div>
                      <Link
                        href={`/akabir/${scholar.slug}`}
                        className="group/btn inline-flex items-center gap-1.5 text-sm font-bold text-[#0B4D2C] hover:text-[#156e3b] transition-colors"
                      >
                        <span>বিস্তারিত জীবনী পড়ুন</span>
                        <ArrowRight className="w-4 h-4 text-[#D4A024] transition-transform duration-200 group-hover/btn:translate-x-0.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Dignified Closing Dua Banner */}
        <FadeInUp className="mt-14 md:mt-16">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#07331d] via-[#0B4D2C] to-[#0f5c35] text-white border-2 border-[#D4A024]/70 shadow-xl px-6 py-9 sm:px-10 sm:py-12 text-center">
            <div
              className="absolute inset-0 islamic-pattern-dark opacity-60 pointer-events-none"
              aria-hidden="true"
            />
            <div className="relative max-w-2xl mx-auto">
              <p
                dir="rtl"
                className="font-arabic text-2xl sm:text-3xl text-[#f5e9c8] mb-3"
              >
                رَحِمَهُمُ اللهُ تَعَالَى وَأَسْكَنَهُمْ فَسِيحَ جَنَّاتِهِ
              </p>
              <p className="text-base sm:text-xl font-bold text-white leading-relaxed">
                “{AKABIR_DUA_BN}”
              </p>

              <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#D4A024] hover:bg-[#e0ad2b] text-[#07331d] font-bold text-sm transition-colors"
                >
                  <Landmark className="w-4 h-4" />
                  <span>প্রতিষ্ঠানের ইতিহাস পড়ুন</span>
                </Link>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/12 hover:bg-white/22 text-white border border-white/25 font-semibold text-sm transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 text-[#f5e9c8]" />
                  <span>হোমপেজে ফিরে যান</span>
                </Link>
              </div>
            </div>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}
