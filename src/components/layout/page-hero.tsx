import type { ReactNode } from "react";
import { Container } from "@/components/layout/container";
import { cn } from "@/lib/utils/cn";

export function PageHero({
  eyebrow,
  title,
  lead,
  children,
  compact = false,
}: {
  eyebrow?: string;
  title: string;
  lead: string;
  children?: ReactNode;
  compact?: boolean;
}) {
  return (
    <section
      className={cn(
        "border-b border-[var(--color-border)] bg-[radial-gradient(circle_at_top_left,_rgba(79,124,172,0.16),_transparent_40%),linear-gradient(180deg,_rgba(255,255,255,0.96),_rgba(248,250,252,0.96))]",
        compact ? "py-20 sm:py-24" : "py-24 sm:py-28 lg:py-32",
      )}
    >
      <Container>
        <div className="max-w-4xl space-y-6">
          {eyebrow ? (
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[var(--color-primary)]">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="font-display text-4xl leading-tight text-[var(--color-text)] sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="max-w-3xl text-lg leading-8 text-[var(--color-muted)] sm:text-xl">
            {lead}
          </p>
          {children}
        </div>
      </Container>
    </section>
  );
}
