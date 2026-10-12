import { site } from "@/content/site";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import { EnglishDayMedia } from "@/components/motion/EnglishDayMedia";

export function EnglishDay() {
  const content = site.englishDay;
  return <section id="english-day" className="section english-day" aria-labelledby="english-day-title" tabIndex={-1}>
    <div className="container english-day-grid">
      <div className="english-day-copy">
      <div className="section-heading">
        <p className="eyebrow">{content.eyebrow}</p>
        <h2 id="english-day-title">{content.title}</h2>
      </div>
        {content.paragraphs.map(paragraph => <p className="body-copy" key={paragraph}>{paragraph}</p>)}
        <div className="english-day-cta-seat"><WhatsAppLink origin="englishDay" className="button english-day-cta">{content.cta}</WhatsAppLink></div>
      </div>
      <EnglishDayMedia photo={content.photo} video={content.video} />
    </div>
  </section>;
}
