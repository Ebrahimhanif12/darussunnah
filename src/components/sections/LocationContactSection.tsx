import { Clock, ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import { SITE_INFO } from "@/src/data/siteInfo";
import { SectionHeader } from "@/src/components/SectionHeader";
import { FadeInUp } from "@/src/components/MotionPrimitives";

interface LocationContactSectionProps {
  showHeader?: boolean;
}

export function LocationContactSection({
  showHeader = true,
}: LocationContactSectionProps) {
  return (
    <section id="location" className="py-16 md:py-24 bg-surface-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {showHeader && (
          <SectionHeader
            eyebrow="যোগাযোগ ও অবস্থান"
            title="আমাদের ঠিকানা ও সরাসরি যোগাযোগ"
            subtitle="হ্নীলা, টেকনাফ, কক্সবাজার — যেকোনো তথ্য, ভর্তি অনুসন্ধান বা জামিয়া পরিদর্শনের জন্য আমাদের সাথে যোগাযোগ করুন।"
          />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Contact Details Cards */}
          <FadeInUp className="lg:col-span-5 flex flex-col gap-4">
            <div className="bg-white rounded-2xl p-6 border border-brand-primary/12 shadow-xs flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-surface-sage text-brand-primary flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-ink-primary text-base">
                  প্রতিষ্ঠানের ঠিকানা
                </h3>
                <p className="mt-1 text-sm text-ink-body leading-relaxed">
                  {SITE_INFO.nameBn}
                  <br />
                  {SITE_INFO.postCodeBn}
                </p>
                <a
                  href={SITE_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-brand-primary hover:text-brand-secondary"
                >
                  <span>গুগল ম্যাপে দিকনির্দেশনা দেখুন</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-brand-primary/12 shadow-xs flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-surface-sage text-brand-primary flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-ink-primary text-base">
                  ফোন ও হেল্পলাইন
                </h3>
                <div className="mt-1.5 space-y-1 text-sm">
                  <p className="text-ink-body">
                    অফিস ও হিসাব শাখা:{" "}
                    <a
                      href={`tel:${SITE_INFO.phoneRaw}`}
                      className="font-bold text-brand-primary hover:underline"
                    >
                      {SITE_INFO.phone}
                    </a>
                  </p>
                  <p className="text-ink-body">
                    শিক্ষা ও ভর্তি শাখা:{" "}
                    <a
                      href={`tel:${SITE_INFO.admissionPhoneRaw}`}
                      className="font-bold text-brand-primary hover:underline"
                    >
                      {SITE_INFO.admissionPhone}
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-brand-primary/12 shadow-xs flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-surface-sage text-brand-primary flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-ink-primary text-base">
                  ইমেইল ও অফিস সময়
                </h3>
                <p className="mt-1 text-sm text-ink-body">
                  ইমেইল:{" "}
                  <a
                    href={`mailto:${SITE_INFO.email}`}
                    className="font-semibold text-brand-primary hover:underline break-all"
                  >
                    {SITE_INFO.email}
                  </a>
                </p>
                <p className="mt-1.5 text-xs sm:text-sm text-ink-muted inline-flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-brand-gold shrink-0" />
                  <span>{SITE_INFO.officeHoursBn}</span>
                </p>
              </div>
            </div>
          </FadeInUp>

          {/* Embedded Google Map */}
          <FadeInUp delay={0.08} className="lg:col-span-7">
            <div className="h-full min-h-[340px] sm:min-h-[400px] bg-white rounded-2xl overflow-hidden border border-brand-primary/15 shadow-sm flex flex-col">
              <div className="px-5 py-3 bg-brand-primary text-white flex items-center justify-between gap-2 text-xs sm:text-sm">
                <span className="font-semibold inline-flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-brand-gold-bright" />
                  হ্নীলা, টেকনাফ, কক্সবাজার — মানচিত্রে জামিয়ার অবস্থান
                </span>
                <a
                  href={SITE_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-gold-soft hover:text-white inline-flex items-center gap-1 font-medium shrink-0"
                >
                  <span>বড় ম্যাপ</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
              <iframe
                title="আল জামিয়াতুল ইসলামিয়া দারুস সুন্নাহ, হ্নীলা — গুগল ম্যাপ"
                src={SITE_INFO.googleMapsEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full flex-1 min-h-[300px] border-0"
              />
            </div>
          </FadeInUp>
        </div>
      </div>
    </section>
  );
}
