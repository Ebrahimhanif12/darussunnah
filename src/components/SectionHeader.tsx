import { FadeInUp } from "./MotionPrimitives";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  light?: boolean;
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
  light = false,
}: SectionHeaderProps) {
  const isCenter = align === "center";

  return (
    <FadeInUp
      className={`mb-10 md:mb-12 ${
        isCenter ? "text-center max-w-3xl mx-auto" : "text-left max-w-2xl"
      }`}
    >
      {eyebrow && (
        <span
          className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs sm:text-sm font-semibold tracking-wide mb-3 border ${
            light
              ? "bg-white/10 text-brand-gold-soft border-brand-gold/40"
              : "bg-brand-primary/8 text-brand-primary border-brand-primary/15"
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
          {eyebrow}
        </span>
      )}

      <h2
        className={`text-2xl sm:text-3xl md:text-4xl font-bold leading-snug ${
          light ? "text-white" : "text-ink-primary"
        }`}
      >
        {title}
      </h2>

      {/* Ornamental Islamic divider echoing banner.jpg */}
      <div
        className={`mt-3.5 flex items-center gap-2 ${
          isCenter ? "justify-center" : "justify-start"
        }`}
        aria-hidden="true"
      >
        <span className="h-[2px] w-10 rounded-full bg-gradient-to-r from-transparent to-brand-gold" />
        <span className="w-2.5 h-2.5 rotate-45 bg-brand-gold rounded-[2px]" />
        <span className="h-[2px] w-10 rounded-full bg-gradient-to-l from-transparent to-brand-gold" />
      </div>

      {subtitle && (
        <p
          className={`mt-4 text-sm sm:text-base leading-relaxed ${
            light ? "text-white/80" : "text-ink-muted"
          }`}
        >
          {subtitle}
        </p>
      )}
    </FadeInUp>
  );
}
