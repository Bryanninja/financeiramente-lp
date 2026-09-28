import { getTranslations } from "next-intl/server";
import DiagnosticHeroV2 from "../../components/v2/DiagnosticHeroV2";
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

import { redirect } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

export default async function DiagnosticPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  redirect(`/${locale}/questions`);
}
