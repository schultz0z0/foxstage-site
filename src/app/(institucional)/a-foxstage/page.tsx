import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { PageStructuredData } from "@/components/ui/PageStructuredData";
import { Icon } from "@/components/ui/Icon";
import { schoolPage as content } from "@/content/evolution/school";
import { getVisibleAvailability, pageAvailability } from "@/content/evolution/availability";
import { buildPageMetadata } from "@/lib/page-metadata";
import { getPublicationConfig } from "@/lib/publication";
import { requirePageAccess } from "@/lib/page-access";
import { OnlineClassMockup } from "@/components/ui/OnlineClassMockup";
import { CourseComparison } from "@/components/ui/CourseComparison";
export function generateMetadata() { requirePageAccess("school"); return buildPageMetadata(content.seo, getPublicationConfig(process.env)); }
export default function School() {
  requirePageAccess("school");
  const availability = getVisibleAvailability(pageAvailability, process.env);
  return <>
    <PageHero titleLines={["Aqui, você usa", "o inglês."]} description={content.introduction} label="A Foxstage" image={{src:"/images/foxstage/sobre-foxstage.jpg",alt:"Pessoas consultando materiais de estudo em uma biblioteca; fotografia ilustrativa de banco de imagens.",credit:"Fotografia ilustrativa",mobilePosition:"65% 50%"}} cta="Conversar com a escola" origin="school" />
    <section className="section school-introduction"><div className="container teacher-section"><div className="teacher-profile-panel dark-surface"><p className="eyebrow">Quem ensina</p><h2>{content.teacher.name}</h2><p>{content.teacher.role}</p><p className="teacher-profile-signature">Aprenda inglês.<br />Fale inglês.<br />Viva o inglês.</p></div><div className="editorial-copy"><p className="body-copy">{content.teacher.description}</p><p className="body-copy">Conheça a comunicação da escola e os conteúdos de inglês no Instagram da Foxstage.</p><a href="https://www.instagram.com/foxstage_/" target="_blank" rel="noopener noreferrer" className="text-link">Ver a Foxstage no Instagram<Icon name="diagonal" /><span className="sr-only"> (nova aba)</span></a></div></div></section>
    <section className="section dark-surface institutional-principles"><div className="container editorial-split"><div><p className="eyebrow">Método Foxstage</p><h2>A nossa proposta<br />de ensino.</h2><OnlineClassMockup /></div><div className="editorial-sections">{content.principles.map(item => <section key={item.title}><h3>{item.title}</h3><p className="body-copy">{item.text}</p></section>)}</div></div></section>
    <CourseComparison />
    {availability.englishDay === "published" && <section className="section experience-highlight"><div className="container school-experience"><figure><Image src="/images/foxstage/english-day-cinema.webp" alt="Participantes do English Day da Foxstage reunidos na edição no cinema." width={1600} height={1200} sizes="(max-width: 767px) calc(100vw - 48px), 50vw" /><figcaption>Registro real do English Day no cinema.</figcaption></figure><div className="editorial-copy"><h2>O inglês também<br />fora das aulas.</h2><p className="body-copy">O English Day leva a convivência entre alunos para um encontro presencial no Rio de Janeiro. A cada quatro meses, a Foxstage organiza e custeia uma atividade em que a comunicação acontece em inglês durante o dia.</p><Link href="/english-day" className="text-link">Ver essa experiência<Icon name="arrow" /></Link></div></div></section>}
    <ContactCTA origin="school" />
    <PageStructuredData seo={content.seo} />
  </>;
}
