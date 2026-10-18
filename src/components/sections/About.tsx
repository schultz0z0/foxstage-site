import Image from "next/image";
import { site } from "@/content/site";
import { Icon } from "@/components/ui/Icon";
import Link from "next/link";
import { getVisibleAvailability, pageAvailability } from "@/content/evolution/availability";

export function About() {
  const schoolVisible = getVisibleAvailability(pageAvailability, process.env).school === "published";
  return <section id="sobre" className="section about" aria-labelledby="about-title" tabIndex={-1}>
    <div className="container about-grid">
      <div className="about-copy">
        <p className="eyebrow">{site.about.eyebrow}</p>
        <h2 id="about-title">{site.about.titleLead} <span className="accent-text">{site.about.titleAccent}</span></h2>
        {site.about.paragraphs.map(paragraph => <p className="body-copy" key={paragraph}>{paragraph}</p>)}
        {schoolVisible ? <Link className="text-link" href="/a-foxstage">Conhecer a Foxstage <Icon name="arrow" /></Link> : <a className="text-link" href={site.instagram} target="_blank" rel="noopener noreferrer">{site.about.link} <Icon name="diagonal" /><span className="sr-only"> (nova aba)</span></a>}
      </div>
      <figure className="about-figure">
        <div className="about-photo"><Image src={site.about.image} fill sizes="(max-width: 767px) calc(100vw - 48px), (max-width: 1279px) 46vw, 580px" alt="Duas pessoas consultam materiais de estudo em uma biblioteca." /></div>
      </figure>
    </div>
  </section>;
}
