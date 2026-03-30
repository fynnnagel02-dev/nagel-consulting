"use client";

import { Analytics } from "@vercel/analytics/next";
import { useCookieConsent } from "@/components/consent/cookie-consent-provider";

export function AnalyticsGate() {
  const { consent, isReady } = useCookieConsent();

  if (!isReady || consent !== "accepted") {
    return null;
  }

  return <Analytics />;
}
