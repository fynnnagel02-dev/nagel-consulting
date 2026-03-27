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
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border text-sm font-medium no-underline transition duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  const variantClass = {
    primary:
      "border-[var(--color-primary)] bg-[var(--color-primary)] px-5 py-3 !text-white shadow-[var(--shadow-soft)] hover:border-[var(--color-primary-strong)] hover:bg-[var(--color-primary-strong)] hover:!text-white focus-visible:!text-white active:!text-white disabled:border-[var(--color-primary)] disabled:bg-[var(--color-primary)] disabled:!text-white/88",
    secondary:
      "border-[var(--color-border)] bg-white px-5 py-3 !text-[var(--color-text)] hover:border-[var(--color-primary)] hover:bg-[var(--color-background)] hover:!text-[var(--color-text)] focus-visible:!text-[var(--color-text)] active:!text-[var(--color-text)] disabled:bg-white disabled:!text-[var(--color-muted)]",
    ghost:
      "border-transparent bg-transparent px-0 py-2 !text-[var(--color-primary)] hover:!text-[var(--color-primary-strong)] focus-visible:!text-[var(--color-primary-strong)] active:!text-[var(--color-primary-strong)] disabled:!text-[var(--color-secondary)]",
    inverse:
      "border-white bg-white px-5 py-3 !text-[var(--color-primary)] shadow-[var(--shadow-soft)] hover:border-white hover:bg-[rgba(255,255,255,0.92)] hover:!text-[var(--color-primary-strong)] focus-visible:!text-[var(--color-primary-strong)] active:!text-[var(--color-primary-strong)] disabled:border-white disabled:bg-white disabled:!text-[var(--color-primary)]/55",
    contrast:
      "border-white/28 bg-transparent px-5 py-3 !text-white hover:border-white/42 hover:bg-white/10 hover:!text-white focus-visible:!text-white active:!text-white disabled:border-white/18 disabled:!text-white/55",
  }[variant];
  const sizeClass = {
    default: "h-11",
    lg: "h-12 px-6 text-[15px]",
    sm: "h-10 px-4 text-sm",
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
