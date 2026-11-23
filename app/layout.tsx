import type { Metadata } from "next";
import { Amiri, Cinzel, Hind_Siliguri } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/src/components/SiteHeader";
import { SiteFooter } from "@/src/components/SiteFooter";
import { SITE_INFO } from "@/src/data/siteInfo";

const hindSiliguri = Hind_Siliguri({
  variable: "--font-bangla",
  subsets: ["bengali", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const amiri = Amiri({
  variable: "--font-arabic",
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  display: "swap",
});

const cinzel = Cinzel({
  variable: "--font-english",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${SITE_INFO.nameBn} | ${SITE_INFO.nameEn}`,
    template: `%s | ${SITE_INFO.shortNameBn}`,
  },
  description:
    "আল জামিয়াতুল ইসলামিয়া দারুস সুন্নাহ, হ্নীলা (স্থাপিত: ১৯২৭ খ্রি.) — টেকনাফ, কক্সবাজারের শতবর্ষী ঐতিহ্যবাহী দ্বীনি শিক্ষা প্রতিষ্ঠান। কিতাব (দাওরায়ে হাদীস), হেফজ, নূরানী, ইবতেদায়ী, মকতব ও কম্পিউটার প্রশিক্ষণ বিভাগ।",
  keywords: [
    "আল জামিয়াতুল ইসলামিয়া দারুস সুন্নাহ হ্নীলা",
    "Al-Jamia Al-Islamia Darussunnah Nhila",
    "হ্নীলা মাদরাসা",
    "টেকনাফ কওমী মাদরাসা",
    "কক্সবাজার মাদরাসা",
    "Darussunnah Nhila",
  ],
  icons: {
    icon: "/madrasahlogo.jpg",
    apple: "/madrasahlogo.jpg",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="bn"
      className={`${hindSiliguri.variable} ${amiri.variable} ${cinzel.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-surface-ivory text-ink-body selection:bg-brand-primary selection:text-white">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
