"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavigationEntry } from "@/content/evolution/types";

export function MobileMenu({ links = [], entries }: { links?: readonly { label: string; href: string }[]; entries?: readonly NavigationEntry[] }) {
  const [open, setOpen] = useState(false);
  const disclosure = useRef<HTMLDetailsElement>(null);
  const toggle = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const items: readonly NavigationEntry[] = entries ?? links.map(link => ({ kind: "link", ...link }));
  function navigate(href: string) {
    if (disclosure.current) {
      disclosure.current.open = false;
      disclosure.current.querySelectorAll("details[open]").forEach(element => element.removeAttribute("open"));
    }
    setOpen(false);
    if (href.startsWith("#")) document.getElementById(href.slice(1))?.focus({ preventScroll: true });
  }

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
      {items.map(entry => entry.kind === "link"
        ? <Link href={entry.href} key={entry.href} aria-current={pathname === entry.href ? "page" : undefined} onClick={() => navigate(entry.href)}>{entry.label}</Link>
        : <details className="mobile-course-disclosure" key={entry.label}>
          <summary>{entry.label}<span className="disclosure-chevron" aria-hidden="true" /></summary>
          {entry.children.map(child => <Link href={child.href} key={child.href} aria-current={pathname === child.href ? "page" : undefined} onClick={() => navigate(child.href)}>{child.label}</Link>)}
        </details>)}
    </nav>
  </details>;
}
