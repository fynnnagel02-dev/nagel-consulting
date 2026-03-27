import Link from "next/link";
import { Accordion } from "@/components/ui/accordion";
import { SectionShell } from "@/components/layout/section-shell";
import { SectionIntro } from "@/components/layout/section-intro";
import { Button } from "@/components/ui/button";
import type { PageSection } from "@/lib/types/content";

type SafePageSection = Pick<
  PageSection,
  "id" | "section_type" | "title" | "subtitle" | "content" | "data_json"
>;

export function PageSectionRenderer({
  sections,
}: {
  sections: SafePageSection[];
}) {
  return (
    <>
      {sections.map((section) => {
        switch (section.section_type) {
          case "page_intro_band":
            return (
              <SectionShell key={section.id} spacing="compact">
                <SectionIntro
                  eyebrow={section.subtitle ?? undefined}
                  title={section.title ?? ""}
                  lead={section.content ?? undefined}
                />
              </SectionShell>
            );
          case "rich_text_block":
            return (
              <SectionShell key={section.id} spacing="compact">
                <div className="max-w-3xl space-y-5">
                  {section.title ? (
                    <h2 className="font-display text-3xl text-[var(--color-text)]">
                      {section.title}
                    </h2>
                  ) : null}
                  {section.subtitle ? (
                    <p className="text-lg leading-8 text-[var(--color-text)]">
                      {section.subtitle}
                    </p>
                  ) : null}
                  {section.content ? (
                    <p className="text-base leading-8 text-[var(--color-muted)]">
                      {section.content}
                    </p>
                  ) : null}
                </div>
              </SectionShell>
            );
          case "cta_band": {
            const href =
              typeof section.data_json === "object" &&
              section.data_json &&
              "href" in section.data_json
                ? String(section.data_json.href)
                : "/kontakt";
            const label =
              typeof section.data_json === "object" &&
              section.data_json &&
              "label" in section.data_json
                ? String(section.data_json.label)
                : "Kontakt aufnehmen";

            return (
              <SectionShell key={section.id} tone="alt" spacing="compact">
                <div className="flex flex-col gap-6 rounded-[32px] border border-[var(--color-border)] bg-white p-8 lg:flex-row lg:items-end lg:justify-between">
                  <div className="max-w-2xl space-y-3">
                    {section.title ? (
                      <h2 className="font-display text-3xl text-[var(--color-text)]">
                        {section.title}
                      </h2>
                    ) : null}
                    {section.content ? (
                      <p className="text-base leading-8 text-[var(--color-muted)]">
                        {section.content}
                      </p>
                    ) : null}
                  </div>
                  <Button asChild>
                    <Link href={href}>{label}</Link>
                  </Button>
                </div>
              </SectionShell>
            );
          }
          case "faq_block": {
            const items =
              typeof section.data_json === "object" &&
              section.data_json &&
              "items" in section.data_json &&
              Array.isArray(section.data_json.items)
                ? section.data_json.items
                    .filter(
                      (item): item is { title: string; content: string } =>
                        typeof item === "object" &&
                        item !== null &&
                        "title" in item &&
                        "content" in item &&
                        typeof item.title === "string" &&
                        typeof item.content === "string",
                    )
                : [];

            if (items.length === 0) {
              return null;
            }

            return (
              <SectionShell key={section.id} spacing="compact">
                <div className="grid gap-8 lg:grid-cols-[0.65fr,1fr]">
                  <SectionIntro
                    eyebrow={section.subtitle ?? "FAQ"}
                    title={section.title ?? "Häufige Fragen"}
                    lead={section.content ?? undefined}
                  />
                  <Accordion items={items} />
                </div>
              </SectionShell>
            );
          }
          case "quote_band":
            return (
              <SectionShell key={section.id} spacing="compact">
                <blockquote className="max-w-4xl border-l-2 border-[var(--color-accent)] pl-6">
                  <p className="font-display text-3xl leading-tight text-[var(--color-text)]">
                    {section.content}
                  </p>
                  {section.title ? (
                    <footer className="mt-4 text-sm text-[var(--color-muted)]">
                      {section.title}
                    </footer>
                  ) : null}
                </blockquote>
              </SectionShell>
            );
          default:
            return null;
        }
      })}
    </>
  );
}
