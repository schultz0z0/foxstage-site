import { Brand } from "./Brand";
import { WhatsAppLink } from "./WhatsAppLink";
import { site } from "@/content/site";
export function ContactPhoneMockup() {
  return <figure className="contact-phone-mockup">
    <div className="contact-phone-device"><div className="contact-phone-camera" aria-hidden="true" /><div className="contact-phone-screen">
      <Brand />
      <p className="contact-phone-label">Sua primeira conversa</p>
      <blockquote>{site.messages.contact}</blockquote>
      <WhatsAppLink origin="contact">Falar no WhatsApp</WhatsAppLink>
    </div></div>
    <figcaption>Uma mensagem sugerida. Você decide quando enviar no WhatsApp.</figcaption>
  </figure>;
}
