import { InstitutionalShell } from "@/components/layout/InstitutionalShell";
// Publication access and preview visibility are evaluated on the serving environment.
export const dynamic = "force-dynamic";
export default function InstitutionalLayout({ children }: { children: React.ReactNode }) {
  return <InstitutionalShell>{children}</InstitutionalShell>;
}
