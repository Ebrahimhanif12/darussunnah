"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  ExternalLink,
  LayoutDashboard,
  LogOut,
  Menu,
  Newspaper,
  ShieldCheck,
  X,
} from "lucide-react";
import { SITE_INFO } from "@/src/data/siteInfo";
import { logoutAdminAction } from "@/app/admin/actions";

interface AdminShellProps {
  userEmail: string;
  children: React.ReactNode;
}

const ADMIN_NAV = [
  {
    label: "ড্যাশবোর্ড",
    href: "/admin",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    label: "নোটিশ ব্যবস্থাপনা",
    href: "/admin/notices",
    icon: Bell,
    exact: false,
  },
  {
    label: "পোস্ট ব্যবস্থাপনা",
    href: "/admin/posts",
    icon: Newspaper,
    exact: false,
  },
];

export function AdminShell({ userEmail, children }: AdminShellProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (href: string, exact: boolean) => {
    if (exact) return pathname === href;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <div className="min-h-screen flex bg-surface-ivory">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-68 bg-brand-dark text-white border-r-2 border-brand-gold/60 shrink-0">
        <div className="p-5 border-b border-white/10 flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-white p-0.5 ring-2 ring-brand-gold shrink-0 overflow-hidden">
            <Image
              src={SITE_INFO.logo}
              alt={SITE_INFO.shortNameBn}
              width={44}
              height={44}
              className="w-full h-full object-contain rounded-full"
            />
          </div>
          <div className="min-w-0">
            <p className="font-bold text-sm text-white leading-tight truncate">
              {SITE_INFO.shortNameBn}
            </p>
            <span className="inline-flex items-center gap-1 text-[11px] text-brand-gold-soft mt-0.5">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-gold-bright" />
              অ্যাডমিন প্যানেল
            </span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1.5" aria-label="অ্যাডমিন নেভিগেশন">
          {ADMIN_NAV.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href, item.exact);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  active
                    ? "bg-brand-gold text-brand-dark shadow-sm"
                    : "text-white/85 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10 space-y-3">
          <div className="px-3 py-2 rounded-xl bg-white/8 text-xs">
            <p className="text-brand-gold-soft/80">লগইনকৃত অ্যাডমিন</p>
            <p className="text-white font-medium truncate mt-0.5">{userEmail}</p>
          </div>
          <Link
            href="/"
            target="_blank"
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5 text-brand-gold-soft" />
            <span>পাবলিক ওয়েবসাইট দেখুন</span>
          </Link>
        </div>
      </aside>

      {/* Main Column */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-white border-b border-brand-primary/15 shadow-xs">
          <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="অ্যাডমিন মেনু খুলুন"
                className="lg:hidden w-10 h-10 rounded-xl bg-surface-sage text-brand-primary flex items-center justify-center shrink-0"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div className="min-w-0">
                <h1 className="text-base sm:text-lg font-bold text-ink-primary truncate">
                  জামিয়া অ্যাডমিন ড্যাশবোর্ড
                </h1>
                <p className="hidden sm:block text-xs text-ink-muted truncate">
                  নোটিশ ও সংবাদ কার্যক্রম পরিচালনা কেন্দ্র
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <Link
                href="/"
                target="_blank"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-surface-sage hover:bg-brand-primary/10 text-brand-primary text-xs sm:text-sm font-semibold transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>সাইট দেখুন</span>
              </Link>

              <form action={logoutAdminAction}>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-50 hover:bg-red-600 text-red-700 hover:text-white border border-red-200 hover:border-red-600 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>লগআউট</span>
                </button>
              </form>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-[1px]"
          />
          <aside className="absolute left-0 top-0 bottom-0 w-72 bg-brand-dark text-white shadow-2xl flex flex-col">
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5 min-w-0">
                <Image
                  src={SITE_INFO.logo}
                  alt={SITE_INFO.shortNameBn}
                  width={36}
                  height={36}
                  className="w-9 h-9 rounded-full bg-white p-0.5 object-contain shrink-0"
                />
                <span className="font-bold text-sm truncate">
                  অ্যাডমিন প্যানেল
                </span>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="মেনু বন্ধ করুন"
                className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1 p-3 space-y-1.5">
              {ADMIN_NAV.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href, item.exact);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                      active
                        ? "bg-brand-gold text-brand-dark"
                        : "text-white/85 hover:bg-white/10"
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="p-4 border-t border-white/10 space-y-2.5 text-xs">
              <p className="text-brand-gold-soft truncate">{userEmail}</p>
              <Link
                href="/"
                target="_blank"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-white/10 text-white font-semibold"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>পাবলিক ওয়েবসাইট</span>
              </Link>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
