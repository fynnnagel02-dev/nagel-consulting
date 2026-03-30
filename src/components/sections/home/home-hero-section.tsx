import Link from "next/link";
import { InquiryButton } from "@/components/forms/inquiry-button";
import { Reveal } from "@/components/motion/reveal";
import { SectionShell } from "@/components/layout/section-shell";
import { Button } from "@/components/ui/button";
import { VisualPlaceholder } from "@/components/content/visual-placeholder";
import { ArrowRightIcon } from "@/components/ui/icons";

export function HomeHeroSection({
  primaryCta,
  secondaryCta,
}: {
  primaryCta: { href: string; label: string };
  secondaryCta: { href: string; label: string };
}) {
  return (
    <SectionShell spacing="default" className="overflow-hidden">
      <div className="grid gap-10 lg:grid-cols-[0.98fr,1.02fr] lg:items-center">
        <Reveal>
          <div className="max-w-2xl space-y-6">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[var(--color-primary)]">
                Struktur für operative Abläufe
              </p>
              <h1 className="font-display text-5xl leading-[1.04] text-[var(--color-text)] sm:text-6xl lg:text-[4.35rem]">
                Aus Excel-basierten Prozessen werden strukturierte, sichere
                Webanwendungen.
              </h1>
            </div>
            <p className="max-w-xl text-lg leading-8 text-[var(--color-muted)]">
              Nagel Solutions entwickelt digitale Arbeitsabläufe für
              Handwerksbetriebe, Dienstleister und operative KMU, wenn Listen,
              Papierwege und informelle Abstimmung im Alltag nicht mehr tragen.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <InquiryButton
                size="lg"
                label={primaryCta.label}
                inquiryCategory="Beratungsanfrage"
                source="homepage-hero"
              />
              <Button asChild variant="secondary" size="lg">
                <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
              </Button>
            </div>
            <div className="inline-flex items-center gap-2 text-sm text-[var(--color-muted)]">
              <span className="h-2 w-2 rounded-full bg-[var(--color-accent)]" />
              Für Unternehmen, die ihren Betrieb digital ordnen wollen, ohne in
              generische Softwarelogik gepresst zu werden.
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="relative lg:pl-8">
            <div className="absolute inset-0 rounded-[36px] bg-[radial-gradient(circle_at_top_left,_rgba(79,124,172,0.22),_transparent_45%)]" />
            <VisualPlaceholder
              title="Ein klarer Ablauf statt verteilter Einzellösungen"
              caption="Operative Prozessansicht"
              variant="surface"
              className="relative min-h-[360px]"
            />
            <div className="mt-5 flex items-center gap-2 text-sm text-[var(--color-primary)]">
              <span className="font-medium">Vom Tagesgeschäft her gedacht</span>
              <ArrowRightIcon className="size-4" />
            </div>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}
