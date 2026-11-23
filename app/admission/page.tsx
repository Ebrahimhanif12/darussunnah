import type { Metadata } from "next";
import { CheckCircle2, FileText, ShieldAlert } from "lucide-react";
import { PageBanner } from "@/src/components/PageBanner";
import { SectionHeader } from "@/src/components/SectionHeader";
import { AdmissionInquiryForm } from "@/src/components/sections/AdmissionInquiryForm";
import { FadeInUp } from "@/src/components/MotionPrimitives";
import { ADMISSION_INFO } from "@/src/data/admission";

export const metadata: Metadata = {
  title: "ভর্তি তথ্য ও নিয়মাবলী",
  description:
    "আল জামিয়াতুল ইসলামিয়া দারুস সুন্নাহ, হ্নীলার ভর্তি যোগ্যতা, প্রয়োজনীয় কাগজপত্র, সময়সূচি এবং মাদরাসার নিয়মাবলী।",
};

export default function AdmissionPage() {
  return (
    <>
      <PageBanner
        title="ভর্তি তথ্য ও নিয়মাবলী"
        subtitle={`${ADMISSION_INFO.sessionBn} — সকল বিভাগে ভর্তি যোগ্যতা, প্রয়োজনীয় কাগজপত্র, আবাসিক সুবিধা ও শৃঙ্খলাবিধি।`}
        breadcrumb="ভর্তি তথ্য"
      />

      {/* Eligibility Table & Required Documents */}
      <section className="py-14 md:py-20 bg-surface-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          {/* Department Eligibility Table */}
          <div>
            <SectionHeader
              eyebrow="বিভাগভিত্তিক যোগ্যতা"
              title="ভর্তির যোগ্যতা ও আসন বিন্যাস"
              subtitle="প্রতিটি বিভাগে ভর্তির পূর্বে সংশ্লিষ্ট বিভাগীয় প্রধানের তত্ত্বাবধানে মেধা ও যোগ্যতা যাচাই করা হয়।"
            />

            <FadeInUp>
              <div className="bg-white rounded-2xl border border-brand-primary/15 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[640px]">
                    <thead>
                      <tr className="bg-brand-primary text-white text-sm">
                        <th className="py-3.5 px-5 font-bold">বিভাগের নাম</th>
                        <th className="py-3.5 px-5 font-bold">শ্রেণী / স্তর</th>
                        <th className="py-3.5 px-5 font-bold">
                          ভর্তির যোগ্যতা
                        </th>
                        <th className="py-3.5 px-5 font-bold">ব্যবস্থা</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-primary/10 text-sm text-ink-body">
                      {ADMISSION_INFO.requirementsTable.map((row) => (
                        <tr
                          key={row.id}
                          className="hover:bg-surface-sage/45 transition-colors"
                        >
                          <td className="py-4 px-5 font-bold text-ink-primary">
                            {row.departmentBn}
                          </td>
                          <td className="py-4 px-5">{row.classesBn}</td>
                          <td className="py-4 px-5">{row.ageOrPrevBn}</td>
                          <td className="py-4 px-5">
                            <span className="inline-block px-2.5 py-1 rounded-full bg-surface-sage text-brand-primary text-xs font-semibold">
                              {row.modeBn}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </FadeInUp>
          </div>

          {/* Documents + Dates + Online Inquiry Form */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <FadeInUp className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-2xl border border-brand-primary/15 p-6 shadow-xs">
                <h3 className="text-lg font-bold text-ink-primary flex items-center gap-2 mb-4">
                  <FileText className="w-5 h-5 text-brand-gold" />
                  প্রয়োজনীয় কাগজপত্র
                </h3>
                <ul className="space-y-3 text-sm text-ink-body">
                  {ADMISSION_INFO.requiredDocuments.map((doc, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-brand-secondary shrink-0 mt-0.5" />
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-brand-primary text-white rounded-2xl p-6 shadow-sm border-b-4 border-brand-gold">
                <h3 className="text-lg font-bold text-brand-gold-soft mb-3">
                  আবাসিক ও লিল্লাহ বোর্ডিং সুবিধা
                </h3>
                <p className="text-sm text-white/90 leading-relaxed">
                  {ADMISSION_INFO.boardingInfoBn}
                </p>
                <div className="mt-4 pt-4 border-t border-white/15 space-y-2 text-xs sm:text-sm">
                  {ADMISSION_INFO.keyDates.map((d, idx) => (
                    <div key={idx}>
                      <span className="text-brand-gold-soft font-semibold">
                        {d.label}:{" "}
                      </span>
                      <span className="text-white/90">{d.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeInUp>

            <FadeInUp delay={0.08} className="lg:col-span-7">
              <AdmissionInquiryForm />
            </FadeInUp>
          </div>
        </div>
      </section>

      {/* Madrasah Rules & Discipline */}
      <section
        id="rules"
        className="py-16 md:py-20 bg-white border-t border-brand-primary/10"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="মাদরাসার নিয়মাবলী"
            title="ছাত্রদের আচরণবিধি ও আবাসিক শৃঙ্খলা"
            subtitle="দ্বীনি শিক্ষার আদর্শ পরিবেশ বজায় রাখতে প্রতিটি শিক্ষার্থীকে নিচের নিয়মাবলী যথাযথভাবে অনুসরণ করতে হয়।"
          />

          <FadeInUp>
            <div className="bg-surface-ivory rounded-2xl border border-brand-primary/15 p-6 sm:p-8 space-y-4">
              {ADMISSION_INFO.rules.map((rule, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3.5 p-4 rounded-xl bg-white border border-brand-primary/10"
                >
                  <div className="w-7 h-7 rounded-lg bg-brand-primary text-brand-gold-soft text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    <ShieldAlert className="w-4 h-4" />
                  </div>
                  <p className="text-sm sm:text-base text-ink-body leading-relaxed">
                    {rule}
                  </p>
                </div>
              ))}
            </div>
          </FadeInUp>
        </div>
      </section>
    </>
  );
}
