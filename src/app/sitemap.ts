import type { MetadataRoute } from "next";
import { siteConfig } from "@/constants/site";
import { practiceAreas } from "@/data/practice-areas";
import { attorneys } from "@/data/attorneys";
import { blogs } from "@/data/blogs";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "", "/about", "/practice-areas", "/attorneys", "/blog", "/contact",
    "/consultation", "/careers", "/privacy", "/terms",
  ].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
  }));

  const practiceRoutes = practiceAreas.map((p) => ({
    url: `${siteConfig.url}/practice-areas/${p.slug}`,
    lastModified: new Date(),
  }));

  const attorneyRoutes = attorneys.map((a) => ({
    url: `${siteConfig.url}/attorneys/${a.slug}`,
    lastModified: new Date(),
  }));

  const blogRoutes = blogs.map((b) => ({
    url: `${siteConfig.url}/blog/${b.slug}`,
    lastModified: b.publishedAt,
  }));

  return [...staticRoutes, ...practiceRoutes, ...attorneyRoutes, ...blogRoutes];
}
