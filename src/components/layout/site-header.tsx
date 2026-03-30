import Image from "next/image";
import Link from "next/link";
import { InquiryButton } from "@/components/forms/inquiry-button";
import { getCompanyInfo } from "@/lib/queries/public/company";
import { mapCompanyCtas } from "@/lib/mappers/marketing";
import { primaryNavigation } from "@/lib/navigation/site-nav";
import { Container } from "@/components/layout/container";
import { SiteNavMobile } from "@/components/layout/site-nav-mobile";

export async function SiteHeader() {
  const company = await getCompanyInfo().catch(() => null);
  const { primary } = mapCompanyCtas(company);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[rgba(248,250,252,0.88)] backdrop-blur">
      <Container className="relative">
        <div className="flex h-20 items-center justify-between gap-6">
          <Link
            href="/"
            className="flex items-center"
            aria-label="Nagel Solutions"
          >
            <Image
              src="/logo.jpeg"
              alt="Nagel Solutions"
              width={180}
              height={44}
              priority
              className="h-16 w-auto object-contain sm:h-17"
            />
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {primaryNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                scroll={false}
                className="text-sm font-medium text-[var(--color-muted)] transition hover:text-[var(--color-text)]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex">
            <InquiryButton
              size="sm"
              label={primary.label}
              inquiryCategory="Beratungsanfrage"
              source="header"
            />
          </div>

          <SiteNavMobile items={primaryNavigation} cta={primary} />
        </div>
      </Container>
    </header>
  );
}
