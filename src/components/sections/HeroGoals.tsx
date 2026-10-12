import { site } from "@/content/site";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";

export function HeroGoals() {
  return <div className="hero-goals" role="group" aria-labelledby="hero-goals-title">
    <div className="hero-goals-inner">
      <div className="hero-goals-copy">
        <p className="eyebrow">{site.heroGoals.eyebrow}</p>
        <h2 id="hero-goals-title">{site.heroGoals.title}</h2>
      </div>
      <nav className="hero-goals-links" aria-label="Escolha seu objetivo com o inglês">
        {site.heroGoals.items.map(item => <WhatsAppLink key={item.origin} origin={item.origin} className="hero-goal-link">{item.label}</WhatsAppLink>)}
      </nav>
    </div>
  </div>;
}
