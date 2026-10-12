import { Footer } from "./Footer";
export function InstitutionalShell({ children }: { children: React.ReactNode }) {
  return <><main id="conteudo" tabIndex={-1} className="institutional-main">{children}</main><Footer /></>;
}
