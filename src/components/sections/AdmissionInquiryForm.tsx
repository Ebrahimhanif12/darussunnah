"use client";

import { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { CORE_DEPARTMENTS } from "@/src/data/departments";

export function AdmissionInquiryForm() {
  const [submitted, setSubmitted] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [guardianName, setGuardianName] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState(CORE_DEPARTMENTS[0].nameBn);
  const [residence, setResidence] = useState("আবাসিক");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-surface-sage rounded-2xl border border-brand-primary/20 p-6 sm:p-8 text-center">
        <div className="w-14 h-14 mx-auto rounded-full bg-brand-primary text-white flex items-center justify-center mb-4">
          <CheckCircle2 className="w-7 h-7 text-brand-gold-bright" />
        </div>
        <h3 className="text-xl font-bold text-ink-primary">
          প্রাথমিক ভর্তি অনুসন্ধান গৃহীত হয়েছে!
        </h3>
        <p className="mt-2 text-sm sm:text-base text-ink-body max-w-md mx-auto leading-relaxed">
          ধন্যবাদ, <strong>{guardianName || studentName}</strong>।{" "}
          <strong>{department}</strong>-এ ভর্তির প্রাথমিক তথ্য সংরক্ষিত হয়েছে।
          চূড়ান্ত ভর্তির জন্য নির্ধারিত কাগজপত্রসহ মাদরাসা অফিসে উপস্থিত হওয়ার
          অনুরোধ করা হলো।
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setStudentName("");
            setGuardianName("");
            setPhone("");
            setNotes("");
          }}
          className="mt-5 px-5 py-2.5 rounded-xl bg-brand-primary hover:bg-brand-dark text-white text-sm font-semibold cursor-pointer"
        >
          নতুন অনুসন্ধান ফরম পূরণ করুন
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl border border-brand-primary/15 p-6 sm:p-8 shadow-sm space-y-4"
    >
      <div>
        <h3 className="text-xl font-bold text-ink-primary">
          অনলাইন প্রাথমিক ভর্তি অনুসন্ধান ফরম
        </h3>
        <p className="text-xs sm:text-sm text-ink-muted mt-1">
          নিচের তথ্যগুলো পূরণ করে প্রাথমিক আগ্রহ জানাতে পারেন; অফিস থেকে আপনার
          সাথে যোগাযোগ করা হবে।
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-ink-primary mb-1.5">
            শিক্ষার্থীর নাম *
          </label>
          <input
            type="text"
            required
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            placeholder="যেমন: মুহাম্মদ আব্দুল্লাহ"
            className="w-full px-3.5 py-2.5 rounded-xl border border-brand-primary/20 bg-surface-ivory/50 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-ink-primary mb-1.5">
            অভিভাবকের নাম *
          </label>
          <input
            type="text"
            required
            value={guardianName}
            onChange={(e) => setGuardianName(e.target.value)}
            placeholder="পিতা বা অভিভাবকের পূর্ণ নাম"
            className="w-full px-3.5 py-2.5 rounded-xl border border-brand-primary/20 bg-surface-ivory/50 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-ink-primary mb-1.5">
            মোবাইল নম্বর *
          </label>
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="০১XXXXXXXXX"
            className="w-full px-3.5 py-2.5 rounded-xl border border-brand-primary/20 bg-surface-ivory/50 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-ink-primary mb-1.5">
            আগ্রহী বিভাগ *
          </label>
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-brand-primary/20 bg-surface-ivory/50 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary"
          >
            {CORE_DEPARTMENTS.map((dept) => (
              <option key={dept.id} value={dept.nameBn}>
                {dept.nameBn}
              </option>
            ))}
            <option value="ইফতা ও তাজবীদ বিভাগ">ইফতা ও তাজবীদ বিভাগ</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-ink-primary mb-1.5">
          আবাসিক অবস্থা
        </label>
        <div className="flex flex-wrap gap-3">
          {["আবাসিক", "অনাবাসিক", "লিল্লাহ বোর্ডিং (আবেদনযোগ্য)"].map(
            (opt) => (
              <label
                key={opt}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border text-sm cursor-pointer transition-colors ${
                  residence === opt
                    ? "bg-surface-sage border-brand-primary text-brand-primary font-semibold"
                    : "bg-white border-brand-primary/15 text-ink-body"
                }`}
              >
                <input
                  type="radio"
                  name="residence"
                  value={opt}
                  checked={residence === opt}
                  onChange={() => setResidence(opt)}
                  className="accent-brand-primary"
                />
                <span>{opt}</span>
              </label>
            )
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-ink-primary mb-1.5">
          অতিরিক্ত তথ্য / প্রশ্ন (ঐচ্ছিক)
        </label>
        <textarea
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="শিক্ষার্থীর বয়স, পূর্ববর্তী জামাত বা বিশেষ কোনো জিজ্ঞাসা লিখুন..."
          className="w-full px-3.5 py-2.5 rounded-xl border border-brand-primary/20 bg-surface-ivory/50 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary"
        />
      </div>

      <button
        type="submit"
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-primary hover:bg-brand-dark text-white font-bold text-sm sm:text-base shadow-sm transition-colors cursor-pointer"
      >
        <Send className="w-4 h-4 text-brand-gold-bright" />
        <span>প্রাথমিক তথ্য জমা দিন</span>
      </button>
    </form>
  );
}
