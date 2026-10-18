import Image from "next/image";
import type { CSSProperties } from "react";
import { site } from "@/content/site";
import { Header } from "@/components/layout/Header";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import { HeroCarousel } from "@/components/ui/HeroCarousel";
import { HeroGoals } from "./HeroGoals";
import design from "../../../design.json";

export function Hero() {
  return <section className="hero-shell" id="inicio" aria-label="Foxstage, curso de inglês" tabIndex={-1}>
    <Header />
    <noscript><style>{".hero-pagination { display: none; }"}</style></noscript>
    <HeroCarousel intervalMs={design.behavior.heroCarousel.intervalMs} slides={site.hero.banners.map((banner, index) => ({ title: banner.title, content: <>
      <Image className="hero-image" src={banner.image} alt={banner.alt} fill preload={index === 0} loading={index === 0 ? undefined : "eager"} style={{ objectPosition: banner.position, "--hero-mobile-position": banner.mobilePosition, "--hero-mobile-narrow-position": banner.mobileNarrowPosition } as CSSProperties} sizes="(max-width: 767px) 820px, (max-width: 1023px) calc(100vw - 48px), (max-width: 1887px) calc(100vw - 48px), 1840px" />
      <div className="hero-overlay" />
      <div className="hero-inner">
        <div className="hero-copy">
          <p className="eyebrow">{banner.eyebrow}</p>
          {index === 0 ? <h1 id="hero-title" className="hero-title"><span>{banner.mobileTitle[0]}</span>{" "}<span>{banner.mobileTitle[1]}</span></h1> : <h2 className="hero-title"><span>{banner.mobileTitle[0]}</span>{" "}<span>{banner.mobileTitle[1]}</span></h2>}
          <p className="hero-description">{banner.description}</p>
          <div className="hero-actions">
            <WhatsAppLink origin={banner.origin}>{banner.cta}</WhatsAppLink>
          </div>
        </div>
      </div>
    </> }))} />
    <HeroGoals />
  </section>;
}
