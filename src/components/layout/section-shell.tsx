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
    alt: "bg-[linear-gradient(180deg,rgba(235,229,219,0.72),rgba(235,229,219,0.38))]",
    surface: "bg-[rgba(255,252,247,0.52)]",
    primary: "bg-[var(--color-primary)] text-white",
  };

  const spacingClasses = {
    compact: "py-18 sm:py-22",
    default: "py-22 sm:py-28 lg:py-32",
    expansive: "py-28 sm:py-32 lg:py-40",
  };

  return (
    <section id={id} className={cn(toneClasses[tone], spacingClasses[spacing], className)}>
      <Container>{children}</Container>
    </section>
  );
}
