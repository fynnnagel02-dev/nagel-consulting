import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import { Container } from "@/components/layout/container";

export function SectionShell({
  id,
  children,
  className,
  tone = "default",
  spacing = "default",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  tone?: "default" | "alt" | "surface" | "primary";
  spacing?: "compact" | "default" | "expansive";
}) {
  const toneClasses = {
    default: "bg-transparent",
    alt: "bg-[var(--color-background-alt)]",
    surface: "bg-white",
    primary: "bg-[var(--color-primary)] text-white",
  };

  const spacingClasses = {
    compact: "py-16 sm:py-20",
    default: "py-20 sm:py-24 lg:py-28",
    expansive: "py-24 sm:py-28 lg:py-36",
  };

  return (
    <section id={id} className={cn(toneClasses[tone], spacingClasses[spacing], className)}>
      <Container>{children}</Container>
    </section>
  );
}
