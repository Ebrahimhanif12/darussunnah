import type { Metadata } from "next";
import { PageBanner } from "@/src/components/PageBanner";
import { AkabirDetailList } from "@/src/components/sections/AkabirDetailList";
import { AKABIR_ARABIC_SUBTITLE } from "@/src/data/akabir";

export const metadata: Metadata = {
  title: "স্মরণীয় আকাবির ও উলামায়ে কেরাম (রহ.)",
  description:
    "আল জামিয়াতুল ইসলামিয়া দারুস সুন্নাহ, হ্নীলার প্রতিষ্ঠাতা ও স্মরণীয় মরহুম উলামায়ে কেরাম (রহ.)-এর পূর্ণাঙ্গ পরিচিতি ও জীবনী।",
};

export default function AkabirPage() {
  return (
    <>
      <PageBanner
        eyebrowAr={AKABIR_ARABIC_SUBTITLE}
        title="স্মরণীয় আকাবির ও উলামায়ে কেরাম (রহ.)"
        subtitle="১৯২৭ সালে প্রতিষ্ঠিত আল জামিয়াতুল ইসলামিয়া দারুস সুন্নাহ, হ্নীলার শতবর্ষী ঐতিহ্য যাঁদের ত্যাগ, ইলমি সাধনা ও আধ্যাত্মিক ফয়জে গড়ে উঠেছে—সেই সকল মরহুম বুজুর্গ ও উলামায়ে কেরামের শ্রদ্ধাপূর্ণ স্মৃতিচারণ ও জীবনচরিত।"
        breadcrumb="স্মরণীয় আকাবির (রহ.)"
      />
      <AkabirDetailList />
    </>
  );
}
