"use client";

import { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("সাধারণ জিজ্ঞাসা");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  if (sent) {
    return (
      <div className="bg-surface-sage rounded-2xl border border-brand-primary/20 p-6 sm:p-8 text-center">
        <div className="w-14 h-14 mx-auto rounded-full bg-brand-primary text-white flex items-center justify-center mb-4">
          <CheckCircle2 className="w-7 h-7 text-brand-gold-bright" />
        </div>
        <h3 className="text-xl font-bold text-ink-primary">
          আপনার বার্তা সফলভাবে প্রেরিত হয়েছে!
        </h3>
        <p className="mt-2 text-sm text-ink-body max-w-md mx-auto leading-relaxed">
          জাযাকাল্লাহু খাইরান, <strong>{name}</strong>। আমাদের অফিস থেকে দ্রুতই
          আপনার সাথে যোগাযোগ করা হবে, ইনশাআল্লাহ।
        </p>
        <button
          type="button"
          onClick={() => {
            setSent(false);
            setName("");
            setPhone("");
            setMessage("");
          }}
          className="mt-5 px-5 py-2.5 rounded-xl bg-brand-primary hover:bg-brand-dark text-white text-sm font-semibold cursor-pointer"
        >
          আরেকটি বার্তা পাঠান
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
          আমাদের কাছে বার্তা পাঠান
        </h3>
        <p className="text-xs sm:text-sm text-ink-muted mt-1">
          ভর্তি, অনুদান, ফতোয়া বা যেকোনো পরামর্শের জন্য নিচের ফরমটি পূরণ করুন।
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-ink-primary mb-1.5">
            আপনার নাম *
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="আপনার পূর্ণ নাম লিখুন"
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
      </div>

      <div>
        <label className="block text-sm font-semibold text-ink-primary mb-1.5">
          বিষয়
        </label>
        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full px-3.5 py-2.5 rounded-xl border border-brand-primary/20 bg-surface-ivory/50 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary"
        >
          <option value="সাধারণ জিজ্ঞাসা">সাধারণ জিজ্ঞাসা</option>
          <option value="ভর্তি সংক্রান্ত তথ্য">ভর্তি সংক্রান্ত তথ্য</option>
          <option value="অনুদান ও রসিদ">অনুদান ও রসিদ</option>
          <option value="প্রাক্তন শিক্ষার্থী নিবন্ধন">
            প্রাক্তন শিক্ষার্থী নিবন্ধন
          </option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-ink-primary mb-1.5">
          বিস্তারিত বার্তা *
        </label>
        <textarea
          rows={4}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="আপনার জিজ্ঞাসা বা বার্তা বিস্তারিত লিখুন..."
          className="w-full px-3.5 py-2.5 rounded-xl border border-brand-primary/20 bg-surface-ivory/50 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary"
        />
      </div>

      <button
        type="submit"
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-primary hover:bg-brand-dark text-white font-bold text-sm sm:text-base shadow-sm transition-colors cursor-pointer"
      >
        <Send className="w-4 h-4 text-brand-gold-bright" />
        <span>বার্তা পাঠান</span>
      </button>
    </form>
  );
}
