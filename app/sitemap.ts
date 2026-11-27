
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    "",
    "/rajasthan-gk",
    "/rajasthan-history",
    "/rajasthan-geography",
    "/rajasthan-art-culture",
    "/rajasthan-polity",
    "/rajasthan-current-affairs",
  ];

  return pages.map((page) => ({
    url: `https://toppertest.online${page}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: page === "" ? 1 : 0.8,
  }));
}
