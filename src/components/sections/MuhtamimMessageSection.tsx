import Image from "next/image";
import { Quote } from "lucide-react";
import { MUHTAMIM_MESSAGE, SITE_INFO } from "@/src/data/siteInfo";
import { SectionHeader } from "@/src/components/SectionHeader";
import { FadeInUp } from "@/src/components/MotionPrimitives";

export function MuhtamimMessageSection() {
  return (
    <section
      id="muhtamim"
      className="py-16 md:py-24 bg-white relative overflow-hidden"
    >
      <div className="absolute inset-0 islamic-pattern opacity-45 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="মুহতামিমের বাণী"
          title="অভিভাবক, শিক্ষার্থী ও শুভানুধ্যায়ীদের প্রতি আহ্বান"
          subtitle="জামিয়ার সার্বিক তত্ত্বাবধান ও দিকনির্দেশনায় নিয়োজিত সম্মানিত মুহতামিম মহোদয়ের স্বাগত বাণী।"
        />

        <FadeInUp>
          <div className="bg-gradient-to-br from-surface-ivory via-white to-surface-sage/50 rounded-3xl border border-brand-primary/15 shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Left Dignity Portrait Frame */}
              <div className="lg:col-span-4 bg-gradient-to-b from-brand-dark via-brand-primary to-[#0e5a34] text-white p-8 sm:p-10 flex flex-col items-center justify-center text-center relative">
                <div className="absolute inset-0 islamic-pattern-dark opacity-45 pointer-events-none" />

                <div className="relative z-10 flex flex-col items-center">
                  {/* Arch-inspired Dignified Institutional Portrait Placeholder */}
                  <div className="w-40 h-44 sm:w-44 sm:h-48 rounded-t-full rounded-b-2xl border-2 border-brand-gold bg-white/10 backdrop-blur-xs p-3 flex flex-col items-center justify-center shadow-xl">
                    <div className="w-24 h-24 rounded-full overflow-hidden bg-white p-1 ring-2 ring-brand-gold-soft shadow-md">
                      <Image
                        src={SITE_INFO.logo}
                        alt={MUHTAMIM_MESSAGE.nameBn}
                        width={96}
                        height={96}
                        className="w-full h-full object-contain rounded-full"
                      />
                    </div>
                    <span
                      dir="rtl"
                      className="mt-3 font-arabic text-sm text-brand-gold-soft"
                    >
                      حفظه الله تعالى
                    </span>
                  </div>

                  <h3 className="mt-6 text-xl font-bold text-white leading-snug">
                    {MUHTAMIM_MESSAGE.nameBn}
                  </h3>
                  <p className="mt-1.5 text-sm font-semibold text-brand-gold-soft">
                    {MUHTAMIM_MESSAGE.titleBn}
                  </p>
                  <p className="mt-1 text-xs text-white/75 max-w-xs leading-relaxed">
                    {MUHTAMIM_MESSAGE.organizationRoleBn}
                  </p>

                  {/* Executive Director Acknowledgment */}
                  <div className="mt-6 pt-5 border-t border-white/15 w-full">
                    <p className="text-[11px] uppercase tracking-wider text-brand-gold-soft/85">
                      সার্বিক পরিচালনায় সহযোগী
                    </p>
                    <p className="mt-1 text-sm font-bold text-white">
                      {MUHTAMIM_MESSAGE.executiveNameBn}
                    </p>
                    <p className="text-xs text-white/75">
                      {MUHTAMIM_MESSAGE.executiveTitleBn}, জামিয়া দারুস সুন্নাহ,
                      হ্নীলা
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Formal Bangla Message */}
              <div className="lg:col-span-8 p-7 sm:p-10 md:p-12 flex flex-col justify-center relative">
                <Quote
                  className="w-12 h-12 text-brand-gold/25 absolute top-6 right-7 pointer-events-none"
                  aria-hidden
                />

                <p
                  dir="rtl"
                  className="font-arabic text-xl sm:text-2xl text-brand-primary font-bold text-right sm:text-left mb-3"
                >
                  {MUHTAMIM_MESSAGE.greetingAr}
                </p>

                <p className="text-base sm:text-lg font-bold text-ink-primary mb-4">
                  {MUHTAMIM_MESSAGE.salutationBn}
                </p>

                <div className="space-y-4 text-sm sm:text-base text-ink-body leading-[1.85] text-justify">
                  {MUHTAMIM_MESSAGE.paragraphs.map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ))}
                </div>

                <div className="mt-7 pt-5 border-t border-brand-primary/10 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold text-brand-primary">
                      {MUHTAMIM_MESSAGE.nameBn}
                    </p>
                    <p className="text-xs text-ink-muted">
                      {MUHTAMIM_MESSAGE.titleBn} • {SITE_INFO.nameBn}
                    </p>
                  </div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-brand-gold-soft/70 text-brand-dark text-xs font-semibold">
                    {SITE_INFO.mottoBn}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}
