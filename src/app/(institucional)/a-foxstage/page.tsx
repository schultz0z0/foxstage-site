import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { PageStructuredData } from "@/components/ui/PageStructuredData";
import { Icon } from "@/components/ui/Icon";
import { schoolPage as content } from "@/content/evolution/school";
import { site } from "@/content/site";
import { getVisibleAvailability, pageAvailability } from "@/content/evolution/availability";
import { buildPageMetadata } from "@/lib/page-metadata";
import { getPublicationConfig } from "@/lib/publication";
import { requirePageAccess } from "@/lib/page-access";

export function generateMetadata() { requirePageAccess("school"); return buildPageMetadata(content.seo, getPublicationConfig(process.env)); }
export default function School() {
  requirePageAccess("school");
  const visible = getVisibleAvailability(pageAvailability, process.env);
  return <>
    <PageHero titleLines={["Aqui, você usa", "o inglês."]} description={content.introduction} label="A Foxstage" image={{src:"/images/foxstage/sobre-foxstage.jpg",alt:"Pessoas consultando materiais de estudo em uma biblioteca; fotografia ilustrativa de banco de imagens.",credit:"Fotografia ilustrativa",mobilePosition:"65% 50%"}} cta="Conversar com a escola" origin="school" />
    <section className="section school-statement page-first-section"><div className="container school-statement-grid"><h2>Inglês se aprende<br />usando.</h2><div><p className="body-copy">A fala e a escuta estão no centro da proposta da Foxstage. Você aprende para participar de conversas, entender outras pessoas e se expressar em situações do cotidiano.</p><p className="body-copy">Tentar faz parte. O erro tem espaço na aula, porque aprender uma língua também é encontrar um jeito de dizer o que você quer.</p></div></div></section>
    <section className="section school-teacher warm-surface"><div className="container school-teacher-grid"><div className="school-brand-panel"><picture><source media="(max-width: 1199px)" srcSet={site.logoCompact} /><Image src={site.logo} width={945} height={280} alt="Foxstage — English Course" unoptimized /></picture><p>Rio de Janeiro.<br />Aulas online para todo o Brasil.</p></div><div className="teacher-introduction"><p className="teacher-role">Quem ensina</p><h2>{content.teacher.name}</h2><p className="body-copy">É com ele que você pratica nas aulas em grupo ou individuais. Seu papel é conduzir a conversa e o aprendizado do idioma.</p><a href={site.instagram} target="_blank" rel="noopener noreferrer" className="text-link">Conhecer a escola no Instagram<Icon name="diagonal" /><span className="sr-only"> (nova aba)</span></a></div></div></section>
    {visible.englishDay === "published" && <section className="section school-community"><div className="container school-community-grid"><div><h2>A turma também<br />se encontra.</h2><p className="body-copy">A convivência segue no English Day: um encontro presencial entre os alunos, na cidade do Rio de Janeiro. Este é o registro da edição no cinema.</p><Link href="/english-day" className="text-link">Ver o encontro<Icon name="arrow" /></Link></div><figure><Image src="/images/foxstage/english-day-cinema.webp" alt="Alunos reunidos na edição do English Day da Foxstage no cinema." width={1600} height={1200} sizes="(max-width: 767px) calc(100vw - 48px), 60vw" /><figcaption>A comunidade Foxstage no English Day. Foto fornecida pela escola.</figcaption></figure></div></section>}
    <PageStructuredData seo={content.seo} />
  </>;
}
