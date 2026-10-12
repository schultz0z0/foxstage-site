import type { PageSEO } from "../content/evolution/types.ts";
import { schoolLocation } from "../content/evolution/location.ts";
type OrganizationInfo = { name: string; instagram: string; logo: string; phone: string; description: string };
type Publication = { url?: URL; indexable: boolean };
export function buildStructuredData(seo: PageSEO, publication: Publication, school: OrganizationInfo) {
  const base = publication.url;
  const absolute = (path: string) => base ? new URL(path, base).href : undefined;
  const organization = {
    "@type": "EducationalOrganization", ...(base ? { "@id": absolute("/#escola"), url: base.href, logo: absolute(school.logo) } : {}),
    name: school.name, description: school.description, sameAs: [school.instagram],
    telephone: school.phone, areaServed: { "@type": "Country", name: schoolLocation.country },
    location: { "@type": "City", name: schoolLocation.city, containedInPlace: { "@type": "State", name: "Rio de Janeiro" } },
  };
  const graph: Record<string, unknown>[] = [organization];
  if (base) {
    const isCourse = seo.pathname.startsWith("/cursos/");
    if (isCourse) graph.push({ "@type": "Course", "@id": absolute(seo.pathname + "#curso"), url: absolute(seo.pathname), name: seo.title, description: seo.description, inLanguage: "pt-BR", provider: { "@id": absolute("/#escola") } });
    graph.push({ "@type": "WebSite", "@id": absolute("/#website"), url: base.href, name: school.name, inLanguage: "pt-BR", publisher: { "@id": absolute("/#escola") } });
    const breadcrumb = [{ "@type": "ListItem", position: 1, name: "Início", item: base.href }];
    if (seo.pathname !== "/") breadcrumb.push({ "@type": "ListItem", position: 2, name: seo.title, item: absolute(seo.pathname)! });
    graph.push({ "@type": "BreadcrumbList", "@id": absolute(seo.pathname + "#navegacao"), itemListElement: breadcrumb });
    graph.push({ "@type": seo.pathname === "/contato" ? "ContactPage" : seo.pathname === "/a-foxstage" ? "AboutPage" : "WebPage", "@id": absolute(seo.pathname + "#pagina"), url: absolute(seo.pathname), name: seo.title, description: seo.description, inLanguage: "pt-BR", isPartOf: { "@id": absolute("/#website") }, about: { "@id": absolute("/#escola") }, ...(isCourse ? { mainEntity: { "@id": absolute(seo.pathname + "#curso") } } : {}) });
  }
  return { "@context": "https://schema.org", "@graph": graph };
}
export function serializeStructuredData(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
