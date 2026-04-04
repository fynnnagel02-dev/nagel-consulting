import { getCompanyInfo } from "@/lib/queries/public/company";
import { mapCompanyCtas } from "@/lib/mappers/marketing";
import { primaryNavigation } from "@/lib/navigation/site-nav";
import { Container } from "@/components/layout/container";
import { SiteHeaderShell } from "@/components/layout/site-header-shell";

export async function SiteHeader() {
  const company = await getCompanyInfo().catch(() => null);
  const { primary } = mapCompanyCtas(company);

  return (
    <header className="sticky top-0 z-40 pt-4">
      <Container className="relative">
        <SiteHeaderShell items={primaryNavigation} primaryLabel={primary.label} />
      </Container>
    </header>
  );
}
