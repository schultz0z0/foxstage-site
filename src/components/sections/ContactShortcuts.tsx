import { site } from "@/content/site";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import { Icon } from "@/components/ui/Icon";

export function ContactShortcuts() {
  return <section id="atendimento" className="section shortcuts warm-surface" aria-labelledby="shortcuts-title" tabIndex={-1}>
    <div className="container">
      <div className="section-heading"><p className="eyebrow">{site.shortcuts.eyebrow}</p><h2 id="shortcuts-title">{site.shortcuts.title}</h2></div>
      <div className="shortcut-grid">
        <article className="shortcut-card featured">
          <Icon name="message" className="shortcut-icon" />
          <h3>{site.shortcuts.items[0].title}</h3>
          <p>{site.shortcuts.items[0].description}</p>
          <WhatsAppLink className="shortcut-action" arrow={false}>{site.shortcuts.items[0].cta} <Icon name="arrow" /></WhatsAppLink>
        </article>
        <article className="shortcut-card">
          <Icon name="book" className="shortcut-icon" />
          <h3>{site.shortcuts.items[1].title}</h3>
          <p>{site.shortcuts.items[1].description}</p>
          <a href="#como-funciona" className="shortcut-action">{site.shortcuts.items[1].cta} <Icon name="arrow" /></a>
        </article>
        <article className="shortcut-card">
          <Icon name="instagram" className="shortcut-icon" />
          <h3>{site.shortcuts.items[2].title}</h3>
          <p>{site.shortcuts.items[2].description}</p>
          <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="shortcut-action">{site.shortcuts.items[2].cta} <Icon name="diagonal" /><span className="sr-only"> (nova aba)</span></a>
        </article>
      </div>
    </div>
  </section>;
}
