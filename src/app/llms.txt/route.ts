import { getPublicationConfig } from "@/lib/publication";
import { buildLlmsText } from "@/lib/llms";
export const dynamic="force-dynamic";
export function GET() {
  const {url,indexable}=getPublicationConfig(process.env);
  if (!url || !indexable) return new Response("Informações públicas indisponíveis nesta prévia.\n", {status:404,headers:{"Content-Type":"text/plain; charset=utf-8","X-Robots-Tag":"noindex","Cache-Control":"no-store"}});
  return new Response(buildLlmsText(url),{headers:{"Content-Type":"text/plain; charset=utf-8","Cache-Control":"public, max-age=3600"}});
}
