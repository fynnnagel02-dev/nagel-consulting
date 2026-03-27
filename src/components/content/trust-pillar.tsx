export function TrustPillar({
  title,
  body,
  details,
}: {
  title: string;
  body: string;
  details: string[];
}) {
  return (
    <article className="grid gap-6 border-t border-[var(--color-border)] py-7 lg:grid-cols-[0.55fr,1fr]">
      <div>
        <h3 className="font-display text-2xl text-[var(--color-text)]">{title}</h3>
      </div>
      <div className="space-y-4">
        <p className="text-base leading-8 text-[var(--color-text)]">{body}</p>
        <ul className="space-y-3 text-sm leading-7 text-[var(--color-muted)]">
          {details.map((detail) => (
            <li key={detail} className="flex gap-3">
              <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]" />
              <span>{detail}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
