import type { Blog } from "@/types";
import blogsJson from "./blogs.json";

export const blogs: Blog[] = blogsJson as Blog[];

export function getBlogBySlug(slug: string) {
  return blogs.find((b) => b.slug === slug);
}

export function getRelatedBlogs(current: Blog, limit = 3): Blog[] {
  return blogs
    .filter((b) => b.id !== current.id && b.category === current.category)
    .slice(0, limit);
}

export const blogCategories = Array.from(new Set(blogs.map((b) => b.category)));
