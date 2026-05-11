"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import Button from "../ui/Button";
// Importamos o objeto 'variants' único para manter a consistência
import { variants } from "@/app/lib/animations";
import BgHero from "../../assets/img/section.webp";
import Container from "../ui/Container";
import { getWhatsAppUrl } from "@/app/lib/whatsapp";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative w-full h-screen min-h-[700px] flex flex-col overflow-hidden bg-dark"
    >
      {/* Imagem de Fundo - Mantemos a prioridade máxima */}
      <div className="absolute inset-0 z-0">
        <Image
          src={BgHero}
          alt="Michel Stawicki analisando dados"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/95 via-dark/60 to-transparent" />
      </div>

      {/* Barra de Especialista - Entrada suave independente */}
      <motion.div
        variants={variants.fadeIn}
        initial="initial"
        animate="animate"
        className="z-30 w-full bg-primary-deep/60 backdrop-blur-xl py-3 text-center"
      >
        <span className="text-sm md:text-base tracking-[0.1em] text-light">
          Michel Stawicki — Especialista Financeiro
        </span>
      </motion.div>

      {/* Conteúdo Principal com Stagger */}
      <motion.div
        variants={variants.staggerContainer}
        initial="initial"
        animate="animate"
        className="relative z-20 flex-1 flex flex-col justify-center"
      >
        <Container>
          <div className="max-w-[750px] space-y-6">
            <motion.div variants={variants.fadeInUp}>
              <img
                src="/logo-financeiramente.svg"
                alt="logo Financeiramente"
                className="h-8 md:h-10"
              />
            </motion.div>

            <motion.h1
              variants={variants.fadeInUp}
              className="text-4xl md:text-5xl font-bold text-balance text-light leading-[1.15] tracking-tight"
            >
              Empresas raramente quebram por falta de vendas.{" "}
              <br className="hidden md:block" />
              <span className="text-light">
                Elas quebram por falta de estrutura financeira.
              </span>
            </motion.h1>

            <motion.p
              variants={variants.fadeInUp}
              className="text-lg md:text-xl text-light/80 max-w-[550px] leading-relaxed"
            >
              Mas muitas outras não quebram. Elas simplesmente não conseguem
              crescer.
            </motion.p>

            <motion.div variants={variants.fadeInUp}>
              <Button
                href={getWhatsAppUrl("sessaoEstrategica")}
                target="_blank"
              >
                Agendar Sessão Estratégica FinanceiraMente
              </Button>
            </motion.div>
          </div>
        </Container>
      </motion.div>

      {/* Card de Insight - Entrada lateral consistente */}
      <motion.div
        variants={variants.fadeInRight}
        initial="initial"
        animate="animate"
        className="hidden md:flex absolute bottom-10 right-6 md:right-12 z-30 bg-[#1A1A1A]/85 backdrop-blur-sm p-4 pr-8 rounded-md border border-white/5 items-center gap-5 shadow-2xl max-w-[380px]"
      >
        <div className="bg-primary-deep/60 p-3 rounded flex items-center justify-center">
          <TrendingUp className="text-light w-6 h-6" />
        </div>
        <div className="text-light text-sm md:text-[15px] leading-snug opacity-90 font-normal">
          O problema raramente é vender. <br />O problema é crescer com
          estrutura.
        </div>
      </motion.div>
    </section>
  );
}
