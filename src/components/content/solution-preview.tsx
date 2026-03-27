import Link from "next/link";
import { ArrowRightIcon } from "@/components/ui/icons";

export function SolutionPreview({
  title,
  summary,
  solves,
  audience,
  href,
}: {
  title: string;
  summary: string;
  solves: string;
  audience: string;
  href: string;
}) {
  return (
    <article className="grid gap-5 border-t border-[var(--color-border)] py-8 lg:grid-cols-[0.9fr,1.1fr]">
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-primary)]">
          Beispiel
        </p>
        <h3 className="font-display text-2xl text-[var(--color-text)]">{title}</h3>
        <p className="text-sm leading-7 text-[var(--color-muted)]">{summary}</p>
      </div>
      <div className="space-y-4">
        <p className="text-sm leading-7 text-[var(--color-text)]">{solves}</p>
        <p className="text-sm leading-7 text-[var(--color-muted)]">{audience}</p>
        <Link
          href={href}
          className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-primary)] transition hover:text-[var(--color-primary-strong)]"
        >
          Mehr zu dieser Lösung <ArrowRightIcon className="size-4" />
        </Link>
      </div>
    </article>
  );
}
