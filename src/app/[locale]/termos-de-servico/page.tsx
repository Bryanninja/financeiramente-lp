import { getTranslations } from "next-intl/server";
import LegalPage from "@/app/components/ui/LegalPage";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.TermsOfService" });

  return {
    title: t("title"),
    description: t("description"),
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function TermsOfService({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "TermsOfServicePage" });

  return (
    <LegalPage title={t("title")} lastUpdated="07 de Maio de 2026">
      <p>
        Ao acessar o site da <strong>FinanceiraMente</strong>, você concorda em
        cumprir estes termos de serviço e todas as leis e regulamentos
        aplicáveis.
      </p>

      <h2>1. Uso da Licença e Conteúdo</h2>
      <p>
        O conteúdo deste site, incluindo mas não se limitando ao{" "}
        <strong>Método FinanceiraMente</strong> e ao{" "}
        <strong>Mapa de Maturidade</strong>, é propriedade intelectual de Michel
        Stawicki. É permitida a visualização para uso pessoal e informativo,
        sendo estritamente proibida a reprodução, cópia ou venda sem autorização
        prévia por escrito.
      </p>

      <h2>2. Isenção de Responsabilidade</h2>
      <p>
        A consultoria e o diagnóstico oferecem ferramentas de auxílio na tomada
        de decisão. No entanto, os resultados financeiros de qualquer negócio
        dependem da execução por parte do empresário e de variáveis de mercado.
        A FinanceiraMente não garante lucros específicos, mas sim a entrega de
        metodologia estruturada.
      </p>

      <h2>3. Sessão Estratégica Gratuita</h2>
      <p>
        A Sessão Estratégica Gratuita é um serviço de cortesia sujeito à
        disponibilidade de agenda. O preenchimento do Diagnóstico Inicial não
        garante o agendamento imediato, e nos reservamos o direito de selecionar
        as empresas que melhor se encaixam no perfil de atendimento do
        consultor.
      </p>

      <h2>4. Modificações</h2>
      <p>
        Podemos revisar estes termos de serviço a qualquer momento para refletir
        mudanças em nossos processos internos ou na legislação vigente.
      </p>
    </LegalPage>
  );
}
