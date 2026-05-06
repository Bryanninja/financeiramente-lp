"use client";

import { motion } from "framer-motion";
import { Search, DollarSign, Wallet, HelpCircle } from "lucide-react";
import Container from "../ui/Container";
import { fadeInUp, staggerContainer } from "@/app/lib/animations";
import Image from "next/image";
import StressImg from "../../assets/img/stress-business.webp";

const painCards = [
  {
    icon: <Search className="w-5 h-5" />,
    text: "Onde o negócio realmente ganha dinheiro.",
  },
  {
    icon: <DollarSign className="w-5 h-5" />,
    text: "Qual é o lucro real da operação.",
  },
  {
    icon: <Wallet className="w-5 h-5" />,
    text: "Se o caixa vai sustentar o crescimento.",
  },
  {
    icon: <HelpCircle className="w-5 h-5" />,
    text: "Se um investimento realmente vale a pena.",
  },
];

export default function ProblemSection() {
  return (
    <section className="bg-dark py-24 md:py-32">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Lado Esquerdo: Conteúdo Textual e Imagem */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="space-y-10"
          >
            <div className="space-y-6">
              {/* Tag Superior */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-light/20 bg-light/5">
                <div className="w-1.5 h-1.5 rounded-full bg-primary-vibrant animate-pulse" />
                <span className="text-xs uppercase tracking-wider text-light/60 font-medium">
                  Não consegue sair do lugar?
                </span>
              </div>

              <motion.h2
                variants={fadeInUp}
                className="text-3xl md:text-5xl font-bold text-light leading-tight"
              >
                O negócio vende, trabalha, movimenta dinheiro, mas parece sempre
                preso no mesmo lugar.
              </motion.h2>

              <motion.p
                variants={fadeInUp}
                className="text-light/60 text-lg leading-relaxed max-w-xl"
              >
                Falta caixa para expandir, decisões geram insegurança, o
                crescimento parece mais arriscado do que deveria. Sem clareza
                financeira, o empresário não sabe com precisão:
              </motion.p>
            </div>

            <motion.div
              variants={fadeInUp}
              className="relative aspect-video rounded-xl overflow-hidden shadow-2xl border border-white/5"
            >
              <Image
                src={StressImg}
                alt="Empresário com estresse financeiro"
                fill
                className="object-cover brightness-90 hover:brightness-100 transition-all duration-500"
              />
            </motion.div>

            {/* Texto Inferior - Refatorado com motion.div para evitar erro de tags */}
            <div className="space-y-8 pt-4">
              <motion.div variants={fadeInUp} className="space-y-2">
                <h3 className="text-light text-xl font-bold leading-snug">
                  Quando essas respostas não estão claras, decisões importantes
                  acabam sendo tomadas no feeling.
                </h3>
                <p className="text-light/60 text-lg leading-relaxed">
                  E quando decisões importantes são tomadas no feeling, duas
                  coisas costumam acontecer: o negócio cresce com insegurança ou
                  simplesmente deixa de crescer.
                </p>
              </motion.div>

              <motion.div variants={fadeInUp} className="space-y-2">
                <h3 className="text-light text-xl font-bold leading-snug">
                  O Método FinanceiraMente
                </h3>
                <p className="text-light/60 text-lg leading-relaxed">
                  Foi desenvolvido para ajudar empresários a estruturar
                  financeiramente seus negócios e transformar números em
                  decisões claras.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Lado Direito: A Coluna "Mágica" que fixa */}
          <div className="grid grid-cols-1 gap-6 sticky top-32">
            {painCards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-[#1A1A1A] p-8 rounded-xl border border-white/5 hover:border-primary-vibrant/30 transition-all shadow-lg"
              >
                <div className="flex flex-col gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-primary-deep transition-colors text-primary-vibrant group-hover:text-light">
                    {card.icon}
                  </div>
                  <p className="text-light text-xl font-medium leading-snug">
                    {card.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
