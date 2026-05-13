import DiagnosticHero from "@/app/components/sections/DiagnosticHero";
import DiagnosticInfo from "@/app/components/sections/DiagnosticInfo";
import Footer from "@/app/components/sections/Footer";
import Header from "../components/sections/Header";

export const metadata = {
  title: "Diagnóstico de Maturidade Financeira",
  description:
    "Responda a 12 perguntas rápidas e descubra em qual fase de maturidade seu negócio se encontra. Receba seu relatório em tempo real.",
  openGraph: {
    title: "Diagnóstico de Maturidade Financeira | FinanceiraMente",
    description: "Avalie a saúde financeira da sua empresa agora.",
    images: ["/og-image.jpg"],
  },
};

export default function DiagnosticPage() {
  return (
    <main className="bg-light">
      <Header />
      <DiagnosticHero />
      <DiagnosticInfo />
      <Footer />
    </main>
  );
}
