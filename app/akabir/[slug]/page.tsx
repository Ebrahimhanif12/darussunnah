import { Suspense } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Calendar,
  ChevronRight,
  Home,
  Landmark,
  Users,
} from "lucide-react";
import {
  AKABIR_DUA_BN,
  AKABIR_SCHOLARS,
  type AkabirScholar,
} from "@/src/data/akabir";

function getOrderedAkabir(): AkabirScholar[] {
  return [...AKABIR_SCHOLARS].sort((a, b) => a.precedence - b.precedence);
}

function getAkabirBySlug(slug: string): AkabirScholar | undefined {
  const normalized = decodeURIComponent(slug).trim().toLowerCase();
  return AKABIR_SCHOLARS.find((s) => s.slug?.toLowerCase() === normalized);
}

function getAdjacentAkabir(slug: string): {
  prev: AkabirScholar | null;
  next: AkabirScholar | null;
} {
  const ordered = getOrderedAkabir();
  const idx = ordered.findIndex(
    (s) => s.slug?.toLowerCase() === slug.toLowerCase(),
  );
  if (idx === -1) return { prev: null, next: null };
  return {
    prev: idx > 0 ? ordered[idx - 1] : null,
    next: idx < ordered.length - 1 ? ordered[idx + 1] : null,
  };
}

const BENGALI_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

function toBengaliNumber(num: number): string {
  return String(num)
    .split("")
    .map((ch) => (ch >= "0" && ch <= "9" ? BENGALI_DIGITS[Number(ch)] : ch))
    .join("");
}

function formatPrecedence(precedence: number): string {
  return `${precedence < 10 ? "০" : ""}${toBengaliNumber(precedence)}`;
}

type BioBlock =
  | { type: "divider" }
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string };

function parseBioBlocks(fullBio: string): BioBlock[] {
  const lines = fullBio.split(/\r?\n/);
  const blocks: BioBlock[] = [];

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) continue;

    if (/^[_—–-]{4,}$/.test(line)) {
      blocks.push({ type: "divider" });
      continue;
    }

    if (line.length <= 65 && /[:ঃ]-?$/.test(line) && !line.includes("।")) {
      blocks.push({ type: "heading", text: line });
      continue;
    }

    blocks.push({ type: "paragraph", text: line });
  }

  return blocks;
}

export async function generateStaticParams() {
  return getOrderedAkabir().map((scholar) => ({
    slug: scholar.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps<"/akabir/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const scholar = getAkabirBySlug(slug);

  if (!scholar) {
    return {
      title: "আকাবিরের তথ্য পাওয়া যায়নি",
    };
  }

  const cleanName = scholar.name.trim();

  return {
    title: `${cleanName} — স্মরণীয় আকাবির`,
    description: scholar.shortBio,
    openGraph: {
      title: cleanName,
      description: scholar.shortBio,
      images: [{ url: scholar.photo, alt: cleanName }],
    },
  };
}

async function AkabirDetailContent({
  params,
}: Pick<PageProps<"/akabir/[slug]">, "params">) {
  const { slug } = await params;
  const scholar = getAkabirBySlug(slug);

  if (!scholar) {
    notFound();
  }

  const cleanName = scholar.name.trim();
  const cleanDesignation = scholar.designation.trim();
  const cleanEra = scholar.era?.trim();
  const bioBlocks = parseBioBlocks(scholar.fullBio);
  const { prev, next } = getAdjacentAkabir(scholar.slug);
  const otherScholars = getOrderedAkabir().filter(
    (item) => item.slug !== scholar.slug,
  );

  return (
    <>
      {/* Top Emerald Header Banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#07331d] via-[#0B4D2C] to-[#0e5a34] text-white border-b-4 border-[#D4A024]">
        <div
          className="absolute inset-0 islamic-pattern-dark opacity-65 pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute -right-24 -top-24 w-72 h-72 rounded-full bg-[#D4A024]/12 blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <nav
            aria-label="ব্রেডক্রাম্ব"
            className="flex flex-wrap items-center gap-1.5 text-xs sm:text-sm text-[#f5e9c8]/90 mb-5"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-1 hover:text-white transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              হোম
            </Link>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            <Link
              href="/akabir"
              className="hover:text-white transition-colors"
            >
              স্মরণীয় আকাবির (রহ.)
            </Link>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            <span className="text-white font-medium line-clamp-1">
              {cleanName}
            </span>
          </nav>

          <div className="flex flex-wrap items-center gap-2.5 mb-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#D4A024]/20 border border-[#D4A024]/55 text-[#f5e9c8] text-xs font-bold">
              ক্রম {formatPrecedence(scholar.precedence)}
            </span>
            <span
              dir="rtl"
              className="font-arabic text-base sm:text-lg text-[#f5e9c8]"
            >
              رحمه الله تعالى
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-snug text-white">
            {cleanName}
          </h1>

          <p className="mt-2.5 text-sm sm:text-base md:text-lg font-medium text-[#f5e9c8]">
            {cleanDesignation}
          </p>

          {cleanEra && (
            <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs sm:text-sm text-white/90">
              <Calendar className="w-4 h-4 text-[#E5BC54] shrink-0" />
              <span>{cleanEra}</span>
            </div>
          )}
        </div>
      </section>

      {/* Main Biography Section */}
      <article className="relative py-12 md:py-16 bg-[#FAF9F5] overflow-hidden">
        <div
          className="absolute inset-0 islamic-pattern opacity-45 pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Left Column: Ornate Framed Portrait & Quick Facts */}
            <aside className="lg:col-span-4 lg:sticky lg:top-24">
              <div className="rounded-3xl bg-white border border-[#D4A024]/40 shadow-md overflow-hidden">
                <div className="h-1.5 bg-gradient-to-r from-[#07331d] via-[#D4A024] to-[#0B4D2C]" />

                <div className="p-6 sm:p-7 flex flex-col items-center text-center">
                  {/* Ornate Arched Portrait Frame */}
                  <div className="w-full max-w-[250px] p-[3px] rounded-t-[132px] rounded-b-2xl bg-gradient-to-b from-[#E5BC54] via-[#D4A024] to-[#9E7212] shadow-lg">
                    <div className="bg-[#0B4D2C] p-2 rounded-t-[125px] rounded-b-[14px]">
                      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-t-[118px] rounded-b-[10px] border border-[#D4A024]/75 bg-[#07331d]">
                        <Image
                          src={scholar.photo}
                          alt={cleanName}
                          fill
                          priority
                          sizes="(max-width: 1024px) 250px, 260px"
                          className="object-cover object-top"
                        />
                      </div>
                    </div>
                  </div>

                  <p
                    dir="rtl"
                    className="mt-4 font-arabic text-lg text-[#0B4D2C]"
                  >
                    رحمه الله تعالى
                  </p>

                  <h2 className="mt-1.5 text-lg font-bold text-ink-primary leading-snug">
                    {cleanName}
                  </h2>

                  <p className="mt-1 text-sm font-semibold text-[#0B4D2C]">
                    {cleanDesignation}
                  </p>

                  {cleanEra && (
                    <div className="mt-4 w-full rounded-xl bg-[#FAF9F5] border border-[#D4A024]/30 px-3.5 py-2.5 text-xs text-ink-body leading-relaxed flex items-start gap-2 text-left">
                      <Calendar className="w-4 h-4 text-[#D4A024] shrink-0 mt-0.5" />
                      <span>{cleanEra}</span>
                    </div>
                  )}

                  <div className="mt-5 pt-4 border-t border-[#0B4D2C]/10 w-full flex flex-col gap-2.5">
                    <Link
                      href="/akabir"
                      className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl bg-[#eef5f0] hover:bg-[#0B4D2C] text-[#0B4D2C] hover:text-white font-semibold text-sm transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>সকল আকাবিরের তালিকা</span>
                    </Link>
                  </div>
                </div>
              </div>
            </aside>

            {/* Right Column: Complete Biography */}
            <div className="lg:col-span-8 min-w-0">
              <div className="rounded-3xl bg-white border border-[#0B4D2C]/12 shadow-sm overflow-hidden">
                <div className="h-1.5 bg-gradient-to-r from-[#0B4D2C] via-[#D4A024] to-[#156e3b]" />

                <div className="p-6 sm:p-8 md:p-10">
                  {/* Section Badge */}
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-[#0B4D2C] mb-4">
                    <BookOpen className="w-4 h-4 text-[#D4A024]" />
                    <span>পূর্ণাঙ্গ পরিচিতি ও জীবনচরিত</span>
                  </div>

                  {/* Highlighted Short Summary */}
                  <div className="pl-4 sm:pl-5 border-l-4 border-[#D4A024] bg-[#FAF9F5] rounded-r-2xl py-3.5 pr-4 sm:pr-5 mb-7">
                    <p className="text-sm sm:text-base font-semibold text-ink-primary leading-relaxed">
                      {scholar.shortBio}
                    </p>
                  </div>

                  {/* Formatted Full Biography */}
                  <div className="space-y-4 text-[15px] sm:text-base text-ink-body leading-[1.95]">
                    {bioBlocks.map((block, idx) => {
                      if (block.type === "divider") {
                        return (
                          <hr
                            key={idx}
                            className="border-[#D4A024]/35 my-5"
                          />
                        );
                      }

                      if (block.type === "heading") {
                        return (
                          <h3
                            key={idx}
                            className="pt-3 text-base sm:text-lg font-bold text-[#0B4D2C] flex items-center gap-2.5"
                          >
                            <span className="h-5 w-1 rounded-full bg-[#D4A024] shrink-0" />
                            <span>{block.text}</span>
                          </h3>
                        );
                      }

                      return (
                        <p key={idx} className="text-justify">
                          {block.text}
                        </p>
                      );
                    })}
                  </div>

                  {/* Closing Dua Strip */}
                  <div className="mt-9 pt-6 border-t border-[#0B4D2C]/10">
                    <div className="rounded-2xl bg-gradient-to-r from-[#07331d] via-[#0B4D2C] to-[#0f5c35] text-white border border-[#D4A024]/60 px-5 py-5 sm:px-7 sm:py-6 text-center">
                      <p
                        dir="rtl"
                        className="font-arabic text-xl sm:text-2xl text-[#f5e9c8] mb-1.5"
                      >
                        رَحِمَهُ اللهُ تَعَالَى وَأَسْكَنَهُ فَسِيحَ جَنَّاتِهِ
                      </p>
                      <p className="text-sm sm:text-base font-semibold text-white/95">
                        “{AKABIR_DUA_BN}”
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Previous / Next Scholar Navigation */}
              {(prev || next) && (
                <nav
                  aria-label="পূর্ববর্তী ও পরবর্তী আকাবির"
                  className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                  {prev ? (
                    <Link
                      href={`/akabir/${prev.slug}`}
                      className="group flex items-center gap-3.5 p-4 rounded-2xl bg-white border border-[#0B4D2C]/14 hover:border-[#D4A024]/75 shadow-xs hover:shadow-md transition-all"
                    >
                      <div className="relative w-12 h-14 shrink-0 rounded-t-xl rounded-b-md overflow-hidden border border-[#D4A024]/60 bg-[#07331d]">
                        <Image
                          src={prev.photo}
                          alt={prev.name.trim()}
                          fill
                          sizes="48px"
                          className="object-cover object-top"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#0B4D2C] mb-0.5">
                          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
                          পূর্ববর্তী আকাবির
                        </span>
                        <p className="text-sm font-bold text-ink-primary group-hover:text-[#0B4D2C] line-clamp-1">
                          {prev.name.trim()}
                        </p>
                      </div>
                    </Link>
                  ) : (
                    <div className="hidden sm:block" />
                  )}

                  {next && (
                    <Link
                      href={`/akabir/${next.slug}`}
                      className="group flex items-center gap-3.5 p-4 rounded-2xl bg-white border border-[#0B4D2C]/14 hover:border-[#D4A024]/75 shadow-xs hover:shadow-md transition-all text-right"
                    >
                      <div className="min-w-0 flex-1">
                        <span className="inline-flex items-center justify-end gap-1 text-xs font-semibold text-[#0B4D2C] mb-0.5">
                          পরবর্তী আকাবির
                          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                        </span>
                        <p className="text-sm font-bold text-ink-primary group-hover:text-[#0B4D2C] line-clamp-1">
                          {next.name.trim()}
                        </p>
                      </div>
                      <div className="relative w-12 h-14 shrink-0 rounded-t-xl rounded-b-md overflow-hidden border border-[#D4A024]/60 bg-[#07331d]">
                        <Image
                          src={next.photo}
                          alt={next.name.trim()}
                          fill
                          sizes="48px"
                          className="object-cover object-top"
                        />
                      </div>
                    </Link>
                  )}
                </nav>
              )}
            </div>
          </div>

          {/* Other Akabir Quick Portrait Strip */}
          {otherScholars.length > 0 && (
            <section className="mt-14 pt-10 border-t border-[#0B4D2C]/12">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-ink-primary flex items-center gap-2.5">
                  <span className="h-6 w-1.5 rounded-full bg-[#D4A024]" />
                  <span>অন্যান্য স্মরণীয় আকাবির (রহ.)</span>
                </h2>
                <Link
                  href="/akabir"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0B4D2C] hover:text-[#156e3b]"
                >
                  <Users className="w-4 h-4 text-[#D4A024]" />
                  <span>সকলকে দেখুন</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {otherScholars.map((item) => (
                  <Link
                    key={item.id}
                    href={`/akabir/${item.slug}`}
                    className="group flex flex-col rounded-2xl bg-white border border-[#0B4D2C]/12 hover:border-[#D4A024]/80 p-2.5 shadow-xs hover:shadow-md transition-all"
                  >
                    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-t-[1.75rem] rounded-b-lg border border-[#D4A024]/55 bg-[#07331d]">
                      <Image
                        src={item.photo}
                        alt={item.name.trim()}
                        fill
                        sizes="(max-width: 640px) 45vw, (max-width: 1024px) 22vw, 180px"
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <p className="mt-2.5 text-xs font-bold text-ink-primary group-hover:text-[#0B4D2C] text-center leading-snug line-clamp-2">
                      {item.name.trim()}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Footer Quick Links */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0B4D2C] hover:bg-[#07331d] text-white font-semibold text-sm transition-colors"
            >
              <Landmark className="w-4 h-4 text-[#E5BC54]" />
              <span>প্রতিষ্ঠানের ইতিহাস পড়ুন</span>
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-[#eef5f0] text-[#0B4D2C] border border-[#0B4D2C]/20 font-semibold text-sm transition-colors"
            >
              <Home className="w-4 h-4" />
              <span>হোমপেজে ফিরে যান</span>
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}

export default function AkabirDetailPage(props: PageProps<"/akabir/[slug]">) {
  return (
    <Suspense
      fallback={
        <div className="max-w-4xl mx-auto px-4 py-20 text-center text-ink-muted">
          আকাবিরের জীবনী লোড হচ্ছে...
        </div>
      }
    >
      <AkabirDetailContent params={props.params} />
    </Suspense>
  );
}
