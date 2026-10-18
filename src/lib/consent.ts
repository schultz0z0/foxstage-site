export const CONSENT_COOKIE = "foxstage_consent";
export const CONSENT_MAX_AGE = 180 * 24 * 60 * 60;
export type Consent = { version: 1; analytics: boolean; advertising: boolean; updatedAt: number };
export function createConsent(analytics: boolean, advertising: boolean, now = Date.now()): Consent {
  return { version: 1, analytics, advertising, updatedAt: now };
}
export function parseConsent(value: string | undefined, now = Date.now()): Consent | null {
  try {
    const data = JSON.parse(value ?? "null");
    if (!data || data.version !== 1 || typeof data.analytics !== "boolean" || typeof data.advertising !== "boolean" || !Number.isFinite(data.updatedAt) || data.updatedAt > now || now - data.updatedAt > CONSENT_MAX_AGE * 1000) return null;
    return createConsent(data.analytics, data.advertising, data.updatedAt);
  } catch { return null; }
}
