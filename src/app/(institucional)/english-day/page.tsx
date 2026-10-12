import { PageHero } from "@/components/ui/PageHero";
import { EnglishDayMedia } from "@/components/motion/EnglishDayMedia";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import { PageStructuredData } from "@/components/ui/PageStructuredData";
import { englishDayPage as content } from "@/content/evolution/english-day";
import { site } from "@/content/site";
import { buildPageMetadata } from "@/lib/page-metadata";
import { getPublicationConfig } from "@/lib/publication";
import { requirePageAccess } from "@/lib/page-access";

export function generateMetadata() { requirePageAccess("englishDay"); return buildPageMetadata(content.seo, getPublicationConfig(process.env)); }
export default function EnglishDayPage() {
  requirePageAccess("englishDay");
  return <>
    <PageHero titleLines={["Um dia inteiro", "em inglês."]} description={content.heroDescription} label="English Day no Rio de Janeiro" image={{src:"/images/foxstage/english-day-cinema.webp",alt:"Participantes do English Day da Foxstage na edição no cinema.",credit:"Registro real do English Day",position:"50% 70%",wholeMobile:true}} cta="Ver o English Day" href="#english-day" origin="englishDay" />
    <section className="section day-at-a-glance page-first-section" aria-label="Informações do English Day"><dl className="container day-facts-inline">{content.details.slice(0,3).map(fact => <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>)}</dl></section>
    <section id="english-day" className="section english-day day-story" aria-labelledby="english-day-title" tabIndex={-1}><div className="container"><div className="day-story-header"><div className="section-heading"><h2 className="english-day-heading" id="english-day-title">Dessa vez,<br />fomos ao cinema.</h2></div><p className="body-copy">Antes e depois do filme, a turma reunida para conversar e conviver em inglês. Veja os momentos registrados pela Foxstage.</p></div><EnglishDayMedia photo={site.englishDay.photo} video={site.englishDay.video} /></div></section>
    <section className="section day-participation warm-surface"><div className="container day-participation-grid"><div><h2>Como participar.</h2><p className="body-copy">Fale com a escola para saber as condições e os detalhes de participação.</p><WhatsAppLink origin="englishDay">Perguntar sobre o English Day</WhatsAppLink></div><div className="faq-list">{content.faq.slice(0,2).map(item => <details key={item.question}><summary>{item.question}<span className="disclosure-chevron" aria-hidden="true" /></summary><p className="body-copy">{item.answer}</p></details>)}</div></div></section>
    <PageStructuredData seo={content.seo} />
  </>;
}
