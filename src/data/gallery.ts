export type GalleryCategory =
  | "সকল"
  | "ক্যাম্পাস"
  | "শিক্ষা কার্যক্রম"
  | "মসজিদ ও দোয়া"
  | "কম্পিউটার ল্যাব";

export interface GalleryItem {
  id: string;
  src: string;
  width: number;
  height: number;
  titleBn: string;
  captionBn: string;
  category: Exclude<GalleryCategory, "সকল">;
  featured?: boolean;
}

export const GALLERY_CATEGORIES: GalleryCategory[] = [
  "সকল",
  "ক্যাম্পাস",
  "শিক্ষা কার্যক্রম",
  "মসজিদ ও দোয়া",
  "কম্পিউটার ল্যাব",
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "g-1",
    src: "/madrasahPic1.jpg",
    width: 1536,
    height: 863,
    titleBn: "জামিয়ার মনোরম ক্যাম্পাস, মসজিদ মিনার ও পুকুরঘাট",
    captionBn:
      "সবুজ বৃক্ষরাজি ও শান্ত পুকুরের জলে প্রতিফলিত আল জামিয়াতুল ইসলামিয়া দারুস সুন্নাহ, হ্নীলার দৃষ্টিনন্দন একাডেমিক ভবন ও মসজিদের মিনার।",
    category: "ক্যাম্পাস",
    featured: true,
  },
  {
    id: "g-2",
    src: "/madrasahPic2.jpg",
    width: 716,
    height: 924,
    titleBn: "ঐতিহ্যবাহী ছদর গেইট (বাব ইসহাক)",
    captionBn:
      "আল্লামা শাহ মুহাম্মদ ইসহাক ছদর সাহেব (রহ.)-এর স্মরণে নির্মিত জামিয়ার ঐতিহাসিক প্রধান ফটক—যেখানে খোদাইকৃত রয়েছে প্রতিষ্ঠাকাল ১৩৪৭ হিজরী / ১৯২৭ ইংরেজী।",
    category: "ক্যাম্পাস",
    featured: true,
  },
  {
    id: "g-3",
    src: "/madrasahPic3.jpg",
    width: 1600,
    height: 1200,
    titleBn: "সুশৃঙ্খল পরিবেশে পরীক্ষা ও পাঠদান",
    captionBn:
      "জামিয়ার প্রশস্ত হলরুমে সুশৃঙ্খলভাবে পরীক্ষায় অংশগ্রহণরত শিক্ষার্থীবৃন্দ।",
    category: "শিক্ষা কার্যক্রম",
    featured: true,
  },
  {
    id: "g-4",
    src: "/madrasahPic4.jpg",
    width: 1600,
    height: 898,
    titleBn: "মসজিদে উলামায়ে কেরাম ও শিক্ষার্থীদের দোয়া মাহফিল",
    captionBn:
      "জামিয়া মসজিদে সম্মানিত আসাতিযায়ে কেরাম ও শত শত শিক্ষার্থীর অংশগ্রহণে বিশেষ মুনাজাত ও দোয়া মাহফিল।",
    category: "মসজিদ ও দোয়া",
    featured: true,
  },
  {
    id: "g-5",
    src: "/madrasahPic5.jpg",
    width: 1600,
    height: 1200,
    titleBn: "নারিকেল বীথিঘেরা জামিয়ার মূল আঙিনা",
    captionBn:
      "সারিবদ্ধ নারিকেল গাছ ও খোলামেলা প্রাকৃতিক পরিবেশে ঘেরা জামিয়ার আবাসিক ও একাডেমিক ভবনসমূহ।",
    category: "ক্যাম্পাস",
    featured: true,
  },
  {
    id: "g-6",
    src: "/madrasahPic6.jpg",
    width: 1600,
    height: 1200,
    titleBn: "আধুনিক কম্পিউটার প্রশিক্ষণ ল্যাব",
    captionBn:
      "দ্বীনি শিক্ষার পাশাপাশি আধুনিক তথ্যপ্রযুক্তিতে দক্ষতা অর্জনে জামিয়ার কম্পিউটার ল্যাবে প্রশিক্ষণরত শিক্ষার্থীরা।",
    category: "কম্পিউটার ল্যাব",
    featured: true,
  },
  {
    id: "g-7",
    src: "/banner.jpg",
    width: 960,
    height: 400,
    titleBn: "জামিয়ার অফিসিয়াল পরিচিতি ব্যানার",
    captionBn:
      "‘কিতাবুল্লাহি ওয়া সুন্নাতু রাসূলিহী’ মূলমন্ত্র ধারণকারী আল জামিয়াতুল ইসলামিয়া দারুস সুন্নাহ, হ্নীলার প্রাতিষ্ঠানিক ব্যানার।",
    category: "ক্যাম্পাস",
    featured: false,
  },
];
