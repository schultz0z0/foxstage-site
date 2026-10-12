import { getVisibleAvailability, pageAvailability } from "@/content/evolution/availability";
import { getInstitutionalNavigation } from "@/content/evolution/navigation";
export function getPageNavigation() {
  return getInstitutionalNavigation(getVisibleAvailability(pageAvailability, process.env));
}
