import { getTranslations } from "next-intl/server";
import DiagnosticHero from "../../components/sections/DiagnosticHero";
import DiagnosticInfo from "../../components/sections/DiagnosticInfo";
import Footer from "../../components/sections/Footer";
import Header from "../../components/sections/Header";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.Diagnostic" });

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      images: ["/og-image.jpg"],
    },
  };
}

import { setRequestLocale } from "next-intl/server";

export default async function DiagnosticPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="bg-light">
      <Header />
      <DiagnosticHero />
      <DiagnosticInfo />
      <Footer />
    </main>
  );
}
