"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Info,
  Mail,
  MapPin,
  Phone,
  Search,
  UserCheck,
  Users,
  X,
} from "lucide-react";
import {
  ACTIVE_FACULTY,
  ALUMNI_ASSOCIATES,
  DIRECTOR_BOARD,
  TEACHER_DEPARTMENT_FILTERS,
  type DirectorMember,
  type Teacher,
} from "@/src/data/teachers";
import { SectionHeader } from "@/src/components/SectionHeader";
import {
  FadeInUp,
  StaggerContainer,
  StaggerItem,
} from "@/src/components/MotionPrimitives";

interface TeachersDirectoryProps {
  mode?: "preview" | "full";
}

function getInitials(nameEn: string): string {
  const cleaned = nameEn
    .replace(/\b(Mv\.?|Mawlana|Mowlana|Hafez|Hafej|HM|Md\.?|Mufti|Qari)\b/gi, "")
    .trim();
  const words = (cleaned || nameEn).split(/\s+/).filter(Boolean);
  if (words.length === 0) return "DS";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
}

function getGoogleDriveThumbnailUrl(driveUrl?: string): string | null {
  if (!driveUrl) return null;
  const idMatch =
    driveUrl.match(/[?&]id=([A-Za-z0-9_-]+)/) ||
    driveUrl.match(/\/d\/([A-Za-z0-9_-]+)/);
  if (!idMatch?.[1]) return null;
  return `https://lh3.googleusercontent.com/d/${idMatch[1]}=w400`;
}

function TeacherAvatar({
  teacher,
  size = "card",
}: {
  teacher: Teacher;
  size?: "card" | "modal";
}) {
  const driveThumb = getGoogleDriveThumbnailUrl(teacher.photoDriveUrl);
  const photoSrc = teacher.localPhoto || driveThumb;
  const isExternalDrive = !teacher.localPhoto && Boolean(driveThumb);
  const [imgFailed, setImgFailed] = useState(false);

  const sizeClass =
    size === "modal"
      ? "w-20 h-20 sm:w-24 sm:h-24"
      : "w-16 h-16 sm:w-[74px] sm:h-[74px]";

  if (photoSrc && !imgFailed) {
    return (
      <div
        className={`relative ${sizeClass} rounded-2xl overflow-hidden ring-2 ring-brand-gold/70 shadow-sm shrink-0 bg-surface-sage`}
      >
        <Image
          src={photoSrc}
          alt={teacher.nameBn}
          fill
          sizes={size === "modal" ? "96px" : "76px"}
          unoptimized={isExternalDrive}
          referrerPolicy="no-referrer"
          onError={() => setImgFailed(true)}
          style={{ objectPosition: teacher.photoPosition || "center" }}
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className={`relative ${sizeClass} rounded-2xl bg-gradient-to-br from-brand-primary via-brand-dark to-[#0e5a34] text-brand-gold-soft ring-2 ring-brand-gold/70 shadow-sm flex flex-col items-center justify-center shrink-0 overflow-hidden`}
    >
      <div className="absolute inset-0 islamic-pattern-dark opacity-45" />
      <span className="relative font-english text-lg sm:text-xl font-bold tracking-wider">
        {getInitials(teacher.nameEn)}
      </span>
      <span className="relative w-6 h-[2px] bg-brand-gold/80 rounded-full mt-1" />
    </div>
  );
}

function DirectorPortrait({ director }: { director: DirectorMember }) {
  const [imgFailed, setImgFailed] = useState(false);
  const showPhoto = Boolean(director.photo) && !imgFailed;

  return (
    <div
      className={`w-[168px] sm:w-[184px] mx-auto p-[3px] rounded-t-[96px] rounded-b-2xl bg-gradient-to-b from-[#E5BC54] via-[#D4A024] to-[#9E7212] ${
        director.featured
          ? "shadow-[0_14px_30px_-10px_rgba(11,77,44,0.42)]"
          : "shadow-[0_10px_24px_-10px_rgba(11,77,44,0.28)]"
      }`}
    >
      <div className="bg-[#0B4D2C] p-1.5 rounded-t-[90px] rounded-b-[13px]">
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-t-[84px] rounded-b-[10px] border border-[#D4A024]/70 bg-gradient-to-b from-[#0a4527] via-[#07331d] to-[#052615]">
          {showPhoto && director.photo ? (
            <Image
              src={director.photo}
              alt={director.nameBn}
              fill
              sizes="190px"
              onError={() => setImgFailed(true)}
              style={{ objectPosition: director.photoPosition || "50% 18%" }}
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
              <div className="absolute inset-0 islamic-pattern-dark opacity-55" />
              <div className="relative w-16 h-16 rounded-full bg-white/10 border border-[#D4A024]/70 flex items-center justify-center shadow-inner">
                <span className="font-english text-xl font-bold tracking-wider text-[#f5e9c8]">
                  {getInitials(director.nameEn)}
                </span>
              </div>
              <span className="relative mt-3 w-10 h-[2px] rounded-full bg-gradient-to-r from-transparent via-[#D4A024] to-transparent" />
              <span
                dir="rtl"
                className="relative mt-2.5 font-arabic text-sm text-[#f5e9c8]/90"
              >
                حفظه الله
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function DirectorBoardShowcase() {
  const orderedDirectors = [...DIRECTOR_BOARD].sort(
    (a, b) => a.precedence - b.precedence,
  );

  return (
    <div className="mb-12 md:mb-14">
      <FadeInUp className="mb-7 text-center">
        <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold tracking-wide bg-[#0B4D2C]/8 text-[#0B4D2C] border border-[#D4A024]/45">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4A024]" />
          পরিচালনা পর্ষদ
        </span>
        <h3 className="mt-2.5 text-xl sm:text-2xl font-bold text-ink-primary">
          জামিয়ার শীর্ষ নেতৃত্ব ও শিক্ষা পরিচালনা
        </h3>
        <div
          className="mt-2.5 flex items-center justify-center gap-2"
          aria-hidden="true"
        >
          <span className="h-[2px] w-10 rounded-full bg-gradient-to-r from-transparent to-[#D4A024]" />
          <span className="w-2 h-2 rotate-45 bg-[#D4A024] rounded-[2px]" />
          <span className="h-[2px] w-10 rounded-full bg-gradient-to-l from-transparent to-[#D4A024]" />
        </div>
      </FadeInUp>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-7 max-w-5xl mx-auto">
        {orderedDirectors.map((director) => (
          <StaggerItem key={director.id} className="h-full">
            <article
              className={`group h-full rounded-3xl bg-white overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 ${
                director.featured
                  ? "border-2 border-[#D4A024]/70 shadow-md hover:shadow-xl"
                  : "border border-brand-primary/15 hover:border-[#D4A024]/70 shadow-xs hover:shadow-lg"
              }`}
            >
              <div
                className={`h-1.5 ${
                  director.featured
                    ? "bg-gradient-to-r from-[#07331d] via-[#D4A024] to-[#0B4D2C]"
                    : "bg-gradient-to-r from-[#0B4D2C] via-[#D4A024]/80 to-[#156e3b]"
                }`}
              />

              <div className="p-6 sm:p-7 flex-1 flex flex-col items-center text-center">
                <DirectorPortrait director={director} />

                <span
                  dir="rtl"
                  className="mt-3.5 font-arabic text-sm text-[#0B4D2C]/90"
                >
                  حفظه الله تعالى
                </span>

                <span
                  className={`mt-2.5 inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                    director.featured
                      ? "bg-[#0B4D2C] text-[#f5e9c8] border border-[#D4A024]/60"
                      : "bg-surface-sage text-brand-primary border border-brand-primary/15"
                  }`}
                >
                  {director.roleBadge}
                </span>

                <h4 className="mt-3 text-lg sm:text-[1.15rem] font-bold text-ink-primary leading-snug">
                  {director.nameBn}
                </h4>

                <p className="mt-1 text-xs font-medium text-ink-muted">
                  {director.nameEn}
                </p>

                <p className="mt-3 pt-3 border-t border-brand-primary/10 w-full text-xs sm:text-[13px] text-ink-body leading-relaxed">
                  {director.subtitle}
                </p>
              </div>
            </article>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  );
}

export function TeachersDirectory({
  mode = "preview",
}: TeachersDirectoryProps) {
  const [viewTab, setViewTab] = useState<"faculty" | "alumni">("faculty");
  const [selectedDept, setSelectedDept] = useState<string>("সকল বিভাগ");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);

  const sourceList = viewTab === "faculty" ? ACTIVE_FACULTY : ALUMNI_ASSOCIATES;

  const filtered = sourceList.filter((teacher) => {
    const matchesDept =
      viewTab === "alumni" ||
      selectedDept === "সকল বিভাগ" ||
      teacher.departmentGroups.includes(selectedDept);
    const q = searchQuery.trim().toLowerCase();
    const matchesQuery =
      !q ||
      teacher.nameBn.toLowerCase().includes(q) ||
      teacher.nameEn.toLowerCase().includes(q) ||
      teacher.designation.toLowerCase().includes(q) ||
      teacher.department.toLowerCase().includes(q);
    return matchesDept && matchesQuery;
  });

  const visibleTeachers =
    mode === "preview" ? ACTIVE_FACULTY.slice(0, 3) : filtered;

  return (
    <section
      id="teachers"
      className={
        mode === "preview"
          ? "py-16 md:py-24 bg-surface-ivory"
          : "py-12 md:py-16 bg-surface-ivory"
      }
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {mode === "preview" && (
          <SectionHeader
            eyebrow="পরিচালনা পর্ষদ ও শিক্ষকমণ্ডলী"
            title="পরিচালনা পর্ষদ ও অভিজ্ঞ শিক্ষকমণ্ডলী"
            subtitle="হাক্কানী উলামায়ে কেরামের সুদক্ষ পরিচালনা এবং মুহাদ্দিস, মুফতি, ক্বারী ও প্রশিক্ষিত মুয়াল্লিমদের নিবিড় তত্ত্বাবধানে পরিচালিত হচ্ছে আমাদের প্রতিটি বিভাগ।"
          />
        )}

        {/* Director Board (Muhtamim, Nayebe Muhtamim, Najem-e-Talimat) */}
        <DirectorBoardShowcase />

        {/* Subheading separating Director Board from Faculty in preview mode */}
        {mode === "preview" && (
          <FadeInUp className="mb-6 flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <span className="h-6 w-1.5 rounded-full bg-[#0B4D2C]" />
              <h3 className="text-lg sm:text-xl font-bold text-ink-primary">
                সম্মানিত শিক্ষকমণ্ডলী (আসাতিযায়ে কেরাম)
              </h3>
            </div>
            <Link
              href="/teachers"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-primary hover:text-brand-secondary transition-colors"
            >
              <span>আরও শিক্ষক দেখুন</span>
              <ArrowRight className="w-4 h-4 text-brand-gold" />
            </Link>
          </FadeInUp>
        )}

        {/* Full Mode Controls: Notice Banner, Faculty/Alumni Tabs, Department Filter, Search */}
        {mode === "full" && (
          <div className="mb-8 space-y-5">
            {/* Dignified Notice: Remaining Teachers Being Uploaded */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-surface-sage via-white to-brand-gold-soft/35 border border-brand-gold/45 p-5 sm:p-6 shadow-xs">
              <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-gradient-to-b from-brand-primary via-brand-gold to-brand-secondary" />
              <div className="flex items-start gap-3.5 pl-2">
                <div className="w-10 h-10 rounded-xl bg-brand-primary text-brand-gold-soft flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                  <Info className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h2 className="text-base sm:text-lg font-bold text-ink-primary">
                    সম্মানিত আসাতিযায়ে কেরামের তালিকা হালনাগাদ চলছে
                  </h2>
                  <p className="text-sm sm:text-[15px] text-ink-body leading-relaxed text-justify">
                    আলহামদুলিল্লাহ, অত্র জামিয়ায় আরও বহু বিজ্ঞ উলামায়ে কেরাম,
                    মুহাদ্দিস, মুফতি ও অভিজ্ঞ শিক্ষকবৃন্দ নিষ্ঠার সাথে দ্বীনি
                    খেদমতে নিয়োজিত রয়েছেন। আমাদের সম্মানিত সকল শিক্ষকের তথ্য ও
                    ছবি সংগ্রহ ও যাচাই-বাছাইয়ের কাজ চলমান রয়েছে—খুব শীঘ্রই
                    পূর্ণাঙ্গ তালিকা এখানে সংযুক্ত করা হবে, ইনশাআল্লাহ।
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-brand-primary/12 shadow-xs">
              {/* Faculty vs Alumni Switch */}
              <div className="inline-flex rounded-xl bg-surface-sage p-1 self-start">
                <button
                  type="button"
                  onClick={() => {
                    setViewTab("faculty");
                    setSelectedDept("সকল বিভাগ");
                  }}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                    viewTab === "faculty"
                      ? "bg-brand-primary text-white shadow-xs"
                      : "text-ink-body hover:text-brand-primary"
                  }`}
                >
                  <UserCheck className="w-4 h-4" />
                  <span>কর্মরত শিক্ষকমণ্ডলী ({ACTIVE_FACULTY.length})</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setViewTab("alumni");
                    setSelectedDept("সকল বিভাগ");
                  }}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                    viewTab === "alumni"
                      ? "bg-brand-primary text-white shadow-xs"
                      : "text-ink-body hover:text-brand-primary"
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>
                    প্রাক্তন শিক্ষার্থী ও শুভানুধ্যায়ী ({ALUMNI_ASSOCIATES.length})
                  </span>
                </button>
              </div>

              {/* Search Input */}
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-ink-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="নাম, পদবি বা বিভাগ খুঁজুন..."
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-brand-primary/20 bg-surface-ivory/60 text-sm text-ink-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary"
                />
              </div>
            </div>

            {/* Department Filter Pills (Faculty tab) */}
            {viewTab === "faculty" && (
              <div className="flex flex-wrap gap-2">
                {TEACHER_DEPARTMENT_FILTERS.map((dept) => (
                  <button
                    key={dept}
                    type="button"
                    onClick={() => setSelectedDept(dept)}
                    className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold border transition-colors cursor-pointer ${
                      selectedDept === dept
                        ? "bg-brand-primary text-white border-brand-primary shadow-xs"
                        : "bg-white text-ink-body border-brand-primary/15 hover:bg-surface-sage hover:text-brand-primary"
                    }`}
                  >
                    {dept}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Teachers Grid */}
        {visibleTeachers.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-brand-primary/10">
            <Users className="w-10 h-10 text-ink-muted/50 mx-auto mb-3" />
            <p className="text-ink-muted font-medium">
              এই ফিল্টার বা অনুসন্ধানে কোনো শিক্ষকের তথ্য পাওয়া যায়নি।
            </p>
          </div>
        ) : (
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleTeachers.map((teacher) => (
              <StaggerItem key={teacher.id}>
                <article className="h-full bg-white rounded-2xl border border-brand-primary/12 p-5 sm:p-6 shadow-xs hover:shadow-lg hover:-translate-y-1 hover:border-brand-gold/70 transition-all duration-300 flex flex-col">
                  <div className="flex items-start gap-4">
                    <TeacherAvatar teacher={teacher} />
                    <div className="min-w-0 flex-1">
                      <span className="inline-block px-2.5 py-0.5 rounded-full bg-surface-sage text-brand-primary text-[11px] font-bold border border-brand-primary/15 mb-1.5">
                        {teacher.department}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-ink-primary leading-snug">
                        {teacher.nameBn}
                      </h3>
                      <p className="text-xs sm:text-sm font-medium text-brand-secondary mt-0.5 leading-snug">
                        {teacher.designation}
                      </p>
                    </div>
                  </div>

                  {teacher.bio && (
                    <p className="mt-4 text-xs sm:text-sm text-ink-muted leading-relaxed line-clamp-2 text-justify">
                      {teacher.bio}
                    </p>
                  )}

                  <div className="mt-4 pt-4 border-t border-brand-primary/10 space-y-1.5 text-xs text-ink-muted">
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                      <a
                        href={`tel:${teacher.phone.replace(/[^0-9+]/g, "")}`}
                        className="hover:text-brand-primary font-medium transition-colors"
                      >
                        {teacher.phone}
                      </a>
                    </div>
                    {teacher.address && (
                      <div className="flex items-start gap-2">
                        <MapPin className="w-3.5 h-3.5 text-brand-gold shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{teacher.address}</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-auto pt-4 flex items-center justify-between">
                    <span className="text-[11px] text-ink-muted font-medium truncate max-w-[60%]">
                      {teacher.nameEn}
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedTeacher(teacher)}
                      className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-brand-primary hover:text-brand-secondary cursor-pointer"
                    >
                      <span>বিস্তারিত</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}

        {mode === "preview" && (
          <div className="mt-10 text-center">
            <Link
              href="/teachers"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-primary hover:bg-brand-dark text-white font-semibold text-sm sm:text-base shadow-sm transition-colors"
            >
              <span>সকল শিক্ষকমণ্ডলীর তালিকা দেখুন</span>
              <ArrowRight className="w-4 h-4 text-brand-gold-bright" />
            </Link>
          </div>
        )}
      </div>

      {/* Teacher Profile Modal */}
      <AnimatePresence>
        {selectedTeacher && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTeacher(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.2 }}
              className="relative z-10 w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-brand-primary/15 overflow-hidden max-h-[88vh] flex flex-col"
            >
              <div className="bg-gradient-to-r from-brand-dark to-brand-primary text-white p-6 flex items-start justify-between gap-4 border-b-2 border-brand-gold">
                <div className="flex items-center gap-4 min-w-0">
                  <TeacherAvatar
                    key={selectedTeacher.id}
                    teacher={selectedTeacher}
                    size="modal"
                  />
                  <div className="min-w-0">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-brand-gold/20 border border-brand-gold/40 text-brand-gold-soft text-xs font-semibold mb-1">
                      {selectedTeacher.department}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold leading-snug">
                      {selectedTeacher.nameBn}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/80">
                      {selectedTeacher.nameEn}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedTeacher(null)}
                  aria-label="বন্ধ করুন"
                  className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center shrink-0 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto space-y-5 text-sm">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wide text-brand-primary mb-1">
                    পদবি ও দায়িত্ব
                  </h4>
                  <p className="text-ink-primary font-semibold text-base">
                    {selectedTeacher.designation}
                  </p>
                </div>

                {selectedTeacher.bio && (
                  <div className="p-4 rounded-xl bg-surface-ivory border border-brand-primary/10">
                    <h4 className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-primary mb-2">
                      <BookOpen className="w-4 h-4 text-brand-gold" />
                      শিক্ষাগত যোগ্যতা ও সংক্ষিপ্ত জীবনী
                    </h4>
                    <p className="text-ink-body leading-relaxed whitespace-pre-line text-justify">
                      {selectedTeacher.bio}
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-surface-sage/55 border border-brand-primary/10">
                    <p className="text-xs text-ink-muted mb-1 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-brand-primary" />
                      মোবাইল নম্বর
                    </p>
                    <a
                      href={`tel:${selectedTeacher.phone.replace(/[^0-9+]/g, "")}`}
                      className="font-bold text-ink-primary hover:text-brand-primary"
                    >
                      {selectedTeacher.phone}
                    </a>
                  </div>

                  {selectedTeacher.email && (
                    <div className="p-3.5 rounded-xl bg-surface-sage/55 border border-brand-primary/10">
                      <p className="text-xs text-ink-muted mb-1 flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-brand-primary" />
                        ইমেইল
                      </p>
                      <a
                        href={`mailto:${selectedTeacher.email}`}
                        className="font-semibold text-ink-primary hover:text-brand-primary break-all"
                      >
                        {selectedTeacher.email}
                      </a>
                    </div>
                  )}
                </div>

                {selectedTeacher.address && (
                  <div className="p-3.5 rounded-xl bg-surface-ivory border border-brand-primary/10">
                    <p className="text-xs text-ink-muted mb-1 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-brand-primary" />
                      ঠিকানা
                    </p>
                    <p className="font-medium text-ink-body">
                      {selectedTeacher.address}
                    </p>
                  </div>
                )}
              </div>

              <div className="px-6 py-3.5 bg-surface-ivory border-t border-brand-primary/10 flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedTeacher(null)}
                  className="px-5 py-2 rounded-lg bg-brand-primary hover:bg-brand-dark text-white text-sm font-semibold cursor-pointer"
                >
                  বন্ধ করুন
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
