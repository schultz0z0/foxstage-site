import { site } from "@/content/site";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import { EnglishDayMedia } from "@/components/motion/EnglishDayMedia";
import Link from "next/link";
import { getVisibleAvailability, pageAvailability } from "@/content/evolution/availability";

export function EnglishDay({ headingLevel = 2, title = site.englishDay.title, paragraphs = site.englishDay.paragraphs, showExperienceLink = true }: { headingLevel?: 1 | 2; title?: string; paragraphs?: readonly string[]; showExperienceLink?: boolean }) {
  const content = site.englishDay;
  const Heading = headingLevel === 1 ? "h1" : "h2";
  return <section id="english-day" className="section english-day" aria-labelledby="english-day-title" tabIndex={-1}>
    <div className="container english-day-grid">
      <div className="english-day-copy">
      <div className="section-heading">
        <p className="eyebrow">{content.eyebrow}</p>
        <Heading className="english-day-heading" id="english-day-title">{title}</Heading>
      </div>
        {paragraphs.map(paragraph => <p className="body-copy" key={paragraph}>{paragraph}</p>)}
        <div className="english-day-cta-seat"><WhatsAppLink origin="englishDay" className="button english-day-cta">{content.cta}</WhatsAppLink></div>
        {showExperienceLink && headingLevel === 2 && getVisibleAvailability(pageAvailability, process.env).englishDay === "published" && <Link className="text-link english-day-route-link" href="/english-day">Conhecer a experiência</Link>}
      </div>
      <EnglishDayMedia photo={content.photo} video={content.video} />
    </div>
  </section>;
}
