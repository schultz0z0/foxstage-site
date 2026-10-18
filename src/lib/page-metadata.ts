import type { Metadata } from "next";
import type { PageSEO } from "../content/evolution/types.ts";
import type { getPublicationConfig } from "./publication.ts";
export function buildPageMetadata(seo: PageSEO, publication: ReturnType<typeof getPublicationConfig>): Metadata {
  const canonical = publication.url ? new URL(seo.pathname, publication.url).href : undefined;
  const title = `${seo.title} | Foxstage`;
  const imagePath = seo.image ?? "/opengraph-image/hero-20261017-v2";
  const imageUrl = publication.url ? new URL(imagePath, publication.url).href : imagePath;
  return {
    title: { absolute: title }, description: seo.description,
    alternates: { canonical },
    robots: { index: publication.indexable, follow: publication.indexable },
    openGraph: { title, description: seo.description, siteName: "Foxstage", locale: "pt_BR", type: "website", ...(canonical ? { url: canonical } : {}), images: [{ url: imageUrl, alt: seo.title }] },
    twitter: { card: "summary_large_image", title, description: seo.description, images: [imageUrl] },
  };
}
