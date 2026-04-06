import { SectionShell } from "@/components/layout/section-shell";
import { SectionIntro } from "@/components/layout/section-intro";
import { DemoEmbed } from "@/components/content/demo-embed";

export function HomeDemoShowcaseSection() {
  return (
    <SectionShell spacing="compact" className="pt-2 sm:pt-4 lg:pt-6 lg:pb-14">
      <div className="space-y-8">
        <SectionIntro
          eyebrow="Produktvorschau"
          title="Ein klarer Ablauf statt verteilter Einzellösungen."
          lead="Wechseln Sie zwischen Verwaltung, Teamleitung und Mitarbeitersicht und bewegen Sie sich in der echten Demo mit sichtbarer Navigation."
          align="center"
        />

        <DemoEmbed
          variant="home"
          className="mx-auto max-w-[86rem]"
        />
      </div>
    </SectionShell>
  );
}
