import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import DiagnosticResultClientV2 from "../../components/v2/DiagnosticResultClientV2";

// O Next.js lê isso no servidor (SEO MONSTRO)
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.DiagnosticResult" });

  return {
    title: t("title"),
    description: t("description"),
    robots: {
      index: false, // Mantemos o sigilo dos dados do cliente
      follow: false,
    },
  };
}

export default function Page() {
  return <DiagnosticResultClientV2 />;
}
