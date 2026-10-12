import type { NavigationEntry, PageAvailability } from "./types.ts";
import { pagePaths } from "./availability.ts";
export function getInstitutionalNavigation(availability: PageAvailability): readonly NavigationEntry[] {
  const entries: NavigationEntry[] = [];
  const courses = (["group", "individual"] as const).filter(key => availability[key] === "published").map(key => ({ label: key === "group" ? "Inglês em grupo" : "Inglês individual", href: pagePaths[key] }));
  if (courses.length === 1) entries.push({ kind: "link", label: "Cursos", href: courses[0].href });
  else if (courses.length > 1) entries.push({ kind: "group", label: "Cursos", children: courses });
  for (const [key, label] of [["school", "A Foxstage"], ["englishDay", "English Day"], ["content", "Conteúdos"], ["contact", "Contato"]] as const) {
    if (availability[key] === "published") entries.push({ kind: "link", label, href: pagePaths[key] });
  }
  return entries;
}
