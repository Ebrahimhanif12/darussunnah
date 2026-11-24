import Image from "next/image";
import Link from "next/link";
import {
  Clock,
  ExternalLink,
  Globe,
  HeartHandshake,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { SITE_INFO } from "@/src/data/siteInfo";
import { CORE_DEPARTMENTS } from "@/src/data/departments";

export function SiteFooter() {
  return (
    <footer className="bg-brand-dark text-white/85 border-t-4 border-brand-gold relative overflow-hidden">
      <div className="absolute inset-0 islamic-pattern-dark opacity-50 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        {/* Clean Equal 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 items-start">
          {/* Column 1: Institutional Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="w-13 h-13 rounded-full overflow-hidden bg-white p-0.5 ring-2 ring-brand-gold shrink-0">
                <Image
                  src={SITE_INFO.logo}
                  alt={SITE_INFO.nameBn}
                  width={52}
                  height={52}
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
              <div className="min-w-0">
                <p
                  dir="rtl"
                  className="font-arabic text-base text-brand-gold-soft leading-tight text-left truncate"
                >
                  {SITE_INFO.nameAr}
                </p>
                <h2 className="font-bold text-white text-base leading-snug mt-0.5">
                  {SITE_INFO.shortNameBn}
                </h2>
              </div>
            </div>

            <p className="text-sm text-white/75 leading-relaxed text-justify">
              ১৯২৭ সালে প্রতিষ্ঠিত টেকনাফ ও কক্সবাজারের শতবর্ষী ঐতিহ্যবাহী
              দ্বীনি বিদ্যাপীঠ। পবিত্র কুরআন ও সুন্নাহর বিশুদ্ধ শিক্ষা, আদর্শ
              চরিত্র গঠন এবং মানবতার কল্যাণে নিবেদিত।
            </p>

            <div className="inline-flex items-center px-3 py-1.5 rounded-lg bg-white/8 border border-brand-gold/30">
              <span
                dir="rtl"
                className="font-arabic text-sm text-brand-gold-soft"
              >
                {SITE_INFO.mottoAr}
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-bold text-base mb-4 pb-2 border-b border-white/10 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-brand-gold rounded-full" />
              গুরুত্বপূর্ণ লিংক
            </h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: "প্রতিষ্ঠানের ইতিহাস ও পরিচিতি", href: "/about" },
                { label: "মুহতামিমের বাণী", href: "/about#muhtamim" },
                { label: "শিক্ষকমণ্ডলীর তালিকা", href: "/teachers" },
                { label: "ভর্তি তথ্য ও নিয়মাবলী", href: "/admission" },
                { label: "নোটিশ বোর্ড", href: "/notices" },
                { label: "সংবাদ ও কার্যক্রম", href: "/posts" },
                { label: "ফটো গ্যালারি", href: "/gallery" },
                { label: "যোগাযোগ ও অবস্থান", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/75 hover:text-brand-gold-soft transition-colors inline-flex items-center gap-1.5"
                  >
                    <span className="text-brand-gold text-xs">▸</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Academic Departments */}
          <div>
            <h3 className="text-white font-bold text-base mb-4 pb-2 border-b border-white/10 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-brand-gold rounded-full" />
              শিক্ষা বিভাগসমূহ
            </h3>
            <ul className="space-y-2.5 text-sm">
              {CORE_DEPARTMENTS.map((dept) => (
                <li key={dept.id}>
                  <Link
                    href={`/departments#${dept.id}`}
                    className="text-white/75 hover:text-brand-gold-soft transition-colors inline-flex items-center gap-1.5"
                  >
                    <span className="text-brand-gold text-xs">▸</span>
                    {dept.nameBn}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/departments#ifta-tajweed"
                  className="text-white/75 hover:text-brand-gold-soft transition-colors inline-flex items-center gap-1.5"
                >
                  <span className="text-brand-gold text-xs">▸</span>
                  ইফতা, তাফসীর ও তাজবীদ
                </Link>
              </li>
              <li>
                <Link
                  href="/departments#computer-vocational"
                  className="text-white/75 hover:text-brand-gold-soft transition-colors inline-flex items-center gap-1.5"
                >
                  <span className="text-brand-gold text-xs">▸</span>
                  কম্পিউটার ও কারিগরি প্রশিক্ষণ
                </Link>
              </li>
              <li>
                <Link
                  href="/departments#calendar"
                  className="text-white/75 hover:text-brand-gold-soft transition-colors inline-flex items-center gap-1.5"
                >
                  <span className="text-brand-gold text-xs">▸</span>
                  একাডেমিক ক্যালেন্ডার
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Actions */}
          <div>
            <h3 className="text-white font-bold text-base mb-4 pb-2 border-b border-white/10 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-brand-gold rounded-full" />
              যোগাযোগ ও ঠিকানা
            </h3>
            <ul className="space-y-3 text-sm text-white/80">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-gold-bright shrink-0 mt-1" />
                <span>{SITE_INFO.postCodeBn}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-gold-bright shrink-0" />
                <a
                  href={`tel:${SITE_INFO.phoneRaw}`}
                  className="hover:text-brand-gold-soft transition-colors"
                >
                  {SITE_INFO.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-gold-bright shrink-0" />
                <a
                  href={`mailto:${SITE_INFO.email}`}
                  className="hover:text-brand-gold-soft transition-colors break-all"
                >
                  {SITE_INFO.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-brand-gold-bright shrink-0 mt-1" />
                <span>{SITE_INFO.officeHoursBn}</span>
              </li>
            </ul>

            <div className="mt-5 flex flex-wrap gap-2.5">
              <Link
                href="/#donation"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-brand-gold hover:bg-brand-gold-bright text-brand-dark text-xs sm:text-sm font-bold transition-colors"
              >
                <HeartHandshake className="w-4 h-4" />
                <span>মাদরাসায় অনুদান দিন</span>
              </Link>
              <a
                href={SITE_INFO.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#1877F2]/90 hover:bg-[#1877F2] text-white text-xs sm:text-sm font-semibold transition-colors"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-3.5 h-3.5"
                  aria-hidden="true"
                >
                  <path d="M22 12.07C22 6.48 17.52 2 11.93 2 6.35 2 1.87 6.48 1.87 12.07c0 5.02 3.66 9.18 8.44 9.93v-7.03H7.77v-2.9h2.54V9.85c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.89h2.78l-.44 2.9h-2.34V22c4.78-.75 8.44-4.91 8.44-9.93Z" />
                </svg>
                <span>ফেসবুক পেজ</span>
              </a>
              <a
                href={SITE_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-medium transition-colors"
              >
                <span>গুগল ম্যাপ</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Symmetrical 3-Column Bottom Strip */}
        <div className="mt-12 pt-6 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 items-center gap-3 text-xs text-white/70">
          <p className="text-center md:text-left">
            © {SITE_INFO.copyrightYearBn} {SITE_INFO.shortNameBn}। সর্বস্বত্ব
            সংরক্ষিত।
          </p>
          <div className="flex flex-wrap items-center justify-center gap-1.5 text-brand-gold-soft/90 font-medium">
            <span>
              Developed and maintained by{" "}
              <a
                href={SITE_INFO.developer.portfolioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white font-semibold hover:text-brand-gold-bright underline decoration-white/30 hover:decoration-brand-gold-bright underline-offset-2 transition-colors"
              >
                {SITE_INFO.developer.name}
              </a>
            </span>
            <span className="inline-flex items-center gap-1.5 ml-1">
              <a
                href={SITE_INFO.developer.portfolioUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${SITE_INFO.developer.name} Portfolio`}
                title="Portfolio"
                className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white/10 hover:bg-brand-gold text-white hover:text-brand-dark transition-colors"
              >
                <Globe className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
              <a
                href={SITE_INFO.developer.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${SITE_INFO.developer.name} Facebook`}
                title="Facebook"
                className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white/10 hover:bg-[#1877F2] text-white transition-colors"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-3.5 h-3.5"
                  aria-hidden="true"
                >
                  <path d="M22 12.07C22 6.48 17.52 2 11.93 2 6.35 2 1.87 6.48 1.87 12.07c0 5.02 3.66 9.18 8.44 9.93v-7.03H7.77v-2.9h2.54V9.85c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.89h2.78l-.44 2.9h-2.34V22c4.78-.75 8.44-4.91 8.44-9.93Z" />
                </svg>
              </a>
            </span>
          </div>
          <p className="font-english text-[11px] tracking-wider uppercase text-brand-gold-soft/75 text-center md:text-right">
            {SITE_INFO.nameEn} • Est. 1927
          </p>
        </div>
      </div>
    </footer>
  );
}
