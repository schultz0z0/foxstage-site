import type { MetadataRoute } from "next";
import { getPublicationConfig } from "@/lib/publication";

export default function sitemap(): MetadataRoute.Sitemap {
  const { url, indexable } = getPublicationConfig(process.env);
  return indexable && url ? [{ url: url.href }] : [];
}
