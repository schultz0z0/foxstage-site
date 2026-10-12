"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";

export function DesktopNavigation() {
  const navigation = useRef<HTMLElement>(null);
  const [active, setActive] = useState("#inicio");
  const [indicator, setIndicator] = useState({ x: 0, width: 0 });

  useEffect(() => {
    const element = navigation.current;
    if (!element) return;
    let pending = 0;
    const measure = () => {
      pending = 0;
      let current = "#inicio";
      for (const link of site.navigation) {
        if ((document.querySelector(link.href)?.getBoundingClientRect().top ?? Infinity) <= innerHeight * .35) current = link.href;
      }
      const link = element.querySelector<HTMLAnchorElement>(`a[href="${current}"]`);
      setActive(current);
      if (link) setIndicator({ x: link.offsetLeft, width: link.offsetWidth });
    };
    const schedule = () => { if (!pending) pending = requestAnimationFrame(measure); };
    const size = new ResizeObserver(schedule);
    size.observe(element);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    void document.fonts.ready.then(schedule);
    measure();
    return () => { cancelAnimationFrame(pending); size.disconnect(); window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); };
  }, []);

  return <nav ref={navigation} className="desktop-navigation" aria-label="Navegação principal">
    {site.navigation.map(link => <a key={link.href} href={link.href} aria-current={active === link.href ? "location" : undefined}>{link.label}</a>)}
    <span className="navigation-indicator" aria-hidden="true" style={{ scale: `${indicator.width} 1`, translate: `${indicator.x}px 0` }} />
  </nav>;
}
