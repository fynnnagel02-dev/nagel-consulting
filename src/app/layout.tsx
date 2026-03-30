import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Playfair_Display } from "next/font/google";
import { AnalyticsGate } from "@/components/consent/analytics-gate";
import { CookieBanner } from "@/components/consent/cookie-banner";
import { CookieConsentProvider } from "@/components/consent/cookie-consent-provider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
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
    <html lang="de" className={`${inter.variable} ${playfair.variable}`}>
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
