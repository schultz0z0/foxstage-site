import { notFound } from "next/navigation";
import { canAccessPage, pageAvailability } from "@/content/evolution/availability";
import type { PageKey } from "@/content/evolution/types";
export function requirePageAccess(key: PageKey) {
  if (!canAccessPage(pageAvailability[key], process.env)) notFound();
}
