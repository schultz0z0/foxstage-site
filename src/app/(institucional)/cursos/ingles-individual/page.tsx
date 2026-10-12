import { CoursePage } from "@/components/pages/CoursePage";
import { coursePages } from "@/content/evolution/courses";
import { buildPageMetadata } from "@/lib/page-metadata";
import { getPublicationConfig } from "@/lib/publication";
import { requirePageAccess } from "@/lib/page-access";
export function generateMetadata() { requirePageAccess("individual"); return buildPageMetadata(coursePages.individual.seo, getPublicationConfig(process.env)); }
export default function IndividualCourse() { requirePageAccess("individual"); return <CoursePage course={coursePages.individual} />; }
