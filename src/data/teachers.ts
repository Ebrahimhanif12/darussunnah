export type TeacherStatus = "faculty" | "alumni";

export interface DirectorMember {
  id: string;
  precedence: number;
  nameBn: string;
  nameEn: string;
  roleBadge: string;
  designation: string;
  subtitle: string;
  phone?: string;
  photo?: string;
  photoPosition?: string;
  featured?: boolean;
}

export const DIRECTOR_BOARD: DirectorMember[] = [
  {
    id: "dir-01",
    precedence: 1,
    nameBn: "শাইখুল হাদিস আল্লামা ওবায়দুল্লাহ হামযাহ (দা.বা.)",
    nameEn: "Shaykhul Hadith Allama Obaidullah Hamza",
    roleBadge: "মুহতামিম ও পরিচালক",
    designation: "মুহতামিম (প্রধান পরিচালক)",
    subtitle: "সেক্রেটারি জেনারেল, আঞ্জুমানে ইত্তেহাদুল মাদারিস বাংলাদেশ",
    photo: "/Obaidullah_Hamza.jpg",
    photoPosition: "50% 18%",
    featured: true,
  },
  {
    id: "dir-02",
    precedence: 2,
    nameBn: "মাওলানা ক্বারী মুখতার আহমদ সাহেব (দা.বা.)",
    nameEn: "Mawlana Qari Mukhtar Ahmad",
    roleBadge: "সদরে মুহতামিম ও শায়খুল হাদীস",
    designation: "সদরে মুহতামিম ও শায়খুল হাদীস",
    subtitle: "সদরে মুহতামিম ও শায়খুল হাদীস, জামিয়া দারুস সুন্নাহ, হ্নীলা",
    phone: "+880 1832-619565",
    photo: "/mukhtarhujur.jpeg",
    photoPosition: "55% 30%",
    featured: true,
  },
  {
    id: "dir-03",
    precedence: 3,
    nameBn: "মাওলানা আজিজুল হক (দা.বা.)",
    nameEn: "Mawlana Azizul Haque",
    roleBadge: "নায়েবে মুহতামিম (নির্বাহী পরিচালক)",
    designation: "নায়েবে মুহতামিম (নির্বাহী পরিচালক)",
    subtitle: "সার্বিক পরিচালনা ও প্রশাসনিক তত্ত্বাবধান, জামিয়া দারুস সুন্নাহ",
    photo: "/azizul hok.jpg",
    photoPosition: "50% 18%",
  },
  {
    id: "dir-04",
    precedence: 4,
    nameBn: "মাওলানা মিসবাহ উদ্দিন মামুন (দা.বা.)",
    nameEn: "Mawlana Misbah Uddin Mamun",
    roleBadge: "নাযেমে তা'লীমাত (শিক্ষা পরিচালক)",
    designation: "নাযেমে তা'লীমাত (শিক্ষা পরিচালক)",
    subtitle: "শিক্ষা বিভাগ ও পাঠদান তত্ত্বাবধান, জামিয়া দারুস সুন্নাহ",
    photo: "/misbah.jpeg",
    photoPosition: "50% 18%",
  },
];

export interface Teacher {
  id: string;
  nameBn: string;
  nameEn: string;
  designation: string;
  department: string;
  departmentGroups: string[];
  phone: string;
  email?: string;
  address?: string;
  bio?: string;
  /** Original Google Drive upload URL from teachers.xlsx */
  photoDriveUrl?: string;
  /** Optional local photo path inside /public/teachers/ once added */
  localPhoto?: string;
  /** Optional CSS object-position override (e.g. "50% 35%") for portrait framing */
  photoPosition?: string;
  status: TeacherStatus;
}

export const TEACHER_DEPARTMENT_FILTERS = [
  "সকল বিভাগ",
  "কিতাব বিভাগ",
  "ইফতা ও তাজবীদ",
  "নূরানী বিভাগ",
  "ইবতেদায়ী বিভাগ",
  "কম্পিউটার বিভাগ",
] as const;

/**
 * Parsed and normalized from /madrasahInfo/teachers.xlsx (all 15 rows preserved).
 * Active Madrasah faculty (13) carry status: "faculty".
 * Alumni / associate submissions (2) carry status: "alumni" so they can be viewed separately.
 */
export const TEACHERS: Teacher[] = [
  {
    id: "t-14",
    nameBn: "মাওলানা মুফতি আহমদুল্লাহ ফরিদ",
    nameEn: "Mawlana Mufti Ahmadullah",
    designation: "মুহাদ্দিস ও ইফতা বিভাগীয় প্রধান",
    department: "ইফতা ও কিতাব বিভাগ",
    departmentGroups: ["ইফতা ও তাজবীদ", "কিতাব বিভাগ"],
    phone: "+880 1820-060899",
    status: "faculty",
    localPhoto:"/ahmadullah2.jpeg",
  },
  {
    id: "t-05",
    nameBn: "মাওলানা মুফতি ওমর ফারুক",
    nameEn: "Mawlana Mufti Omar Faruq",
    designation: "মুহাদ্দিস ও মুফতি",
    department: "ইফতা বিভাগ",
    departmentGroups: ["ইফতা ও তাজবীদ", "কিতাব বিভাগ"],
    phone: "01813-261891",
    address: "তুলাতলী, হোয়াইক্যং, টেকনাফ, কক্সবাজার।",
    localPhoto:
      "/omorFaruk.jpg",
    status: "faculty",
  },
  {
    id: "t-07",
    nameBn: "মাওলানা নাজের হোছাইন",
    nameEn: "Mowlana Nazer Hossain",
    designation: "সিনিয়র শিক্ষক ও হিসাব রক্ষক",
    department: "কিতাব বিভাগ ও হিসাব শাখা",
    departmentGroups: ["কিতাব বিভাগ"],
    phone: "01815-672785",
    email: "nazerhossain@gmail.com",
    address:
      "গ্রাম: মধ্যম হলদিয়া পালং, পোস্ট: মরিচ্যা পালং, থানা: উখিয়া, জেলা: কক্সবাজার।",
    bio: "দাওরায়ে হাদীস (মাস্টার্স) সম্পন্ন। সুদীর্ঘ ৩০ বছর ধরে নিষ্ঠার সাথে দ্বীনি শিক্ষাদান ও প্রতিষ্ঠানের দায়িত্ব পালন করে আসছেন।",
    localPhoto:
      "/najir.jpg",
    status: "faculty",
  },
  {
    id: "t-06",
    nameBn: "মাওলানা ক্বারী নুরুল আবছার",
    nameEn: "Mv. Qari Nurul Absar",
    designation:
      "জিম্মাদার: তাজবীদ বিভাগ, সহকারী নাজেমে দারুল ইকামা ও সহকারী নাজেমে কুতুবখানা (লাইব্রেরী)",
    department: "কিতাব ও তাজবীদ বিভাগ",
    departmentGroups: ["কিতাব বিভাগ", "ইফতা ও তাজবীদ"],
    phone: "01817-756025",
    email: "quri.n.absar@gmail.com",
    address:
      "গ্রাম: ধাওন খালী, ইউনিয়ন: পি.এম. খালী, থানা ও জেলা: কক্সবাজার, চট্টগ্রাম।",
    bio: "শিক্ষাগত যোগ্যতা: দাওরায়ে হাদীস (মাস্টার্স) এবং ক্বেরাতে হাফস ও ক্বেরাতে সাবআ (সাবআ ক্বারী) সম্পন্ন।",
    localPhoto:
      "/absar.jpg",
    status: "faculty",
  },
  {
    id: "t-02",
    nameBn: "হাফেজ মাওলানা রহিম উল্লাহ",
    nameEn: "Hafez Mawlana Rahim Ullah",
    designation: "সিনিয়র শিক্ষক",
    department: "কিতাব বিভাগ",
    departmentGroups: ["কিতাব বিভাগ"],
    phone: "01839-356217",
    email: "rahimullahshamsu@gmail.com",
    address: "বালুখালী (তুলাতলী), হোয়াইক্যং, টেকনাফ, কক্সবাজার।",
    bio: "নূরানী ৩য় শ্রেণী ও সাধারণ শিক্ষায় ৮ম শ্রেণী সমাপ্ত করার পাশাপাশি হিফজুল কুরআন সম্পন্ন করেছেন। পরবর্তীতে কিতাব বিভাগে দাওরায়ে হাদীস (মাস্টার্স সমমান) অর্জন করেন এবং বিগত ৫ বছর ধরে একনিষ্ঠভাবে দ্বীনি খেদমতে নিয়োজিত আছেন।",
    localPhoto:
      "/rahim.jpg",
    status: "faculty",
  },
  {
    id: "t-11",
    nameBn: "মাওলানা নূর মোহাম্মদ নূরানী",
    nameEn: "Nur Mohammad Noorani",
    designation: "নূরানী বিভাগীয় প্রধান",
    department: "নূরানী বিভাগ",
    departmentGroups: ["নূরানী বিভাগ"],
    phone: "01867-015338",
    address: "পশ্চিম সিকদার পাড়া, হ্নীলা, টেকনাফ, কক্সবাজার।",
    localPhoto:
      "/nur.jpg",
    status: "faculty",
  },
  {
    id: "t-10",
    nameBn: "মাওলানা আসহাব উদ্দিন",
    nameEn: "Ashab Uddin",
    designation: "সহকারী প্রধান (নূরানী বিভাগ)",
    department: "নূরানী বিভাগ",
    departmentGroups: ["নূরানী বিভাগ"],
    phone: "01868-517876",
    address: "পশ্চিম পানখালী, দক্ষিণ হ্নীলা, টেকনাফ, কক্সবাজার।",
    localPhoto:
      "/ashab.jpg",
    status: "faculty",
  },
  {
    id: "t-01",
    nameBn: "হাফেজ মাওলানা ওসামাহ রহিম রাহী",
    nameEn: "HM Osama Rahim Rahi",
    designation: "সহকারী শিক্ষক (নূরানী বিভাগ) ও কম্পিউটার বিভাগীয় প্রধান",
    department: "নূরানী ও কম্পিউটার বিভাগ",
    departmentGroups: ["নূরানী বিভাগ", "কম্পিউটার বিভাগ"],
    phone: "01607-146948",
    email: "Najirosama2@gmail.com",
    address: "মিস্ত্রি পাড়া, শাহ্ পরীর দ্বীপ, টেকনাফ, কক্সবাজার।",
    bio: "পবিত্র কুরআনের হিফজ সম্পন্ন—বাহরুল উলুম বড় মাদরাসা, শাহ্ পরীর দ্বীপ। দাওরায়ে হাদীস ফারেগ—দারুল উলুম মঈনুল ইসলাম, হাটহাজারী, চট্টগ্রাম। দাখিল ও আলিম সম্পন্ন এবং বর্তমানে ফাজিল ২য় বর্ষে অধ্যয়নরত—রাজা পালং এম.ইউ. ফাজিল মাদরাসা।",
    localPhoto:
      "/osama.HEIC",
    status: "faculty",
  },
  {
    id: "t-09",
    nameBn: "মাওলানা মোঃ নুরুল হোসাইন",
    nameEn: "Md. Nurul Hossain",
    designation: "শিক্ষা বিভাগীয় সচিব ও সহকারী শিক্ষক (নূরানী বিভাগ)",
    department: "নূরানী বিভাগ",
    departmentGroups: ["নূরানী বিভাগ"],
    phone: "01822-322811",
    address: "পশ্চিম সিকদার পাড়া, হ্নীলা, টেকনাফ, কক্সবাজার।",
    localPhoto:
      "/nurhos.jpg",
    status: "faculty",
  },
  // {
  //   id: "t-13",
  //   nameBn: "মাওলানা সাইফুল ইসলাম",
  //   nameEn: "Mv. Saiful Islam",
  //   designation: "সিনিয়র শিক্ষক",
  //   department: "নূরানী বিভাগ",
  //   departmentGroups: ["নূরানী বিভাগ"],
  //   phone: "01897-720933",
  //   email: "saifulislamjalal966@gmail.com",
  //   address: "লেদা, হ্নীলা, টেকনাফ, কক্সবাজার।",
  //   bio: "দাওরায়ে হাদীস, নূরানী ট্রেনিং ও হুফফাযুল কুরআনের প্রশিক্ষণ অর্জন করেছেন। ২০১১-২০১২ সাল থেকে সুনামের সাথে দ্বীনি শিক্ষাদান করে আসছেন।",
  //   photoDriveUrl:
  //     "https://drive.google.com/open?id=1ijA0634Wwdcz1vkxL4oog42lqFALGvQX",
  //   status: "faculty",
  // },
  {
    id: "t-03",
    nameBn: "মাওলানা মোহাম্মাদ ত্বহা",
    nameEn: "Mv. Mohammad Tuha",
    designation: "শিক্ষক",
    department: "নূরানী বিভাগ",
    departmentGroups: ["নূরানী বিভাগ"],
    phone: "01830-064532",
    email: "mtuha0367@gmail.com",
    address: "হ্নীলা, পশ্চিম সিকদার পাড়া, টেকনাফ, কক্সবাজার।",
    bio: "দাওরায়ে হাদীস সম্পন্ন ও নূরানী মুয়াল্লিম প্রশিক্ষণপ্রাপ্ত।",
    localPhoto:
      "/tuha.jpg",
    status: "faculty",
  },
  {
    id: "t-12",
    nameBn: "মাওলানা মুহাম্মদ নূরী",
    nameEn: "Mohammad Nury",
    designation: "সহকারী শিক্ষক",
    department: "নূরানী বিভাগ",
    departmentGroups: ["নূরানী বিভাগ"],
    phone: "01820-881510",
    address: "পশ্চিম সিকদার পাড়া, হ্নীলা, টেকনাফ, কক্সবাজার।",
    bio: "২০০৮ সালে আল জামিয়াতুল ইসলামিয়া দারুস সুন্নাহ, হ্নীলা থেকে দাওরায়ে হাদীস সম্পন্ন করেছেন।",
    localPhoto:
      "/nury.jpg",
    status: "faculty",
  },
  {
    id: "t-08",
    nameBn: "মাওলানা মোঃ আবছার কামাল",
    nameEn: "Md. Absar Kamal",
    designation: "শিক্ষক",
    department: "ইবতেদায়ী বিভাগ",
    departmentGroups: ["ইবতেদায়ী বিভাগ"],
    phone: "01859-396780",
    email: "mdabsarkamal231@gmail.com",
    address: "পূর্ব পানখালী, হ্নীলা, টেকনাফ, কক্সবাজার।",
    bio: "দাওরায়ে হাদীস (মাস্টার্স), ২০১৪-১৫ খ্রি. এবং নূরানী মুয়াল্লিম প্রশিক্ষণপ্রাপ্ত।",
    localPhoto:
      "/absarkamal.jpg",
    status: "faculty",
  },
  {
    id: "t-04",
    nameBn: "হাফেজ মাওলানা এনামুল হক মনজুর",
    nameEn: "Hafez Mawlana Anamul Hoque Manjur",
    designation: "শিক্ষক",
    department: "ইবতেদায়ী বিভাগ",
    departmentGroups: ["ইবতেদায়ী বিভাগ"],
    phone: "০১৮১৪২৭৩৫",
    address: "পশ্চিম সিকদার পাড়া, হ্নীলা, টেকনাফ, কক্সবাজার।",
    localPhoto:
      "/anam.jpeg",
    status: "faculty",
  },
  // Separated alumni / associate submissions from teachers.xlsx
  // {
  //   id: "a-02",
  //   nameBn: "হাফেজ মাওলানা মোঃ তৈয়ব",
  //   nameEn: "Hafez Mv. Md. Tayub",
  //   designation: "প্রাক্তন কৃতি শিক্ষার্থী ও সাবেক শিক্ষক",
  //   department: "প্রাক্তন শিক্ষার্থী (দাখিল ও হিফজ)",
  //   departmentGroups: ["প্রাক্তন শিক্ষার্থী"],
  //   phone: "01814-267942",
  //   email: "mohammadtayub42@gmail.com",
  //   address:
  //     "গ্রাম: পশ্চিম সিকদার পাড়া, পোস্ট: হ্নীলা-৪৭৬১, উপজেলা: টেকনাফ, জেলা: কক্সবাজার।",
  //   bio: "জামিয়া দারুস সুন্নাহ হ্নীলার প্রাক্তন শিক্ষার্থী—মকতব, হিফজুল কুরআন ও কিতাব বিভাগের প্রাথমিক জামাতসমূহ অত্র জামিয়ায় সম্পন্ন করেন। পরবর্তীতে দারুল উলুম মঈনুল ইসলাম হাটহাজারী থেকে দাওরায়ে হাদীস এবং আলিয়া ধারায় দাখিল থেকে কামিল (মাস্টার্স) সনদ অর্জন করেন। দীর্ঘদিন বিভিন্ন প্রতিষ্ঠানে শিক্ষকতার পর বর্তমানে উদ্যোক্তা হিসেবে নিয়োজিত।",
  //   photoDriveUrl:
  //     "https://drive.google.com/open?id=1j-Nqo7s9IvbN3a86_V_q02zQXpFVforp",
  //   status: "alumni",
  // },
  // {
  //   id: "a-01",
  //   nameBn: "হেলাল উদ্দীন আরমান",
  //   nameEn: "Helal Uddin Arman",
  //   designation: "প্রাক্তন শিক্ষার্থী ও শুভানুধ্যায়ী (ব্যবসায়ী)",
  //   department: "কম্পিউটার শাখা ও শুভানুধ্যায়ী",
  //   departmentGroups: ["কম্পিউটার বিভাগ", "প্রাক্তন শিক্ষার্থী"],
  //   phone: "01815-715880",
  //   email: "helaluddin.arman80@gmail.com",
  //   address:
  //     "গ্রাম: নাটমুরা পাড়া, ওয়ার্ড নং-০৫, ডাকঘর: হ্নীলা বাজার (৪৭৬১), টেকনাফ, কক্সবাজার।",
  //   photoDriveUrl:
  //     "https://drive.google.com/open?id=1C4OU2WYiZeeGNvX5-SbqDi6WfXma4l_q",
  //   status: "alumni",
  // },
];

export const ACTIVE_FACULTY = TEACHERS.filter((t) => t.status === "faculty");
export const ALUMNI_ASSOCIATES = TEACHERS.filter((t) => t.status === "alumni");
