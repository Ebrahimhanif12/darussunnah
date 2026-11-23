import type { Metadata } from "next";
import { PageBanner } from "@/src/components/PageBanner";
import { TeachersDirectory } from "@/src/components/sections/TeachersDirectory";

export const metadata: Metadata = {
  title: "শিক্ষকমণ্ডলী",
  description:
    "আল জামিয়াতুল ইসলামিয়া দারুস সুন্নাহ, হ্নীলার সম্মানিত উলামায়ে কেরাম, মুহাদ্দিস, মুফতি ও শিক্ষকমণ্ডলীর পূর্ণাঙ্গ তালিকা।",
};

export default function TeachersPage() {
  return (
    <>
      <PageBanner
        title="সম্মানিত শিক্ষকমণ্ডলী"
        subtitle="কিতাব, ইফতা, তাজবীদ, নূরানী, ইবতেদায়ী ও কম্পিউটার বিভাগে পাঠদানকারী অভিজ্ঞ ও নিষ্ঠাবান উলামায়ে কেরামের পরিচিতি।"
        breadcrumb="শিক্ষকমণ্ডলী"
      />
      <TeachersDirectory mode="full" />
    </>
  );
}
