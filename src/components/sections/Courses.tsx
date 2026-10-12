import Image from "next/image";
import { site } from "@/content/site";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";

export function Courses() {
  return <section id="cursos" className="section courses warm-surface" aria-labelledby="course-title" tabIndex={-1}>
    <div className="container">
      <div className="section-heading"><p className="eyebrow">{site.courses.eyebrow}</p><h2 id="course-title">{site.courses.title}</h2></div>
      <div className="course-grid">
        <figure className="course-figure">
          <div className="course-photo"><Image src="/images/foxstage/curso-ingles.jpg" fill sizes="(max-width: 767px) calc(100vw - 48px), (max-width: 1279px) 46vw, 588px" alt="Pessoas trocando ideias com caderno e notebook; fotografia de banco ilustrativa." /></div>
          <figcaption>Fotografia ilustrativa</figcaption>
        </figure>
        <div className="course-copy">
          <h3>{site.courses.subtitle}</h3>
          {site.courses.paragraphs.map(paragraph => <p className="body-copy" key={paragraph}>{paragraph}</p>)}
          <WhatsAppLink origin="course">{site.courses.cta}</WhatsAppLink>
        </div>
      </div>
    </div>
  </section>;
}
