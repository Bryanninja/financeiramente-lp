import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ScrollToTop from "./components/ui/ScrollToTop";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "FinanceiraMente | Estruture seu Negócio e Cresça com Segurança",
  description:
    "Empresas raramente quebram por falta de vendas, mas por falta de estrutura financeira. Agende sua Sessão Estratégica FinanceiraMente e transforme números em decisões claras.", //
  keywords: [
    "Sessão Estratégica FinanceiraMente",
    "estruturar negócio financeiramente",
    "Michel Stawicki",
    "lucro real da operação",
    "consultoria financeira",
    "crescimento de pequenas empresas",
  ],
  authors: [{ name: "FinanceiraMente" }],
  openGraph: {
    title: "FinanceiraMente | O Método para Estruturar seu Negócio",
    description:
      "O problema raramente é vender. O problema é crescer com estrutura. Descubra onde o seu negócio ganha dinheiro e garanta caixa para expandir.", //[cite: 3]
    url: "https://financeiramente.com.br",
    siteName: "FinanceiraMente",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      {/* O fundo padrão será o claro (#FAF9F6) e o texto escuro (#121212) */}
      <body
        className={`${inter.variable} font-sans antialiased bg-light-DEFAULT text-dark-DEFAULT`}
      >
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}
