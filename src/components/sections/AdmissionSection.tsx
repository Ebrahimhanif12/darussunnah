import Link from "next/link";
import {
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  FileCheck2,
  GraduationCap,
  PhoneCall,
} from "lucide-react";
import { ADMISSION_INFO } from "@/src/data/admission";
import { SITE_INFO } from "@/src/data/siteInfo";
import { SectionHeader } from "@/src/components/SectionHeader";
import { FadeInUp } from "@/src/components/MotionPrimitives";

export function AdmissionSection() {
  return (
    <section
      id="admission"
      className="py-16 md:py-24 bg-gradient-to-br from-brand-dark via-brand-primary to-[#0e5832] text-white relative overflow-hidden"
    >
      <div className="absolute inset-0 islamic-pattern-dark opacity-60 pointer-events-none" />
      <div className="absolute -right-24 top-10 w-80 h-80 rounded-full bg-brand-gold/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          light
          eyebrow="ভর্তি তথ্য"
          title="নতুন শিক্ষাবর্ষে ছাত্র ভর্তি কার্যক্রম"
          subtitle={`${ADMISSION_INFO.sessionBn} — কিতাব, হেফজ, নূরানী, ইবতেদায়ী ও মকতব বিভাগে আবাসিক ও অনাবাসিক ভর্তি সংক্রান্ত প্রয়োজনীয় তথ্য।`}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Left: Key Dates & Boarding Highlights */}
          <FadeInUp className="lg:col-span-6 bg-white/8 backdrop-blur-xs rounded-2xl border border-white/15 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 text-brand-gold-soft font-bold text-base sm:text-lg mb-5">
                <CalendarClock className="w-5 h-5 text-brand-gold-bright" />
                <span>ভর্তির গুরুত্বপূর্ণ সময়সূচি</span>
              </div>

              <div className="space-y-4">
                {ADMISSION_INFO.keyDates.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-black/20 border border-white/10"
                  >
                    <p className="text-xs font-semibold text-brand-gold-soft">
                      {item.label}
                    </p>
                    <p className="text-sm sm:text-base font-bold text-white mt-0.5">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-brand-gold/15 border border-brand-gold/40 text-xs sm:text-sm text-brand-gold-soft leading-relaxed text-justify">
              <strong className="text-white">আবাসিক ও লিল্লাহ বোর্ডিং: </strong>
              {ADMISSION_INFO.boardingInfoBn}
            </div>
          </FadeInUp>

          {/* Right: Required Documents & CTA */}
          <FadeInUp
            delay={0.1}
            className="lg:col-span-6 bg-white text-ink-primary rounded-2xl p-6 sm:p-8 shadow-2xl border-t-4 border-brand-gold flex flex-col justify-between"
          >
            <div>
              <div className="inline-flex items-center gap-2 text-brand-primary font-bold text-base sm:text-lg mb-5">
                <FileCheck2 className="w-5 h-5 text-brand-gold" />
                <span>ভর্তির জন্য প্রয়োজনীয় কাগজপত্র</span>
              </div>

              <ul className="space-y-3.5 text-sm sm:text-base text-ink-body">
                {ADMISSION_INFO.requiredDocuments.map((doc, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-secondary shrink-0 mt-0.5" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-brand-primary/10 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
                <span className="text-ink-muted font-medium">
                  ভর্তি সংক্রান্ত হেল্পলাইন:
                </span>
                <a
                  href={`tel:${SITE_INFO.admissionPhoneRaw}`}
                  className="inline-flex items-center gap-1.5 font-bold text-brand-primary hover:text-brand-secondary"
                >
                  <PhoneCall className="w-4 h-4 text-brand-gold" />
                  {SITE_INFO.admissionPhone}
                </a>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/admission"
                  className="flex-1 min-w-[200px] inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-brand-primary hover:bg-brand-dark text-white font-bold text-sm sm:text-base shadow-sm transition-colors"
                >
                  <GraduationCap className="w-5 h-5 text-brand-gold-bright" />
                  <span>সম্পূর্ণ ভর্তি তথ্য ও আবেদন</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/admission#rules"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-surface-sage hover:bg-brand-primary/10 text-brand-primary font-semibold text-sm sm:text-base transition-colors"
                >
                  <span>নিয়মাবলী</span>
                </Link>
              </div>
            </div>
          </FadeInUp>
        </div>
      </div>
    </section>
  );
}
