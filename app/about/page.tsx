import type { Metadata } from "next";
import Image from "next/image";
import { Compass, Heart, Landmark, Sparkles } from "lucide-react";
import { PageBanner } from "@/src/components/PageBanner";
import { SectionHeader } from "@/src/components/SectionHeader";
import { MuhtamimMessageSection } from "@/src/components/sections/MuhtamimMessageSection";
import {
  FadeInUp,
  StaggerContainer,
  StaggerItem,
} from "@/src/components/MotionPrimitives";
import {
  HISTORY_INTRO,
  HISTORY_MILESTONES,
  MISSION_PILLARS,
} from "@/src/data/history";

export const metadata: Metadata = {
  title: "আমাদের সম্পর্কে ও ইতিহাস",
  description:
    "১৯২৭ সালে প্রতিষ্ঠিত আল জামিয়াতুল ইসলামিয়া দারুস সুন্নাহ, হ্নীলার শতবর্ষী ইতিহাস (জামিয়া বৃক্ষ), লক্ষ্য ও উদ্দেশ্য এবং মুহতামিমের বাণী।",
};

const PILLAR_ICONS = [Sparkles, Heart, Compass, Landmark];

export default function AboutPage() {
  return (
    <>
      <PageBanner
        title="আমাদের সম্পর্কে ও প্রতিষ্ঠানের ইতিহাস"
        subtitle="১৯২৭ খ্রিস্টাব্দ (১৩৪৭ হিজরী) থেকে আজ অবধি পবিত্র কুরআন ও সুন্নাহর আলো ছড়ানো শতবর্ষী দ্বীনি ঐতিহ্য — ‘জামিয়া বৃক্ষ’।"
        breadcrumb="আমাদের সম্পর্কে"
      />

      {/* Full History Section */}
      <section id="history" className="py-14 md:py-20 bg-surface-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
            <div className="lg:col-span-7 space-y-4 text-ink-body text-sm sm:text-base leading-[1.85]">
              <SectionHeader
                align="left"
                eyebrow="জামিয়া বৃক্ষ"
                title={HISTORY_INTRO.titleBn}
              />
              <p className="text-base sm:text-lg font-semibold text-brand-primary">
                {HISTORY_INTRO.leadBn}
              </p>
              {HISTORY_INTRO.overviewParagraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>

            <FadeInUp className="lg:col-span-5 space-y-4">
              <div className="rounded-2xl overflow-hidden shadow-lg border-2 border-brand-gold/40 bg-white">
                <Image
                  src="/madrasahPic2.jpg"
                  alt="ঐতিহ্যবাহী ছদর গেইট — জামিয়া দারুস সুন্নাহ, হ্নীলা"
                  width={716}
                  height={924}
                  className="w-full h-[360px] object-cover"
                />
                <div className="p-4 bg-white text-xs sm:text-sm text-ink-muted">
                  <strong className="text-ink-primary">
                    ছদর গেইট (বাব ইসহাক):{" "}
                  </strong>
                  প্রতিষ্ঠাতা পরিচালক আলহাজ্ব শাহ আবুল মনজুর (রহ.) এবং ছদরে
                  মুহতামিম আল্লামা শাহ মুহাম্মদ ইসহাক ছদর সাহেব (রহ.)-এর
                  স্মৃতিবিজড়িত মূল প্রবেশদ্বার।
                </div>
              </div>
            </FadeInUp>
          </div>

          {/* Structured Chronological Timeline */}
          <SectionHeader
            eyebrow="ঐতিহাসিক কালপঞ্জি"
            title="শতবর্ষের পথচলার মাইলফলকসমূহ"
            subtitle="১৯২৫–২৬ সালে মক্তব হিসেবে বীজ বপন থেকে শুরু করে আজকের সুসংগঠিত জামিয়ায় উত্তরণের ধাপসমূহ।"
          />

          <div className="relative max-w-4xl mx-auto">
            <div
              className="hidden sm:block absolute left-6 top-2 bottom-2 w-0.5 bg-gradient-to-b from-brand-primary via-brand-gold to-brand-secondary"
              aria-hidden="true"
            />

            <StaggerContainer className="space-y-6">
              {HISTORY_MILESTONES.map((milestone) => (
                <StaggerItem key={milestone.id}>
                  <div className="relative sm:pl-16">
                    <div
                      className="hidden sm:flex absolute left-3 top-6 w-6 h-6 rounded-full bg-brand-primary border-4 border-brand-gold-soft items-center justify-center shadow-xs"
                      aria-hidden="true"
                    />
                    <div className="bg-white rounded-2xl p-6 border border-brand-primary/12 shadow-xs hover:shadow-md hover:border-brand-gold/60 transition-all">
                      <span className="inline-block px-3 py-1 rounded-full bg-brand-gold-soft/80 text-brand-dark text-xs font-bold mb-2">
                        {milestone.yearBn}
                      </span>
                      <h3 className="text-lg sm:text-xl font-bold text-ink-primary">
                        {milestone.titleBn}
                      </h3>
                      <p className="mt-2 text-sm sm:text-base text-ink-body leading-relaxed">
                        {milestone.summaryBn}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section
        id="mission"
        className="py-16 md:py-20 bg-surface-sage/60 border-y border-brand-primary/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="লক্ষ্য ও উদ্দেশ্য"
            title="আমাদের আদর্শ ও শিক্ষা দর্শন"
            subtitle="ঈমান, ইলম, আমল ও মানবসেবার সমন্বয়ে একটি আদর্শ ইসলামী সমাজ বিনির্মাণই আমাদের মূল লক্ষ্য।"
          />

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {MISSION_PILLARS.map((pillar, idx) => {
              const Icon = PILLAR_ICONS[idx % PILLAR_ICONS.length];
              return (
                <StaggerItem key={pillar.id}>
                  <div className="h-full bg-white rounded-2xl p-6 border border-brand-primary/12 shadow-xs hover:shadow-md transition-all">
                    <div className="w-12 h-12 rounded-xl bg-brand-primary text-brand-gold-soft flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-ink-primary">
                      {pillar.titleBn}
                    </h3>
                    <p className="mt-2.5 text-sm text-ink-muted leading-relaxed">
                      {pillar.descriptionBn}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Muhtamim's Message */}
      <MuhtamimMessageSection />
    </>
  );
}
