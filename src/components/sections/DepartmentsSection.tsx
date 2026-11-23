import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  BookMarked,
  CheckCircle2,
  GraduationCap,
  Laptop,
  Scale,
  School,
  Sparkles,
} from "lucide-react";
import {
  CORE_DEPARTMENTS,
  DEPARTMENTS,
  SPECIALIZED_DEPARTMENTS,
  type Department,
  type DepartmentIconKey,
} from "@/src/data/departments";
import { SectionHeader } from "@/src/components/SectionHeader";
import { StaggerContainer, StaggerItem } from "@/src/components/MotionPrimitives";

const ICON_MAP: Record<DepartmentIconKey, React.ComponentType<{ className?: string }>> = {
  book: BookOpen,
  quran: BookMarked,
  graduation: GraduationCap,
  school: School,
  sparkles: Sparkles,
  scale: Scale,
  laptop: Laptop,
};

interface DepartmentsSectionProps {
  mode?: "preview" | "full";
}

function DepartmentCard({
  dept,
  detailed = false,
}: {
  dept: Department;
  detailed?: boolean;
}) {
  const Icon = ICON_MAP[dept.icon];

  return (
    <article
      id={dept.id}
      className="h-full bg-white rounded-2xl border border-brand-primary/12 p-6 shadow-xs hover:shadow-lg hover:-translate-y-1 hover:border-brand-gold/70 transition-all duration-300 flex flex-col relative overflow-hidden group"
    >
      <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-brand-primary to-brand-gold opacity-85 group-hover:w-2 transition-all" />

      <div className="flex items-start justify-between gap-3 mb-4 pl-2">
        <div className="w-12 h-12 rounded-xl bg-surface-sage text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-colors flex items-center justify-center border border-brand-primary/15 shrink-0">
          <Icon className="w-6 h-6" />
        </div>
        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-brand-gold-soft/75 text-brand-dark">
          বিভাগ {dept.orderBn}
        </span>
      </div>

      <div className="pl-2 flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-ink-primary group-hover:text-brand-primary transition-colors">
          {dept.nameBn}
        </h3>
        <p className="mt-1 text-xs sm:text-sm font-semibold text-brand-secondary">
          {dept.levelRangeBn}
        </p>

        <p className="mt-3 text-sm text-ink-muted leading-relaxed text-justify">
          {detailed ? dept.fullDescBn : dept.shortDescBn}
        </p>

        <ul className="mt-4 space-y-2 text-xs sm:text-sm text-ink-body">
          {(detailed ? dept.highlights : dept.highlights.slice(0, 2)).map(
            (point, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-secondary shrink-0 mt-0.5" />
                <span>{point}</span>
              </li>
            )
          )}
        </ul>

        {detailed && (
          <div className="mt-5 pt-4 border-t border-brand-primary/10 text-xs sm:text-sm">
            <span className="font-bold text-brand-primary">ভর্তির যোগ্যতা: </span>
            <span className="text-ink-muted">{dept.eligibilityBn}</span>
          </div>
        )}
      </div>
    </article>
  );
}

export function DepartmentsSection({
  mode = "preview",
}: DepartmentsSectionProps) {
  if (mode === "full") {
    return (
      <section className="py-12 md:py-16 bg-surface-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div>
            <SectionHeader
              eyebrow="মূল শিক্ষা বিভাগসমূহ"
              title="জামিয়ার পাঁচটি প্রধান শিক্ষা বিভাগ"
              subtitle="মকতব ও নূরানী থেকে শুরু করে হিফজুল কুরআন এবং দাওরায়ে হাদীস (তাকমীল) পর্যন্ত সুবিন্যস্ত পূর্ণাঙ্গ দ্বীনি শিক্ষাব্যবস্থা।"
            />
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {CORE_DEPARTMENTS.map((dept) => (
                <StaggerItem key={dept.id}>
                  <DepartmentCard dept={dept} detailed />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

          <div>
            <SectionHeader
              eyebrow="উচ্চতর ও কারিগরি শাখা"
              title="বিশেষায়িত ও কর্মমুখী প্রশিক্ষণ বিভাগ"
              subtitle="উচ্চতর ফিকহ, ফতোয়া, তাজবীদ ও আধুনিক কম্পিউটার প্রশিক্ষণের মাধ্যমে শিক্ষার্থীদের বহুমুখী দক্ষতা অর্জন।"
            />
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SPECIALIZED_DEPARTMENTS.map((dept) => (
                <StaggerItem key={dept.id}>
                  <DepartmentCard dept={dept} detailed />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="departments"
      className="py-16 md:py-24 bg-surface-sage/55 border-y border-brand-primary/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="শিক্ষা বিভাগসমূহ"
          title="সুশৃঙ্খল ও বহুমুখী দ্বীনি শিক্ষাক্রম"
          subtitle="শিশু শ্রেণির নূরানী ও মকতব থেকে শুরু করে হেফজ, ইবতেদায়ী, দাওরায়ে হাদীস, ইফতা এবং আধুনিক কম্পিউটার প্রশিক্ষণ—একই প্রাঙ্গণে পূর্ণাঙ্গ শিক্ষা।"
        />

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {DEPARTMENTS.map((dept) => (
            <StaggerItem key={dept.id}>
              <DepartmentCard dept={dept} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        <div className="mt-10 text-center">
          <Link
            href="/departments"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-primary hover:bg-brand-dark text-white font-semibold text-sm sm:text-base shadow-sm transition-colors"
          >
            <span>বিভাগসমূহ ও একাডেমিক ক্যালেন্ডার দেখুন</span>
            <ArrowRight className="w-4 h-4 text-brand-gold-bright" />
          </Link>
        </div>
      </div>
    </section>
  );
}
