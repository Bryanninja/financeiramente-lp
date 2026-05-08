"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Search, DollarSign, Calculator } from "lucide-react";
import Container from "../ui/Container";
import Button from "../ui/Button";
import { variants, viewportConfig } from "@/app/lib/animations";

// Imagem central (Michel e Cliente sorrindo)
import FinalMeetingImg from "../../assets/img/final-meeting.webp";

const clarityPoints = [
  {
    icon: <Search className="w-6 h-6" />,
    text: "Em qual fase de maturidade financeira está o seu negócio",
  },
  {
    icon: <DollarSign className="w-6 h-6" />,
    text: "Quais são os principais pontos de fragilidade financeira",
  },
  {
    icon: <Calculator className="w-6 h-6" />,
    text: "Quais são os próximos passos para estruturar financeiramente a empresa",
  },
];

export default function FinalCTA() {
  return (
    <section className="bg-dark py-24 md:py-32 overflow-hidden">
      <Container className="space-y-16">
        {/* 1. Header de Chamada */}
        <motion.div
          variants={variants.staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={viewportConfig}
          className="text-center max-w-4xl mx-auto space-y-6"
        >
          <motion.h2
            variants={variants.fadeInUp}
            className="text-3xl md:text-5xl font-bold text-light leading-tight"
          >
            Pronto para estruturar <br /> financeiramente o seu negócio?
          </motion.h2>

          <motion.p
            variants={variants.fadeInUp}
            className="text-light/70 text-base md:text-lg leading-relaxed max-w-3xl mx-auto"
          >
            Se você quer transformar números confusos em decisões claras, o
            primeiro passo é entender com profundidade a realidade financeira do
            seu negócio. Na Sessão Estratégica FinanceiraMente vamos analisar a
            estrutura financeira da sua empresa e identificar possíveis caminhos
            para evoluir no Mapa de Maturidade Financeira.
          </motion.p>
        </motion.div>

        {/* 2. Imagem de Destaque com Tag */}
        <motion.div
          variants={variants.fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={viewportConfig}
          className="relative w-full aspect-square md:aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl"
        >
          <Image
            src={FinalMeetingImg}
            alt="Reunião estratégica com Michel Stawicki"
            fill
            className="object-cover object-top hover:scale-105 transition-transform duration-1000"
          />

          {/* Tag Flutuante sobre a Imagem */}
          <div className="absolute top-36 md:top-14 left-1/2 -translate-x-1/2 md:left-auto md:right-1/2 md:translate-x-full lg:right-[55%]">
            <div className="flex items-center gap-2 px-4 py-1 rounded-full border border-dark bg-dark/40 backdrop-blur-md">
              <div className="w-2 h-2 rounded-full bg-primary-vibrant shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
              <span className="text-[10px] md:text-sm tracking-widest text-light">
                Aprenda com o Michel
              </span>
            </div>
          </div>
        </motion.div>

        {/* 3. Seção de Pontos de Clareza */}
        <motion.div
          variants={variants.staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={viewportConfig}
          className="space-y-12 pt-8"
        >
          <motion.h3
            variants={variants.fadeInUp}
            className="text-2xl md:text-4xl font-bold text-light text-center leading-tight"
          >
            Durante essa conversa <br /> você terá clareza sobre
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {clarityPoints.map((point, index) => (
              <motion.div
                key={index}
                variants={variants.fadeInUp}
                className="bg-[#1A1A1A] p-8 rounded-xl border border-white/5 space-y-6 hover:border-primary-vibrant/20 transition-all group"
              >
                <div className="text-light group-hover:text-primary-vibrant transition-colors">
                  {point.icon}
                </div>
                <p className="text-light/80 text-base md:text-lg leading-snug font-medium">
                  {point.text}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 4. Botão Final de Conversão */}
        <motion.div
          variants={variants.fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={viewportConfig}
          className="flex justify-center"
        >
          <Button
            variant="white"
            className="px-8 py-5 text-dark font-bold text-lg"
          >
            Quero minha Sessão Estratégica Gratuita
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}
