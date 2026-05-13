import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://msfinanceiramente.com"),
  title: {
    default: "FinanceiraMente | Sessão Estratégica com Michel Stawicki",
    template: "%s | FinanceiraMente",
  },
  description:
    "Mentoria financeira estratégica para empresários. Estruture seu negócio para o crescimento e tome decisões com clareza sob a orientação de Michel Stawicki.",
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
    locale: "pt_BR",
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
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "FinanceiraMente - Michel Stawicki",
    image: "https://msfinanceiramente.com/og-image.jpg",
    description:
      "Mentoria e estruturação financeira estratégica para empresas. Transforme sua gestão com Michel Stawicki.",
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
    <html lang="pt-BR">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
