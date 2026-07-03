<div align="center">
  <img src="https://i.imgur.com/GNVW4g9.png" alt="FinanceiraMente Logo" width="250" />

  # FinanceiraMente
  **B2B Financial Diagnostic Platform**

  A modern, high-performance web application designed to assess and elevate the financial maturity of businesses through interactive diagnostics and automated strategic reports.

  <p align="center">
    <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
  </p>
</div>

---

## 🎯 Sobre o Projeto

O **FinanceiraMente** soluciona o problema da falta de clareza financeira enfrentada por pequenas e médias empresas. Muitos empreendedores tomam decisões baseadas na intuição devido à falta de estruturação dos números do seu negócio. 

Esta aplicação atua como um consultor interativo:
1. O usuário responde a um **diagnóstico financeiro** dinâmico (gamificado).
2. O sistema calcula a pontuação em 4 pilares fundamentais: Rentabilidade, Resultado, Caixa e Retorno sobre Investimento (ROI).
3. Ao final, a plataforma gera um relatório de maturidade financeira personalizado e envia um e-mail transacional automatizado contendo o "Próximo Passo de Evolução".

---

## 🏗️ Arquitetura e Features

Desenvolvido com foco absoluto em **Performance, SEO e UX**, o projeto conta com:

- **Next.js (App Router):** Arquitetura moderna com Server Components para máximo desempenho de carregamento.
- **i18n Internacionalização:** Suporte fluído a múltiplos idiomas (PT-BR e EN-US) detectados e gerenciados via `next-intl`.
- **Animações Fluidas:** Transições de tela e feedbacks visuais construídos com `framer-motion` para reter a atenção do lead.
- **Integração de E-mails (Resend API):** Disparo em tempo-real de relatórios HTML formatados e otimizados, processados via backend (PHP/Next).
- **Rastreamento Avançado:** Injeção otimizada do ecossistema de marketing com **Google Analytics (GA4)** e **Meta Pixel** para rastreamento preciso de conversões (Eventos de Lead).
- **UI Responsiva e Acessível:** Interface desenvolvida mobile-first com Tailwind CSS garantindo consistência em qualquer dispositivo.

---

## 🚀 Como Rodar Localmente

Siga os passos abaixo para testar a aplicação em seu ambiente:

### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/financeiramente-lp.git
cd financeiramente-lp
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure as Variáveis de Ambiente
Crie um arquivo `.env.local` na raiz do projeto com as chaves necessárias (consulte `.env.example` se disponível):
```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
RESEND_API_KEY=re_XXXXXXXXXXXXXX
```

### 4. Inicie o Servidor de Desenvolvimento
```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

---

<div align="center">
  <i>"Transformando números dispersos em ferramentas reais de gestão."</i><br>
  Desenvolvido com excelência técnica e foco em resultados.
</div>
