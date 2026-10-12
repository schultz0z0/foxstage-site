export type CourseId = "group" | "individual";
export type PublicationState = "draft" | "published";
export type PageKey = CourseId | "school" | "englishDay" | "contact" | "content" | "privacy";
export type PageAvailability = Record<PageKey, PublicationState>;
export type NavigationEntry =
  | { kind: "link"; label: string; href: string }
  | { kind: "group"; label: string; children: readonly { label: string; href: string }[] };
export type PageSEO = { title: string; description: string; pathname: string; image?: string };
export type EditorialRecord = {
  status: PublicationState;
  review: { factsConfirmed: boolean; copyApproved: boolean; mediaApproved: boolean };
};
export type FAQItem = { question: string; answer: string };
export type EditorialSection = { id: string; title: string; paragraphs: readonly string[] };
export type CoursePageData = EditorialRecord & {
  id: CourseId;
  seo: PageSEO;
  heading: string;
  titleLines: readonly [string, string];
  introduction: string;
  cta: string;
  practicalFacts: readonly { label: string; value: string }[];
  sections: readonly EditorialSection[];
  faq: readonly FAQItem[];
  image: { src: string; alt: string; credit?: string; position?: string };
};
