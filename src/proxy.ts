import { NextResponse, type NextRequest } from "next/server";
import { canAccessPage, pageAvailability, pagePaths } from "./content/evolution/availability";
import type { PageKey } from "./content/evolution/types";

// Block a draft before rendering starts, so its branded 404 is server-rendered
// even without JavaScript. Page and metadata guards remain defense in depth.
export function proxy(request: NextRequest) {
  const entry = Object.entries(pagePaths).find(([, path]) => path === request.nextUrl.pathname);
  if (entry && !canAccessPage(pageAvailability[entry[0] as PageKey], process.env)) {
    const destination = request.nextUrl.clone();
    destination.pathname = "/pagina-nao-encontrada";
    destination.search = "";
    return NextResponse.rewrite(destination);
  }
  return NextResponse.next();
}

export const config = { matcher: ["/cursos/:path*", "/a-foxstage", "/english-day", "/contato", "/conteudos", "/privacidade"] };
