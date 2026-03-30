"use client";

import { useCookieConsent } from "@/components/consent/cookie-consent-provider";

export function CookieSettingsTrigger() {
  const { openSettings } = useCookieConsent();

  return (
    <button
      type="button"
      onClick={openSettings}
      className="text-sm text-[var(--color-muted)] transition hover:text-[var(--color-text)]"
    >
      Cookie-Einstellungen
    </button>
  );
}
