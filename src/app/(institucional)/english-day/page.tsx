import { PageHero } from "@/components/ui/PageHero";
import { EnglishDay } from "@/components/sections/EnglishDay";
import { FAQ } from "@/components/ui/FAQ";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { PageStructuredData } from "@/components/ui/PageStructuredData";
import { englishDayPage as content } from "@/content/evolution/english-day";
import { buildPageMetadata } from "@/lib/page-metadata";
import { getPublicationConfig } from "@/lib/publication";
import { requirePageAccess } from "@/lib/page-access";
export function generateMetadata() { requirePageAccess("englishDay"); return buildPageMetadata(content.seo, getPublicationConfig(process.env)); }
export default function EnglishDayPage() {
  requirePageAccess("englishDay");
  return <>
    <PageHero titleLines={["Um dia inteiro", "em inglês."]} description={content.heroDescription} label="English Day no Rio de Janeiro" image={{src:"/images/foxstage/english-day-cinema.webp",alt:"Participantes do English Day da Foxstage na edição no cinema.",credit:"Registro real do English Day",position:"50% 70%",wholeMobile:true}} cta="Ver o English Day" href="#english-day" origin="englishDay" />
    <section className="section day-introduction"><div className="container editorial-split"><div><p className="eyebrow">Inglês na vida real</p><h2>Uma experiência<br />presencial no Rio.</h2></div><div className="editorial-copy"><p className="body-copy">As aulas online chegam a todo o Brasil. O English Day reúne os alunos presencialmente na cidade do Rio de Janeiro para conversar e conviver usando o idioma.</p><p className="body-copy">A atividade muda a cada edição. O que permanece é a proposta: um dia inteiro de comunicação em inglês, fora do ambiente das aulas.</p></div></div></section>
    <section className="section day-details dark-surface"><div className="container editorial-split"><div><p className="eyebrow">Como acontece</p><h2>A turma se encontra.<br />O inglês continua.</h2></div><dl className="event-facts">{content.details.map(fact => <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>)}</dl></div></section>
    <FAQ items={content.faq} title="Sobre o encontro." />
    <EnglishDay title={content.mediaTitle} paragraphs={content.mediaParagraphs} showExperienceLink={false} />
    <ContactCTA origin="englishDay" title="Quer conhecer as aulas?" paragraph="Converse com a Foxstage sobre as aulas de inglês e tire dúvidas sobre participação no English Day." />
    <PageStructuredData seo={content.seo} />
  </>;
}
