import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface PageBannerProps {
  title: string;
  subtitle: string;
  breadcrumb: string;
  eyebrowAr?: string;
}

export function PageBanner({
  title,
  subtitle,
  breadcrumb,
  eyebrowAr = "كِتَابُ اللهِ وَ سُنَّةُ رَسُولِهِ",
}: PageBannerProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-dark via-brand-primary to-[#0e5a34] text-white border-b-4 border-brand-gold">
      <div className="absolute inset-0 islamic-pattern-dark opacity-70" />
      <div className="absolute -right-24 -top-24 w-72 h-72 rounded-full bg-brand-gold/10 blur-3xl pointer-events-none" />
      <div className="absolute -left-24 -bottom-24 w-72 h-72 rounded-full bg-white/5 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <nav
          aria-label="ব্রেডক্রাম্ব"
          className="flex items-center gap-1.5 text-xs sm:text-sm text-brand-gold-soft/90 mb-4"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-1 hover:text-white transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            হোম
          </Link>
          <ChevronRight className="w-3.5 h-3.5 opacity-60" />
          <span className="text-white font-medium">{breadcrumb}</span>
        </nav>

        <p
          dir="rtl"
          className="font-arabic text-base sm:text-lg text-brand-gold-soft mb-2"
        >
          {eyebrowAr}
        </p>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
          {title}
        </h1>

        <p className="mt-3 max-w-2xl text-sm sm:text-base text-white/85 leading-relaxed">
          {subtitle}
        </p>
      </div>
    </section>
  );
}
