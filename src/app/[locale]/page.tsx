import { getTranslations } from "next-intl/server";
import Hero2 from "../components/sections/Hero2";
import ProblemSection from "../components/sections/ProblemSection";
import ProblemReal from "../components/sections/ProblemReal";
import MaturityMap from "../components/sections/MaturityMap";
import Methodology from "../components/sections/Methodology";
import MethodSteps from "../components/sections/MethodSteps";
import Experience from "../components/sections/Experience";
import FinalCTA from "../components/sections/FinalCTA";
import Footer from "../components/sections/Footer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.Home" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

import { setRequestLocale } from "next-intl/server";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <Hero2 />
      <ProblemSection />
      <ProblemReal />
      <MaturityMap />
      <Methodology />
      <MethodSteps />
      <Experience />
      <FinalCTA />
      <Footer />
    </main>
  );
}
