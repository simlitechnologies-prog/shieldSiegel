"use client";

import * as React from "react";
import { blogs, blogCategories } from "@/data/blogs";
import { BlogCard } from "@/components/cards/blog-card";
import { SearchBar } from "@/components/forms/search-bar";
import { Pagination } from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 6;

export function BlogExplorer() {
  const [query, setQuery] = React.useState("");
  const [category, setCategory] = React.useState<string | null>(null);
  const [page, setPage] = React.useState(1);

  const filtered = React.useMemo(() => {
    return blogs.filter((b) => {
      const matchesQuery =
        query.trim().length === 0 ||
        b.title.toLowerCase().includes(query.toLowerCase()) ||
        b.excerpt.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = !category || b.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [query, category]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  React.useEffect(() => {
    setPage(1);
  }, [query, category]);

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="w-full max-w-sm">
          <SearchBar value={query} onChange={setQuery} />
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setCategory(null)}
            className={cn(
              "rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wide",
              !category ? "bg-[var(--color-navy)] text-white" : "bg-[var(--color-ivory)] text-[var(--color-slate)]"
            )}
          >
            All
          </button>
          {blogCategories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={cn(
                "rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wide",
                category === c ? "bg-[var(--color-navy)] text-white" : "bg-[var(--color-ivory)] text-[var(--color-slate)]"
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {visible.length === 0 ? (
        <p className="mt-16 text-center text-sm text-[var(--color-slate)]">
          No articles match your search.
        </p>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      )}

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}
