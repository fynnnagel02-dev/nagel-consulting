import { cn } from "@/lib/utils/cn";

export function SectionIntro({
  eyebrow,
  title,
  lead,
  align = "left",
  inverse = false,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
  inverse?: boolean;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl space-y-4",
        align === "center" && "mx-auto text-center",
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            "text-xs font-semibold uppercase tracking-[0.24em]",
            inverse ? "text-white/70" : "text-[var(--color-primary)]",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          "font-display text-3xl leading-tight sm:text-4xl lg:text-[3rem]",
          inverse ? "text-white" : "text-[var(--color-text)]",
        )}
      >
        {title}
      </h2>
      {lead ? (
        <p
          className={cn(
            "max-w-2xl text-base leading-8 sm:text-lg",
            inverse ? "text-white/78" : "text-[var(--color-muted)]",
            align === "center" && "mx-auto",
          )}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}
