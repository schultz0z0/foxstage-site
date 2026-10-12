"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export function HeroCarousel({ slides, intervalMs }: { slides: readonly { title: string; content: ReactNode }[]; intervalMs: number }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [touching, setTouching] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const hero = useRef<HTMLDivElement | null>(null);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const rotating = !paused && !hovered && !focused && !touching && !hidden && !reducedMotion;

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => setReducedMotion(media.matches);
    const syncVisibility = () => setHidden(document.hidden);
    syncMotion(); syncVisibility();
    media.addEventListener("change", syncMotion);
    document.addEventListener("visibilitychange", syncVisibility);
    return () => { media.removeEventListener("change", syncMotion); document.removeEventListener("visibilitychange", syncVisibility); };
  }, []);

  useEffect(() => {
    if (!rotating || slides.length < 2) return;
    const timer = window.setTimeout(() => setActive(index => (index + 1) % slides.length), intervalMs);
    return () => window.clearTimeout(timer);
  }, [active, rotating, intervalMs, slides.length]);

  useEffect(() => {
    if (!hovered) return;
    // A swapped SVG under the pointer can discard React's synthetic mouseleave.
    const syncPointer = (event: PointerEvent) => {
      if (event.pointerType === "mouse" && !hero.current?.contains(event.target as Node)) setHovered(false);
    };
    const clearHover = () => setHovered(false);
    window.addEventListener("pointermove", syncPointer);
    window.addEventListener("blur", clearHover);
    return () => { window.removeEventListener("pointermove", syncPointer); window.removeEventListener("blur", clearHover); };
  }, [hovered]);

  return <div ref={hero} id="conteudo-principal" tabIndex={-1} className="hero" role="region" aria-roledescription="carrossel" aria-label="Destaques da Foxstage" data-rotation={rotating ? "running" : "paused"}
    onPointerEnter={event => { if (event.pointerType === "mouse") setHovered(true); }} onPointerLeave={() => setHovered(false)}
    onFocusCapture={() => setFocused(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}
    onTouchStart={event => { setTouching(true); const point = event.touches[0]; touch.current = { x: point.clientX, y: point.clientY }; }}
    onTouchCancel={() => { touch.current = null; setTouching(false); }}
    onTouchEnd={event => {
      setTouching(false);
      if (!touch.current) return;
      const end = event.changedTouches[0];
      const dx = end.clientX - touch.current.x, dy = end.clientY - touch.current.y;
      touch.current = null;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) setActive(index => (index + (dx < 0 ? 1 : slides.length - 1)) % slides.length);
    }}>
    {slides.map((slide, index) => <div className="hero-slide" key={slide.title} hidden={index !== active} role="group" aria-roledescription="banner" aria-label={`${index + 1} de ${slides.length}: ${slide.title}`}>{slide.content}</div>)}
    <div className="hero-pagination" role="group" aria-label="Escolher banner"
      onKeyDown={event => {
        let next: number;
        if (event.key === "ArrowRight") next = (active + 1) % slides.length;
        else if (event.key === "ArrowLeft") next = (active + slides.length - 1) % slides.length;
        else if (event.key === "Home") next = 0;
        else if (event.key === "End") next = slides.length - 1;
        else return;
        event.preventDefault(); setActive(next); buttons.current[next]?.focus();
      }}>
      {slides.map((slide, index) => <button key={slide.title} type="button" ref={node => { buttons.current[index] = node; }} className="hero-dot" aria-label={`Mostrar banner ${index + 1}: ${slide.title}`} aria-pressed={active === index} onClick={event => { setActive(index); if (event.detail > 0) event.currentTarget.blur(); }}><span /></button>)}
      {!reducedMotion && <button type="button" className="hero-rotation" aria-label={paused ? "Retomar rotação dos banners" : "Pausar rotação dos banners"} onClick={event => { setPaused(value => !value); if (event.detail > 0) event.currentTarget.blur(); }}>
        <svg viewBox="0 0 20 20" width="16" height="16" fill="currentColor" aria-hidden="true">{paused ? <path d="M6 3l11 7-11 7z" /> : <><rect x="5" y="4" width="3" height="12" /><rect x="12" y="4" width="3" height="12" /></>}</svg>
      </button>}
    </div>
    <span className="sr-only" aria-live={rotating ? "off" : "polite"} aria-atomic="true">Banner {active + 1} de {slides.length}: {slides[active].title}</span>
  </div>;
}
