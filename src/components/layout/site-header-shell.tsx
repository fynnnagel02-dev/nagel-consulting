"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { InquiryButton } from "@/components/forms/inquiry-button";
import type { NavItem } from "@/lib/navigation/site-nav";
import { cn } from "@/lib/utils/cn";
import { BrandMark } from "@/components/brand/brand-mark";
import { SiteNavLinks } from "@/components/layout/site-nav-links";
import { SiteNavMobile } from "@/components/layout/site-nav-mobile";

export function SiteHeaderShell({
  items,
  primaryLabel,
}: {
  items: NavItem[];
  primaryLabel: string;
}) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 18);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "group/header relative transition duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
        isScrolled && "translate-y-0.5",
      )}
      data-scrolled={isScrolled ? "true" : "false"}
    >
      <div
        className={cn(
          "relative flex min-h-[5.5rem] items-center justify-between gap-6 rounded-[1.75rem] border px-4 py-3 shadow-[var(--shadow-crisp)] backdrop-blur-[22px] transition duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] sm:px-5",
          isScrolled
            ? "border-[rgba(36,51,69,0.14)] bg-[rgba(255,252,247,0.92)] shadow-[0_20px_52px_rgba(27,37,50,0.16)]"
            : "border-[rgba(36,51,69,0.1)] bg-[rgba(255,252,247,0.78)] shadow-[var(--shadow-crisp)]",
        )}
      >
        <div
          className={cn(
            "pointer-events-none absolute inset-0 rounded-[inherit] transition duration-300",
            isScrolled
              ? "bg-[linear-gradient(180deg,rgba(255,255,255,0.36),rgba(255,255,255,0.08))]"
              : "bg-[linear-gradient(180deg,rgba(255,255,255,0.44),rgba(255,255,255,0.12))]",
          )}
        />
        <Link
          href="/"
          className="relative flex items-center gap-4 rounded-[1.25rem] px-2 py-1"
          aria-label="Nagel Solutions"
        >
          <div className="hidden h-11 w-px bg-[linear-gradient(180deg,transparent,var(--color-border),transparent)] sm:block" />
          <BrandMark className="origin-left scale-[0.72] sm:scale-[0.78]" compact />
        </Link>

        <nav className="relative hidden items-center gap-7 lg:flex">
          <SiteNavLinks items={items} scrolled={isScrolled} />
        </nav>

        <div className="relative hidden lg:flex">
          <InquiryButton
            size="sm"
            label={primaryLabel}
            inquiryCategory="Beratungsanfrage"
            source="header"
            className={cn(
              "min-w-[11rem]",
              isScrolled && "shadow-[0_18px_42px_rgba(23,34,48,0.18)]",
            )}
          />
        </div>

        <SiteNavMobile items={items} cta={{ href: "/kontakt", label: primaryLabel }} />
      </div>
    </div>
  );
}
