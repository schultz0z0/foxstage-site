import type { MetadataRoute } from "next";
import { getPublicationConfig } from "@/lib/publication";
import { getPublishedPathnames, pageAvailability } from "@/content/evolution/availability";
export const dynamic = "force-dynamic";

export default function sitemap(): MetadataRoute.Sitemap {
  const { url, indexable } = getPublicationConfig(process.env);
  return indexable && url ? getPublishedPathnames(pageAvailability).map(pathname => ({url: new URL(pathname, url).href})) : [];
}
