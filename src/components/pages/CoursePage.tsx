import { PageHero } from "@/components/ui/PageHero";
import { PageStructuredData } from "@/components/ui/PageStructuredData";
import { GroupLessons } from "./GroupLessons";
import { IndividualLessons } from "./IndividualLessons";
import type { CoursePageData } from "@/content/evolution/types";

export function CoursePage({ course }: { course: CoursePageData }) {
  return <>
    <PageHero titleLines={course.titleLines} description={course.introduction} image={{ src: course.image.src, alt: course.image.alt, mobilePosition: course.id === "group" ? "35% 50%" : "85% 50%" }} label={course.id === "group" ? "Inglês online em grupo" : "Inglês individual personalizado"} cta={course.cta} origin={course.id}>
      <dl className="container facts-grid">{course.practicalFacts.map(fact => <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>)}</dl>
    </PageHero>
    {course.id === "group" ? <GroupLessons course={course} /> : <IndividualLessons course={course} />}
    <PageStructuredData seo={course.seo} />
  </>;
}
