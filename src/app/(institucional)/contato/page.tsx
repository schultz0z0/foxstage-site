import { PageHero } from "@/components/ui/PageHero";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import { PageStructuredData } from "@/components/ui/PageStructuredData";
import { Icon } from "@/components/ui/Icon";
import { contactPage as content } from "@/content/evolution/contact";
import { site } from "@/content/site";
import { buildPageMetadata } from "@/lib/page-metadata";
import { getPublicationConfig } from "@/lib/publication";
import { requirePageAccess } from "@/lib/page-access";
import { ContactPhoneMockup } from "@/components/ui/ContactPhoneMockup";
export function generateMetadata() { requirePageAccess("contact"); return buildPageMetadata(content.seo, getPublicationConfig(process.env)); }
export default function Contact() {
  requirePageAccess("contact");
  return <>
    <PageHero titleLines={["Vamos falar", "do seu inglês?"]} description={content.introduction} label="Contato com a Foxstage" image={{src:site.hero.image,alt:"Duas pessoas fictícias estudando e conversando; imagem ilustrativa gerada por IA.",credit:"Imagem ilustrativa gerada por IA",mobilePosition:"85% 50%"}} cta="Falar no WhatsApp" origin="contact" />
    <section className="section contact-introduction"><div className="container editorial-split"><div><p className="eyebrow">Contato direto</p><h2>Comece<br />pela conversa.</h2></div><div className="editorial-copy"><p className="body-copy">Você pode conhecer os formatos em grupo e individual, contar seu objetivo e consultar horários, valores e condições pelo mesmo canal.</p><p className="body-copy">A Foxstage fica no Rio de Janeiro e oferece aulas online ao vivo para todo o Brasil.</p><WhatsAppLink origin="contact" className="text-link">{site.phone}</WhatsAppLink></div></div></section>
    <section className="section dark-surface contact-paths"><div className="container contact-scene"><ContactPhoneMockup /><div><p className="eyebrow">Seu próximo passo</p><h2>Por onde<br />começar?</h2><p className="body-copy contact-location">Rio de Janeiro/RJ. Aulas online ao vivo para todo o Brasil.</p><div className="contact-reasons">
      <div><h3>Quero aprender em grupo.</h3><p className="body-copy">Converse sobre as aulas online ao vivo em grupo e o inglês que você quer usar.</p><WhatsAppLink origin="group" className="text-link">Saber sobre o grupo</WhatsAppLink></div>
      <div><h3>Prefiro uma aula individual.</h3><p className="body-copy">Fale sobre seu objetivo e conheça o formato individual personalizado.</p><WhatsAppLink origin="individual" className="text-link">Saber sobre aulas individuais</WhatsAppLink></div>
      <div><h3>Já sou aluno.</h3><p className="body-copy">Use o mesmo canal para falar com a escola sobre suas aulas.</p><WhatsAppLink origin="studentSupport" className="text-link">Falar sobre minhas aulas</WhatsAppLink></div>
    </div></div></div></section>
    <section className="section warm-surface"><div className="container editorial-split"><h2>Acompanhe<br />a Foxstage.</h2><div className="editorial-copy"><p className="body-copy">Veja conteúdos de inglês e a comunicação da escola no perfil oficial.</p><a href={site.instagram} className="text-link" target="_blank" rel="noopener noreferrer">@foxstage_<Icon name="diagonal" /><span className="sr-only"> (nova aba)</span></a></div></div></section>
    <PageStructuredData seo={content.seo} />
  </>;
}
