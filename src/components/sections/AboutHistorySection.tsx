import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award, BookOpenCheck, Landmark, Users } from "lucide-react";
import { HISTORY_INTRO } from "@/src/data/history";
import { INSTITUTIONAL_STATS, SITE_INFO } from "@/src/data/siteInfo";
import { SectionHeader } from "@/src/components/SectionHeader";
import {
  AnimatedCounter,
  FadeInUp,
  StaggerContainer,
  StaggerItem,
} from "@/src/components/MotionPrimitives";

const STAT_ICONS = [Landmark, BookOpenCheck, Award, Users];

export function AboutHistorySection() {
  return (
    <section id="about" className="py-16 md:py-24 bg-surface-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left: Heritage Photo Collage */}
          <FadeInUp className="lg:col-span-5">
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border-2 border-brand-gold/40 bg-white">
                <Image
                  src="/madrasahPic2.jpg"
                  alt="ঐতিহ্যবাহী ছদর গেইট (বাব ইসহাক) — জামিয়া দারুস সুন্নাহ, হ্নীলা"
                  width={716}
                  height={924}
                  className="w-full h-[380px] sm:h-[440px] object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-dark/95 via-brand-dark/65 to-transparent p-5 text-white">
                  <span className="inline-block px-2.5 py-0.5 rounded bg-brand-gold text-brand-dark text-xs font-bold mb-1.5">
                    প্রতিষ্ঠাকাল: {SITE_INFO.establishedBn}
                  </span>
                  <p className="text-sm font-semibold">
                    ঐতিহ্যবাহী ছদর গেইট (বাব ইসহাক), হ্নীলা
                  </p>
                </div>
              </div>

              {/* Floating Secondary Campus Card */}
              <div className="hidden sm:block absolute -bottom-6 -right-5 w-48 rounded-xl overflow-hidden shadow-xl border-4 border-white bg-white">
                <Image
                  src="/madrasahPic5.jpg"
                  alt="জামিয়ার সবুজ ক্যাম্পাস আঙিনা"
                  width={1600}
                  height={1200}
                  className="w-full h-28 object-cover"
                />
              </div>
            </div>
          </FadeInUp>

          {/* Right: History Overview */}
          <div className="lg:col-span-7">
            <SectionHeader
              align="left"
              eyebrow="প্রতিষ্ঠানের ইতিহাস ও পরিচিতি"
              title={HISTORY_INTRO.titleBn}
            />

            <FadeInUp
              delay={0.08}
              className="space-y-4 text-ink-body text-sm sm:text-base leading-relaxed text-justify"
            >
              <p className="font-semibold text-brand-primary text-base sm:text-lg text-left">
                {HISTORY_INTRO.leadBn}
              </p>
              {HISTORY_INTRO.overviewParagraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </FadeInUp>

            <FadeInUp delay={0.14} className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-primary hover:bg-brand-dark text-white font-semibold text-sm sm:text-base shadow-sm transition-colors"
              >
                <span>সম্পূর্ণ ইতিহাস পড়ুন</span>
                <ArrowRight className="w-4 h-4 text-brand-gold-bright" />
              </Link>
              <Link
                href="/about#mission"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-surface-sage text-brand-primary border border-brand-primary/20 font-semibold text-sm sm:text-base transition-colors"
              >
                <span>লক্ষ্য ও উদ্দেশ্য</span>
              </Link>
            </FadeInUp>
          </div>
        </div>

        {/* Animated Institutional Stat Cards */}
        <StaggerContainer className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {INSTITUTIONAL_STATS.map((stat, idx) => {
            const Icon = STAT_ICONS[idx % STAT_ICONS.length];
            return (
              <StaggerItem key={stat.id}>
                <div className="h-full bg-white rounded-2xl p-5 sm:p-6 border border-brand-primary/12 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-center relative overflow-hidden">
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-brand-primary via-brand-gold to-brand-secondary" />
                  <div className="w-12 h-12 mx-auto rounded-xl bg-surface-sage text-brand-primary flex items-center justify-center mb-3.5 border border-brand-primary/10">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-bold text-brand-primary tracking-tight">
                    <AnimatedCounter
                      target={stat.value}
                      suffix={stat.suffix}
                    />
                  </div>
                  <h3 className="mt-2 text-sm sm:text-base font-bold text-ink-primary">
                    {stat.label}
                  </h3>
                  <p className="mt-1 text-xs text-ink-muted leading-snug">
                    {stat.sublabel}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
