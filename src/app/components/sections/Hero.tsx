"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import Button from "../ui/Button";
import { variants } from "@/app/lib/animations";
import BgHero from "../../assets/img/Hero.webp";
import Container from "../ui/Container";
import { getWhatsAppUrl } from "@/app/lib/whatsapp";

export default function Hero() {
  return (
    <section
      id="home"
      // AJUSTE: Altura automática no mobile, h-screen apenas no desktop
      className="relative w-full h-auto md:h-screen md:min-h-[700px] flex flex-col overflow-hidden bg-dark"
    >
      {/* Barra de Especialista - Fixa no topo */}
      <motion.div
        variants={variants.fadeIn}
        initial="initial"
        animate="animate"
        className="z-30 w-full absolute top-0 left-0 bg-primary-deep/60 backdrop-blur-xl py-3 text-center"
      >
        <span className="text-sm md:text-base tracking-[0.1em] text-light">
          Michel Stawicki — Especialista Financeiro
        </span>
      </motion.div>

      {/* AJUSTE: Container que gerencia a ordem da Imagem vs Texto no mobile */}
      <div className="flex flex-col mt-8 md:mt-0 md:block flex-1 relative">
        {/* --- CONTEÚDO DE TEXTO --- */}
        <motion.div
          variants={variants.staggerContainer}
          initial="initial"
          animate="animate"
          // AJUSTE: order-first garante que o texto fique em cima no mobile.
          // Padding vertical alto no mobile para dar respiro, já que não é h-screen.
          className="relative z-20 order-first flex flex-col justify-center pt-20 pb-16 md:pt-0 md:pb-0 md:absolute md:inset-0 md:flex-1"
        >
          <Container>
            {/* Margem à direita no desktop para não bater na foto do Michel */}
            <div className="max-w-[750px] md:mr-[30%] space-y-6">
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
                  Agendar Sessão Estratégica Financeiramente
                </Button>
              </motion.div>
            </div>
          </Container>
        </motion.div>

        {/* --- IMAGEM DE FUNDO / ABAIXO --- */}
        {/* AJUSTE: Container da imagem muda de comportamento */}
        <div className="relative order-last w-full h-[500px] md:h-auto md:absolute md:inset-0 md:z-0 overflow-hidden">
          <Image
            src={BgHero}
            alt="Michel Stawicki analisando dados"
            fill
            // ============================================================
            // AQUI ESTÁ A MUDANÇA:
            // object-right no mobile foca nas pessoas à direita.
            // md:object-top mantém o alinhamento no desktop.
            // ============================================================
            className="object-cover object-right md:object-top"
            priority
          />

          {/* Desktop: Mantém o gradiente lateral original */}
          <div className="absolute inset-0 hidden md:block bg-gradient-to-r from-dark/50 via-dark/30 to-transparent" />
        </div>
      </div>

      {/* Card de Insight - Mantemos escondido no mobile */}
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
