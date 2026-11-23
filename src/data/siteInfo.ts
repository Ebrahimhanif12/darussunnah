export interface NavSubItem {
  label: string;
  href: string;
  description?: string;
}

export interface NavItem {
  label: string;
  href?: string;
  children?: NavSubItem[];
}

export interface InstitutionalStat {
  id: string;
  value: number;
  suffix: string;
  label: string;
  sublabel: string;
}

export const SITE_INFO = {
  nameBn: "আল জামিয়াতুল ইসলামিয়া দারুস সুন্নাহ, হ্নীলা",
  shortNameBn: "জামিয়া দারুস সুন্নাহ, হ্নীলা",
  nameEn: "Al-Jamia Al-Islamia Darussunnah Nhila",
  locationEn: "Nhila, Teknaf, Cox's Bazar, Bangladesh",
  nameAr: "الجامعة الإسلامية دار السنة، هنيلا",
  mottoAr: "كِتَابُ اللهِ وَ سُنَّةُ رَسُولِهِ",
  mottoBn: "আল্লাহর কিতাব ও তাঁর রাসূলের সুন্নাহ",
  bannerQuoteBn:
    "ঈমানকে পরিশুদ্ধ করুন, চরিত্রকে সুদৃঢ় করুন, ইলম অন্বেষণ করুন এবং মানবতার কল্যাণে নিবেদিত হোন।",
  establishedBn: "১৯২৭ খ্রি. / ১৩৪৭ হি.",
  establishedYear: "১৯২৭",
  addressBn: "হ্নীলা, টেকনাফ, কক্সবাজার, বাংলাদেশ",
  postCodeBn: "ডাকঘর: হ্নীলা বাজার (৪৭৬১), উপজেলা: টেকনাফ, জেলা: কক্সবাজার",
  phone: "+৮৮০ ১৮১৫-৬৭২৭৮৫",
  phoneRaw: "+8801815672785",
  admissionPhone: "+৮৮০ ১৮২২-৩২২৮১১",
  admissionPhoneRaw: "+8801822322811",
  email: "info@darussunnahnhila.edu.bd",
  officeHoursBn: "শনিবার থেকে বৃহস্পতিবার: সকাল ৮:০০ টা — বিকাল ৫:০০ টা",
  googleMapsUrl:
    "https://maps.google.com/maps?rlz=1C1GCEU_en&udm&fvr=1&pvq=Cg0vZy8xMWh6eTg4bnRtIhcKEWRhcnVzc3VubmFoIGhuaWxhEAIYA4kB5gOWKvQGVmw&lqi=ChFkYXJ1c3N1bm5haCBobmlsYUizppHU-6-AgAhaFxAAEAEiEWRhcnVzc3VubmFoIGhuaWxhkgEXZWR1Y2F0aW9uYWxfaW5zdGl0dXRpb24&vet=10CAAQoqAOahcKEwjA94f9_J6YAxUAAAAAHQAAAAAQBw..i&cs=1&um=1&ie=UTF-8&fb=1&gl=bd&sa=X&ftid=0x30ae090e89cccd3f:0x6c5606f42a9603e6",
  googleMapsEmbedUrl:
    "https://maps.google.com/maps?q=Al-Jamia+Al-Islamia+Darussunnah+Nhila,+Teknaf,+Cox's+Bazar&t=&z=16&ie=UTF8&iwloc=&output=embed",
  logo: "/madrasahlogo.jpg",
  banner: "/banner.jpg",
  copyrightYearBn: "২০২৬",
};

export const NAVIGATION_ITEMS: NavItem[] = [
  {
    label: "হোম",
    href: "/",
  },
  {
    label: "আমাদের সম্পর্কে",
    children: [
      {
        label: "প্রতিষ্ঠানের ইতিহাস",
        href: "/about#history",
        description: "১৯২৭ সাল থেকে শতবর্ষী দ্বীনি ঐতিহ্যের পথচলা",
      },
      {
        label: "লক্ষ্য ও উদ্দেশ্য",
        href: "/about#mission",
        description: "আমাদের আদর্শ, দর্শন ও শিক্ষা লক্ষ্যমাত্রা",
      },
      {
        label: "মুহতামিমের বাণী",
        href: "/about#muhtamim",
        description: "মুহতামিম ও নির্বাহী পরিচালকের দিকনির্দেশনা",
      },
    ],
  },
  {
    label: "শিক্ষাব্যবস্থা",
    children: [
      {
        label: "শিক্ষা বিভাগসমূহ",
        href: "/departments",
        description: "কিতাব, হেফজ, নূরানী, ইবতেদায়ী ও কারিগরি বিভাগ",
      },
      {
        label: "শিক্ষকমণ্ডলী",
        href: "/teachers",
        description: "অভিজ্ঞ উলামায়ে কেরাম ও শিক্ষকদের পরিচিতি",
      },
      {
        label: "একাডেমিক ক্যালেন্ডার",
        href: "/departments#calendar",
        description: "বার্ষিক শিক্ষাবর্ষ, পরীক্ষা ও ছুটির সময়সূচি",
      },
    ],
  },
  {
    label: "ভর্তি",
    children: [
      {
        label: "ভর্তি তথ্য ও যোগ্যতা",
        href: "/admission",
        description: "বিভাগভিত্তিক যোগ্যতা, কাগজপত্র ও সময়সূচি",
      },
      {
        label: "মাদরাসার নিয়মাবলী",
        href: "/admission#rules",
        description: "ছাত্রদের আচরণবিধি ও আবাসিক শৃঙ্খলা",
      },
    ],
  },
  {
    label: "মিডিয়া",
    children: [
      {
        label: "নোটিশ বোর্ড",
        href: "/notices",
        description: "সর্বশেষ বিজ্ঞপ্তি, পরীক্ষা ও ভর্তি নোটিশ",
      },
      {
        label: "ফটো গ্যালারি",
        href: "/gallery",
        description: "জামিয়ার ক্যাম্পাস, মসজিদ ও শিক্ষা কার্যক্রমের স্থিরচিত্র",
      },
    ],
  },
  {
    label: "অনুদান",
    href: "/#donation",
  },
  {
    label: "যোগাযোগ",
    href: "/contact",
  },
];

export const INSTITUTIONAL_STATS: InstitutionalStat[] = [
  {
    id: "established",
    value: 99,
    suffix: "+",
    label: "বছরের গৌরবময় ঐতিহ্য",
    sublabel: "প্রতিষ্ঠাকাল: ১৯২৭ খ্রি. (১৩৪৭ হি.)",
  },
  {
    id: "departments",
    value: 7,
    suffix: "টি",
    label: "শিক্ষা ও প্রশিক্ষণ বিভাগ",
    sublabel: "মকতব থেকে দাওরায়ে হাদীস ও ইফতা",
  },
  {
    id: "teachers",
    value: 45,
    suffix: "+",
    label: "যোগ্য ও অভিজ্ঞ শিক্ষক",
    sublabel: "হাক্কানী উলামা ও প্রশিক্ষিত মুয়াল্লিম",
  },
  {
    id: "students",
    value: 1200,
    suffix: "+",
    label: "অধ্যয়নরত শিক্ষার্থী",
    sublabel: "আবাসিক ও অনাবাসিক ছাত্র",
  },
];

export const MUHTAMIM_MESSAGE = {
  nameBn: "শাইখুল হাদিস আল্লামা ওবায়দুল্লাহ হামযাহ (দা.বা.)",
  titleBn: "মুহতামিম (প্রধান পরিচালক)",
  organizationRoleBn:
    "সেক্রেটারি জেনারেল, আঞ্জুমানে ইত্তেহাদুল মাদারিস বাংলাদেশ",
  executiveNameBn: "মাওলানা আজিজুল হক",
  executiveTitleBn: "নির্বাহী পরিচালক",
  greetingAr: "بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ",
  salutationBn: "আসসালামু আলাইকুম ওয়া রাহমাতুল্লাহি ওয়া বারাকাতুহু,",
  paragraphs: [
    "সকল প্রশংসা মহান রাব্বুল আলামীনের জন্য এবং অসংখ্য দরূদ ও সালাম বর্ষিত হোক সর্বশ্রেষ্ঠ রাসূল হযরত মুহাম্মদ মুস্তফা সাল্লাল্লাহু আলাইহি ওয়া সাল্লামের প্রতি। আল জামিয়াতুল ইসলামিয়া দারুস সুন্নাহ, হ্নীলা—কক্সবাজার তথা দক্ষিণ চট্টগ্রামের এক সুপ্রাচীন ও ঐতিহ্যবাহী দ্বীনি বিদ্যাপীঠ। প্রায় শতবর্ষ ধরে এই প্রতিষ্ঠানটি পবিত্র কুরআন ও সুন্নাহর বিশুদ্ধ জ্ঞান বিতরণ, আদর্শ নাগরিক গঠন এবং সমাজে দ্বীনি চেতনার আলো ছড়িয়ে দিতে নিরলসভাবে কাজ করে যাচ্ছে।",
    "মুজাহিদে মিল্লাত আলহাজ্ব শাহ আবুল মনজুর (রহ.) এবং অলিকুল সম্রাট আল্লামা শাহ ইসহাক ছদর সাহেব (রহ.)-এর মতো মহান আকাবিরদের অক্লান্ত শ্রম, ত্যাগ ও আধ্যাত্মিক ফয়জে গড়ে ওঠা এই জামিয়া আজ বিশাল মহীরুহে পরিণত হয়েছে। মকতব ও নূরানী থেকে শুরু করে হিফজুল কুরআন, দাওরায়ে হাদীস (মাস্টার্স সমমান), ইফতা ও তাজবীদ বিভাগের পাশাপাশি যুগোপযোগী কম্পিউটার ও কারিগরি প্রশিক্ষণের মাধ্যমে আমরা শিক্ষার্থীদের দুনিয়া ও আখিরাতের কল্যাণের উপযোগী করে গড়ে তোলার প্রয়াস চালিয়ে যাচ্ছি।",
    "আমাদের লক্ষ্য কেবল পুঁথিগত শিক্ষা প্রদান নয়; বরং ইলমের সাথে আমল, তাকওয়া, সুন্নাতের অনুসরণ এবং মানবসেবার মহান গুণাবলী শিক্ষার্থীদের হৃদয়ে প্রোথিত করা। আমি দেশ-বিদেশের সকল দ্বীনদার মুসলিম ভাই-বোন, অভিভাবক, প্রাক্তন শিক্ষার্থী ও শুভানুধ্যায়ীদের আন্তরিক দোয়া ও সার্বিক সহযোগিতা কামনা করছি। আল্লাহ তাআলা এই জামিয়াকে কিয়ামত পর্যন্ত ইলম ও হেদায়াতের মারকায হিসেবে কবুল করুন। আমীন।",
  ],
};

export interface HeroSlide {
  id: string;
  image: string;
  alt: string;
  eyebrow: string;
  title: string;
  subtitle: string;
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "slide-campus",
    image: "/madrasahPic1.jpg",
    alt: "আল জামিয়াতুল ইসলামিয়া দারুস সুন্নাহ, হ্নীলা মূল ভবন ও মসজিদ মিনার",
    eyebrow: "স্থাপিত: ১৯২৭ খ্রি. / ১৩৪৭ হি. • হ্নীলা, টেকনাফ, কক্সবাজার",
    title: "আল জামিয়াতুল ইসলামিয়া দারুস সুন্নাহ, হ্নীলা",
    subtitle:
      "কুরআন ও সুন্নাহর বিশুদ্ধ শিক্ষা, আদর্শ চরিত্র গঠন এবং যুগোপযোগী দ্বীনি ও কারিগরি শিক্ষার শতবর্ষী প্রাণকেন্দ্র।",
  },
  {
    id: "slide-exam",
    image: "/madrasahPic3.jpg",
    alt: "জামিয়া দারুস সুন্নাহ হ্নীলার প্রশস্ত পরীক্ষা ও পাঠদান হলরুম",
    eyebrow: "সুশৃঙ্খল ও মানসম্মত পাঠদান",
    title: "মকতব থেকে দাওরায়ে হাদীস ও ইফতা পর্যন্ত পূর্ণাঙ্গ শিক্ষাব্যবস্থা",
    subtitle:
      "অভিজ্ঞ মুহাদ্দিস, মুফতি ও প্রশিক্ষিত শিক্ষকমণ্ডলীর নিবিড় তত্ত্বাবধানে আদর্শ আলিম ও হাফেজ গড়ার নির্ভরযোগ্য প্রতিষ্ঠান।",
  },
  {
    id: "slide-dua",
    image: "/madrasahPic4.jpg",
    alt: "জামিয়া মসজিদে উলামায়ে কেরাম ও শিক্ষার্থীদের দোয়া মাহফিল",
    eyebrow: "ইলম, আমল ও আধ্যাত্মিকতার সমন্বয়",
    title: "সুন্নাহর আলোয় আলোকিত প্রজন্ম বিনির্মাণে আমাদের পথচলা",
    subtitle:
      "আকাবিরদের আদর্শে পরিচালিত রুহানি পরিবেশ, নিয়মিত তরবিয়ত ও দ্বীনি খেদমতের অনন্য মারকায।",
  },
  {
    id: "slide-computer",
    image: "/madrasahPic6.jpg",
    alt: "জামিয়া দারুস সুন্নাহর আধুনিক কম্পিউটার প্রশিক্ষণ ল্যাব",
    eyebrow: "দ্বীনি শিক্ষার পাশাপাশি দক্ষতা উন্নয়ন",
    title: "আধুনিক কম্পিউটার ও কারিগরি প্রশিক্ষণে সমৃদ্ধ আগামী",
    subtitle:
      "সময়ের চাহিদা পূরণে শিক্ষার্থীদের জন্য বিশেষ কম্পিউটার ল্যাব ও আত্মনির্ভরশীল কর্মমুখী প্রশিক্ষণের ব্যবস্থা।",
  },
  {
    id: "slide-banner",
    image: "/banner.jpg",
    alt: "আল জামিয়াতুল ইসলামিয়া দারুস সুন্নাহ, হ্নীলা অফিসিয়াল ব্যানার",
    eyebrow: "كِتَابُ اللهِ وَ سُنَّةُ رَسُولِهِ",
    title: "ঈমানের পরিশুদ্ধি, চারিত্রিক উৎকর্ষ ও মানবতার খেদমত",
    subtitle:
      "আবাসিক ও অনাবাসিক সুব্যবস্থা, লিল্লাহ বোর্ডিং এবং সমৃদ্ধ কুতুবখানাসহ একটি আদর্শ ইসলামী বিদ্যাপীঠ।",
  },
];
