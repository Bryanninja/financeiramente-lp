"use client";

import { motion } from "framer-motion";
import { ChevronsDown } from "lucide-react"; // Ícone de setas duplas
import Container from "../ui/Container";
import { variants } from "@/app/lib/animations";

import bgReport from "@/app/assets/img/bg-result.webp";
import Image from "next/image";
import Header from "./Header";

export default function ResultHero() {
  return (
    <section className="relative w-full min-h-[800px] flex flex-col justify-center overflow-hidden bg-dark">
      {/* Imagem de Fundo com Overlay Escuro conforme a imagem */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat grayscale opacity-40" />
        <Image
          fill
          className="object-cover"
          src={bgReport}
          alt="Fundo bg relatorio"
        ></Image>
        <div className="absolute inset-0 bg-gradient-to-b from-dark/80 via-dark/60 to-dark/80" />
      </div>

      <Container className="relative z-10">
        <div className="max-w-[900px] mx-auto text-center space-y-10">
          {/* Título e Subtítulo baseados no documento e imagem */}
          <motion.div
            variants={variants.staggerContainer}
            initial="initial"
            animate="animate"
            className="space-y-6"
          >
            <motion.h1
              variants={variants.fadeInUp}
              className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight"
            >
              Relatório de Maturidade <br /> Financeira - FinanceiraMente
            </motion.h1>

            <motion.p
              variants={variants.fadeInUp}
              className="text-sm md:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed"
            >
              Este relatório apresenta uma leitura inicial da estrutura
              financeira do seu negócio com base nas respostas fornecidas no
              diagnóstico.
            </motion.p>
          </motion.div>

          {/* Botões específicos da imagem */}
          <motion.div
            variants={variants.fadeInUp}
            initial="initial"
            animate="animate"
            className="flex flex-col md:flex-row items-center justify-center gap-4"
          >
            {/* Botão Compartilhar (Estilo Outline) */}
            <button className="w-full md:w-[220px] px-8 py-4 rounded-md border border-white text-white font-medium hover:bg-white/10 transition-all duration-300 active:scale-95">
              Compartilhar
            </button>

            {/* Botão Enviar E-mail (Estilo Solid White) */}
            <button className="w-full md:w-[220px] px-8 py-4 rounded-md bg-white text-dark font-bold hover:bg-neutral-100 transition-all duration-300 active:scale-95">
              Enviar para o E-mail
            </button>
          </motion.div>

          {/* Indicador de Scroll (Setas duplas) */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 1.2,
              duration: 1,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="pt-12 flex justify-center"
          >
            <div className="p-2 rounded-full border border-white/20 flex items-center justify-center">
              <ChevronsDown className="text-white w-6 h-6" strokeWidth={1.5} />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
