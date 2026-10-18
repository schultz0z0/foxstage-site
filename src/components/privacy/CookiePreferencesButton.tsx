"use client";
export function CookiePreferencesButton() {
  return <button type="button" className="footer-privacy-button" onClick={() => window.dispatchEvent(new Event("foxstage:privacy"))}>Preferências de cookies</button>;
}
