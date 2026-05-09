"use client";
import Container from "../ui/Container";
import Button from "../ui/Button";
import { variants, viewportConfig } from "@/app/lib/animations";
import { motion } from "framer-motion";
import NextStepImg from "../../assets/img/bg-report.webp";
import { phaseContent } from "@/app/data/resultContent";
import Image from "next/image";
import { Search, BarChart3, TrendingUp, Target } from "lucide-react";

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
    <section className="bg-light space-y-0">
      {/* ─── Interpretação do Diagnóstico ─── */}
      <div className="bg-dark py-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Lado esquerdo: ícone/ilustração */}
            <div className="flex justify-center lg:justify-start">
              <img src="/mapa.svg" alt="Interpretação" className="w-full " />
            </div>

            {/* Lado direito: texto */}
            <motion.div
              variants={variants.staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={viewportConfig}
              className="space-y-6"
            >
              <motion.h3
                variants={variants.fadeInUp}
                className="text-3xl font-bold text-light/90 uppercase "
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
            {/* Lado esquerdo: conteúdo */}
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
                {/* Badge de fase */}
                <div className="flex items-center gap-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 w-fit rounded-full border border-dark/60 bg-transparent mb-4">
                    <div className="w-2 h-2 rounded-full bg-primary-vibrant" />
                    <span className="text-sm  tracking-wider text-dark font-semibold">
                      Fase
                    </span>
                  </div>
                  <h3 className="text-2xl">{content.title}</h3>
                </div>

                <p className="text-dark/70 leading-relaxed max-w-xl text-pretty text-sm md:text-base">
                  {content.nextStep} {content.nextStepDetails}
                </p>
              </motion.div>

              <motion.div variants={variants.fadeInUp}>
                <Button variant="outline">
                  Agendar Sessão Estratégica FinanceiraMente
                </Button>
              </motion.div>
            </motion.div>

            {/* Lado direito: imagem */}
            <motion.div
              variants={variants.fadeIn}
              initial="initial"
              whileInView="animate"
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
        </Container>
      </div>

      {/* ─── CTA Final (Aprofunde a análise) ─── */}
      <div className="bg-dark py-24">
        <Container className="space-y-16">
          {/* Título e descrição */}
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
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto"
          >
            {ctaItems.map((item, i) => (
              <motion.div
                key={i}
                variants={variants.fadeInUp}
                className="bg-white/5 p-6 rounded-xl border border-white/8 space-y-4 hover:border-white/15 transition-all"
              >
                <item.icon
                  className="w-6 h-6 text-light/40"
                  strokeWidth={1.5}
                />
                <p className="text-light/70 text-sm leading-relaxed">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Botão CTA */}
          <motion.div
            variants={variants.fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={viewportConfig}
            className="flex justify-center"
          >
            <Button variant="white" className=" text-dark font-bold text-base">
              Agendar Sessão Estratégica FinanceiraMente
            </Button>
          </motion.div>
        </Container>
      </div>
    </section>
  );
}
