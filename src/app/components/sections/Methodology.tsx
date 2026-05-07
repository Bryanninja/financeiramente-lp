"use client";

import { motion } from "framer-motion";
import Container from "../ui/Container";
import { fadeInUp, staggerContainer } from "@/app/lib/animations";

const pillars = [
  {
    title: "Rentabilidade",
    description: "Entender onde o negócio realmente ganha dinheiro.",
  },
  {
    title: "Resultado",
    description: "Ter clareza sobre o desempenho real da empresa.",
  },
  {
    title: "Caixa",
    description: "Garantir que o negócio tenha liquidez para operar e crescer.",
  },
  {
    title: "Retorno sobre investimento",
    description:
      "Avaliar se decisões financeiras estão realmente gerando valor.",
  },
];

export default function Methodology() {
  return (
    <section className="bg-dark py-20 overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Lado Esquerdo: Conteúdo e Cards */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div className="space-y-6">
              {/* Tag Superior */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-light/60 bg-primary-vibrant/5">
                <div className="w-2 h-2 rounded-full bg-primary-vibrant" />
                <span className="text-[10px] uppercase tracking-wider text-light/60 font-bold">
                  Os 4 pilares
                </span>
              </div>

              <motion.h2
                variants={fadeInUp}
                className="text-3xl md:text-5xl font-bold text-light leading-tight"
              >
                O Método FinanceiraMente
              </motion.h2>

              <motion.p
                variants={fadeInUp}
                className="text-light/60 text-lg leading-relaxed max-w-xl"
              >
                Para evoluir no mapa de maturidade financeira, o negócio precisa
                estruturar quatro elementos fundamentais. Esses elementos formam
                os 4 Pilares Financeiros do Negócio.
              </motion.p>
            </div>

            {/* Grid de Cards dos Pilares */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pillars.map((pillar, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-[#1A1A1A] p-8 flex flex-col justify-center rounded-lg border border-white/5 hover:border-primary-vibrant/20 hover:bg-light/5 transition-all group"
                >
                  <h3 className="text-light text-xl font-bold mb-3 group-hover:text-primary-vibrant transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-light/50 text-sm text-pretty leading-relaxed">
                    {pillar.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Lado Direito: SVG da Escada de Maturidade */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 50 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative flex justify-center lg:justify-end"
          >
            <img
              src="/mapa.svg"
              alt="Escada de Maturidade FinanceiraMente"
              className="w-full max-w-[550px] hover:scale-105 transition-transform duration-300 drop-shadow-[0_0_30px_rgba(30,58,138,0.3)]"
            />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
