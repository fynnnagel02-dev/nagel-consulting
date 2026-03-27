import { cn } from "@/lib/utils/cn";

export function SectionDivider({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "h-px w-full bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent",
        className,
      )}
    />
  );
}
