export interface DonationFund {
  id: string;
  titleBn: string;
  badgeBn: string;
  descriptionBn: string;
}

export interface PaymentAccount {
  id: string;
  providerBn: string;
  typeBn: string;
  accountNameBn: string;
  accountNumber: string;
  branchOrNoteBn: string;
  accentColor: "emerald" | "pink" | "orange";
}

export const DONATION_INTRO = {
  verseAr: "مَثَلُ الَّذِينَ يُنفِقُونَ أَمْوَالَهُمْ فِي سَبِيلِ اللَّهِ كَمَثَلِ حَبَّةٍ أَنبَتَتْ سَبْعَ سَنَابِلَ",
  verseTranslationBn:
    "“যারা আল্লাহর রাস্তায় তাদের সম্পদ ব্যয় করে, তাদের উপমা একটি শস্যবীজের মতো, যা থেকে সাতটি শীষ জন্মায়...” — সূরা আল-বাকারা: ২৬১",
  descriptionBn:
    "আল জামিয়াতুল ইসলামিয়া দারুস সুন্নাহ, হ্নীলা সর্বস্তরের দ্বীনদার মুসলমানদের আন্তরিক দান, যাকাত ও সদকার মাধ্যমে পরিচালিত একটি ঐতিহ্যবাহী দ্বীনি শিক্ষা প্রতিষ্ঠান। আপনার সামান্য সহযোগিতা শত শত এতিম ও অসহায় তালিবে ইলমের দ্বীনি শিক্ষা এবং সদকায়ে জারিয়ার মাধ্যম হতে পারে।",
};

export const DONATION_FUNDS: DonationFund[] = [
  {
    id: "zakat",
    titleBn: "যাকাত ও ফিতরা তহবিল",
    badgeBn: "শরয়ী খাত",
    descriptionBn:
      "সম্পূর্ণ শরয়ী নীতিমালা অনুসরণ করে (তামলীকের মাধ্যমে) কেবল হকদার এতিম ও অসহায় শিক্ষার্থীদের খোরাকি ও শিক্ষাব্যয়ে ব্যয় করা হয়।",
  },
  {
    id: "lillah",
    titleBn: "লিল্লাহ বোর্ডিং ও এতিম তহবিল",
    badgeBn: "মাসিক খোরাকি",
    descriptionBn:
      "অসচ্ছল ও এতিম শিক্ষার্থীদের তিন বেলা মানসম্মত খাবার, চিকিৎসা ও আবাসিক ব্যয়ভার বহনের জন্য নিবেদিত তহবিল।",
  },
  {
    id: "sadaqah",
    titleBn: "সদকা ও সাধারণ অনুদান",
    badgeBn: "সদকায়ে জারিয়া",
    descriptionBn:
      "মাদরাসার নিয়মিত শিক্ষাকার্যক্রম, কুতুবখানা সমৃদ্ধকরণ, শিক্ষকদের হাদিয়া এবং সার্বিক পরিচালনায় ব্যবহৃত হয়।",
  },
  {
    id: "development",
    titleBn: "মসজিদ ও অবকাঠামো উন্নয়ন",
    badgeBn: "নির্মাণ তহবিল",
    descriptionBn:
      "শ্রেণিকক্ষ সম্প্রসারণ, ছাত্রাবাস সংস্কার, মসজিদ রক্ষণাবেক্ষণ ও আধুনিক কম্পিউটার ল্যাব উন্নয়নে আপনার সদকায়ে জারিয়া।",
  },
];

export const PAYMENT_ACCOUNTS: PaymentAccount[] = [
  {
    id: "bank-ibbl",
    providerBn: "ইসলামী ব্যাংক বাংলাদেশ পিএলসি",
    typeBn: "ব্যাংক অ্যাকাউন্ট (সাধারণ ও উন্নয়ন)",
    accountNameBn: "আল জামিয়াতুল ইসলামিয়া দারুস সুন্নাহ, হ্নীলা",
    accountNumber: "2050-1234-5678-90123",
    branchOrNoteBn: "শাখা: হ্নীলা / টেকনাফ শাখা, কক্সবাজার (অফিসিয়াল হিসাব নং হালনাগাদযোগ্য)",
    accentColor: "emerald",
  },
  {
    id: "bkash",
    providerBn: "বিকাশ (bKash)",
    typeBn: "মার্চেন্ট / পার্সোনাল (অনুদান হেল্পলাইন)",
    accountNumber: "01815672785",
    accountNameBn: "হিসাব শাখা — জামিয়া দারুস সুন্নাহ, হ্নীলা",
    branchOrNoteBn: "রেফারেন্সে খাত উল্লেখ করুন (যেমন: Zakat / Lillah / Sadaqah)",
    accentColor: "pink",
  },
  {
    id: "nagad",
    providerBn: "নগদ (Nagad)",
    typeBn: "পার্সোনাল / অনুদান হিসাব",
    accountNumber: "01815672785",
    accountNameBn: "অফিস হিসাব — জামিয়া দারুস সুন্নাহ, হ্নীলা",
    branchOrNoteBn: "অনুদান প্রেরণের পর রসিদ সংগ্রহের জন্য অফিসে কল বা মেসেজ করুন",
    accentColor: "orange",
  },
];
