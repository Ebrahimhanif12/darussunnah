import type { Metadata } from "next";
import { PageBanner } from "@/src/components/PageBanner";
import { NoticeBoardSection } from "@/src/components/sections/NoticeBoardSection";

export const metadata: Metadata = {
  title: "নোটিশ বোর্ড",
  description:
    "আল জামিয়াতুল ইসলামিয়া দারুস সুন্নাহ, হ্নীলার সর্বশেষ ভর্তি বিজ্ঞপ্তি, পরীক্ষার রুটিন, ছুটি ও মাহফিল সংক্রান্ত অফিসিয়াল নোটিশ।",
};

export default function NoticesPage() {
  return (
    <>
      <PageBanner
        title="নোটিশ বোর্ড"
        subtitle="জামিয়ার ভর্তি বিজ্ঞপ্তি, পরীক্ষার সময়সূচি, বার্ষিক মাহফিল এবং সকল আনুষ্ঠানিক ঘোষণা এখানে প্রকাশিত হয়।"
        breadcrumb="নোটিশ বোর্ড"
      />
      <NoticeBoardSection mode="full" />
    </>
  );
}
