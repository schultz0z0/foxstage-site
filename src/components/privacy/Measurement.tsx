"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import type { Consent } from "@/lib/consent";
import { allowedMeasurements, type MeasurementConfig } from "@/lib/measurement";

type Tag = (...args: unknown[]) => void;
type Pixel = Tag & { callMethod?: Tag; queue: unknown[][]; loaded: boolean; version: string; push?: Tag };
declare global {
  interface Window { dataLayer?: unknown[]; gtag?: Tag; fbq?: Pixel; _fbq?: Pixel }
}
function loadScript(id: string, src: string) {
  if (document.getElementById(id)) return;
  const script = document.createElement("script");
  script.id = id; script.async = true; script.src = src;
  script.referrerPolicy = "no-referrer";
  document.head.appendChild(script);
}

export function Measurement({config, consent}: {config: MeasurementConfig; consent: Consent | null}) {
  const pathname = usePathname();
  const tracked=useRef({ga:"",meta:""});
  useEffect(() => {
    const active = allowedMeasurements(config, consent);
    if (window.location.search || window.location.hash) active.metaPixel = undefined;
    if (!active.ga4 && !active.googleAds && !active.metaPixel) return;
    const location = window.location.origin + pathname;
    if (active.ga4 || active.googleAds) {
      if (!window.gtag) {
        window.dataLayer = [];
        // gtag's queue protocol uses Arguments objects, not arrays.
        // eslint-disable-next-line prefer-rest-params
        window.gtag = function () { window.dataLayer!.push(arguments); };
        window.gtag("consent", "default", {analytics_storage:"denied",ad_storage:"denied",ad_user_data:"denied",ad_personalization:"denied"});
        window.gtag("set", "url_passthrough", false);
        window.gtag("set", "ads_data_redaction", true);
        window.gtag("js", new Date());
      }
      window.gtag("consent", "update", {analytics_storage:consent?.analytics?"granted":"denied", ad_storage:consent?.advertising?"granted":"denied", ad_user_data:consent?.advertising?"granted":"denied", ad_personalization:consent?.advertising?"granted":"denied"});
      // Configure without auto events: do not forward query strings, referrers or WhatsApp text.
      for (const id of [active.ga4, active.googleAds].filter(Boolean)) window.gtag("config", id, {send_page_view:false, page_location:location, page_referrer:"", allow_google_signals:false, allow_ad_personalization_signals:!!consent?.advertising});
      loadScript("foxstage-google-tag", `https://www.googletagmanager.com/gtag/js?id=${active.ga4 ?? active.googleAds}`);
      if (active.ga4 && tracked.current.ga!==active.ga4+location) {
        window.gtag("event", "page_view", {send_to:active.ga4,page_location:location,page_referrer:"",page_title:document.title});
        tracked.current.ga=active.ga4+location;
      }
    }
    if (active.metaPixel) {
      if (!window.fbq) {
        const pixel = function (...args: unknown[]) { if (pixel.callMethod) pixel.callMethod(...args); else pixel.queue.push(args); } as Pixel;
        pixel.queue=[]; pixel.loaded=true; pixel.version="2.0"; pixel.push=pixel;
        window.fbq=pixel; window._fbq=pixel;
        pixel("consent", "grant");
        pixel("set", "autoConfig", false, active.metaPixel);
        // No advanced matching: never pass e-mail, phone, user IDs or lead text.
        pixel("init", active.metaPixel);
        loadScript("foxstage-meta-pixel", "https://connect.facebook.net/en_US/fbevents.js");
      }
      // Meta SDK sends the page URL. It is not initialized on URLs containing query/hash data.
      if(tracked.current.meta!==active.metaPixel+location){window.fbq("track", "PageView");tracked.current.meta=active.metaPixel+location;}
    }
    const onClick = (event: MouseEvent) => {
      const link = event.target instanceof Element ? event.target.closest("a[data-contact-origin]") : null;
      if (!link) return;
      if (active.ga4) window.gtag?.("event","whatsapp_click",{send_to:active.ga4,page_location:location,page_referrer:""});
      if (active.googleAds && active.adsWhatsAppLabel) window.gtag?.("event","conversion",{send_to:`${active.googleAds}/${active.adsWhatsAppLabel}`,page_location:location,page_referrer:""});
      if (active.metaPixel && !window.location.search && !window.location.hash) window.fbq?.("trackCustom","WhatsAppClick");
    };
    document.addEventListener("click",onClick);
    return () => document.removeEventListener("click",onClick);
  }, [config, consent, pathname]);
  return null;
}
