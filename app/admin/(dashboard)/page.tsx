import { Suspense } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Bell,
  CheckCircle2,
  FileEdit,
  Newspaper,
  Plus,
} from "lucide-react";
import { requireAdminSession } from "@/src/lib/supabase/server";

const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
function toBn(num: number): string {
  return String(num)
    .split("")
    .map((c) => (c >= "0" && c <= "9" ? BN_DIGITS[Number(c)] : c))
    .join("");
}

async function DashboardContent() {
  const { supabase } = await requireAdminSession();

  const [noticesRes, postsRes] = await Promise.all([
    supabase
      .from("notices")
      .select("id, title, category, is_published, is_pinned, published_at")
      .order("published_at", { ascending: false }),
    supabase
      .from("posts")
      .select("id, title, slug, category, is_published, published_at")
      .order("published_at", { ascending: false }),
  ]);

  const notices = noticesRes.data ?? [];
  const posts = postsRes.data ?? [];

  const totalNotices = notices.length;
  const publishedNotices = notices.filter((n) => n.is_published).length;
  const totalPosts = posts.length;
  const publishedPosts = posts.filter((p) => p.is_published).length;

  const stats = [
    {
      label: "মোট নোটিশ",
      value: toBn(totalNotices),
      sub: `খসড়া: ${toBn(totalNotices - publishedNotices)}টি`,
      icon: Bell,
      href: "/admin/notices",
    },
    {
      label: "প্রকাশিত নোটিশ",
      value: toBn(publishedNotices),
      sub: "পাবলিক সাইটে দৃশ্যমান",
      icon: CheckCircle2,
      href: "/admin/notices",
    },
    {
      label: "মোট পোস্ট / সংবাদ",
      value: toBn(totalPosts),
      sub: `খসড়া: ${toBn(totalPosts - publishedPosts)}টি`,
      icon: Newspaper,
      href: "/admin/posts",
    },
    {
      label: "প্রকাশিত পোস্ট",
      value: toBn(publishedPosts),
      sub: "সংবাদ ও কার্যক্রম পাতায়",
      icon: FileEdit,
      href: "/admin/posts",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome & Quick Actions */}
      <div className="bg-gradient-to-r from-brand-dark via-brand-primary to-[#0e5a34] text-white rounded-3xl p-6 sm:p-8 shadow-md border-b-4 border-brand-gold relative overflow-hidden">
        <div className="absolute inset-0 islamic-pattern-dark opacity-45 pointer-events-none" />
        <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <p className="text-xs sm:text-sm text-brand-gold-soft font-semibold">
              আসসালামু আলাইকুম • অ্যাডমিন ড্যাশবোর্ড
            </p>
            <h2 className="mt-1 text-2xl sm:text-3xl font-bold">
              আল জামিয়াতুল ইসলামিয়া দারুস সুন্নাহ, হ্নীলা
            </h2>
            <p className="mt-2 text-sm text-white/85 max-w-2xl">
              এখান থেকে মাদরাসার নোটিশ বোর্ড এবং সংবাদ ও কার্যক্রম (ছবিসহ)
              সহজেই যুক্ত, সম্পাদনা ও প্রকাশ করতে পারবেন।
            </p>
          </div>

          <div className="flex flex-wrap gap-3 shrink-0">
            <Link
              href="/admin/notices?new=1"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-brand-gold hover:bg-brand-gold-bright text-brand-dark font-bold text-sm shadow-sm transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>নতুন নোটিশ যোগ করুন</span>
            </Link>
            <Link
              href="/admin/posts?new=1"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/15 hover:bg-white/25 text-white border border-white/25 font-bold text-sm transition-colors"
            >
              <Plus className="w-4 h-4 text-brand-gold-soft" />
              <span>নতুন পোস্ট লিখুন</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.label}
              href={stat.href}
              className="bg-white rounded-2xl p-6 border border-brand-primary/12 shadow-xs hover:shadow-md hover:border-brand-gold/60 transition-all group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-11 h-11 rounded-xl bg-surface-sage text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-colors flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <ArrowRight className="w-4 h-4 text-ink-muted group-hover:text-brand-primary group-hover:translate-x-0.5 transition-all" />
              </div>
              <p className="text-3xl font-bold text-ink-primary">{stat.value}</p>
              <p className="text-sm font-bold text-brand-primary mt-1">
                {stat.label}
              </p>
              <p className="text-xs text-ink-muted mt-0.5">{stat.sub}</p>
            </Link>
          );
        })}
      </div>

      {/* Recent Notices & Recent Posts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Notices */}
        <div className="bg-white rounded-2xl border border-brand-primary/12 p-6 shadow-xs">
          <div className="flex items-center justify-between gap-2 pb-4 mb-4 border-b border-brand-primary/10">
            <h3 className="font-bold text-lg text-ink-primary flex items-center gap-2">
              <Bell className="w-5 h-5 text-brand-primary" />
              সাম্প্রতিক নোটিশসমূহ
            </h3>
            <Link
              href="/admin/notices"
              className="text-xs font-bold text-brand-primary hover:underline"
            >
              সব দেখুন →
            </Link>
          </div>

          {notices.length === 0 ? (
            <p className="text-sm text-ink-muted py-6 text-center">
              এখনও কোনো নোটিশ যোগ করা হয়নি।
            </p>
          ) : (
            <ul className="divide-y divide-brand-primary/10">
              {notices.slice(0, 5).map((n) => (
                <li
                  key={n.id}
                  className="py-3 flex items-start justify-between gap-3"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-ink-primary line-clamp-1">
                      {n.title}
                    </p>
                    <p className="text-xs text-ink-muted mt-0.5">
                      {n.category} •{" "}
                      {n.is_published ? "প্রকাশিত" : "খসড়া"}
                    </p>
                  </div>
                  <Link
                    href="/admin/notices"
                    className="text-xs font-semibold text-brand-primary hover:underline shrink-0"
                  >
                    পরিচালনা
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Recent Posts */}
        <div className="bg-white rounded-2xl border border-brand-primary/12 p-6 shadow-xs">
          <div className="flex items-center justify-between gap-2 pb-4 mb-4 border-b border-brand-primary/10">
            <h3 className="font-bold text-lg text-ink-primary flex items-center gap-2">
              <Newspaper className="w-5 h-5 text-brand-primary" />
              সাম্প্রতিক পোস্ট ও সংবাদ
            </h3>
            <Link
              href="/admin/posts"
              className="text-xs font-bold text-brand-primary hover:underline"
            >
              সব দেখুন →
            </Link>
          </div>

          {posts.length === 0 ? (
            <p className="text-sm text-ink-muted py-6 text-center">
              এখনও কোনো পোস্ট যোগ করা হয়নি।
            </p>
          ) : (
            <ul className="divide-y divide-brand-primary/10">
              {posts.slice(0, 5).map((p) => (
                <li
                  key={p.id}
                  className="py-3 flex items-start justify-between gap-3"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-ink-primary line-clamp-1">
                      {p.title}
                    </p>
                    <p className="text-xs text-ink-muted mt-0.5">
                      {p.category} •{" "}
                      {p.is_published ? "প্রকাশিত" : "খসড়া"}
                    </p>
                  </div>
                  <Link
                    href="/admin/posts"
                    className="text-xs font-semibold text-brand-primary hover:underline shrink-0"
                  >
                    পরিচালনা
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="py-12 text-center text-sm text-ink-muted">
          ড্যাশবোর্ড তথ্য লোড হচ্ছে...
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}
