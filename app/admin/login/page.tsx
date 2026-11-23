import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { SITE_INFO } from "@/src/data/siteInfo";
import { isSupabaseConfigured } from "@/src/lib/supabase";
import { AdminLoginForm } from "@/src/components/admin/AdminLoginForm";

export const metadata: Metadata = {
  title: "অ্যাডমিন লগইন",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  const configMissing = !isSupabaseConfigured();

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-dark via-brand-primary to-[#0e5832] flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      <div className="absolute inset-0 islamic-pattern-dark opacity-60 pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl border-t-4 border-brand-gold overflow-hidden">
          {/* Header */}
          <div className="bg-surface-ivory px-6 pt-8 pb-6 text-center border-b border-brand-primary/10">
            <div className="w-18 h-18 mx-auto rounded-full overflow-hidden bg-white p-0.5 ring-2 ring-brand-gold shadow-md">
              <Image
                src={SITE_INFO.logo}
                alt={SITE_INFO.nameBn}
                width={72}
                height={72}
                priority
                className="w-full h-full object-contain rounded-full"
              />
            </div>

            <span className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-sage text-brand-primary text-xs font-bold border border-brand-primary/15">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-gold" />
              সংরক্ষিত অ্যাডমিন প্রবেশদ্বার
            </span>

            <h1 className="mt-3 text-xl sm:text-2xl font-bold text-ink-primary">
              অ্যাডমিন লগইন
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-ink-muted">
              {SITE_INFO.shortNameBn}
            </p>
          </div>

          {/* Login Form */}
          <div className="p-6 sm:p-8">
            <AdminLoginForm configMissing={configMissing} />

            <p className="mt-5 text-center text-xs text-ink-muted leading-relaxed">
              শুধুমাত্র অনুমোদিত মাদরাসা অ্যাডমিনগণ এখানে প্রবেশ করতে পারবেন।
            </p>
          </div>
        </div>

        <div className="mt-5 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-brand-gold-soft hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>মূল ওয়েবসাইটে ফিরে যান</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
