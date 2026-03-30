"use client";

import Link from "next/link";
import { useCookieConsent } from "@/components/consent/cookie-consent-provider";

export function CookieBanner() {
  const { isReady, isBannerOpen, accept, decline } = useCookieConsent();

  if (!isReady || !isBannerOpen) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[70] p-4">
      <div className="pointer-events-auto mx-auto max-w-5xl rounded-[28px] border border-[var(--color-border)] bg-white/96 px-5 py-4 shadow-[var(--shadow-panel)] backdrop-blur sm:px-6 sm:py-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-primary)]">
              Cookies & Datenschutz
            </p>
            <p className="text-sm leading-7 text-[var(--color-muted)]">
              Diese Website verwendet technisch notwendige Funktionen sowie -
              nach Ihrer Einwilligung - datenschutzfreundliche
              Analysefunktionen.
            </p>
            <Link
              href="/datenschutz"
              className="inline-flex text-sm font-medium text-[var(--color-primary)] transition hover:text-[var(--color-primary-strong)]"
            >
              Datenschutzerklärung
            </Link>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={decline}
              className="inline-flex h-11 items-center justify-center rounded-full border border-[var(--color-border)] bg-white px-5 text-sm font-medium text-[var(--color-text)] transition hover:border-[var(--color-primary)] hover:bg-[var(--color-background)]"
            >
              Ablehnen
            </button>
            <button
              type="button"
              onClick={accept}
              className="inline-flex h-11 items-center justify-center rounded-full border border-[var(--color-primary)] bg-[var(--color-primary)] px-5 text-sm font-medium text-white transition hover:border-[var(--color-primary-strong)] hover:bg-[var(--color-primary-strong)]"
            >
              Akzeptieren
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
