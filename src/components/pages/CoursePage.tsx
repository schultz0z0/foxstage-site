import Link from "next/link";
import Image from "next/image";
import { PageHero } from "@/components/ui/PageHero";
import { FAQ } from "@/components/ui/FAQ";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { Icon } from "@/components/ui/Icon";
import { PageStructuredData } from "@/components/ui/PageStructuredData";
import { getVisibleAvailability, pageAvailability } from "@/content/evolution/availability";
import type { CoursePageData } from "@/content/evolution/types";
import { OnlineClassMockup } from "@/components/ui/OnlineClassMockup";
import { CourseComparison } from "@/components/ui/CourseComparison";

export function CoursePage({ course }: { course: CoursePageData }) {
  const availability = getVisibleAvailability(pageAvailability, process.env);
  return <>
    <PageHero titleLines={course.titleLines} description={course.introduction} image={{ src: course.image.src, alt: course.image.alt, credit: course.image.credit ?? "Fotografia ilustrativa", mobilePosition: course.id === "group" ? "35% 50%" : "85% 50%" }} label={course.id === "group" ? "Inglês online em grupo" : "Inglês individual personalizado"} cta={course.cta} origin={course.id}>
      <dl className="container facts-grid">{course.practicalFacts.map(fact => <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>)}</dl>
    </PageHero>
    <section className="section course-overview"><div className="container about-grid"><div className="about-copy"><p className="eyebrow">{course.id === "group" ? "Aulas em grupo" : "Aulas individuais"}</p><h2>{course.sections[0].title}</h2>{course.sections[0].paragraphs.map(paragraph => <p className="body-copy" key={paragraph}>{paragraph}</p>)}</div><figure><div className="about-photo"><Image src={course.id === "group" ? "/images/foxstage/sobre-foxstage.jpg" : "/images/foxstage/comunicacao-oral.jpg"} alt="Cena de estudo e conversa; fotografia ilustrativa de banco de imagens." fill sizes="(max-width: 767px) calc(100vw - 48px), 50vw" /></div><figcaption>Fotografia ilustrativa</figcaption></figure></div></section>
    <section className="section course-method dark-surface"><div className="container course-narrative"><div className="course-narrative-heading"><p className="eyebrow">Método Foxstage</p><h2>Você usa<br />o inglês.</h2><OnlineClassMockup /></div><div className="editorial-sections">{course.sections.slice(1).map(section => <section id={section.id} key={section.id}><h3>{section.title}</h3>{section.paragraphs.map(paragraph => <p className="body-copy" key={paragraph}>{paragraph}</p>)}</section>)}</div></div></section>
    <CourseComparison />
    {availability.englishDay === "published" && <section className="section experience-highlight"><div className="container school-experience"><figure><Image src="/images/foxstage/english-day-cinema.webp" width={1600} height={1200} alt="Participantes da Foxstage reunidos na edição do English Day no cinema." sizes="(max-width: 767px) calc(100vw - 48px), 50vw" /><figcaption>Registro real do English Day no cinema.</figcaption></figure><div className="editorial-copy"><p className="eyebrow">English Day</p><h2>Além da<br />videochamada.</h2><p className="body-copy">A cada quatro meses, a Foxstage organiza e custeia um encontro presencial entre os alunos na cidade do Rio de Janeiro. No English Day, a comunicação acontece em inglês durante todo o dia.</p><p className="body-copy">As aulas online atendem todo o Brasil. Para saber sobre participação no encontro presencial, consulte a escola.</p><Link href="/english-day" className="text-link">Conhecer o English Day<Icon name="arrow" /></Link></div></div></section>}
    <FAQ items={course.faq} />
    <ContactCTA origin={course.id} title="Vamos conversar sobre suas aulas?" paragraph="Consulte horários, valores e condições diretamente com a Foxstage." />
    <PageStructuredData seo={course.seo} />
  </>;
}
