import { SectionShell } from "@/components/layout/section-shell";
import { SectionIntro } from "@/components/layout/section-intro";
import { IndustryScenarioCard } from "@/components/content/industry-scenario";
import type { IndustryScenario } from "@/lib/mappers/marketing";

export function HomeIndustriesSection({
  industries,
}: {
  industries: IndustryScenario[];
}) {
  return (
    <SectionShell tone="alt">
      <div className="space-y-12">
        <SectionIntro
          eyebrow="Branchenfit"
          title="Besonders relevant dort, wo operative Abläufe im Alltag tragen müssen."
          lead="Nagel Solutions arbeitet für Unternehmen, deren Wertschöpfung von verlässlichen Prozessen abhängt und bei denen Unklarheit unmittelbar Zeit, Qualität oder Verantwortung kostet."
        />
        <div className="grid gap-6 lg:grid-cols-2">
          {industries.map((industry) => (
            <IndustryScenarioCard key={industry.title} {...industry} />
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
