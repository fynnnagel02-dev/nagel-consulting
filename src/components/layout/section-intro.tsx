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
            "text-[11px] font-semibold uppercase tracking-[0.32em]",
            inverse ? "text-white/68" : "text-[var(--color-accent)]",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          "font-display text-[2.35rem] leading-[0.96] sm:text-[3rem] lg:text-[3.5rem]",
          inverse ? "text-white" : "text-[var(--color-text)]",
        )}
      >
        {title}
      </h2>
      {lead ? (
        <p
          className={cn(
            "max-w-2xl text-[1.02rem] leading-8 sm:text-[1.08rem]",
            inverse ? "text-white/76" : "text-[var(--color-muted)]",
            align === "center" && "mx-auto",
          )}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}
