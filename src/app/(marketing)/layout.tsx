import type { ReactNode } from "react";
import { InquiryModalProvider } from "@/components/forms/inquiry-modal-provider";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { RouteChangeIndicator } from "@/components/layout/route-change-indicator";
import { RouteTransitionShell } from "@/components/layout/route-transition-shell";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <InquiryModalProvider>
      <RouteChangeIndicator />
      <SiteHeader />
      <RouteTransitionShell>{children}</RouteTransitionShell>
      <SiteFooter />
    </InquiryModalProvider>
  );
}
