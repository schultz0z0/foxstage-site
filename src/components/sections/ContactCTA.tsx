import { site } from "@/content/site";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import { SignatureMotion } from "@/components/motion/SignatureMotion";

export function ContactCTA() {
  return <section id="contato" className="section contact warm-surface" aria-labelledby="contact-title" tabIndex={-1}>
    <div className="container">
      <div className="contact-panel dark-surface">
        <SignatureMotion />
        <div className="contact-copy">
        <p className="eyebrow">{site.contact.eyebrow}</p>
        <h2 id="contact-title">{site.contact.title}</h2>
        <p>{site.contact.paragraph}</p>
        <WhatsAppLink origin="contact">{site.contact.cta}</WhatsAppLink>
        <p className="contact-phone">{site.phone}</p>
        </div>
      </div>
    </div>
  </section>;
}
