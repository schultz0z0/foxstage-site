import { coursePages } from "./courses.ts";
import { schoolPage } from "./school.ts";
import { englishDayPage } from "./english-day.ts";
import { contactPage } from "./contact.ts";
import { privacyRecord } from "../privacy.ts";
import type { EditorialRecord, PageAvailability, PageKey, PublicationState } from "./types.ts";

export const pagePaths: Record<PageKey, string> = { group: "/cursos/ingles-em-grupo", individual: "/cursos/ingles-individual", school: "/a-foxstage", englishDay: "/english-day", contact: "/contato", content: "/conteudos", privacy: "/privacidade" };
export const implementedPages: readonly PageKey[] = ["group", "individual", "school", "englishDay", "contact"];
export function deriveAvailability(records: Partial<Record<PageKey, EditorialRecord>>): PageAvailability {
  return Object.fromEntries(Object.keys(pagePaths).map(key => {
    const record = records[key as PageKey];
    const approved = record?.status === "published" && Object.values(record.review).every(Boolean);
    return [key, approved ? "published" : "draft"];
  })) as PageAvailability;
}
export const pageAvailability = deriveAvailability({ group: coursePages.group, individual: coursePages.individual, school: schoolPage, englishDay: englishDayPage, contact: contactPage, privacy: privacyRecord });
export function isPrivateDraftPreview(environment: Record<string, string | undefined>) {
  // A public origin always blocks drafts, even when search indexing is disabled.
  return !environment.SITE_URL && (environment.NODE_ENV === "development" || environment.SITE_PREVIEW_DRAFTS === "true");
}
export function canAccessPage(status: PublicationState, environment: Record<string, string | undefined>) {
  return status === "published" || isPrivateDraftPreview(environment);
}
export function getVisibleAvailability(availability: PageAvailability, environment: Record<string, string | undefined>, implemented: readonly PageKey[] = implementedPages): PageAvailability {
  return Object.fromEntries(Object.entries(availability).map(([key, status]) => [key, status === "published" || (implemented.includes(key as PageKey) && isPrivateDraftPreview(environment)) ? "published" : "draft"])) as PageAvailability;
}
export function getPublishedPathnames(availability: PageAvailability): string[] {
  return ["/", ...Object.entries(availability).filter(([, state]) => state === "published").map(([key]) => pagePaths[key as PageKey]), ...(availability.privacy === "published" ? ["/politica-de-cookies"] : [])];
}
