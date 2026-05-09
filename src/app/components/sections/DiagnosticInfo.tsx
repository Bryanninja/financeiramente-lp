"use client";

import { motion } from "framer-motion";
import Container from "../ui/Container";
import Button from "../ui/Button";
import { variants, viewportConfig } from "@/app/lib/animations";

const steps = [
  { id: 1, text: "Negócio no Escuro" },
  { id: 2, text: "Estrutura Financeira" },
  { id: 3, text: "Consciência Financeira" },
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            variants={variants.staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={viewportConfig}
            className="space-y-8"
          >
            <motion.h2
              variants={variants.fadeInUp}
              className="text-3xl md:text-5xl font-bold text-light leading-tight"
            >
              A análise é baseada no Mapa de Maturidade Financeira -
              FinanceiraMente
            </motion.h2>
            <motion.p
              variants={variants.fadeInUp}
              className="text-light/60 text-lg"
            >
              Que organiza a evolução financeira das empresas em quatro fases:
            </motion.p>
          </motion.div>

          <motion.div
            variants={variants.staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={viewportConfig}
            className="space-y-4"
          >
            {steps.map((step) => (
              <motion.div
                key={step.id}
                variants={variants.fadeInUp}
                className="flex items-center gap-4 p-4 rounded-xl border border-white/5"
              >
                <div className="w-12 h-12 rounded-xl bg-primary-deep flex text-2xl items-center justify-center text-light ">
                  {step.id}
                </div>
                <span className="text-light/80 font-medium">{step.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Divisor sutil */}
        <div className="h-[1px] w-full bg-white/5 my-32" />

        {/* PARTE 2: Pilares Financeiros */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            variants={variants.staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={viewportConfig}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 order-2 lg:order-1"
          >
            {pillars.map((pillar, i) => (
              <motion.div
                key={i}
                variants={variants.fadeInUp}
                className="p-6 rounded-xl transition-colors hover:bg-light/5 border flex flex-col justify-center border-white/5 bg-white/[0.02] space-y-3"
              >
                <h4 className="text-light font-bold text-xl">{pillar.title}</h4>
                <p className="text-light/50 text-pretty text-sm leading-relaxed">
                  {pillar.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={variants.staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={viewportConfig}
            className="space-y-8 order-1 lg:order-2"
          >
            <motion.h2
              variants={variants.fadeInUp}
              className="text-3xl md:text-5xl font-bold text-light leading-tight"
            >
              O diagnóstico também avalia os quatro pilares financeiros
            </motion.h2>
            <motion.p
              variants={variants.fadeInUp}
              className="text-light/60 text-lg"
            >
              Que sustentam a gestão financeira da empresa:
            </motion.p>
            <motion.div variants={variants.fadeInUp}>
              <Button href="#diagnostic" className="px-10 py-4">
                Começar Diagnóstico Agora
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
