import Link from "next/link";
import { coursePages } from "@/content/evolution/courses";
import { getVisibleAvailability, pageAvailability } from "@/content/evolution/availability";
import { Icon } from "./Icon";
export function CourseComparison() {
  const availability = getVisibleAvailability(pageAvailability, process.env);
  if (availability.group !== "published" || availability.individual !== "published") return null;
  return <section className="section course-comparison warm-surface"><div className="container">
    <div className="section-heading"><p className="eyebrow">Dois formatos</p><h2>Como você prefere aprender?</h2></div>
    <div className="comparison-grid">
      <div><h3>Em grupo.</h3><p className="body-copy">Aulas online ao vivo com outras pessoas. O foco é a conversação e o inglês do dia a dia.</p><ul><li>Formato em grupo</li><li>Fala e escuta em situações reais</li><li>Atendimento online em todo o Brasil</li></ul><Link href={coursePages.group.seo.pathname} className="text-link">Conhecer o formato em grupo<Icon name="arrow" /></Link></div>
      <div><h3>Individual.</h3><p className="body-copy">Aulas em formato individual, com ensino personalizado para a pessoa e foco no inglês em uso.</p><ul><li>Formato individual</li><li>Ensino personalizado</li><li>Atendimento online em todo o Brasil</li></ul><Link href={coursePages.individual.seo.pathname} className="text-link">Conhecer o formato individual<Icon name="arrow" /></Link></div>
    </div>
  </div></section>;
}
