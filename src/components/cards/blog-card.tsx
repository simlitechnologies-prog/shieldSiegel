import Link from "next/link";
import Image from "next/image";
import { Clock } from "lucide-react";
import type { Blog } from "@/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

export function BlogCard({ post }: { post: Blog }) {
  return (
    <Card className="group flex h-full flex-col overflow-hidden p-0">
      <Link
        href={`/blog/${post.slug}`}
        className="relative block aspect-[16/10] overflow-hidden"
      >
        <Image
          src={post.featuredImage}
          alt={post.title}
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <Badge>{post.category}</Badge>

        <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-[var(--color-navy)]">
          <Link
            href={`/blog/${post.slug}`}
            className="hover:text-[var(--color-gold)]"
          >
            {post.title}
          </Link>
        </h3>

        <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--color-slate)]">
          {post.excerpt}
        </p>

        <div className="mt-5 flex items-center justify-between border-t border-black/5 pt-4 text-xs text-[var(--color-slate)]">
          <span>{post.author.name}</span>

          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> {post.readingTime} Min. Lesezeit
          </span>
        </div>

        <p className="mt-1 text-xs text-[var(--color-slate)]/70">
          {formatDate(post.publishedAt)}
        </p>
      </div>
    </Card>
  );
}
