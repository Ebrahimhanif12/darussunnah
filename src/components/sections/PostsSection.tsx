"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  Images,
  Newspaper,
  Search,
  User,
} from "lucide-react";
import {
  POST_CATEGORIES,
  STATIC_POSTS,
  type Post,
  type PostCategory,
} from "@/src/data/posts";
import { SectionHeader } from "@/src/components/SectionHeader";
import { StaggerContainer, StaggerItem } from "@/src/components/MotionPrimitives";

interface PostsSectionProps {
  mode?: "preview" | "full";
  posts?: Post[];
}

export function PostsSection({
  mode = "preview",
  posts = STATIC_POSTS,
}: PostsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<
    "সকল" | PostCategory
  >("সকল");
  const [query, setQuery] = useState("");

  const filteredPosts = posts.filter((post) => {
    const matchesCat =
      selectedCategory === "সকল" || post.category === selectedCategory;
    const q = query.trim().toLowerCase();
    const matchesSearch =
      !q ||
      post.titleBn.toLowerCase().includes(q) ||
      post.excerptBn.toLowerCase().includes(q) ||
      post.category.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  const visiblePosts =
    mode === "preview" ? filteredPosts.slice(0, 3) : filteredPosts;

  return (
    <section
      id="posts"
      className={
        mode === "preview"
          ? "py-16 md:py-24 bg-white border-t border-brand-primary/10"
          : "py-12 md:py-16 bg-surface-ivory"
      }
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {mode === "preview" && (
          <SectionHeader
            eyebrow="সংবাদ ও কার্যক্রম"
            title="জামিয়ার সাম্প্রতিক পোস্ট, অনুষ্ঠান ও বার্তা"
            subtitle="মাহফিল, শিক্ষা কার্যক্রম, পরীক্ষা, প্রশিক্ষণ এবং জামিয়ার সাম্প্রতিক খবরাখবর ও স্থিরচিত্র এখান থেকে জানুন।"
          />
        )}

        {mode === "full" && (
          <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-brand-primary/12 shadow-xs">
            <div className="flex flex-wrap gap-2">
              {POST_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-brand-primary text-white shadow-xs"
                      : "bg-surface-sage text-ink-body hover:bg-brand-primary/10 hover:text-brand-primary"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-ink-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="পোস্ট বা সংবাদ খুঁজুন..."
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-brand-primary/20 bg-surface-ivory/50 text-sm text-ink-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary"
              />
            </div>
          </div>
        )}

        {visiblePosts.length === 0 ? (
          <div className="text-center py-14 bg-white rounded-2xl border border-brand-primary/10">
            <Newspaper className="w-10 h-10 text-ink-muted/50 mx-auto mb-3" />
            <p className="text-ink-muted font-medium">
              আপনার অনুসন্ধানের সাথে মিলে এমন কোনো পোস্ট পাওয়া যায়নি।
            </p>
          </div>
        ) : (
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visiblePosts.map((post) => (
              <StaggerItem key={post.id}>
                <article className="h-full bg-white rounded-2xl border border-brand-primary/12 overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1 hover:border-brand-gold/70 transition-all duration-300 flex flex-col group">
                  <Link
                    href={`/posts/${post.slug}`}
                    className="relative block h-52 sm:h-56 overflow-hidden bg-brand-dark"
                  >
                    <Image
                      src={post.coverImageUrl}
                      alt={post.titleBn}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-brand-dark/80 backdrop-blur-xs border border-brand-gold/45 text-brand-gold-soft text-xs font-semibold">
                      {post.category}
                    </span>

                    {post.galleryImages.length > 1 && (
                      <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/65 backdrop-blur-xs text-white text-[11px] font-semibold">
                        <Images className="w-3.5 h-3.5 text-brand-gold-bright" />
                        <span>{post.galleryImages.length}টি ছবি</span>
                      </span>
                    )}
                  </Link>

                  <div className="p-5 sm:p-6 flex-1 flex flex-col">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-muted mb-2.5">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-brand-gold" />
                        {post.dateBn}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-brand-gold" />
                        {post.authorBn}
                      </span>
                    </div>

                    <Link href={`/posts/${post.slug}`}>
                      <h3 className="text-lg font-bold text-ink-primary group-hover:text-brand-primary transition-colors leading-snug line-clamp-2">
                        {post.titleBn}
                      </h3>
                    </Link>

                    <p className="mt-2.5 text-sm text-ink-muted leading-relaxed line-clamp-3 text-justify">
                      {post.excerptBn}
                    </p>

                    <div className="mt-auto pt-5">
                      <Link
                        href={`/posts/${post.slug}`}
                        className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-primary hover:text-brand-secondary transition-colors"
                      >
                        <span>বিস্তারিত পড়ুন</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}

        {mode === "preview" && (
          <div className="mt-10 text-center">
            <Link
              href="/posts"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-primary hover:bg-brand-dark text-white font-semibold text-sm sm:text-base shadow-sm transition-colors"
            >
              <span>সকল সংবাদ ও কার্যক্রম দেখুন</span>
              <ArrowRight className="w-4 h-4 text-brand-gold-bright" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
