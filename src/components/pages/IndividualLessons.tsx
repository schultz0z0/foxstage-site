import Image from "next/image";
import Link from "next/link";
import { IndividualGoalChooser } from "@/components/ui/IndividualGoalChooser";
import { Icon } from "@/components/ui/Icon";
import { getVisibleAvailability, pageAvailability } from "@/content/evolution/availability";
import type { CoursePageData } from "@/content/evolution/types";

export function IndividualLessons({ course }: { course: CoursePageData }) {
  const visible = getVisibleAvailability(pageAvailability, process.env);
  return <>
    <section className="section individual-brief page-first-section"><div className="container individual-brief-grid"><div><h2>{course.sections[0].title}</h2>{course.sections[0].paragraphs.map(p => <p className="body-copy" key={p}>{p}</p>)}</div><IndividualGoalChooser /></div></section>
    <section className="section individual-study warm-surface"><div className="container individual-study-grid"><figure className="individual-study-photo"><Image src="/images/foxstage/pratica-idioma.jpg" width={1000} height={1500} alt="Pessoa estudando diante de um notebook." sizes="(max-width: 767px) calc(100vw - 48px), 40vw" /></figure><div className="individual-study-copy"><p className="individual-format">Uma pessoa. Uma aula.</p><h2>{course.sections[1].title}</h2>{course.sections[1].paragraphs.map(p => <p className="body-copy" key={p}>{p}</p>)}{visible.group === "published" && <Link href="/cursos/ingles-em-grupo" className="text-link">Também quero conhecer as aulas em grupo<Icon name="arrow" /></Link>}</div></div></section>
  </>;
}
