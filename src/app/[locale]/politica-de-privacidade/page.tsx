import { getTranslations } from "next-intl/server";
import LegalPage from "@/app/components/ui/LegalPage"; // Importe o componente de estrutura que criamos

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.PrivacyPolicy" });

  return {
    title: t("title"),
    description: t("description"),
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function PrivacyPolicy({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "PrivacyPolicyPage" });

  return (
    <LegalPage title={t("title")} lastUpdated="07 de Maio de 2026">
      <p>
        A <strong>FinanceiraMente</strong>, sob liderança de Michel Stawicki,
        tem como compromisso a transparência e a proteção dos dados de seus
        usuários. Esta política descreve como coletamos e protegemos suas
        informações.
      </p>

      <h2>1. Coleta de Informações</h2>
      <p>
        Coletamos informações fornecidas voluntariamente por você ao preencher o{" "}
        <strong>Diagnóstico de Maturidade Financeira</strong> ou ao agendar uma{" "}
        <strong>Sessão Estratégica gratuita</strong>. Isso inclui:
      </p>
      <ul>
        <li>Dados de identificação (Nome, E-mail, Telefone);</li>
        <li>
          Dados empresariais (Nome da empresa, faturamento estimado, número de
          colaboradores);
        </li>
        <li>
          Informações sobre desafios e gargalos financeiros da sua operação.
        </li>
      </ul>

      <h2>2. Finalidade do Tratamento de Dados</h2>
      <p>
        Seus dados não são vendidos ou compartilhados com terceiros. Eles são
        utilizados exclusivamente para:
      </p>
      <ul>
        <li>Gerar o seu perfil no Mapa de Maturidade Financeira;</li>
        <li>Personalizar a consultoria e a Sessão Estratégica gratuita;</li>
        <li>
          Enviar comunicações relevantes sobre gestão financeira e novos
          serviços.
        </li>
      </ul>

      <h2>3. Segurança e Confidencialidade</h2>
      <p>
        Entendemos a sensibilidade dos dados financeiros. Utilizamos protocolos
        de segurança avançados e armazenamento criptografado para evitar acessos
        não autorizados ou uso indevido das suas informações.
      </p>

      <h2>4. Seus Direitos (LGPD)</h2>
      <p>
        Em conformidade com a Lei Geral de Proteção de Dados (LGPD), você tem o
        direito de acessar, corrigir ou solicitar a exclusão total de seus dados
        de nossa base a qualquer momento, bastando entrar em contato via e-mail
        oficial.
      </p>
    </LegalPage>
  );
}
