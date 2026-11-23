import { Suspense } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  ChevronRight,
  Home,
  Tag,
  User,
} from "lucide-react";
import { getPostBySlug, getPosts } from "@/src/lib/queries";
import { PostGalleryLightbox } from "@/src/components/sections/PostGalleryLightbox";

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/posts/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "পোস্ট পাওয়া যায়নি",
    };
  }

  return {
    title: post.titleBn,
    description: post.excerptBn,
  };
}

async function PostDetailContent({
  params,
}: Pick<PageProps<"/posts/[slug]">, "params">) {
  const { slug } = await params;
  const [post, allPosts] = await Promise.all([getPostBySlug(slug), getPosts()]);

  if (!post) {
    notFound();
  }

  const relatedPosts = allPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <>
      {/* Top Emerald Header Banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-dark via-brand-primary to-[#0e5a34] text-white border-b-4 border-brand-gold">
        <div className="absolute inset-0 islamic-pattern-dark opacity-60 pointer-events-none" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <nav
            aria-label="ব্রেডক্রাম্ব"
            className="flex flex-wrap items-center gap-1.5 text-xs sm:text-sm text-brand-gold-soft/90 mb-5"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-1 hover:text-white transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              হোম
            </Link>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            <Link
              href="/posts"
              className="hover:text-white transition-colors"
            >
              সংবাদ ও কার্যক্রম
            </Link>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            <span className="text-white font-medium line-clamp-1">
              {post.category}
            </span>
          </nav>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-gold/20 border border-brand-gold/50 text-brand-gold-soft text-xs font-semibold mb-4">
            <Tag className="w-3.5 h-3.5" />
            {post.category}
          </span>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-snug text-white">
            {post.titleBn}
          </h1>

          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:text-sm text-white/85">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-brand-gold-bright" />
              <span>প্রকাশিত: {post.dateBn}</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <User className="w-4 h-4 text-brand-gold-bright" />
              <span>{post.authorBn}</span>
            </span>
          </div>
        </div>
      </section>

      {/* Main Article Body */}
      <article className="py-12 md:py-16 bg-surface-ivory">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl border border-brand-primary/12 shadow-sm overflow-hidden">
            {/* Cover Photo */}
            <div className="relative w-full aspect-[16/9] bg-brand-dark">
              <Image
                src={post.coverImageUrl}
                alt={post.titleBn}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 896px"
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-6 sm:p-10 md:p-12">
              <p className="text-base sm:text-lg font-semibold text-brand-primary leading-relaxed pb-6 mb-6 border-b border-brand-primary/10 text-justify">
                {post.excerptBn}
              </p>

              <div className="space-y-5 text-sm sm:text-base text-ink-body leading-[1.9] text-justify">
                {post.contentBn.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>

              {/* Photo Gallery with Lightbox */}
              <PostGalleryLightbox
                images={post.galleryImages}
                titleBn={post.titleBn}
              />

              {/* Back Navigation */}
              <div className="mt-10 pt-6 border-t border-brand-primary/10 flex flex-wrap items-center justify-between gap-4">
                <Link
                  href="/posts"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-surface-sage hover:bg-brand-primary hover:text-white text-brand-primary font-semibold text-sm transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>সকল সংবাদ ও কার্যক্রমে ফিরুন</span>
                </Link>

                <Link
                  href="/notices"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-primary hover:text-brand-secondary"
                >
                  <span>নোটিশ বোর্ড দেখুন</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="mt-14">
              <h2 className="text-xl sm:text-2xl font-bold text-ink-primary mb-6 flex items-center gap-2">
                <span className="w-1.5 h-6 rounded-full bg-brand-gold" />
                <span>অন্যান্য সাম্প্রতিক সংবাদ</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {relatedPosts.map((related) => (
                  <Link
                    key={related.id}
                    href={`/posts/${related.slug}`}
                    className="group bg-white rounded-2xl border border-brand-primary/12 overflow-hidden shadow-xs hover:shadow-lg hover:border-brand-gold/70 transition-all flex flex-col"
                  >
                    <div className="relative h-44 bg-brand-dark overflow-hidden">
                      <Image
                        src={related.coverImageUrl}
                        alt={related.titleBn}
                        fill
                        sizes="(max-width: 640px) 100vw, 50vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <span className="text-xs font-semibold text-brand-secondary mb-1.5">
                        {related.category} • {related.dateBn}
                      </span>
                      <h3 className="text-base font-bold text-ink-primary group-hover:text-brand-primary leading-snug line-clamp-2">
                        {related.titleBn}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </>
  );
}

export default function PostDetailPage(props: PageProps<"/posts/[slug]">) {
  return (
    <Suspense
      fallback={
        <div className="max-w-4xl mx-auto px-4 py-20 text-center text-ink-muted">
          পোস্ট লোড হচ্ছে...
        </div>
      }
    >
      <PostDetailContent params={props.params} />
    </Suspense>
  );
}
