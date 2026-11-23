"use client";

import { useState } from "react";
import {
  Building2,
  Check,
  Copy,
  HeartHandshake,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import {
  DONATION_FUNDS,
  DONATION_INTRO,
  PAYMENT_ACCOUNTS,
} from "@/src/data/donation";
import { SectionHeader } from "@/src/components/SectionHeader";
import {
  FadeInUp,
  StaggerContainer,
  StaggerItem,
} from "@/src/components/MotionPrimitives";

export function DonationSection() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (id: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedId(id);
      setTimeout(() => {
        setCopiedId((current) => (current === id ? null : current));
      }, 2200);
    } catch {
      // Fallback if clipboard API is unavailable
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <section
      id="donation"
      className="py-16 md:py-24 bg-surface-sage/65 border-y border-brand-primary/12 relative overflow-hidden"
    >
      <div className="absolute inset-0 islamic-pattern opacity-45 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="মাদরাসায় সহযোগিতা ও অনুদান"
          title="দ্বীনি শিক্ষার প্রসারে আপনার সদকায়ে জারিয়া"
          subtitle={DONATION_INTRO.descriptionBn}
        />

        {/* Quranic Verse Highlight Card */}
        <FadeInUp className="mb-10">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-brand-dark via-brand-primary to-brand-dark text-white rounded-2xl p-6 sm:p-8 text-center shadow-lg border border-brand-gold/50">
            <p
              dir="rtl"
              className="font-arabic text-xl sm:text-2xl md:text-3xl text-brand-gold-soft leading-relaxed"
            >
              {DONATION_INTRO.verseAr}
            </p>
            <p className="mt-3 text-xs sm:text-sm md:text-base text-white/90 leading-relaxed max-w-2xl mx-auto">
              {DONATION_INTRO.verseTranslationBn}
            </p>
          </div>
        </FadeInUp>

        {/* Donation Funds Grid */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {DONATION_FUNDS.map((fund) => (
            <StaggerItem key={fund.id}>
              <div className="h-full bg-white rounded-2xl p-5 sm:p-6 border border-brand-primary/12 shadow-xs hover:shadow-md hover:border-brand-gold/60 transition-all">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-surface-sage text-brand-primary flex items-center justify-center">
                    <HeartHandshake className="w-5 h-5" />
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-brand-gold-soft/75 text-brand-dark text-[11px] font-bold">
                    {fund.badgeBn}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-ink-primary">
                  {fund.titleBn}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-ink-muted leading-relaxed">
                  {fund.descriptionBn}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Bank / bKash / Nagad Payment Accounts with One-Click Copy */}
        <FadeInUp>
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-primary/15 shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-brand-primary/10">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-ink-primary">
                  অনুদান পাঠানোর মাধ্যমসমূহ (ব্যাংক / বিকাশ / নগদ)
                </h3>
                <p className="text-xs sm:text-sm text-ink-muted mt-0.5">
                  হিসাব নম্বর কপি করতে পাশের &ldquo;কপি করুন&rdquo; বাটনে ক্লিক
                  করুন।
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-primary bg-surface-sage px-3 py-1.5 rounded-full self-start">
                <ShieldCheck className="w-4 h-4 text-brand-gold" />
                স্বচ্ছ ও শরয়ী হিসাব ব্যবস্থাপনা
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {PAYMENT_ACCOUNTS.map((acc) => {
                const isCopied = copiedId === acc.id;
                const badgeClass =
                  acc.accentColor === "pink"
                    ? "bg-pink-50 text-pink-700 border-pink-200"
                    : acc.accentColor === "orange"
                      ? "bg-orange-50 text-orange-700 border-orange-200"
                      : "bg-emerald-50 text-emerald-800 border-emerald-200";

                return (
                  <div
                    key={acc.id}
                    className="rounded-2xl border border-brand-primary/15 bg-surface-ivory/70 p-5 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold border ${badgeClass}`}
                        >
                          {acc.accentColor === "emerald" ? (
                            <Building2 className="w-3.5 h-3.5" />
                          ) : (
                            <Smartphone className="w-3.5 h-3.5" />
                          )}
                          {acc.providerBn}
                        </span>
                      </div>

                      <p className="text-xs font-semibold text-ink-muted">
                        {acc.typeBn}
                      </p>
                      <p className="text-sm font-bold text-ink-primary mt-1">
                        {acc.accountNameBn}
                      </p>

                      <div className="mt-4 p-3 rounded-xl bg-white border border-brand-primary/15 flex items-center justify-between gap-2">
                        <span className="font-mono text-sm sm:text-base font-bold text-brand-primary tracking-wide break-all">
                          {acc.accountNumber}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopy(acc.id, acc.accountNumber)}
                          className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            isCopied
                              ? "bg-emerald-600 text-white"
                              : "bg-brand-primary hover:bg-brand-dark text-white"
                          }`}
                        >
                          {isCopied ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>কপি হয়েছে!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>কপি করুন</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    <p className="mt-3 text-xs text-ink-muted leading-relaxed">
                      {acc.branchOrNoteBn}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}
