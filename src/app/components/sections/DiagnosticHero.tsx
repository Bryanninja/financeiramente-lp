"use client";

import { motion } from "framer-motion";
import { Clock, Watch } from "lucide-react";
import Container from "../ui/Container";
import Button from "../ui/Button";
import { variants } from "@/app/lib/animations";

export default function DiagnosticHero() {
  return (
    <section id="diagnostic" className="bg-light pt-32 pb-32 md:pt-44 md:pb-44">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Lado Esquerdo: Texto */}
          <motion.div
            variants={variants.staggerContainer}
            initial="initial"
            animate="animate"
            className="space-y-8"
          >
            <motion.div
              variants={variants.fadeInUp}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-lg border border-primary-vibrant/70"
            >
              <Watch className="text-dark/70" />
              <span className="text-sm font-semibold text-dark/70 tracking-wider">
                Menos de 3 minutos
              </span>
            </motion.div>

            <motion.h1
              variants={variants.fadeInUp}
              className="text-4xl md:text-5xl text-balance font-bold text-dark leading-[1.1] tracking-tight"
            >
              Tenha acesso claro ao perfil financeiro do seu negócio atual.
            </motion.h1>

            <motion.p
              variants={variants.fadeInUp}
              className="text-lg text-dark/70 max-w-lg leading-relaxed"
            >
              Preencha o formulário para começar seu diagnóstico. Ao responder o
              diagnóstico você receberá um relatório que apresenta uma leitura
              inicial da estrutura financeira do seu negócio com base nas
              respostas fornecidas.
            </motion.p>
          </motion.div>

          {/* Lado Direito: Formulário */}
          <motion.div
            variants={variants.fadeInUp}
            initial="initial"
            animate="animate"
            className=" rounded-2xl space-y-6"
          >
            <div className="space-y-2">
              <label className="text-sm font-semibold   text-dark">
                Seu Nome
              </label>
              <input
                type="text"
                placeholder="Digite seu nome"
                className="w-full px-4 py-3 mt-2 rounded-lg border border-dark/40 focus:border-primary-deep outline-none transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-dark">
                E-mail Profissional
              </label>
              <input
                type="email"
                placeholder="Digite seu e-mail"
                className="w-full px-4 py-3 rounded-lg border mt-2 border-dark/40 focus:border-primary-deep outline-none transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold  text-dark">
                Nome da Empresa
              </label>
              <input
                type="text"
                placeholder="Digite o nome da sua empresa"
                className="w-full px-4 py-3 rounded-lg border mt-2 border-dark/40 focus:border-primary-deep outline-none transition-colors"
              />
            </div>

            <Button variant="black" className="w-full text-lg">
              Começar Diagnóstico Agora
            </Button>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
