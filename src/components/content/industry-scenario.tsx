import Link from "next/link";

export function IndustryScenarioCard({
  title,
  summary,
  situations,
  href,
}: {
  title: string;
  summary: string;
  situations: string[];
  href: string;
}) {
  return (
    <article className="rounded-[28px] border border-[var(--color-border)] bg-white p-6">
      <div className="space-y-4">
        <h3 className="font-display text-2xl text-[var(--color-text)]">{title}</h3>
        <p className="text-sm leading-7 text-[var(--color-muted)]">{summary}</p>
        <ul className="space-y-2 text-sm leading-7 text-[var(--color-text)]">
          {situations.map((situation) => (
            <li key={situation} className="flex gap-3">
              <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-primary)]" />
              <span>{situation}</span>
            </li>
          ))}
        </ul>
        <Link
          href={href}
          className="inline-flex text-sm font-medium text-[var(--color-primary)] transition hover:text-[var(--color-primary-strong)]"
        >
          Branchenkontext ansehen
        </Link>
      </div>
    </article>
  );
}
