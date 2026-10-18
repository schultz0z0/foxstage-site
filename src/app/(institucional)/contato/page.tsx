import { PageHero } from "@/components/ui/PageHero";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import { PageStructuredData } from "@/components/ui/PageStructuredData";
import { Icon } from "@/components/ui/Icon";
import { contactPage as content } from "@/content/evolution/contact";
import { site } from "@/content/site";
import { buildPageMetadata } from "@/lib/page-metadata";
import { getPublicationConfig } from "@/lib/publication";
import { requirePageAccess } from "@/lib/page-access";

export function generateMetadata() { requirePageAccess("contact"); return buildPageMetadata(content.seo, getPublicationConfig(process.env)); }
export default function Contact() {
  requirePageAccess("contact");
  return <>
    <PageHero titleLines={["Vamos falar", "do seu inglês?"]} description={content.introduction} label="Contato com a Foxstage" image={{src:site.hero.image,alt:"Duas pessoas estudando e conversando.",mobilePosition:"85% 50%"}} cta="Falar no WhatsApp" origin="contact" />
    <section className="section contact-hub page-first-section"><div className="container contact-hub-grid"><div><h2>Qual é o assunto?</h2><p className="body-copy">Escolha por onde começar. Os três caminhos chegam ao WhatsApp da escola.</p><div className="contact-destinations">
      <WhatsAppLink origin="group" className="contact-destination" arrow={false}><span><strong>Aulas em grupo</strong><span>Formato, horários e valores.</span></span><Icon name="arrow" /></WhatsAppLink>
      <WhatsAppLink origin="individual" className="contact-destination" arrow={false}><span><strong>Aulas individuais</strong><span>Seu objetivo e o ensino personalizado.</span></span><Icon name="arrow" /></WhatsAppLink>
      <WhatsAppLink origin="studentSupport" className="contact-destination" arrow={false}><span><strong>Já sou aluno</strong><span>Minhas aulas e dúvidas com a escola.</span></span><Icon name="arrow" /></WhatsAppLink>
    </div></div><aside className="contact-channels dark-surface" aria-label="Canais oficiais da Foxstage"><h3>Canais oficiais</h3><div><p>WhatsApp</p><WhatsAppLink origin="contact" className="contact-phone-number" arrow={false}>{site.phone}</WhatsAppLink></div><div><p>Instagram</p><a href={site.instagram} target="_blank" rel="noopener noreferrer" className="text-link">@foxstage_<Icon name="diagonal" /><span className="sr-only"> (nova aba)</span></a></div><p className="contact-service-area">Rio de Janeiro/RJ<br />Atendimento online em todo o Brasil.</p></aside></div></section>
    <PageStructuredData seo={content.seo} />
  </>;
}
