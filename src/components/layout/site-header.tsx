import Link from "next/link";
import { getCompanyInfo } from "@/lib/queries/public/company";
import { mapCompanyCtas } from "@/lib/mappers/marketing";
import { primaryNavigation } from "@/lib/navigation/site-nav";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { SiteNavMobile } from "@/components/layout/site-nav-mobile";

export async function SiteHeader() {
  const company = await getCompanyInfo().catch(() => null);
  const { primary } = mapCompanyCtas(company);
  const companyName = company?.company_name ?? "Nagel Consulting";

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[rgba(248,250,252,0.88)] backdrop-blur">
      <Container className="relative">
        <div className="flex h-20 items-center justify-between gap-6">
          <Link href="/" className="min-w-0">
            <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--color-primary)]">
              Nagel Consulting
            </div>
            <div className="truncate text-base font-semibold text-[var(--color-text)] sm:text-lg">
              {companyName}
            </div>
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
            <Button asChild size="sm">
              <Link href={primary.href} scroll={false}>{primary.label}</Link>
            </Button>
          </div>

          <SiteNavMobile items={primaryNavigation} cta={primary} />
        </div>
      </Container>
    </header>
  );
}
