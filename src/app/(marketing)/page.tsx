import { getCompanyInfo } from "@/lib/queries/public/company";
import { getFeaturedSolutions } from "@/lib/queries/public/solutions";
import { mapFeaturedSolutions } from "@/lib/mappers/marketing";
import { buildMetadata } from "@/lib/seo/metadata";
import { HomeHeroSection } from "@/components/sections/home/home-hero-section";
import { HomeDemoShowcaseSection } from "@/components/sections/home/home-demo-showcase-section";
import { HomeTransformationSection } from "@/components/sections/home/home-transformation-section";
import { HomeOfferModelSection } from "@/components/sections/home/home-offer-model-section";
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
  const featuredSolutions = await getFeaturedSolutions().catch(() => null);

  return (
    <main>
      <HomeHeroSection />
      <HomeDemoShowcaseSection />
      <HomeTransformationSection />
      <HomeOfferModelSection solutions={mapFeaturedSolutions(featuredSolutions)} />
      <HomeFinalCtaSection />
    </main>
  );
}
