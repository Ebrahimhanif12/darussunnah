import type { Metadata } from "next";
import { PageBanner } from "@/src/components/PageBanner";
import { LocationContactSection } from "@/src/components/sections/LocationContactSection";
import { ContactForm } from "@/src/components/sections/ContactForm";
import { DonationSection } from "@/src/components/sections/DonationSection";
import { FadeInUp } from "@/src/components/MotionPrimitives";

export const metadata: Metadata = {
  title: "যোগাযোগ ও অবস্থান",
  description:
    "আল জামিয়াতুল ইসলামিয়া দারুস সুন্নাহ, হ্নীলা, টেকনাফ, কক্সবাজারের ঠিকানা, গুগল ম্যাপ অবস্থান, ফোন নম্বর ও অনুদান তথ্য।",
};

export default function ContactPage() {
  return (
    <>
      <PageBanner
        title="যোগাযোগ ও অবস্থান"
        subtitle="হ্নীলা, টেকনাফ, কক্সবাজার — সরাসরি যোগাযোগ, মানচিত্রে অবস্থান এবং আমাদের কাছে বার্তা পাঠানোর মাধ্যম।"
        breadcrumb="যোগাযোগ"
      />

      <LocationContactSection showHeader={false} />

      <section className="pb-16 md:pb-24 bg-surface-ivory">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInUp>
            <ContactForm />
          </FadeInUp>
        </div>
      </section>

      <DonationSection />
    </>
  );
}
