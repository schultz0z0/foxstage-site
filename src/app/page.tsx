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
import { buildPageMetadata } from "@/lib/page-metadata";
import { PageStructuredData } from "@/components/ui/PageStructuredData";

const seo = {title: "Curso de inglês online ao vivo", description: site.description, pathname: "/"};
export const dynamic = "force-dynamic";
export function generateMetadata() { return buildPageMetadata(seo, getPublicationConfig(process.env)); }

export default function Home() {
  return <>
    <main id="conteudo" tabIndex={-1}>
      <Hero /><About /><Practice /><ContactShortcuts /><Courses /><EnglishDay /><ContactCTA />
    </main>
    <Footer />
    <PageStructuredData seo={seo} />
  </>;
}
