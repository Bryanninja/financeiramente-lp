"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Container from "../ui/Container";
import { variants, viewportConfig } from "@/app/lib/animations";
import { questions } from "@/app/data/questions";
import Footer from "./Footer";
import Header from "./Header";

export default function DiagnosticQuiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = questions.length;
  const currentData = questions[currentStep];

  // IMPORTANTE: Checagem de segurança para evitar o TypeError
  if (!currentData) {
    return (
      <section className="bg-white min-h-screen flex items-center justify-center">
        <p className="text-dark/70 font-medium">Carregando diagnóstico...</p>
      </section>
    );
  }

  const progress = ((currentStep + 1) / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Redirecionar para página de resultado quando acabar
      console.log("Diagnóstico concluído");
    }
  };

  return (
    <section className="bg-white min-h-screen ">
      <Header />
      <Container className="pt-24 pb-24 md:pt-32 md:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start border-b border-dark/20 pb-16">
          <motion.div
            key={`text-${currentStep}`}
            variants={variants.staggerContainer}
            initial="initial"
            animate="animate"
            className="lg:col-span-7 space-y-6"
          >
            <motion.h2
              variants={variants.fadeInUp}
              className="text-3xl md:text-4xl font-bold max-w-xl text-dark leading-tight"
            >
              {currentData.question}
            </motion.h2>
            <motion.p
              variants={variants.fadeInUp}
              className="text-dark/70 text-lg"
            >
              Escolha a melhor opção abaixo.
            </motion.p>
          </motion.div>

          <div className="lg:col-span-5 space-y-4 lg:pt-2">
            <div className="w-full h-1.5 bg-dark/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-primary-deep"
              />
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-2xl md:text-3xl text-dark">
                Questão {currentStep + 1} de {totalSteps}
              </span>
              <span className="text-sm font-medium text-dark/70 uppercase tracking-widest">
                {currentData.pilar}
              </span>
            </div>
          </div>
        </div>

        <motion.div
          key={`options-${currentStep}`}
          variants={variants.staggerContainer}
          initial="initial"
          animate="animate"
          className="divide-y divide-dark/20"
        >
          {currentData.options.map((option) => (
            <motion.button
              key={option.id}
              variants={variants.fadeInUp}
              onClick={handleNext}
              className="w-full flex items-center gap-8 py-8 group hover:bg-light/50 transition-colors text-left cursor-pointer"
            >
              <div className="w-12 h-12 shrink-0 rounded-full border border-dark/20 flex items-center justify-center text-xl font-medium group-hover:border-primary-deep group-hover:bg-primary-deep group-hover:text-white transition-all">
                {option.id}
              </div>
              <span className="text-xl md:text-2xl text-dark/80 group-hover:text-dark transition-colors font-medium">
                {option.text}
              </span>
            </motion.button>
          ))}
        </motion.div>
      </Container>
      <Footer />
    </section>
  );
}
