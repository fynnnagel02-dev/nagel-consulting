import Link from "next/link";
import { getCompanyInfo } from "@/lib/queries/public/company";
import { footerNavigation } from "@/lib/navigation/site-nav";
import { Container } from "@/components/layout/container";

export async function SiteFooter() {
  const company = await getCompanyInfo().catch(() => null);
  const companyName = company?.company_name ?? "Nagel Consulting";

  return (
    <footer className="border-t border-[var(--color-border)] bg-white py-16">
      <Container>
        <div className="grid gap-10 border-b border-[var(--color-border)] pb-10 md:grid-cols-2 lg:grid-cols-[1.7fr,1fr,1fr,1fr] lg:gap-12 lg:items-start">
          <div className="space-y-5">
            <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--color-primary)]">
              Unternehmen
            </div>
            <div className="space-y-4">
              <h2 className="font-display text-2xl text-[var(--color-text)]">
                {companyName}
              </h2>
              <p className="max-w-sm text-sm leading-7 text-[var(--color-muted)]">
                Strukturierte, sichere Webanwendungen für Unternehmen, deren
                Prozesse im Alltag zuverlässig funktionieren müssen.
              </p>
            </div>
            <ul className="space-y-3 text-sm text-[var(--color-muted)]">
              {company?.primary_email ? <li>{company.primary_email}</li> : null}
              {company?.primary_phone ? <li>{company.primary_phone}</li> : null}
              {company?.city ? <li>{company.city}</li> : null}
            </ul>
          </div>

          <FooterGroup title="Leistungen" items={footerNavigation.leistungen} />
          <FooterGroup title="Unternehmen" items={footerNavigation.unternehmen} />
          <FooterGroup title="Rechtliches" items={footerNavigation.rechtliches} />
        </div>

        <div className="mt-6 flex flex-col gap-3 text-sm text-[var(--color-muted)] sm:flex-row sm:items-center sm:justify-between">
          <p>{companyName}</p>
          <p>Digitale Arbeitsabläufe für Handwerk, Service und operative KMU.</p>
        </div>
      </Container>
    </footer>
  );
}

function FooterGroup({
  title,
  items,
}: {
  title: string;
  items: Array<{ href: string; label: string }>;
}) {
  return (
    <div className="space-y-5">
      <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-primary)]">
        {title}
      </h3>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              scroll={false}
              className="text-sm text-[var(--color-muted)] transition hover:text-[var(--color-text)]"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
