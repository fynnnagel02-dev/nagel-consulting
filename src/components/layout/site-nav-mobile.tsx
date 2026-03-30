"use client";

import { useState } from "react";
import Link from "next/link";
import { InquiryButton } from "@/components/forms/inquiry-button";
import type { NavItem } from "@/lib/navigation/site-nav";
import { MenuIcon, XIcon } from "@/components/ui/icons";

export function SiteNavMobile({
  items,
  cta,
}: {
  items: NavItem[];
  cta: { href: string; label: string };
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-label="Navigation öffnen"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex size-11 items-center justify-center rounded-full border border-[var(--color-border)] bg-white text-[var(--color-text)]"
      >
        {open ? <XIcon className="size-5" /> : <MenuIcon className="size-5" />}
      </button>
      {open ? (
        <div className="absolute inset-x-5 top-[88px] rounded-[28px] border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-panel)]">
          <nav className="space-y-3">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                scroll={false}
                className="block rounded-[16px] px-3 py-2 text-base font-medium text-[var(--color-text)] transition hover:bg-[var(--color-background-alt)]"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-6">
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
