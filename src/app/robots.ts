import type { MetadataRoute } from "next";
import { getPublicationConfig } from "@/lib/publication";
export const dynamic = "force-dynamic";

export default function robots(): MetadataRoute.Robots {
  const { url, indexable } = getPublicationConfig(process.env);
  return { rules: { userAgent: "*", ...(indexable ? { allow: "/", disallow: "/api/" } : { disallow: "/" }) }, ...(indexable && url ? { sitemap: new URL("/sitemap.xml", url).href } : {}) };
}
