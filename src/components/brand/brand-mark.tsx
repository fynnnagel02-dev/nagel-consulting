import { cn } from "@/lib/utils/cn";

export function BrandMark({
  className,
  compact = false,
  inverse = false,
}: {
  className?: string;
  compact?: boolean;
  inverse?: boolean;
}) {
  return (
    <div className={cn("inline-flex flex-col", className)}>
      <span
        className={cn(
          "font-[600] leading-none tracking-[-0.06em]",
          compact ? "text-[2.8rem]" : "text-[3.15rem]",
          inverse ? "text-white" : "text-[var(--color-primary)]",
        )}
      >
        nagel
      </span>
      <span
        className={cn(
          "pl-[0.16rem] pt-2 text-[0.78rem] font-[500] uppercase tracking-[0.46em]",
          inverse ? "text-white/82" : "text-[var(--color-primary)]/88",
        )}
      >
        solutions
      </span>
    </div>
  );
}
