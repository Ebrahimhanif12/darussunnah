import type { Metadata } from "next";
import { CalendarDays } from "lucide-react";
import { PageBanner } from "@/src/components/PageBanner";
import { DepartmentsSection } from "@/src/components/sections/DepartmentsSection";
import { SectionHeader } from "@/src/components/SectionHeader";
import { StaggerContainer, StaggerItem } from "@/src/components/MotionPrimitives";
import { ACADEMIC_CALENDAR } from "@/src/data/departments";

export const metadata: Metadata = {
  title: "শিক্ষা বিভাগসমূহ ও একাডেমিক ক্যালেন্ডার",
  description:
    "আল জামিয়াতুল ইসলামিয়া দারুস সুন্নাহ, হ্নীলার কিতাব বিভাগ, হেফজ বিভাগ, নূরানী একাডেমি, ইবতেদায়ী, মকতব, ইফতা ও কম্পিউটার প্রশিক্ষণ বিভাগ এবং বার্ষিক একাডেমিক ক্যালেন্ডার।",
};

export default function DepartmentsPage() {
  return (
    <>
      <PageBanner
        title="শিক্ষা বিভাগসমূহ ও একাডেমিক ক্যালেন্ডার"
        subtitle="মকতব ও নূরানী থেকে শুরু করে হিফজুল কুরআন, দাওরায়ে হাদীস (তাকমীল), ইফতা এবং আধুনিক কম্পিউটার প্রশিক্ষণের বিস্তারিত বিবরণ।"
        breadcrumb="শিক্ষা বিভাগসমূহ"
      />

      <DepartmentsSection mode="full" />

      {/* Academic Calendar Section */}
      <section
        id="calendar"
        className="py-16 md:py-20 bg-white border-t border-brand-primary/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="একাডেমিক ক্যালেন্ডার"
            title="বার্ষিক শিক্ষাবর্ষ ও পরীক্ষার সময়সূচি"
            subtitle="হিজরী ও খ্রিস্টাব্দ ক্যালেন্ডারের সমন্বয়ে পরিচালিত আমাদের বার্ষিক পাঠদান, পরীক্ষা ও ছুটির সাধারণ রূপরেখা।"
          />

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ACADEMIC_CALENDAR.map((item) => (
              <StaggerItem key={item.id}>
                <div className="h-full rounded-2xl bg-surface-ivory border border-brand-primary/12 p-6 shadow-xs hover:shadow-md hover:border-brand-gold/60 transition-all">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-brand-primary text-white">
                      <CalendarDays className="w-3.5 h-3.5 text-brand-gold-bright" />
                      {item.periodBn}
                    </span>
                    <span className="text-xs font-semibold text-brand-secondary">
                      {item.hijriRefBn}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-ink-primary leading-snug">
                    {item.titleBn}
                  </h3>
                  <p className="mt-2 text-sm text-ink-muted leading-relaxed text-justify">
                    {item.descriptionBn}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </>
  );
}
