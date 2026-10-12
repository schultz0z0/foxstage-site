import { site } from "@/content/site";
import Link from "next/link";
import { Brand } from "@/components/ui/Brand";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import { Icon } from "@/components/ui/Icon";

export function Footer() {
  return <footer className="site-footer dark-surface">
    <div className="container">
      <div className="footer-grid">
        <div className="footer-brand"><Brand footer /><p>{site.footer.description}</p></div>
        <div className="footer-column"><h2>Navegação</h2><nav aria-label="Navegação do rodapé">{site.navigation.filter(item => item.href !== "#inicio").map(link => <Link key={link.href} href={`/${link.href}`}>{link.label}</Link>)}</nav></div>
        <div className="footer-column"><h2>Contato</h2>
          <WhatsAppLink origin="contact" className="footer-contact-link" arrow={false}><Icon name="message" /><span>WhatsApp<span className="contact-detail">{site.phone}</span></span></WhatsAppLink>
          <a href={site.instagram} className="footer-contact-link" target="_blank" rel="noopener noreferrer"><Icon name="instagram" /><span>Instagram<span className="contact-detail">@foxstage_</span></span><span className="sr-only"> (nova aba)</span></a>
        </div>
      </div>
      <div className="footer-base"><p>© {new Date().getFullYear()} Foxstage.</p><Link href="/#inicio">Voltar ao topo <Icon name="up" /></Link></div>
    </div>
  </footer>;
}
