"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronsDown } from "lucide-react";
import Container from "../ui/Container";
import { variants } from "@/app/lib/animations";

import bgReport from "@/app/assets/img/bg-result.webp";
import Image from "next/image";
import Header from "./Header";

export default function ResultHero() {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  const handleSendEmail = async () => {
    if (sending || sent) return;
    setSending(true);
    try {
      const user = JSON.parse(localStorage.getItem("fm_user") || "{}");
      const result = JSON.parse(localStorage.getItem("fm_result") || "{}");

      await fetch("/api/send-result", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: user.name ?? "Usuário",
          email: user.email ?? "",
          phase: result.phase ?? 2,
          score: result.totalScore ?? 24,
          pilarScores: result.pilarScores ?? [7, 8, 10, 7],
        }),
      });
      setSent(true);
    } catch {
      // falha silenciosa — botão volta ao normal
    } finally {
      setSending(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Meu Relatório de Maturidade Financeira — FinanceiraMente",
          text: "Fiz o diagnóstico de maturidade financeira do meu negócio. Confira o método FinanceiraMente!",
          url: window.location.href,
        });
      } catch {
        // usuário cancelou — ignorar
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      setShareSuccess(true);
      setTimeout(() => setShareSuccess(false), 2000);
    }
  };

  return (
    <section className="relative w-full min-h-[800px] flex flex-col justify-center overflow-hidden bg-dark">
      <Header />
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
              className="text-3xl md:text-5xl pt-32 font-bold text-white leading-tight tracking-tight"
            >
              Relatório de Maturidade <br /> Financeira - FinanceiraMente
            </motion.h1>

            <motion.p
              variants={variants.fadeInUp}
              className="text-sm md:text-lg text-pretty text-white/80 max-w-2xl mx-auto leading-relaxed"
            >
              Este relatório abaixo apresenta uma leitura inicial da estrutura
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
            {/* Botão Compartilhar */}
            <button
              onClick={handleShare}
              className="w-full md:w-[220px] px-8 py-4 rounded-md border border-white text-white font-medium hover:bg-white/10 transition-all duration-300 active:scale-95"
            >
              {shareSuccess ? "Link copiado!" : "Compartilhar"}
            </button>

            {/* Botão Enviar E-mail */}
            <button
              onClick={handleSendEmail}
              disabled={sending || sent}
              className="w-full md:w-[220px] px-8 py-4 rounded-md bg-white text-dark font-bold hover:bg-neutral-100 transition-all duration-300 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {sent
                ? "E-mail enviado!"
                : sending
                  ? "Enviando..."
                  : "Enviar para o E-mail"}
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
