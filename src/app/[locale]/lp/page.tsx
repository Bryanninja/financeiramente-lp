import { getTranslations, setRequestLocale } from "next-intl/server";
import LPHeader from "../../components/lp/LPHeader";
import LPVideoView from "../../components/lp/LPVideoView";
import LPFooter from "../../components/lp/LPFooter";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.LP" });

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      images: ["/og-image.jpg"],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LPPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="bg-[#F8F7F5] min-h-screen flex flex-col justify-between">
      <LPHeader />
      <LPVideoView />
      <LPFooter />
    </main>
  );
}
