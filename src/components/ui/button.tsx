import * as React from "react";
import { cn } from "@/lib/utils/cn";

type ButtonVariant = "primary" | "secondary" | "ghost" | "inverse" | "contrast";
type ButtonSize = "default" | "lg" | "sm";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
};

export function buttonVariants({
  variant = "primary",
  size = "default",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[1.1rem] border text-sm font-medium no-underline transition duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)] disabled:pointer-events-none disabled:opacity-50";
  const variantClass = {
    primary:
      "border-[rgba(255,255,255,0.14)] bg-[linear-gradient(180deg,var(--color-primary),var(--color-primary-strong))] px-5 py-3 !text-white shadow-[var(--shadow-soft)] hover:-translate-y-[1px] hover:border-[rgba(255,255,255,0.18)] hover:shadow-[var(--shadow-panel)] hover:!text-white focus-visible:!text-white active:translate-y-0 active:!text-white disabled:border-[var(--color-primary)] disabled:bg-[var(--color-primary)] disabled:!text-white/88",
    secondary:
      "border-[var(--color-border)] bg-[rgba(255,252,247,0.84)] px-5 py-3 !text-[var(--color-text)] shadow-[var(--shadow-crisp)] hover:-translate-y-[1px] hover:border-[rgba(36,51,69,0.22)] hover:bg-[var(--color-surface-strong)] hover:shadow-[var(--shadow-soft)] hover:!text-[var(--color-text)] focus-visible:!text-[var(--color-text)] active:translate-y-0 active:!text-[var(--color-text)] disabled:bg-white disabled:!text-[var(--color-muted)]",
    ghost:
      "border-transparent bg-transparent px-0 py-2 !text-[var(--color-primary)] hover:!text-[var(--color-accent)] focus-visible:!text-[var(--color-primary-strong)] active:!text-[var(--color-primary-strong)] disabled:!text-[var(--color-secondary)]",
    inverse:
      "border-white/24 bg-[rgba(255,255,255,0.96)] px-5 py-3 !text-[var(--color-primary)] shadow-[var(--shadow-soft)] hover:-translate-y-[1px] hover:bg-white hover:shadow-[var(--shadow-panel)] hover:!text-[var(--color-primary-strong)] focus-visible:!text-[var(--color-primary-strong)] active:translate-y-0 active:!text-[var(--color-primary-strong)] disabled:border-white disabled:bg-white disabled:!text-[var(--color-primary)]/55",
    contrast:
      "border-white/24 bg-[rgba(255,255,255,0.05)] px-5 py-3 !text-white hover:border-white/38 hover:bg-white/12 hover:!text-white focus-visible:!text-white active:!text-white disabled:border-white/18 disabled:!text-white/55",
  }[variant];
  const sizeClass = {
    default: "h-11",
    lg: "h-12 px-6 text-[15px]",
    sm: "h-10 px-4 text-[13px]",
  }[size];

  return cn(base, variantClass, sizeClass, className);
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "default", asChild, children, ...props }, ref) => {
    const computedClassName = buttonVariants({ variant, size, className });

    if (asChild && React.isValidElement(children)) {
      const child = children as React.ReactElement<{
        className?: string;
      }>;

      return React.cloneElement(child, {
        className: cn(child.props.className, computedClassName),
      });
    }

    return (
      <button
        ref={ref}
        className={computedClassName}
        {...props}
      >
        {children}
      </button>
    );
  },
);
Button.displayName = "Button";
