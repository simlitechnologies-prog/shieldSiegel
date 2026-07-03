import Link from "next/link";
import { blogs } from "@/data/blogs";
import { SectionTitle } from "@/components/sections/section-title";
import { BlogCard } from "@/components/cards/blog-card";
import { Button } from "@/components/ui/button";

export function LatestArticles() {
  const latest = blogs.slice(0, 3);

  return (
    <section className="bg-[var(--color-ivory)] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionTitle
          eyebrow="Einblicke"
          title="Aktuelle Beiträge aus unserem juristischen Blog"
        />

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {latest.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/blog">Weitere Artikel lesen</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
