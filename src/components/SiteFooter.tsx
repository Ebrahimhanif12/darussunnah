import Image from "next/image";
import Link from "next/link";
import {
  Clock,
  ExternalLink,
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

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Institutional Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-full overflow-hidden bg-white p-0.5 ring-2 ring-brand-gold shrink-0">
                <Image
                  src={SITE_INFO.logo}
                  alt={SITE_INFO.nameBn}
                  width={56}
                  height={56}
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
              <div>
                <p
                  dir="rtl"
                  className="font-arabic text-base text-brand-gold-soft leading-tight text-left"
                >
                  {SITE_INFO.nameAr}
                </p>
                <h2 className="font-bold text-white text-base leading-snug mt-0.5">
                  {SITE_INFO.shortNameBn}
                </h2>
              </div>
            </div>

            <p className="text-sm text-white/75 leading-relaxed">
              ১৯২৭ সালে প্রতিষ্ঠিত টেকনাফ ও কক্সবাজারের শতবর্ষী ঐতিহ্যবাহী
              দ্বীনি বিদ্যাপীঠ। পবিত্র কুরআন ও সুন্নাহর বিশুদ্ধ শিক্ষা, আদর্শ
              চরিত্র গঠন এবং মানবতার কল্যাণে নিবেদিত।
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/8 border border-brand-gold/30">
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

          {/* Column 4: Contact & Donation CTA */}
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
                মাদরাসায় অনুদান দিন
              </Link>
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

        {/* Bottom Copyright Strip */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-white/65">
          <p className="text-center sm:text-left">
            © {SITE_INFO.copyrightYearBn} {SITE_INFO.nameBn}। সর্বস্বত্ব
            সংরক্ষিত।
          </p>
          <p className="font-english text-[11px] tracking-wider uppercase text-brand-gold-soft/80">
            {SITE_INFO.nameEn} • Est. 1927
          </p>
        </div>
      </div>
    </footer>
  );
}
