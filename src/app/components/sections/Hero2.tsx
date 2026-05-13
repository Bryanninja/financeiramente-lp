"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import Button from "../ui/Button";
import { variants } from "@/app/lib/animations";
// MUDANÇA 1: Importar a imagem PNG sem fundo
import BgHeroCutout from "../../assets/img/hero2.webp";
import Container from "../ui/Container";
import { getWhatsAppUrl } from "@/app/lib/whatsapp";

export default function Hero() {
  return (
    <section
      id="home"
      // Mantemos a estrutura responsiva: altura automática no mobile, h-screen no desktop
      className="relative w-full h-auto md:h-screen md:min-h-[700px] flex flex-col overflow-hidden bg-dark"
    >
      {/* Barra de Especialista */}
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

      {/* Container Principal */}
      <div className="flex flex-col md:block flex-1 relative">
        {/* --- CONTEÚDO DE TEXTO (Mantemos o layout original) --- */}
        <motion.div
          variants={variants.staggerContainer}
          initial="initial"
          animate="animate"
          className="relative z-20 order-first flex flex-col justify-center pt-20 pb-16 md:pt-0 md:pb-0 md:absolute md:inset-0 md:flex-1"
        >
          <Container>
            {/* MUDANÇA 2: No desktop, garantimos que o texto ocupe apenas a parte esquerda */}
            {/* Adicionei 'md:w-[60%]' para o texto não sobrepor a imagem do Michel à direita */}
            <div className="max-w-[750px] md:w-[60%] space-y-6">
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

              <motion.div variants={variants.fadeInUp} className="pt-2">
                <Button
                  href={getWhatsAppUrl("sessaoEstrategica")}
                  target="_blank"
                >
                  Agendar Sessão Estratégica
                </Button>
              </motion.div>
            </div>
          </Container>
        </motion.div>

        {/* --- CONTAINER DA IMAGEM --- */}
        <div
          // Aumentei um pouco a altura no mobile (h-[450px]) para ela ter mais presença
          className="relative order-last w-full h-[550px] md:h-auto md:absolute md:inset-y-0 md:right-0 md:z-10 md:w-1/2 overflow-hidden flex items-end justify-center md:justify-end"
        >
          <Image
            src={BgHeroCutout}
            alt="Michel Stawicki analisando dados"
            // MUDANÇAS AQUI:
            // Mobile: 'object-cover' faz ela cortar as laterais e ficar maior. 'object-top' foca no rosto.
            // Desktop: 'md:object-contain' volta a mostrar ela sem cortes. 'md:max-h-[96%]' dá o tamanho que você gostou.
            className="w-full h-full md:w-auto md:h-full object-cover object-top md:object-contain md:object-right-bottom md:max-h-[96%]"
            priority
          />

          {/* GRADIENTE DE FUSÃO: Aumentado um pouco para garantir a mescla com a imagem maior */}
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-dark via-dark/80 to-transparent z-20" />
        </div>
      </div>

      {/* Card de Insight (Mantemos) */}
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
