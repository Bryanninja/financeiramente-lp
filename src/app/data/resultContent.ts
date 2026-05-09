// src/app/data/phaseContent.ts
interface PhaseData {
  title: string;
  description: string;
  interpretation: string;
  nextStep: string;
  nextStepDetails: string;
}

export const phaseContent: Record<number, PhaseData> = {
  1: {
    title: "Negócio no Escuro",
    description:
      "Seu negócio ainda apresenta baixa visibilidade sobre aspectos financeiros essenciais da operação. Empresas nessa fase normalmente operam com pouca clareza sobre rentabilidade, resultado e comportamento do caixa.",
    interpretation:
      "O diagnóstico indica que o negócio ainda apresenta baixa visibilidade sobre elementos financeiros essenciais da operação. Nessa fase é comum que o empresário tenha dificuldade para identificar com clareza o lucro real do negócio, prever o comportamento do caixa ou avaliar o impacto financeiro das decisões tomadas no dia a dia. A ausência de uma estrutura financeira clara pode tornar a gestão mais reativa, com decisões sendo tomadas à medida que os problemas aparecem.",
    nextStep:
      "O primeiro passo de evolução consiste em construir clareza financeira básica sobre o funcionamento do negócio.",
    nextStepDetails:
      "Isso inclui desenvolver visibilidade sobre elementos fundamentais como rentabilidade, resultado financeiro e comportamento do caixa. Organizar essas informações permite que o empresário compreenda melhor o desempenho do negócio e comece a tomar decisões com maior segurança.",
  },
  2: {
    title: "Consciência Financeira",
    description:
      "Seu negócio já demonstra alguma atenção aos números financeiros e começa a desenvolver maior clareza sobre o desempenho da empresa. No entanto, ainda pode faltar uma estrutura financeira integrada que permita transformar esses dados em decisões mais consistentes.",
    interpretation:
      "O diagnóstico indica que o negócio já apresenta algum nível de atenção aos números financeiros e começa a desenvolver maior consciência sobre o desempenho da empresa. Normalmente o empresário acompanha receitas, despesas ou resultados, mas ainda pode faltar uma estrutura integrada para decisões consistentes. Fortalecer os pilares financeiros ajudará a transformar números em ferramentas reais de gestão e apoio à tomada de decisão.",
    nextStep:
      "O próximo passo é organizar os pilares financeiros do negócio de forma mais estruturada.",
    nextStepDetails:
      "Isso significa transformar informações financeiras dispersas em um sistema mais claro de gestão, permitindo compreender melhor a rentabilidade, acompanhar o resultado financeiro e melhorar a previsibilidade do caixa. Assim, os números deixam de ser apenas registros e passam a apoiar decisões importantes do negócio.",
  },
  3: {
    title: "Estrutura Financeira",
    description:
      "Seu negócio já apresenta uma base organizada de gestão financeira e maior clareza sobre os números da operação. Isso indica que a gestão financeira já começa a apoiar decisões relevantes do negócio.",
    interpretation:
      "O diagnóstico indica que o negócio já possui uma base organizada de gestão financeira. Empresas nesse estágio geralmente já possuem processos ou ferramentas que permitem acompanhar resultados, analisar o desempenho financeiro e ter maior previsibilidade sobre o comportamento do caixa. Isso representa um nível relevante de maturidade financeira.",
    nextStep:
      "O foco agora passa a ser utilizar a estrutura financeira existente de forma cada vez mais estratégica.",
    nextStepDetails:
      "Isso envolve aprofundar a análise de rentabilidade, avaliar investimentos com maior clareza e integrar as informações financeiras às decisões de crescimento do negócio. Nesse estágio, a gestão financeira deixa de ser apenas controle e passa a atuar como instrumento de apoio à estratégia.",
  },
  4: {
    title: "Inteligência Financeira",
    description:
      "Seu negócio demonstra um nível elevado de maturidade financeira. Os números já são utilizados como ferramenta de gestão e suporte às decisões estratégicas da empresa.",
    interpretation:
      "O diagnóstico indica um nível elevado de maturidade. Nesse estágio, os números fazem parte da forma como o negócio é gerido e as informações financeiras são utilizadas como suporte para decisões estratégicas. Empresas nessa fase costumam apresentar maior clareza sobre rentabilidade, previsibilidade e capacidade de avaliar o impacto das decisões.",
    nextStep:
      "O próximo passo consiste em utilizar a estrutura financeira já existente para apoiar decisões estratégicas de longo prazo.",
    nextStepDetails:
      "Isso pode incluir avaliação de novos investimentos, planejamento de crescimento, expansão da operação e melhoria contínua da eficiência financeira do negócio, funcionando como um sistema de suporte às decisões estratégicas da empresa.",
  },
};
