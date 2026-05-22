import LegalPage from "@/app/components/ui/LegalPage";

export default function CookiePolicy() {
  return (
    <LegalPage
      title="Configurações de Cookies"
      lastUpdated="07 de Maio de 2026"
    >
      <p>
        Utilizamos cookies para melhorar sua experiência de navegação e entender
        como você interage com nossa plataforma de consultoria financeira.
      </p>

      <h2>1. O que são cookies?</h2>
      <p>
        Cookies são pequenos arquivos de texto enviados para o seu navegador
        quando você visita nosso site. Eles nos ajudam a lembrar de suas
        preferências e a otimizar o carregamento das páginas.
      </p>

      <h2>2. Como utilizamos os cookies?</h2>
      <ul>
        <li>
          <strong>Cookies Essenciais:</strong> Necessários para o funcionamento
          básico do site e do formulário de diagnóstico.
        </li>
        <li>
          <strong>Cookies de Desempenho:</strong> Coletam dados anônimos sobre
          quais páginas são mais visitadas, ajudando-nos a melhorar o conteúdo
          para os empresários.
        </li>
        <li>
          <strong>Cookies de Marketing:</strong> Utilizados para medir a
          eficácia de nossos anúncios e campanhas de tráfego pago.
        </li>
      </ul>

      <h2>3. Como gerenciar cookies</h2>
      <p>
        Você pode optar por desativar os cookies nas configurações do seu
        navegador. No entanto, lembre-se que isso pode desativar certas
        funcionalidades deste site, como a progressão salva no seu diagnóstico
        financeiro.
      </p>
    </LegalPage>
  );
}
