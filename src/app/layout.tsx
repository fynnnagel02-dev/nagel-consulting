import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Cormorant_Garamond, IBM_Plex_Sans } from "next/font/google";
import { AnalyticsGate } from "@/components/consent/analytics-gate";
import { CookieBanner } from "@/components/consent/cookie-banner";
import { CookieConsentProvider } from "@/components/consent/cookie-consent-provider";
import "./globals.css";

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nagel Solutions",
  description:
    "Nagel Solutions digitalisiert operative Abläufe mit strukturierten, sicheren Webanwendungen für Handwerk, Service und mittelständische Unternehmen.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="de" className={`${ibmPlexSans.variable} ${cormorantGaramond.variable}`}>
      <body>
        <CookieConsentProvider>
          {children}
          <CookieBanner />
          <AnalyticsGate />
        </CookieConsentProvider>
      </body>
    </html>
  );
}
