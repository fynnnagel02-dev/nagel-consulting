"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { InquiryButton } from "@/components/forms/inquiry-button";
import type { NavItem } from "@/lib/navigation/site-nav";
import { cn } from "@/lib/utils/cn";
import { MenuIcon, XIcon } from "@/components/ui/icons";

export function SiteNavMobile({
  items,
  cta,
}: {
  items: NavItem[];
  cta: { href: string; label: string };
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-label="Navigation öffnen"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex size-11 items-center justify-center rounded-[1rem] border border-[var(--color-border)] bg-[rgba(255,252,247,0.86)] text-[var(--color-text)] shadow-[var(--shadow-crisp)] backdrop-blur"
      >
        {open ? <XIcon className="size-5" /> : <MenuIcon className="size-5" />}
      </button>
      {open ? (
        <div className="surface-panel absolute inset-x-0 top-[calc(100%+0.85rem)] rounded-[1.7rem] p-5 shadow-[var(--shadow-panel)]">
          <nav className="space-y-3">
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
                  className={cn(
                    "block rounded-[1rem] px-4 py-3 text-base font-medium transition duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    isActive
                      ? "bg-[var(--color-primary)] text-white shadow-[var(--shadow-soft)]"
                      : "text-[var(--color-text)] hover:bg-[var(--color-background-alt)]",
                  )}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="mt-5 border-t border-[var(--color-border)] pt-5">
            <InquiryButton
              className="w-full"
              label={cta.label}
              inquiryCategory="Beratungsanfrage"
              source="mobile-navigation"
              onAfterOpen={() => setOpen(false)}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
