import { CoursePage } from "@/components/pages/CoursePage";
import { coursePages } from "@/content/evolution/courses";
import { buildPageMetadata } from "@/lib/page-metadata";
import { getPublicationConfig } from "@/lib/publication";
import { requirePageAccess } from "@/lib/page-access";
export function generateMetadata() { requirePageAccess("group"); return buildPageMetadata(coursePages.group.seo, getPublicationConfig(process.env)); }
export default function GroupCourse() { requirePageAccess("group"); return <CoursePage course={coursePages.group} />; }
