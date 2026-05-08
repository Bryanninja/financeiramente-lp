"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Container from "../ui/Container";
import Button from "../ui/Button";
import { variants, viewportConfig } from "@/app/lib/animations";

// Imagens
import Fase1Img from "../../assets/img/fase-1.webp";
import Fase2Img from "../../assets/img/fase-2.webp";
import Fase3Img from "../../assets/img/fase-3.webp";
import Fase4Img from "../../assets/img/fase-4.webp";

const phases = [
  {
    number: 1,
    title: "NEGÓCIO NO ESCURO",
    description:
      "O empresário trabalha muito, mas não tem clareza real sobre os números do negócio. Decisões são tomadas no feeling e o caixa frequentemente gera preocupação.",
    image: Fase1Img,
  },
  {
    number: 2,
    title: "CONSCIÊNCIA",
    description:
      "O empresário começa a olhar para receitas, custos e despesas, mas ainda sem uma estrutura financeira consistente. Os números existem, mas ainda não orientam o negócio.",
    image: Fase2Img,
  },
  {
    number: 3,
    title: "ESTRUTURA",
    description:
      "O negócio passa a ter processos, controles e indicadores que permitem acompanhar o desempenho financeiro com mais clareza. A gestão financeira começa a se organizar.",
    image: Fase3Img,
  },
  {
    number: 4,
    title: "INTELIGÊNCIA",
    description:
      "Os números deixam de ser apenas controle. Eles passam a orientar decisões estratégicas de crescimento, investimento e expansão.",
    image: Fase4Img,
  },
];

const benefits = [
  "Sua fase no Mapa de Maturidade Financeira FinanceiraMente",
  "O Radar FinanceiraMente, que mostra a estrutura financeira da empresa",
  "Um relatório de maturidade com os próximos passos para a evolução.",
  "Avaliação dos 4 pilares financeiros do negócio.",
];

export default function MaturityMap() {
  return (
    <section id="mapa" className="bg-dark py-24 md:py-32 overflow-hidden">
      <Container className="space-y-20">
        {/* Header da Secção */}
        <motion.div
          variants={variants.staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={viewportConfig}
          className="text-center max-w-4xl mx-auto space-y-6"
        >
          <motion.div
            variants={variants.fadeInUp}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary-vibrant/30 bg-primary-vibrant/5"
          >
            <div className="w-2 h-2 rounded-full bg-primary-vibrant" />
            <span className="text-sm font-semibold text-light/70 tracking-widest">
              Mapa de Maturidade Financeira
            </span>
          </motion.div>

          <motion.h2
            variants={variants.fadeInUp}
            className="text-4xl md:text-5xl text-balance leading-tight font-bold text-light"
          >
            Em qual fase financeira está o seu negócio?
          </motion.h2>

          <motion.p
            variants={variants.fadeInUp}
            className="text-light/50 text-lg leading-relaxed"
          >
            Pequenos negócios passam por diferentes níveis de maturidade
            financeira. O Mapa de Maturidade Financeira FinanceiraMente ajuda
            empresários a identificar onde estão hoje e qual é o próximo passo
            para evoluir.
          </motion.p>
        </motion.div>

        {/* Grid de Fases com Stagger */}
        <motion.div
          variants={variants.staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={viewportConfig}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {phases.map((phase) => (
            <motion.div
              key={phase.number}
              variants={variants.fadeInUp}
              className="group bg-[#1A1A1A] rounded-xl overflow-hidden border border-white/5 hover:border-primary-vibrant/30 transition-all duration-500"
            >
              <div className="relative h-64 w-full">
                <Image
                  src={phase.image}
                  alt={phase.title}
                  fill
                  className="object-cover brightness-75 group-hover:brightness-100 transition-all duration-700"
                />
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded text-xs font-bold text-light border border-white/10">
                  Fase {phase.number}
                </div>
              </div>
              <div className="p-8 space-y-4">
                <h3 className="text-2xl font-semibold text-light">
                  {phase.title}
                </h3>
                <p className="text-light/50 leading-relaxed text-sm md:text-base">
                  {phase.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Rodapé de Conversão */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:pt-12 items-center">
          <motion.div
            variants={variants.staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={viewportConfig}
            className="space-y-8"
          >
            <motion.h3
              variants={variants.fadeInUp}
              className="text-3xl md:text-4xl text-balance font-bold text-light"
            >
              Descubra em qual fase financeira está o seu negócio.
            </motion.h3>

            <motion.h3
              variants={variants.fadeInUp}
              className="text-base  text-light/70"
            >
              Ao responder o diagnóstico, você receberá
            </motion.h3>

            <motion.div variants={variants.fadeInUp}>
              <Button className="hidden md:block">
                Descobrir maturidade financeira
              </Button>
            </motion.div>
          </motion.div>

          {/* Lista de Benefícios com Stagger Individual */}
          <motion.div
            variants={variants.staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={viewportConfig}
            className="grid grid-cols-1 gap-4"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={variants.fadeInUp}
                className="flex items-center gap-4 p-5 rounded-lg border border-white/5 hover:bg-white/10 transition-colors"
              >
                <div className="shrink-0 w-10 h-10 md:w-12 md:h-12 rounded bg-light/5 flex items-center justify-center border-2 border-primary-deep shadow-inner">
                  <img src="/Checkfat.svg" alt="check icon" />
                </div>
                <p className="text-light/80 text-sm md:text-base font-medium">
                  {benefit}
                </p>
              </motion.div>
            ))}
            <motion.div variants={variants.fadeInUp} className="md:hidden">
              <Button className="w-full">
                Descobrir maturidade financeira
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
