import type { Metadata, Viewport } from "next";
import "../globals.css";
import ScrollToTop from "../components/ui/ScrollToTop";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import LanguageDetector from "../components/ui/LanguageDetector";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";

export function generateStaticParams() {
  return [{ locale: "pt" }, { locale: "en" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.Home" });

  return {
    metadataBase: new URL("https://msfinanceiramente.com"),
    title: {
      default: t("title"),
      template: "%s | FinanceiraMente",
    },
    description: t("description"),
    keywords: [
      "mentoria financeira",
      "sessão estratégica",
      "Michel Stawicki",
      "consultoria financeira empresarial",
      "estratégia de negócios",
      "gestão de caixa",
      "lucratividade B2B",
    ],
    authors: [{ name: "Michel Stawicki" }],
    creator: "Albry Studio",
    openGraph: {
      type: "website",
      locale: locale === "pt" ? "pt_BR" : "en_US",
      url: "https://msfinanceiramente.com",
      siteName: "FinanceiraMente",
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Michel Stawicki - Sessão Estratégica FinanceiraMente",
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      languages: {
        pt: "/pt",
        en: "/en",
      },
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  width: "device-width",
  initialScale: 1,
};

import LanguageSwitcher from "../components/ui/LanguageSwitcher";

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();

  const t = await getTranslations({ locale, namespace: "Metadata.Home" });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "FinanceiraMente - Michel Stawicki",
    image: "https://msfinanceiramente.com/og-image.jpg",
    description: t("description"),
    founder: {
      "@type": "Person",
      name: "Michel Stawicki",
      jobTitle: "Estrategista Financeiro",
    },
    url: "https://msfinanceiramente.com/",
    address: {
      "@type": "PostalAddress",
      addressCountry: "BR",
    },
  };

  return (
    <html lang={locale === "pt" ? "pt-BR" : "en"}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <LanguageDetector locale={locale} />
          <LanguageSwitcher locale={locale} />
          <ScrollToTop />
          {children}
        </NextIntlClientProvider>

        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || "G-C6LVTYZ5ES"} />
      </body>
    </html>
  );
}
