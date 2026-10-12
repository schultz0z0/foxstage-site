import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Practice } from "@/components/sections/Practice";
import { ContactShortcuts } from "@/components/sections/ContactShortcuts";
import { Courses } from "@/components/sections/Courses";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { EnglishDay } from "@/components/sections/EnglishDay";
import { Footer } from "@/components/layout/Footer";
import { site } from "@/content/site";
import { getPublicationConfig } from "@/lib/publication";

export default function Home() {
  const publication = getPublicationConfig(process.env);
  const organization = { "@context": "https://schema.org", "@type": "Organization", name: site.name, sameAs: [site.instagram], ...(publication.url ? { url: publication.url.href, logo: new URL(site.logo, publication.url).href } : {}) };
  return <>
    <main id="conteudo" tabIndex={-1}>
      <Hero /><About /><Practice /><ContactShortcuts /><Courses /><EnglishDay /><ContactCTA />
    </main>
    <Footer />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization).replace(/</g, "\\u003c") }} />
  </>;
}
