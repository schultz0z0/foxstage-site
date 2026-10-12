import { site, type MessageOrigin } from "@/content/site";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import { SignatureMotion } from "@/components/motion/SignatureMotion";

export function ContactCTA({ origin = "contact", title = site.contact.title, paragraph = site.contact.paragraph }: { origin?: MessageOrigin; title?: string; paragraph?: string } = {}) {
  return <section id="contato" className="section contact warm-surface" aria-labelledby="contact-title" tabIndex={-1}>
    <div className="container">
      <div className="contact-panel dark-surface">
        <SignatureMotion />
        <div className="contact-copy">
        <p className="eyebrow">{site.contact.eyebrow}</p>
        <h2 id="contact-title">{title}</h2>
        <p>{paragraph}</p>
        <WhatsAppLink origin={origin}>{site.contact.cta}</WhatsAppLink>
        <p className="contact-phone">{site.phone}</p>
        </div>
      </div>
    </div>
  </section>;
}
