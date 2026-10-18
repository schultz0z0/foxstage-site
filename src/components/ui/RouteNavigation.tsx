"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, type KeyboardEvent } from "react";
import type { NavigationEntry } from "@/content/evolution/types";

export function RouteNavigation({ entries }: { entries: readonly NavigationEntry[] }) {
  const pathname = usePathname();
  const navigation = useRef<HTMLElement>(null);
  useEffect(() => {
    const close = (event?: PointerEvent) => {
      if (event && navigation.current?.contains(event.target as Node)) return;
      navigation.current?.querySelectorAll("details[open]").forEach(element => element.removeAttribute("open"));
    };
    close();
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [pathname]);
  function onEscape(event: KeyboardEvent<HTMLElement>) {
    if (event.key !== "Escape") return;
    const disclosure = (event.target as HTMLElement).closest("details");
    if (disclosure?.open) {
      event.preventDefault(); disclosure.open = false;
      disclosure.querySelector("summary")?.focus();
    }
  }
  return <nav ref={navigation} className="desktop-navigation route-navigation" aria-label="Navegação principal" onKeyDown={onEscape}>
    {entries.map(entry => entry.kind === "link"
      ? <Link key={entry.href} href={entry.href} aria-current={pathname === entry.href ? "page" : undefined}>{entry.label}</Link>
      : <details key={entry.label} className="route-disclosure">
        <summary className={entry.children.some(child => child.href === pathname) ? "route-parent-active" : undefined} onClick={event => { if (event.detail > 0) event.currentTarget.blur(); }}>{entry.label}<span className="disclosure-chevron" aria-hidden="true" /></summary>
        <div className="route-submenu">{entry.children.map(child => <Link key={child.href} href={child.href} aria-current={pathname === child.href ? "page" : undefined} onClick={() => navigation.current?.querySelectorAll("details[open]").forEach(element => element.removeAttribute("open"))}>{child.label}</Link>)}</div>
      </details>)}
  </nav>;
}
