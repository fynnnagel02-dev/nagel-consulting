import { getCompanyInfo } from "@/lib/queries/public/company";
import { getFeaturedSolutions } from "@/lib/queries/public/solutions";
import { getActiveSecurityFeatures } from "@/lib/queries/public/security";
import {
  mapCompanyCtas,
  mapFeaturedSolutions,
  mapSecurityPillars,
} from "@/lib/mappers/marketing";
import { buildMetadata } from "@/lib/seo/metadata";
import { HomeHeroSection } from "@/components/sections/home/home-hero-section";
import { HomeTransformationSection } from "@/components/sections/home/home-transformation-section";
import { HomeOfferModelSection } from "@/components/sections/home/home-offer-model-section";
import { HomeDemoShowcaseSection } from "@/components/sections/home/home-demo-showcase-section";
import { HomeTrustSecuritySection } from "@/components/sections/home/home-trust-security-section";
import { HomeFinalCtaSection } from "@/components/sections/home/home-final-cta-section";

export async function generateMetadata() {
  const company = await getCompanyInfo().catch(() => null);

  return buildMetadata({
    title: "Digitale Prozessstruktur für operative Unternehmen",
    description:
      "Nagel Solutions ersetzt Excel- und papierbasierte Abläufe durch strukturierte, sichere Webanwendungen für Handwerk, Dienstleistung und operative KMU.",
    company,
  });
}

export default async function MarketingHomePage() {
  const [company, featuredSolutions, securityFeatures] = await Promise.all([
    getCompanyInfo().catch(() => null),
    getFeaturedSolutions().catch(() => null),
    getActiveSecurityFeatures().catch(() => null),
  ]);

  const ctas = mapCompanyCtas(company);

  return (
    <main>
      <HomeHeroSection primaryCta={ctas.primary} secondaryCta={ctas.secondary} />
      <HomeTransformationSection />
      <HomeOfferModelSection solutions={mapFeaturedSolutions(featuredSolutions)} />
      <HomeDemoShowcaseSection />
      <HomeTrustSecuritySection pillars={mapSecurityPillars(securityFeatures)} />
      <HomeFinalCtaSection
        primaryCta={ctas.primary}
        secondaryCta={ctas.secondary}
      />
    </main>
  );
}
