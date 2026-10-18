import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { Header } from "@/components/layout/Header";
import { WhatsAppLink } from "./WhatsAppLink";
import Link from "next/link";
import { Icon } from "./Icon";
import type { MessageOrigin } from "@/content/site";

type PageHeroImage = { src: string; alt: string; position?: string; mobilePosition?: string; wholeMobile?: boolean };
/** Same photography, typography, gradients and menu geometry as the approved home. */
export function PageHero({ titleLines, description, label, image, cta, origin, children, href }: {
  titleLines: readonly [string, string]; description: string; label: string;
  image: PageHeroImage; cta: string; origin: MessageOrigin; children?: ReactNode; href?: string;
}) {
  return <section className={`hero-shell page-hero-shell${children ? " page-hero-with-extension" : ""}`} aria-label={label}>
    <Header />
    <div className={`hero hero-page${image.wholeMobile ? " hero-page-whole-mobile" : ""}`}>
      <Image className="hero-image" src={image.src} alt={image.alt} fill preload style={{ objectPosition: image.position ?? "center", "--hero-mobile-position": image.mobilePosition ?? "75% 50%", "--hero-mobile-narrow-position": image.mobilePosition ?? "75% 50%" } as CSSProperties} sizes="(max-width: 767px) 820px, (max-width: 1887px) calc(100vw - 48px), 1840px" />
      <div className="hero-overlay" />
      <div className="hero-slide"><div className="hero-inner"><div className="hero-copy">
        <p className="eyebrow">{label}</p>
        <h1 id="conteudo-principal" tabIndex={-1} className="hero-title"><span>{titleLines[0]}</span>{" "}<span>{titleLines[1]}</span></h1>
        <p className="hero-description">{description}</p>
        <div className="hero-actions">{href ? <Link href={href} className="button button-primary">{cta}<Icon name="arrow" /></Link> : <WhatsAppLink origin={origin}>{cta}</WhatsAppLink>}</div>
      </div></div></div>
    </div>
    {children && <div className="page-hero-extension warm-surface">{children}</div>}
  </section>;
}
