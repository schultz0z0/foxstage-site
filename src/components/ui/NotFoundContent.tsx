import Link from "next/link";
import { WhatsAppLink } from "./WhatsAppLink";
import { site } from "@/content/site";
import { Header } from "@/components/layout/Header";
export function NotFoundContent() {
  return <><Header variant="page" /><section className="not-found container"><p className="eyebrow">{site.notFound.eyebrow}</p><h1 id="conteudo-principal" tabIndex={-1}>{site.notFound.title}</h1><p>{site.notFound.description}</p><div className="hero-actions"><Link href="/" className="button button-primary">{site.notFound.homeCta}</Link><WhatsAppLink origin="contact" className="button button-outline">{site.notFound.contactCta}</WhatsAppLink></div></section></>;
}
