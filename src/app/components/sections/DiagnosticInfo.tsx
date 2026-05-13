"use client";

import { motion } from "framer-motion";
import Container from "../ui/Container";
import Button from "../ui/Button";
import { variants, viewportConfig } from "@/app/lib/animations";

const steps = [
  { id: 1, text: "Negócio no Escuro" },
  { id: 3, text: "Consciência Financeira" },
  { id: 2, text: "Estrutura Financeira" },
  { id: 4, text: "Inteligência Financeira" },
];

const pillars = [
  {
    title: "Rentabilidade",
    desc: "Entender onde o negócio realmente ganha dinheiro.",
  },
  {
    title: "Resultado",
    desc: "Ter clareza sobre o desempenho real da empresa.",
  },
  {
    title: "Caixa",
    desc: "Garantir que o negócio tenha liquidez para operar e crescer.",
  },
  {
    title: "Retorno sobre investimento",
    desc: "Avaliar se decisões financeiras estão gerando valor.",
  },
];

export default function DiagnosticInfo() {
  return (
    <section className="bg-dark py-24 md:py-32 space-y-32">
      <Container>
        {/* PARTE 1: Mapa de Maturidade */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center"
          variants={variants.staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={viewportConfig}
        >
          <div className="space-y-6">
            <motion.h2
              variants={variants.fadeInUp}
              className="text-3xl md:text-[2.6rem] font-bold text-light leading-tight"
            >
              A análise é baseada no Mapa de Maturidade Financeira -
              FinanceiraMente
            </motion.h2>
            <motion.p
              variants={variants.fadeInUp}
              className="text-light/60 text-lg"
            >
              Que organiza a evolução financeira das empresas em quatro fases
            </motion.p>
          </div>

          <motion.div
            variants={variants.staggerContainer}
            className="flex flex-col gap-4 items-start"
          >
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                variants={variants.fadeInUp}
                style={{ width: `${70 + index * 10}%` }}
                className="flex items-center gap-4 p-4 rounded-lg border border-white/5 bg-white/[0.002] hover:border-primary-deep/80 hover:bg-white/5 hover:scale-105 transition-all duration-300"
              >
                <div className="w-12 h-12 shrink-0 rounded-lg bg-primary-deep flex text-3xl items-center justify-center text-light">
                  {step.id}
                </div>
                <span className="text-light/80 font-medium">{step.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Divisor */}
        <motion.div
          variants={variants.fadeIn}
          className="h-[1px] w-full bg-white/5 my-32"
        />

        {/* PARTE 2: Pilares Financeiros */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center"
          variants={variants.staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={viewportConfig}
        >
          <motion.div
            variants={variants.staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 order-2 lg:order-1 items-stretch"
          >
            {pillars.map((pillar, i) => (
              <motion.div
                key={i}
                variants={variants.fadeInUp}
                className="h-full flex"
              >
                <div className="p-8 rounded-lg group hover:border-primary-deep/60 transition-colors hover:bg-light/5 border border-white/5 bg-[#1a1a1a] space-y-4 w-full flex flex-col">
                  <h4 className="text-light group-hover:text-primary-vibrant duration-300 font-bold text-xl">
                    {pillar.title}
                  </h4>
                  <p className="text-light/50 text-pretty text-sm leading-relaxed flex-1">
                    {pillar.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="space-y-6 order-1 lg:order-2">
            <motion.h2
              variants={variants.fadeInUp}
              className="text-3xl md:text-[2.6rem] font-bold text-light leading-tight"
            >
              O diagnóstico também avalia os quatro pilares financeiros
            </motion.h2>
            <motion.p
              variants={variants.fadeInUp}
              className="text-light/60 text-lg"
            >
              Que sustentam a gestão financeira da empresa
            </motion.p>
            <motion.div variants={variants.fadeInUp}>
              <Button href="#diagnostic" className="px-10 py-4">
                Começar Diagnóstico Agora
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
