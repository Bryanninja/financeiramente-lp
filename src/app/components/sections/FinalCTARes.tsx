"use client";
import Container from "../ui/Container";
import Button from "../ui/Button";
import { variants, viewportConfig } from "@/app/lib/animations";
import { motion } from "framer-motion";
import NextStepImg from "../../assets/img/bg-report.webp";
import { phaseContent } from "@/app/data/resultContent";
import Image from "next/image";
import { Search, BarChart3, TrendingUp, Target } from "lucide-react";
import { getWhatsAppUrl } from "@/app/lib/whatsapp";

// 3A — Mapa de SVGs por fase declarado fora do componente [cite: 106]
const phaseSvgs: Record<number, string> = {
  1: "/financeiramente-escuro.svg",
  2: "/financeiramente-consciencia.svg",
  3: "/financeiramente-estrutura.svg",
  4: "/financeiramente-inteligencia.svg",
};

const ctaItems = [
  {
    icon: Search,
    text: "Analisar com mais profundidade a estrutura financeira do seu negócio.",
  },
  { icon: BarChart3, text: "Identificar pontos críticos de melhorias." },
  {
    icon: TrendingUp,
    text: "Discutir caminhos possíveis para evolução financeira.",
  },
  {
    icon: Target,
    text: "Avaliar oportunidades reais para fortalecer os pilares financeiros da empresa.",
  },
];

export default function ResultNextSteps({ phase = 2 }) {
  const content = phaseContent[phase];

  return (
    <section className="bg-light">
      {/* ─── Interpretação do Diagnóstico ─── */}
      <div className="bg-dark pb-24 md:pb-32">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* 3B — Lado esquerdo com animação e SVG dinâmico [cite: 108, 109] */}
            <motion.div
              variants={variants.fadeInLeft ?? variants.fadeIn}
              initial="initial"
              whileInView="animate"
              viewport={viewportConfig}
              className="flex justify-center lg:justify-start"
            >
              <img
                src={phaseSvgs[phase] ?? "/financeiramente-consciencia.svg"}
                alt="Interpretação"
                className="w-full"
              />
            </motion.div>

            {/* Lado direito: texto (já animado conforme código original) [cite: 109, 110] */}
            <motion.div
              variants={variants.staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={viewportConfig}
              className="space-y-6"
            >
              <motion.h3
                variants={variants.fadeInUp}
                className="text-3xl font-bold text-light/90 uppercase"
              >
                Interpretação do Diagnóstico
              </motion.h3>
              <motion.p
                variants={variants.fadeInUp}
                className="text-base md:text-lg text-light/70 leading-relaxed"
              >
                {content.interpretation}
              </motion.p>
            </motion.div>
          </div>
        </Container>
      </div>

      {/* ─── Próximo Passo de Evolução ─── */}
      <div className="bg-light py-32">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Lado esquerdo: conteúdo [cite: 113, 114] */}
            <motion.div
              variants={variants.staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={viewportConfig}
              className="space-y-8"
            >
              <motion.div variants={variants.fadeInUp} className="space-y-2">
                <h3 className="text-4xl md:text-5xl font-bold text-dark leading-tight">
                  Próximo Passo
                  <br />
                  de Evolução
                </h3>
              </motion.div>

              <motion.div variants={variants.fadeInUp} className="space-y-4">
                {/* 3C — Badge da fase centralizado e estilizado [cite: 115, 116] */}
                <div className="inline-flex items-center gap-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 w-fit rounded-full border border-dark/60 bg-transparent">
                    <div className="w-2 h-2 rounded-full bg-primary-vibrant" />
                    <span className="text-sm tracking-wider text-dark font-semibold">
                      Fase
                    </span>
                  </div>
                  <span className="text-2xl font-semibold text-dark">
                    {content.title}
                  </span>
                </div>
                <p className="text-dark/70 leading-relaxed max-w-xl text-pretty text-base md:text-lg">
                  {content.nextStep} {content.nextStepDetails}
                </p>
              </motion.div>

              <motion.div variants={variants.fadeInUp}>
                <Button
                  variant="outline"
                  className="w-full md:w-auto px-10"
                  href={getWhatsAppUrl("sessaoEstrategica")}
                  target="_blank"
                >
                  Agendar Sessão Estratégica FinanceiraMente
                </Button>
              </motion.div>
            </motion.div>

            <div className="relative">
              <img
                src="/financeiramente-arrow-growth.svg"
                alt=""
                className="absolute left-1/2 right-1/2 -translate-x-1/2 top-[92%] md:-translate-x-0 backdrop-blur-lg pointer-events-none w-20 rounded-full z-10 md:left-[90%] md:top-[-4%]"
              />

              {/* 3D — Lado direito com animação de entrada e hover [cite: 120, 121] */}
              <motion.div
                variants={variants.fadeIn}
                initial="initial"
                whileInView="animate"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
                viewport={viewportConfig}
                className="relative aspect-[7/8] rounded-2xl overflow-hidden shadow-2xl"
              >
                <Image
                  src={NextStepImg}
                  alt="Próximos passos"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </div>
          </div>
        </Container>
      </div>

      {/* ─── CTA Final (Aprofunde a análise) ─── */}
      <div className="bg-dark py-24">
        <Container className="space-y-8">
          {/* Título e descrição [cite: 123, 124, 125] */}
          <motion.div
            variants={variants.staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={viewportConfig}
            className="max-w-3xl mx-auto text-center space-y-6"
          >
            <motion.h2
              variants={variants.fadeInUp}
              className="text-3xl md:text-5xl text-balance font-bold text-light leading-tight"
            >
              Aprofunde a análise do seu negócio
            </motion.h2>
            <motion.p
              variants={variants.fadeInUp}
              className="text-light/55 text-sm md:text-base leading-relaxed"
            >
              Se você quiser explorar com mais profundidade os resultados deste
              diagnóstico, pode agendar uma Sessão Estratégica FinanceiraMente.
              Nessa sessão, você poderá se aprofundar nos pontos identificados
              no diagnóstico inicial e definir próximos passos claros para a
              estruturação financeira do seu negócio.
            </motion.p>
            <motion.p
              variants={variants.fadeInUp}
              className="text-light/80 text-lg font-medium"
            >
              Durante essa conversa iremos:
            </motion.p>
          </motion.div>

          {/* Grid dos 4 itens */}
          <motion.div
            variants={variants.staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={viewportConfig}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mx-auto"
          >
            {ctaItems.map((item, i) => (
              <motion.div
                key={i}
                variants={variants.fadeInUp}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-[#1A1A1A] p-8 rounded-xl border border-white/5 space-y-6 hover:border-primary-vibrant/20 transition-all group"
              >
                <item.icon
                  className="text-light group-hover:text-primary-vibrant transition-colors duration-300"
                  strokeWidth={1.5}
                />
                <p className="text-light/80 text-base md:text-lg leading-snug font-medium">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Botão CTA [cite: 131, 132] */}
          <motion.div
            variants={variants.fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={viewportConfig}
            className="flex justify-center"
          >
            <Button
              variant="white"
              className="w-full md:w-auto px-10"
              href={getWhatsAppUrl("sessaoEstrategica")}
              target="_blank"
            >
              Agendar Sessão Estratégica FinanceiraMente
            </Button>
          </motion.div>
        </Container>
      </div>
    </section>
  );
}
