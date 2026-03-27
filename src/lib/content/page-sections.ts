import type { PageSection } from "@/lib/types/content";

export const allowedPageSectionTypes = new Set([
  "page_intro_band",
  "rich_text_block",
  "cta_band",
  "faq_block",
  "quote_band",
]);

export function getSafePageSections(sections: PageSection[] | null | undefined) {
  return (sections ?? []).filter((section) =>
    allowedPageSectionTypes.has(section.section_type),
  );
}
