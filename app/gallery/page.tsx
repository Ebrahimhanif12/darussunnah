import type { Metadata } from "next";
import { PageBanner } from "@/src/components/PageBanner";
import { GallerySection } from "@/src/components/sections/GallerySection";

export const metadata: Metadata = {
  title: "ফটো গ্যালারি",
  description:
    "আল জামিয়াতুল ইসলামিয়া দারুস সুন্নাহ, হ্নীলার ক্যাম্পাস, ছদর গেইট, মসজিদ, পরীক্ষা হল এবং আধুনিক কম্পিউটার ল্যাবের স্থিরচিত্র।",
};

export default function GalleryPage() {
  return (
    <>
      <PageBanner
        title="ফটো গ্যালারি"
        subtitle="স্থিরচিত্রে দেখুন জামিয়ার মনোরম ক্যাম্পাস, ঐতিহ্যবাহী ছদর গেইট, মসজিদ, পাঠদান ও আধুনিক কম্পিউটার ল্যাব।"
        breadcrumb="ফটো গ্যালারি"
      />
      <GallerySection mode="full" />
    </>
  );
}
