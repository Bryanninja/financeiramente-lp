import { Metadata } from "next";
import DiagnosticResultClient from "./DiagnosticResultClient";

// O Next.js lê isso no servidor (SEO MONSTRO)
export const metadata: Metadata = {
  title: "Seu Relatório de Maturidade | FinanceiraMente",
  description: "Análise detalhada da estrutura financeira do seu negócio.",
  robots: {
    index: false, // Mantemos o sigilo dos dados do cliente
    follow: false,
  },
};

export default function Page() {
  return <DiagnosticResultClient />;
}
