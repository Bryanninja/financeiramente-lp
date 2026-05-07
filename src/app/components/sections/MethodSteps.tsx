"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Container from "../ui/Container";
import Button from "../ui/Button";
import { fadeInUp, staggerContainer } from "@/app/lib/animations";

import CollaborationImg from "../../assets/img/collaboration.webp";

const steps = [
  {
    title: "Diagnóstico Inicial",
    description:
      "Um diagnóstico inicial para identificar em qual fase do Mapa de Maturidade Financeira FinanceiraMente o seu negócio se encontra.",
    status: "checked",
  },
  {
    title: "Raio-X Financeiro",
    description:
      "Uma análise estruturada da situação financeira do negócio para identificar fragilidades, oportunidades de melhoria e prioridades de estruturação financeira.",
    status: "solid",
  },
  {
    title: "Estruturação",
    description:
      "Implantação de processos, controles e ferramentas que organizam a gestão financeira do negócio.",
    status: "solid",
  },
  {
    title: "Consultoria Estratégica",
    description:
      "Acompanhamento para estruturar financeiramente o negócio e apoiar decisões importantes de crescimento.",
    status: "solid",
  },
];

export default function MethodSteps() {
  return (
    <section className="bg-light py-24 md:py-32">
      <Container className="space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-dark leading-tight"
          >
            O caminho do Método FinanceiraMente no seu negócio
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-dark/70 text-lg md:text-xl"
          >
            Comece com um diagnóstico inicial gratuito e descubra como evoluir
            até o acompanhamento estratégico completo.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          <div className="flex flex-col space-y-8 pt-4">
            <div className="relative">
              {/* Linha Vertical da Timeline */}
              <div className="absolute left-[19px] top-4 bottom-4 w-[1.5px] bg-dark" />

              <div className="space-y-6">
                {steps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="relative flex items-start group"
                  >
                    {/* Círculo da Timeline */}
                    <div className="relative z-10 flex items-center justify-center w-10 h-10 shrink-0">
                      <div className="w-8 h-8 rounded-full bg-dark flex items-center justify-center border border-white/10 shadow-lg">
                        {step.status === "checked" && (
                          <Check size={18} className="text-white" />
                        )}
                      </div>
                    </div>

                    {/* Conteúdo do Passo - Se for o primeiro (index === 0), ganha o card */}
                    <div
                      className={`ml-6 flex-1 transition-all p-6 duration-300 
                      ${
                        index === 0
                          ? "bg-white border border-primary-vibrant rounded-2xl  shadow-xl -mt-2"
                          : "py-2"
                      }`}
                    >
                      {index === 0 && (
                        <div className="inline-flex items-center gap-2 px-3 py-1 w-fit rounded-full border border-dark/60 bg-transparent mb-4">
                          <div className="w-2 h-2 rounded-full bg-primary-vibrant" />
                          <span className="text-[11px] uppercase tracking-wider text-dark font-semibold">
                            Sessão Gratuita
                          </span>
                        </div>
                      )}

                      <h3 className="text-xl font-bold text-dark mb-2">
                        {step.title}
                      </h3>
                      <p
                        className={`text-pretty leading-relaxed text-base 
                        ${index === 0 ? "text-dark/80" : "text-dark/60"}`}
                      >
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="space-y-3 pt-6">
              <Button variant="black" className="w-full md:w-auto px-10">
                Quero minha sessão estratégica gratuita
              </Button>
              <p className="text-sm text-dark font-medium">
                Ganhe o Diagnóstico inicial sem custos.
              </p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative aspect-[16/14] lg:h-full w-full rounded-lg overflow-hidden"
          >
            <Image
              src={CollaborationImg}
              alt="Michel Stawicki com cliente"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
