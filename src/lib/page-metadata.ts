import type { Metadata } from "next";
import type { PageSEO } from "../content/evolution/types.ts";
import type { getPublicationConfig } from "./publication.ts";
export function buildPageMetadata(seo: PageSEO, publication: ReturnType<typeof getPublicationConfig>): Metadata {
  const canonical = publication.url ? new URL(seo.pathname, publication.url).href : undefined;
  const title = `${seo.title} | Foxstage`;
  return {
    title: { absolute: title }, description: seo.description,
    alternates: { canonical },
    robots: { index: publication.indexable, follow: publication.indexable },
    openGraph: { title, description: seo.description, siteName: "Foxstage", locale: "pt_BR", type: "website", ...(canonical ? { url: canonical } : {}), ...(seo.image && publication.url ? { images: [{ url: new URL(seo.image, publication.url).href, alt: seo.title }] } : {}) },
    twitter: { card: "summary_large_image", title, description: seo.description, ...(seo.image && publication.url ? { images: [new URL(seo.image, publication.url).href] } : {}) },
  };
}
