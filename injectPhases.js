const fs = require('fs');
const ptPath = 'd:/Projects/Financeiramente/financeiramente-lp/messages/pt.json';
const enPath = 'd:/Projects/Financeiramente/financeiramente-lp/messages/en.json';
const pt = JSON.parse(fs.readFileSync(ptPath, 'utf8'));
const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));

const phasesPT = {
  '1': {
    title: 'Negócio no Escuro',
    description: 'Seu negócio ainda apresenta baixa visibilidade sobre aspectos financeiros essenciais da operação.\n\nEmpresas nessa fase normalmente operam com pouca clareza sobre rentabilidade, resultado e comportamento do caixa.',
    interpretation: 'O diagnóstico indica que o negócio ainda apresenta baixa visibilidade sobre elementos financeiros essenciais da operação. Nessa fase é comum que o empresário tenha dificuldade para identificar com clareza o lucro real do negócio, prever o comportamento do caixa ou avaliar o impacto financeiro das decisões tomadas no dia a dia.\n\nIsso não significa necessariamente que o negócio esteja em dificuldade. Muitas empresas passam por esse estágio durante seu desenvolvimento.\n\nNo entanto, a ausência de uma estrutura financeira clara pode tornar a gestão mais reativa, com decisões sendo tomadas à medida que os problemas aparecem.',
    nextStep: 'O primeiro passo de evolução consiste em construir clareza financeira básica sobre o funcionamento do negócio.',
    nextStepDetails: 'Isso inclui desenvolver visibilidade sobre elementos fundamentais como rentabilidade, resultado financeiro e comportamento do caixa.\n\nOrganizar essas informações permite que o empresário compreenda melhor o desempenho do negócio e comece a tomar decisões com maior segurança.\n\nA partir dessa base inicial, torna-se possível estruturar gradualmente uma gestão financeira mais consistente.'
  },
  '2': {
    title: 'Consciência Financeira',
    description: 'Seu negócio já demonstra alguma atenção aos números financeiros e começa a desenvolver maior clareza sobre o desempenho da empresa.\n\nNo entanto, ainda pode faltar uma estrutura financeira integrada que permita transformar esses dados em decisões mais consistentes.',
    interpretation: 'O diagnóstico indica que o negócio já apresenta algum nível de atenção aos números financeiros e começa a desenvolver maior consciência sobre o desempenho da empresa. Nessa fase o empresário normalmente acompanha receitas, despesas ou resultados, mas ainda pode faltar uma estrutura financeira integrada que permita transformar essas informações em decisões mais claras e consistentes.\n\nEsse estágio representa uma transição importante entre uma gestão financeira mais intuitiva e uma gestão financeira estruturada.\n\nFortalecer os pilares financeiros do negócio ajuda a transformar os números em ferramentas reais de gestão e apoio à tomada de decisão.',
    nextStep: 'O próximo passo é organizar os pilares financeiros do negócio de forma mais estruturada.',
    nextStepDetails: 'Isso significa transformar informações financeiras dispersas em um sistema mais claro de gestão, permitindo compreender melhor a rentabilidade, acompanhar o resultado financeiro e melhorar a previsibilidade do caixa.\n\nQuando esses elementos passam a funcionar de forma integrada, os números deixam de ser apenas registros e passam a apoiar decisões importantes do negócio.'
  },
  '3': {
    title: 'Estrutura Financeira',
    description: 'Seu negócio já apresenta uma base organizada de gestão financeira e maior clareza sobre os números da operação.\n\nIsso indica que a gestão financeira já começa a apoiar decisões relevantes do negócio.',
    interpretation: 'O diagnóstico indica que o negócio já possui uma base organizada de gestão financeira e maior clareza sobre os números da operação. Empresas nesse estágio geralmente já possuem processos ou ferramentas que permitem acompanhar resultados, analisar o desempenho financeiro e ter maior previsibilidade sobre o comportamento do caixa.\n\nIsso representa um nível relevante de maturidade financeira.\n\nO próximo passo é utilizar essa estrutura de forma cada vez mais estratégica, permitindo que as informações financeiras apoiem decisões de crescimento, investimento e expansão do negócio.',
    nextStep: 'O foco agora passa a ser utilizar a estrutura financeira existente de forma cada vez mais estratégica.',
    nextStepDetails: 'Isso envolve aprofundar a análise de rentabilidade, avaliar investimentos com maior clareza e integrar as informações financeiras às decisões de crescimento do negócio.\n\nNesse estágio, a gestão financeira deixa de ser apenas controle e passa a atuar como um instrumento de apoio à estratégia da empresa.'
  },
  '4': {
    title: 'Inteligência Financeira',
    description: 'Seu negócio demonstra um nível elevado de maturidade financeira.\n\nOs números já são utilizados como ferramenta de gestão e suporte às decisões estratégicas da empresa.',
    interpretation: 'O diagnóstico indica que o negócio apresenta um nível elevado de maturidade financeira. Nesse estágio, os números já fazem parte da forma como o negócio é gerido e as informações financeiras são utilizadas como suporte para decisões estratégicas.\n\nEmpresas nessa fase costumam apresentar maior clareza sobre rentabilidade, previsibilidade financeira e capacidade de avaliar o impacto das decisões do negócio.\n\nA gestão financeira passa a atuar não apenas como controle, mas como um sistema de suporte à estratégia e ao crescimento da empresa.',
    nextStep: 'O próximo passo consiste em utilizar a estrutura financeira já existente para apoiar decisões estratégicas de longo prazo.',
    nextStepDetails: 'Isso pode incluir avaliação de novos investimentos, planejamento de crescimento, expansão da operação e melhoria contínua da eficiência financeira do negócio.\n\nNesse estágio, a gestão financeira funciona como um sistema de suporte às decisões estratégicas da empresa.'
  }
};

const phasesEN = {
  '1': {
    title: 'Business in the Dark',
    description: 'Your business still has low visibility on essential financial aspects of the operation.\n\nCompanies in this phase usually operate with little clarity about profitability, results, and cash flow behavior.',
    interpretation: 'The diagnosis indicates that the business still has low visibility on essential financial elements of the operation. At this stage, it is common for the entrepreneur to have difficulty clearly identifying the real profit of the business, predicting cash flow behavior, or evaluating the financial impact of day-to-day decisions.\n\nThis does not necessarily mean that the business is in trouble. Many companies go through this stage during their development.\n\nHowever, the lack of a clear financial structure can make management more reactive, with decisions being made as problems arise.',
    nextStep: 'The first evolutionary step consists of building basic financial clarity about how the business operates.',
    nextStepDetails: 'This includes developing visibility on fundamental elements such as profitability, financial results, and cash flow behavior.\n\nOrganizing this information allows the entrepreneur to better understand the performance of the business and start making decisions with greater security.\n\nFrom this initial base, it becomes possible to gradually structure more consistent financial management.'
  },
  '2': {
    title: 'Financial Awareness',
    description: 'Your business already shows some attention to financial numbers and is starting to develop greater clarity about the company\'s performance.\n\nHowever, an integrated financial structure that allows these data to be transformed into more consistent decisions may still be lacking.',
    interpretation: 'The diagnosis indicates that the business already has some level of attention to financial numbers and is beginning to develop greater awareness of the company\'s performance. At this stage, the entrepreneur usually monitors revenue, expenses, or results, but there may still be a lack of an integrated financial structure that allows this information to be transformed into clearer and more consistent decisions.\n\nThis stage represents an important transition between a more intuitive financial management and structured financial management.\n\nStrengthening the financial pillars of the business helps to transform numbers into real tools for management and decision support.',
    nextStep: 'The next step is to organize the financial pillars of the business in a more structured way.',
    nextStepDetails: 'This means transforming scattered financial information into a clearer management system, allowing a better understanding of profitability, monitoring financial results, and improving cash predictability.\n\nWhen these elements begin to work in an integrated manner, the numbers cease to be mere records and begin to support important business decisions.'
  },
  '3': {
    title: 'Financial Structure',
    description: 'Your business already has an organized foundation of financial management and greater clarity about the operation\'s numbers.\n\nThis indicates that financial management is beginning to support relevant business decisions.',
    interpretation: 'The diagnosis indicates that the business already has an organized financial management foundation and greater clarity about the operation\'s numbers. Companies at this stage generally already have processes or tools that allow them to track results, analyze financial performance, and have greater predictability over cash behavior.\n\nThis represents a relevant level of financial maturity.\n\nThe next step is to use this structure increasingly strategically, allowing financial information to support business growth, investment, and expansion decisions.',
    nextStep: 'The focus now shifts to using the existing financial structure increasingly strategically.',
    nextStepDetails: 'This involves deepening the analysis of profitability, evaluating investments more clearly, and integrating financial information into business growth decisions.\n\nAt this stage, financial management ceases to be just control and acts as an instrument to support the company\'s strategy.'
  },
  '4': {
    title: 'Financial Intelligence',
    description: 'Your business demonstrates a high level of financial maturity.\n\nThe numbers are already used as a management tool and to support the company\'s strategic decisions.',
    interpretation: 'The diagnosis indicates that the business has a high level of financial maturity. At this stage, numbers are already part of how the business is managed and financial information is used as support for strategic decisions.\n\nCompanies in this phase usually have greater clarity about profitability, financial predictability, and the ability to evaluate the impact of business decisions.\n\nFinancial management acts not only as control but as a support system for the strategy and growth of the company.',
    nextStep: 'The next step is to use the existing financial structure to support long-term strategic decisions.',
    nextStepDetails: 'This can include evaluating new investments, planning growth, expanding the operation, and continuously improving the business\'s financial efficiency.\n\nAt this stage, financial management works as a support system for the company\'s strategic decisions.'
  }
};

pt.Phases = phasesPT;
en.Phases = phasesEN;

fs.writeFileSync(ptPath, JSON.stringify(pt, null, 2));
fs.writeFileSync(enPath, JSON.stringify(en, null, 2));

console.log("Phases injected!");
