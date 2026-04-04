"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavItem } from "@/lib/navigation/site-nav";
import { cn } from "@/lib/utils/cn";

export function SiteNavLinks({
  items,
  scrolled = false,
}: {
  items: NavItem[];
  scrolled?: boolean;
}) {
  const pathname = usePathname();

  return (
    <>
      {items.map((item) => {
        const isActive =
          item.href === "/"
            ? pathname === "/"
            : pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <Link
            key={item.href}
            href={item.href}
            scroll={false}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "relative px-1 py-2 text-sm font-medium transition duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
              isActive
                ? "text-[var(--color-text)]"
                : scrolled
                  ? "text-[var(--color-muted)] hover:text-[var(--color-text)]"
                  : "text-[rgba(28,36,48,0.84)] hover:text-[var(--color-text)]",
            )}
          >
            {item.label}
            <span
              className={cn(
                "absolute inset-x-1 -bottom-0.5 h-px origin-left bg-[linear-gradient(90deg,var(--color-accent),transparent)] transition duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                isActive ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0",
              )}
            />
          </Link>
        );
      })}
    </>
  );
}
