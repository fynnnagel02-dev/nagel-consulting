export function ProcessStep({
  index,
  title,
  body,
}: {
  index: string;
  title: string;
  body: string;
}) {
  return (
    <article className="grid gap-4 border-t border-[var(--color-border)] pt-6">
      <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-primary)]">
        {index}
      </div>
      <h3 className="font-display text-2xl text-[var(--color-text)]">{title}</h3>
      <p className="text-sm leading-7 text-[var(--color-muted)]">{body}</p>
    </article>
  );
}
