import type { Metadata } from "next";
import localFont from "next/font/local";
import { site } from "@/content/site";
import { getPublicationConfig } from "@/lib/publication";
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
  robots: { index: publication.indexable, follow: publication.indexable },
  openGraph: { title: site.title, description: site.description, siteName: "Foxstage", locale: "pt_BR", type: "website", ...(publication.url ? { url: publication.url.href } : {}) },
  twitter: { card: "summary_large_image", title: site.title, description: site.description }
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR" className={`${display.variable} ${body.variable}`}><body>
    <a className="skip-link" href="#conteudo-principal">Pular para o conteúdo</a>
    {children}
  </body></html>;
}
