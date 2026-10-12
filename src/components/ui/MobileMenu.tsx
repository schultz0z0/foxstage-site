"use client";

import { useRef, useState, type KeyboardEvent } from "react";

export function MobileMenu({ links }: { links: readonly { label: string; href: string }[] }) {
  const [open, setOpen] = useState(false);
  const disclosure = useRef<HTMLDetailsElement>(null);
  const toggle = useRef<HTMLElement>(null);

  function handleEscape(event: KeyboardEvent<HTMLElement>) {
    if (event.key === "Escape" && disclosure.current?.open) {
      event.preventDefault();
      disclosure.current.open = false;
      setOpen(false);
      toggle.current?.focus();
    }
  }

  return <details className="mobile-menu" ref={disclosure} onToggle={event => setOpen(event.currentTarget.open)} onKeyDown={handleEscape}>
    <summary ref={toggle} aria-controls="mobile-navigation">
      <span>{open ? "Fechar" : "Menu"}</span>
      <span className={`menu-symbol ${open ? "is-open" : ""}`} aria-hidden="true"><span /><span /></span>
    </summary>
    <nav id="mobile-navigation" aria-label="Navegação principal no celular">
      {links.map(link => <a href={link.href} key={link.href} onClick={() => {
        if (disclosure.current) disclosure.current.open = false;
        setOpen(false);
        document.querySelector<HTMLElement>(link.href)?.focus({ preventScroll: true });
      }}>{link.label}</a>)}
    </nav>
  </details>;
}
