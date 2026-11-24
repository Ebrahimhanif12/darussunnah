"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  GraduationCap,
  HeartHandshake,
  LogIn,
  Mail,
  MapPin,
  Menu,
  Phone,
  X,
} from "lucide-react";
import { NAVIGATION_ITEMS, SITE_INFO } from "@/src/data/siteInfo";

export function SiteHeader() {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenDropdown(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isNavItemActive = (href?: string, children?: { href: string }[]) => {
    if (href) {
      if (href === "/") return pathname === "/";
      if (href.startsWith("/#")) return false;
      return pathname === href || pathname.startsWith(`${href}/`);
    }
    if (children) {
      return children.some((child) => {
        const basePath = child.href.split("#")[0];
        return basePath && pathname === basePath;
      });
    }
    return false;
  };

  return (
    <>
      {/* 1. Top Contact & Motto Utility Bar */}
      <div className="bg-brand-dark text-white/90 text-xs sm:text-sm border-b border-brand-gold/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <a
              href={`tel:${SITE_INFO.phoneRaw}`}
              className="inline-flex items-center gap-1.5 hover:text-brand-gold-soft transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-brand-gold-bright shrink-0" />
              <span>{SITE_INFO.phone}</span>
            </a>
            <a
              href={`mailto:${SITE_INFO.email}`}
              className="hidden sm:inline-flex items-center gap-1.5 hover:text-brand-gold-soft transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-brand-gold-bright shrink-0" />
              <span>{SITE_INFO.email}</span>
            </a>
            <span className="hidden lg:inline-flex items-center gap-1.5 text-white/75">
              <MapPin className="w-3.5 h-3.5 text-brand-gold-bright shrink-0" />
              <span>{SITE_INFO.addressBn}</span>
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 ml-auto">
            <span
              dir="rtl"
              className="hidden md:inline-block font-arabic text-sm text-brand-gold-soft px-2.5 border-r border-white/15"
            >
              {SITE_INFO.mottoAr}
            </span>
            <a
              href={SITE_INFO.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="অফিসিয়াল ফেসবুক পেজ"
              title="অফিসিয়াল ফেসবুক পেজ"
              className="inline-flex items-center justify-center w-7 h-7 rounded bg-white/10 hover:bg-[#1877F2] text-white transition-colors"
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
            <Link
              href="/admission"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-white font-medium transition-colors"
            >
              <GraduationCap className="w-3.5 h-3.5 text-brand-gold-bright" />
              <span>ভর্তি তথ্য</span>
            </Link>
            <Link
              href="/#donation"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-brand-gold hover:bg-brand-gold-bright text-brand-dark font-semibold transition-colors"
            >
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>অনুদান দিন</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Institutional Brand Header (Arabic + Bangla + English) */}
      <div className="bg-white border-b border-brand-primary/10 islamic-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
          <div className="flex items-center justify-between gap-4">
            <Link
              href="/"
              className="flex items-center gap-3.5 sm:gap-5 group min-w-0"
            >
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full overflow-hidden shrink-0 ring-2 ring-brand-gold shadow-md bg-white p-0.5 transition-transform duration-300 group-hover:scale-[1.03]">
                <Image
                  src={SITE_INFO.logo}
                  alt={SITE_INFO.nameBn}
                  width={96}
                  height={96}
                  priority
                  className="w-full h-full object-contain rounded-full"
                />
              </div>

              <div className="min-w-0">
                <p
                  dir="rtl"
                  className="font-arabic text-lg sm:text-xl md:text-2xl font-bold text-brand-primary leading-tight text-left truncate"
                >
                  {SITE_INFO.nameAr}
                </p>
                <h1 className="text-lg sm:text-2xl md:text-[1.75rem] font-bold text-ink-primary leading-snug tracking-tight mt-0.5">
                  {SITE_INFO.nameBn}
                </h1>
                <p className="font-english text-[11px] sm:text-xs md:text-sm font-semibold text-brand-secondary tracking-wide uppercase mt-0.5 truncate">
                  {SITE_INFO.nameEn}
                  <span className="hidden sm:inline text-ink-muted font-sans normal-case font-medium">
                    {" "}
                    • Nhila, Teknaf, Cox&apos;s Bazar
                  </span>
                </p>
              </div>
            </Link>

            {/* Right Institutional Seal (Desktop) */}
            <div className="hidden lg:flex flex-col items-end shrink-0 text-right pl-4 border-l border-brand-primary/15">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-sage text-brand-primary text-xs font-semibold border border-brand-primary/15">
                স্থাপিত: {SITE_INFO.establishedBn}
              </span>
              <p className="mt-2 text-xs text-ink-muted max-w-[230px] leading-relaxed">
                আহলে সুন্নাত ওয়াল জামাআতের আদর্শে পরিচালিত শতবর্ষী দ্বীনি
                শিক্ষা প্রতিষ্ঠান
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Sticky Navigation Bar */}
      <header
        ref={navRef}
        className="sticky top-0 z-40 bg-brand-primary text-white shadow-md border-b-[3px] border-brand-gold"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Mobile Compact Brand Label */}
            <Link
              href="/"
              className="lg:hidden flex items-center gap-2 min-w-0"
            >
              <span className="font-bold text-sm sm:text-base text-white truncate">
                {SITE_INFO.shortNameBn}
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav
              aria-label="প্রধান নেভিগেশন"
              className="hidden lg:flex items-center gap-1"
            >
              {NAVIGATION_ITEMS.map((item) => {
                const active = isNavItemActive(item.href, item.children);

                if (item.children) {
                  const isOpen = openDropdown === item.label;
                  return (
                    <div
                      key={item.label}
                      className="relative"
                      onMouseEnter={() => setOpenDropdown(item.label)}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setOpenDropdown(isOpen ? null : item.label)
                        }
                        aria-expanded={isOpen}
                        className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-[15px] font-medium transition-colors cursor-pointer ${
                          active || isOpen
                            ? "bg-white/15 text-brand-gold-soft"
                            : "text-white/95 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        <span>{item.label}</span>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${
                            isOpen ? "rotate-180 text-brand-gold-bright" : ""
                          }`}
                        />
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 6, scale: 0.98 }}
                            transition={{ duration: 0.16, ease: "easeOut" }}
                            className="absolute left-0 top-full pt-2 w-72 z-50"
                          >
                            <div className="bg-white text-ink-primary rounded-xl shadow-xl border border-brand-primary/15 overflow-hidden py-1.5">
                              {item.children.map((sub) => (
                                <Link
                                  key={sub.href}
                                  href={sub.href}
                                  onClick={() => setOpenDropdown(null)}
                                  className="block px-4 py-2.5 hover:bg-surface-sage transition-colors group"
                                >
                                  <div className="text-sm font-semibold text-ink-primary group-hover:text-brand-primary">
                                    {sub.label}
                                  </div>
                                  {sub.description && (
                                    <div className="text-xs text-ink-muted mt-0.5 leading-snug">
                                      {sub.description}
                                    </div>
                                  )}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.label}
                    href={item.href || "/"}
                    className={`px-4 py-2 rounded-md text-[15px] font-medium transition-colors ${
                      active
                        ? "bg-white/15 text-brand-gold-soft"
                        : "text-white/95 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Right CTA */}
            <div className="hidden lg:flex items-center gap-2.5">
              <Link
                href="/admission"
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-brand-gold hover:bg-brand-gold-bright text-brand-dark text-sm font-bold shadow-sm transition-colors"
              >
                <GraduationCap className="w-4 h-4" />
                <span>ভর্তি চলছে</span>
              </Link>
              <Link
                href="/admin"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white/12 hover:bg-white/22 text-white border border-white/25 text-sm font-semibold transition-colors"
              >
                <LogIn className="w-4 h-4 text-brand-gold-soft" />
                <span>লগইন</span>
              </Link>
            </div>

            {/* Mobile Controls */}
            <div className="flex lg:hidden items-center gap-2">
              <Link
                href="/#donation"
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md bg-brand-gold text-brand-dark text-xs font-bold"
              >
                <HeartHandshake className="w-3.5 h-3.5" />
                <span>অনুদান</span>
              </Link>
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                aria-label="মেনু খুলুন"
                className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 4. Mobile Slide-Out Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="absolute inset-0 bg-black/55 backdrop-blur-[2px]"
            />

            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="absolute right-0 top-0 bottom-0 w-[86%] max-w-sm bg-white shadow-2xl flex flex-col"
            >
              {/* Drawer Header */}
              <div className="bg-brand-dark text-white px-5 py-4 flex items-center justify-between border-b-2 border-brand-gold">
                <div className="flex items-center gap-3 min-w-0">
                  <Image
                    src={SITE_INFO.logo}
                    alt={SITE_INFO.shortNameBn}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full object-contain bg-white p-0.5 shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="font-bold text-sm leading-tight truncate">
                      {SITE_INFO.shortNameBn}
                    </p>
                    <p className="text-[11px] text-brand-gold-soft truncate">
                      {SITE_INFO.addressBn}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  aria-label="মেনু বন্ধ করুন"
                  className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Navigation Links */}
              <div className="flex-1 overflow-y-auto py-3 px-3">
                <ul className="space-y-1">
                  {NAVIGATION_ITEMS.map((item) => {
                    if (item.children) {
                      const expanded = mobileExpanded === item.label;
                      return (
                        <li
                          key={item.label}
                          className="rounded-lg border border-brand-primary/10 overflow-hidden"
                        >
                          <button
                            type="button"
                            onClick={() =>
                              setMobileExpanded(expanded ? null : item.label)
                            }
                            aria-expanded={expanded}
                            className="w-full flex items-center justify-between px-4 py-3 text-left font-semibold text-ink-primary bg-surface-ivory/70 hover:bg-surface-sage transition-colors"
                          >
                            <span>{item.label}</span>
                            <ChevronDown
                              className={`w-4 h-4 text-brand-primary transition-transform duration-200 ${
                                expanded ? "rotate-180" : ""
                              }`}
                            />
                          </button>
                          <AnimatePresence initial={false}>
                            {expanded && (
                              <motion.ul
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden bg-white divide-y divide-brand-primary/5"
                              >
                                {item.children.map((sub) => (
                                  <li key={sub.href}>
                                    <Link
                                      href={sub.href}
                                      onClick={() => setMobileOpen(false)}
                                      className="block px-5 py-2.5 text-sm font-medium text-ink-body hover:text-brand-primary hover:bg-surface-sage/70 transition-colors"
                                    >
                                      {sub.label}
                                    </Link>
                                  </li>
                                ))}
                              </motion.ul>
                            )}
                          </AnimatePresence>
                        </li>
                      );
                    }

                    return (
                      <li key={item.label}>
                        <Link
                          href={item.href || "/"}
                          onClick={() => setMobileOpen(false)}
                          className="block px-4 py-3 rounded-lg font-semibold text-ink-primary hover:bg-surface-sage hover:text-brand-primary transition-colors"
                        >
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Drawer Bottom Actions */}
              <div className="p-4 border-t border-brand-primary/10 bg-surface-ivory space-y-2.5">
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/admission"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-brand-primary text-white text-sm font-semibold"
                  >
                    <GraduationCap className="w-4 h-4" />
                    ভর্তি তথ্য
                  </Link>
                  <Link
                    href="/#donation"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-brand-gold text-brand-dark text-sm font-bold"
                  >
                    <HeartHandshake className="w-4 h-4" />
                    অনুদান দিন
                  </Link>
                </div>
                <Link
                  href="/admin"
                  onClick={() => setMobileOpen(false)}
                  className="w-full flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-white hover:bg-surface-sage text-brand-primary border border-brand-primary/20 text-sm font-semibold transition-colors"
                >
                  <LogIn className="w-4 h-4 text-brand-gold" />
                  <span>অ্যাডমিন লগইন</span>
                </Link>
                <a
                  href={`tel:${SITE_INFO.phoneRaw}`}
                  className="flex items-center justify-center gap-2 text-xs text-ink-muted py-1"
                >
                  <Phone className="w-3.5 h-3.5 text-brand-primary" />
                  <span>অফিস: {SITE_INFO.phone}</span>
                </a>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
