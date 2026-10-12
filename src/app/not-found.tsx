import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { Brand } from "@/components/ui/Brand";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import { site } from "@/content/site";

export default function NotFound() {
  return <><main id="conteudo" tabIndex={-1} className="not-found container"><Brand /><p className="eyebrow">{site.notFound.eyebrow}</p><h1>{site.notFound.title}</h1><p>{site.notFound.description}</p><div className="hero-actions"><Link href="/" className="button button-primary">{site.notFound.homeCta}</Link><WhatsAppLink origin="contact" className="button button-outline">{site.notFound.contactCta}</WhatsAppLink></div></main><Footer /></>;
}
