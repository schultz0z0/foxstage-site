import { site } from "@/content/site";
import { getPublicationConfig } from "@/lib/publication";
import { buildStructuredData, serializeStructuredData } from "@/lib/structured-data";
import type { PageSEO } from "@/content/evolution/types";
export function PageStructuredData({ seo }: { seo: PageSEO }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{__html: serializeStructuredData(buildStructuredData(seo, getPublicationConfig(process.env), site))}} />;
}
