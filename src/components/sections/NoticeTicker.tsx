import Link from "next/link";
import { BellRing } from "lucide-react";
import { NOTICES as STATIC_NOTICES, type Notice } from "@/src/data/notices";

interface NoticeTickerProps {
  notices?: Notice[];
}

export function NoticeTicker({ notices = STATIC_NOTICES }: NoticeTickerProps) {
  const items = notices.slice(0, 5);

  return (
    <div className="bg-white border-b border-brand-primary/15 shadow-xs">
      <div className="max-w-7xl mx-auto flex items-stretch overflow-hidden">
        {/* Badge */}
        <Link
          href="/notices"
          className="shrink-0 bg-[#9f1d1d] hover:bg-[#841616] text-white px-3.5 sm:px-5 py-2.5 flex items-center gap-2 text-xs sm:text-sm font-bold tracking-wide z-10 transition-colors"
        >
          <BellRing className="w-4 h-4 text-brand-gold-soft shrink-0 animate-pulse" />
          <span>সর্বশেষ নোটিশ</span>
        </Link>

        {/* Scrolling Track (pauses on hover/focus) */}
        <div className="notice-ticker-wrapper relative flex-1 overflow-hidden flex items-center bg-surface-sage/55">
          <div className="animate-notice-marquee flex items-center py-2.5">
            {[...items, ...items].map((notice, index) => (
              <Link
                key={`${notice.id}-${index}`}
                href="/notices"
                className="inline-flex items-center gap-2.5 px-6 text-xs sm:text-sm font-medium text-ink-primary hover:text-brand-primary transition-colors whitespace-nowrap"
              >
                <span className="inline-block px-2 py-0.5 rounded bg-brand-primary/10 text-brand-primary text-[11px] font-semibold">
                  {notice.category}
                </span>
                <span>{notice.titleBn}</span>
                <span className="text-brand-gold font-bold pl-3" aria-hidden>
                  ✦
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
