import type { Metadata } from "next";
import localFont from "next/font/local";
import { site } from "@/content/site";
import { getPublicationConfig } from "@/lib/publication";
import { getMeasurementConfig } from "@/lib/measurement";
import { ConsentManager } from "@/components/privacy/ConsentManager";
import { cookies } from "next/headers";
import { CONSENT_COOKIE, parseConsent } from "@/lib/consent";
import { NavigationLoading } from "@/components/ui/NavigationLoading";
import { Suspense } from "react";
import "./globals.css";

const display = localFont({ src: "../../node_modules/@fontsource/bebas-neue/files/bebas-neue-latin-400-normal.woff2", variable: "--font-display", weight: "400", display: "swap", fallback: ["Arial Narrow", "Arial"] });
const body = localFont({ src: "../../node_modules/@fontsource-variable/source-sans-3/files/source-sans-3-latin-wght-normal.woff2", variable: "--font-body", weight: "400 700", display: "swap", fallback: ["Arial"] });

export function generateMetadata(): Metadata {
  const publication = getPublicationConfig(process.env);
  return {
  ...(publication.url ? { metadataBase: publication.url } : {}),
  title: { default: site.title, template: "%s | Foxstage" },
  description: site.description,
  applicationName: "Foxstage",
  verification: {
    ...(process.env.GOOGLE_SITE_VERIFICATION ? {google:process.env.GOOGLE_SITE_VERIFICATION} : {}),
    ...(process.env.BING_SITE_VERIFICATION ? {other:{"msvalidate.01":process.env.BING_SITE_VERIFICATION}} : {}),
  },
  robots: { index: publication.indexable, follow: publication.indexable },
  openGraph: { title: site.title, description: site.description, siteName: "Foxstage", locale: "pt_BR", type: "website", ...(publication.url ? { url: publication.url.href } : {}) },
  twitter: { card: "summary_large_image", title: site.title, description: site.description }
  };
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const rawConsent=(await cookies()).get(CONSENT_COOKIE)?.value;
  let initialConsent=null;
  try {initialConsent=parseConsent(rawConsent ? decodeURIComponent(rawConsent) : undefined);} catch { /* Fail closed. */ }
  return <html lang="pt-BR" className={`${display.variable} ${body.variable}`}><body>
    <a className="skip-link" href="#conteudo-principal">Pular para o conteúdo</a>
    {children}
    <ConsentManager config={getMeasurementConfig(process.env)} initialConsent={initialConsent} />
    <Suspense fallback={null}><NavigationLoading /></Suspense>
  </body></html>;
}
