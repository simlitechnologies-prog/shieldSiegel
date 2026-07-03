import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Clock, CalendarDays } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { BlogCard } from "@/components/cards/blog-card";
import { blogs, getBlogBySlug, getRelatedBlogs } from "@/data/blogs";
import { formatDate } from "@/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return blogs.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      images: [{ url: post.featuredImage }],
    },
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) notFound();

  const related = getRelatedBlogs(post);

  return (
    <>
      <Navbar />
      <main id="main-content">
        <article className="bg-white py-16 lg:py-24">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <Breadcrumb items={[{ label: "Blog", href: "/blog" }, { label: post.title }]} />

            <Badge className="mt-6">{post.category}</Badge>
            <h1 className="mt-4 font-display text-3xl font-bold leading-tight text-[var(--color-navy)] sm:text-4xl">
              {post.title}
            </h1>

            <div className="mt-6 flex items-center gap-4 border-b border-black/5 pb-6">
              <div className="relative h-12 w-12 overflow-hidden rounded-full bg-[var(--color-navy)]">
                <Image src={post.author.avatarUrl} alt={post.author.name} fill className="object-cover" />
              </div>
              <div>
                <p className="font-display text-sm font-semibold text-[var(--color-navy)]">{post.author.name}</p>
                <p className="text-xs text-[var(--color-slate)]">{post.author.role}</p>
              </div>
              <div className="ml-auto flex flex-col items-end gap-1 text-xs text-[var(--color-slate)]">
                <span className="flex items-center gap-1">
                  <CalendarDays className="h-3.5 w-3.5" /> {formatDate(post.publishedAt)}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" /> {post.readingTime} min read
                </span>
              </div>
            </div>

            <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl">
              <Image src={post.featuredImage} alt={post.title} fill sizes="(min-width:1024px) 768px, 100vw" className="object-cover" />
            </div>

            <div className="prose prose-neutral mt-10 max-w-none leading-relaxed text-[var(--color-slate)]">
              <p>{post.content}</p>
            </div>

            <div className="mt-10 flex flex-wrap gap-2 border-t border-black/5 pt-6">
              {post.tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
          </div>
        </article>

        {related.length > 0 && (
          <section className="bg-[var(--color-ivory)] py-20">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <h2 className="font-display text-2xl font-semibold text-[var(--color-navy)]">
                Related articles
              </h2>
              <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((r) => (
                  <BlogCard key={r.id} post={r} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
