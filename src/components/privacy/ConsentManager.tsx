"use client";

import Link from "next/link";
import { Suspense, useEffect, useRef, useState } from "react";
import { CONSENT_COOKIE, CONSENT_MAX_AGE, createConsent, parseConsent, type Consent } from "@/lib/consent";
import type { MeasurementConfig } from "@/lib/measurement";
import { Measurement } from "./Measurement";

export const OPEN_PRIVACY_EVENT = "foxstage:privacy";
function clearOptionalCookies() {
  for (const cookie of document.cookie.split(";")) {
    const name = cookie.trim().split("=")[0];
    if (!/^(?:_ga(?:_|$)|_gid$|_gat|_gcl_|_fbp$|_fbc$)/.test(name)) continue;
    const host = window.location.hostname.split(".");
    const domains = ["", ...host.map((_, i) => `; Domain=.${host.slice(i).join(".")}`)];
    for (const domain of domains) document.cookie = `${name}=; Max-Age=0; Path=/${domain}; SameSite=Lax`;
  }
}

export function ConsentManager({config,initialConsent}: {config: MeasurementConfig;initialConsent:Consent|null}) {
  const [consent, setConsent] = useState<Consent | null>(initialConsent);
  const [showBanner, setShowBanner] = useState(!initialConsent);
  const [analytics, setAnalytics] = useState(initialConsent?.analytics ?? false);
  const [advertising, setAdvertising] = useState(initialConsent?.advertising ?? false);
  const dialog = useRef<HTMLDialogElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const channel=useRef<BroadcastChannel | null>(null);
  useEffect(() => {
    function open() { previousFocus.current=document.activeElement as HTMLElement; dialog.current?.showModal(); }
    window.addEventListener(OPEN_PRIVACY_EVENT,open);
    return () => window.removeEventListener(OPEN_PRIVACY_EVENT,open);
  }, []);
  useEffect(()=>{
    const sync=()=>{
      let current:Consent|null=null;
      try {const raw=document.cookie.split("; ").find(row=>row.startsWith(CONSENT_COOKIE+"="))?.slice(CONSENT_COOKIE.length+1);current=parseConsent(raw ? decodeURIComponent(raw) : undefined);} catch { /* Invalid means denied. */ }
      if(JSON.stringify(current)!==JSON.stringify(consent))window.location.reload();
    };
    const visible=()=>{if(!document.hidden)sync();};
    if(typeof BroadcastChannel!=="undefined"){channel.current=new BroadcastChannel("foxstage-privacy");channel.current.onmessage=sync;}
    window.addEventListener("focus",sync);document.addEventListener("visibilitychange",visible);
    const expiry=consent ? setTimeout(sync,Math.max(1,Math.min(consent.updatedAt+CONSENT_MAX_AGE*1000-Date.now()+1,2_147_000_000))) : undefined;
    return ()=>{channel.current?.close();channel.current=null;window.removeEventListener("focus",sync);document.removeEventListener("visibilitychange",visible);clearTimeout(expiry);};
  },[consent]);
  function save(stats: boolean, ads: boolean) {
    const next = createConsent(stats, ads);
    document.cookie = `${CONSENT_COOKIE}=${encodeURIComponent(JSON.stringify(next))}; Max-Age=${CONSENT_MAX_AGE}; Path=/; SameSite=Lax${window.location.protocol === "https:" ? "; Secure" : ""}`;
    channel.current?.postMessage("changed");
    const revoked = (consent?.analytics && !stats) || (consent?.advertising && !ads);
    if (revoked) {
      window.gtag?.("consent","update",{analytics_storage:"denied",ad_storage:"denied",ad_user_data:"denied",ad_personalization:"denied"});
      window.fbq?.("consent","revoke");
      clearOptionalCookies();
    }
    setAnalytics(stats); setAdvertising(ads); setShowBanner(false);
    dialog.current?.close();
    if (revoked) { window.location.reload(); return; }
    setConsent(next);
  }
  return <>
    <Suspense fallback={null}><Measurement config={config} consent={consent} /></Suspense>
    {showBanner && <aside className="cookie-banner" aria-label="Privacidade e cookies">
      <div><strong>Você escolhe os cookies.</strong><p>Usamos armazenamento necessário para lembrar sua escolha. Medição de visitas e publicidade só funcionam com sua autorização. <Link href="/politica-de-cookies">Entenda os cookies</Link>.</p></div>
      <div className="cookie-actions"><button type="button" onClick={() => save(false,false)}>Recusar opcionais</button><button type="button" onClick={() => {previousFocus.current=document.activeElement as HTMLElement; dialog.current?.showModal();}}>Personalizar</button><button type="button" onClick={() => save(true,true)}>Aceitar opcionais</button></div>
    </aside>}
    <dialog className="cookie-dialog" ref={dialog} aria-labelledby="cookie-title" aria-describedby="cookie-description" onClose={() => previousFocus.current?.focus()}>
      <div className="cookie-dialog-heading"><h2 id="cookie-title">Suas preferências</h2><button type="button" aria-label="Fechar preferências" onClick={() => dialog.current?.close()}>Fechar</button></div>
      <p id="cookie-description">Você pode mudar sua decisão a qualquer momento no rodapé. Recusar cookies opcionais não impede o acesso às aulas ou ao contato.</p>
      <div className="cookie-category"><div><strong>Necessários</strong><p>Guardam estas preferências por até 180 dias. Não identificam você por nome.</p></div><span>Sempre ativos</span></div>
      <label className="cookie-category"><span><strong>Análise de visitas</strong><span>Permite medir páginas visitadas e cliques para contato com o Google Analytics, quando configurado.</span></span><input type="checkbox" checked={analytics} onChange={e => setAnalytics(e.target.checked)} /></label>
      <label className="cookie-category"><span><strong>Publicidade</strong><span>Permite medição de campanhas com Google Ads e Meta Pixel, quando configurados.</span></span><input type="checkbox" checked={advertising} onChange={e => setAdvertising(e.target.checked)} /></label>
      <p className="cookie-policy-links"><Link href="/privacidade">Privacidade</Link> · <Link href="/politica-de-cookies">Política de cookies</Link></p>
      <div className="cookie-actions"><button type="button" onClick={() => save(false,false)}>Recusar opcionais</button><button type="button" onClick={() => save(analytics,advertising)}>Salvar escolha</button><button type="button" onClick={() => save(true,true)}>Aceitar opcionais</button></div>
    </dialog>
    <noscript><style>{".cookie-banner,.cookie-dialog,.footer-privacy-button{display:none!important}"}</style><p className="cookie-noscript">A medição opcional está desativada sem JavaScript. <a href="/privacidade">Política de privacidade</a>.</p></noscript>
  </>;
}
