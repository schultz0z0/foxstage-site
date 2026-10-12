import Image from "next/image";
import { site } from "@/content/site";

export function Practice() {
  return <section id="como-funciona" className="section practice dark-surface" aria-labelledby="practice-title" tabIndex={-1}>
    <div className="container">
      <div className="section-heading"><p className="eyebrow">{site.practiceHeading.eyebrow}</p><h2 id="practice-title">{site.practiceHeading.title}</h2></div>
      <div className="practice-grid">
        {site.practice.map(item => <article className="photo-card" key={item.title}>
          <Image src={item.image} alt={item.alt} fill sizes="(max-width: 767px) calc(100vw - 48px), (max-width: 1023px) 46vw, (max-width: 1279px) 30vw, 384px" style={{ objectPosition: item.position }} />
          <div className="photo-card-overlay" />
          <div className="photo-card-copy"><h3>{item.title}</h3><p>{item.description}</p></div>
        </article>)}
      </div>
      <p className="photo-note">Fotografias ilustrativas de banco de imagens.</p>
    </div>
  </section>;
}
