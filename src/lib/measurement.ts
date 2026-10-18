import type { Consent } from "./consent.ts";
export type MeasurementConfig = { ga4?: string; googleAds?: string; metaPixel?: string; adsWhatsAppLabel?: string };
export function getMeasurementConfig(env: Record<string, string | undefined>): MeasurementConfig {
  const config: MeasurementConfig = {};
  if (/^G-[A-Z0-9]+$/.test(env.GA4_ID ?? "")) config.ga4 = env.GA4_ID;
  if (/^AW-\d+$/.test(env.GOOGLE_ADS_ID ?? "")) config.googleAds = env.GOOGLE_ADS_ID;
  if (/^\d{5,25}$/.test(env.META_PIXEL_ID ?? "")) config.metaPixel = env.META_PIXEL_ID;
  if (/^[\w-]{3,100}$/.test(env.GOOGLE_ADS_WHATSAPP_LABEL ?? "")) config.adsWhatsAppLabel = env.GOOGLE_ADS_WHATSAPP_LABEL;
  return config;
}
export function allowedMeasurements(config: MeasurementConfig, consent: Consent | null): MeasurementConfig {
  return { ...(consent?.analytics && config.ga4 ? { ga4: config.ga4 } : {}), ...(consent?.advertising ? { ...(config.googleAds ? {googleAds: config.googleAds} : {}), ...(config.metaPixel ? {metaPixel: config.metaPixel} : {}), ...(config.googleAds && config.adsWhatsAppLabel ? {adsWhatsAppLabel: config.adsWhatsAppLabel} : {}) } : {}) };
}
