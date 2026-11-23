import type { Metadata } from "next";
import { PageBanner } from "@/src/components/PageBanner";
import { PostsSection } from "@/src/components/sections/PostsSection";
import { getPosts } from "@/src/lib/queries";

export const metadata: Metadata = {
  title: "সংবাদ ও কার্যক্রম",
  description:
    "আল জামিয়াতুল ইসলামিয়া দারুস সুন্নাহ, হ্নীলার সাম্প্রতিক সংবাদ, মাহফিল, অনুষ্ঠান, পরীক্ষা ও শিক্ষা কার্যক্রমের প্রতিবেদন এবং স্থিরচিত্র।",
};

export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <>
      <PageBanner
        title="সংবাদ ও কার্যক্রম"
        subtitle="জামিয়ার সাম্প্রতিক মাহফিল, দোয়া অনুষ্ঠান, শিক্ষা অর্জন, প্রশিক্ষণ এবং ক্যাম্পাসের সকল খবরাখবর ও স্থিরচিত্র।"
        breadcrumb="সংবাদ ও কার্যক্রম"
      />
      <PostsSection posts={posts} mode="full" />
    </>
  );
}
