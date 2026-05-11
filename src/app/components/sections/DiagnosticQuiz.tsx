"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Container from "../ui/Container";
import { variants, viewportConfig } from "@/app/lib/animations";
import { questions } from "@/app/data/questions";
import Footer from "./Footer";
import Header from "./Header";

export default function DiagnosticQuiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const totalSteps = questions.length;
  const currentData = questions[currentStep];
  const router = useRouter();

  // 1. Criamos um estado para saber se ele tem permissão
  const [isAuthorized, setIsAuthorized] = useState(false);

  // 2. Checagem de segurança assim que a página monta
  useEffect(() => {
    const checkGuard = async () => {
      const user = localStorage.getItem("fm_user");
      if (!user) {
        // Se não tem usuário salvo, manda pro início
        router.push("/diagnostic");
      } else {
        // Se tem, libera a tela
        setIsAuthorized(true);
      }
    };
    checkGuard();
  }, [router]);

  // 3. Se não estiver autorizado ainda (ou estiver redirecionando), não mostra nada
  if (!isAuthorized) return null;

  // IMPORTANTE: Checagem de segurança para evitar o TypeError
  if (!currentData) {
    return (
      <section className="bg-white min-h-screen flex items-center justify-center">
        <p className="text-dark/70 font-medium">Carregando diagnóstico...</p>
      </section>
    );
  }

  const progress = ((currentStep + 1) / totalSteps) * 100;

  const handleNext = (optionId: string) => {
    const newAnswers = { ...answers, [currentStep]: optionId };
    setAnswers(newAnswers);

    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Calcular pontuação
      const scoreMap: Record<string, number> = { A: 1, B: 2, C: 3, D: 4 };

      // Pilares: perguntas 0-2 = Rentabilidade, 3-5 = Resultado, 6-8 = Caixa, 9-11 = ROI
      const pilarScores = [0, 3, 6, 9].map((start) =>
        [0, 1, 2].reduce((sum, offset) => {
          const ans = newAnswers[start + offset] ?? "A";
          return sum + (scoreMap[ans] ?? 1);
        }, 0),
      );

      const totalScore = pilarScores.reduce((a, b) => a + b, 0);

      // Determinar fase (1 a 4)
      let phase: number;
      if (totalScore <= 18) phase = 1;
      else if (totalScore <= 30) phase = 2;
      else if (totalScore <= 40) phase = 3;
      else phase = 4;

      // Salvar no localStorage
      localStorage.setItem(
        "fm_result",
        JSON.stringify({
          totalScore,
          phase,
          pilarScores, // [rentabilidade, resultado, caixa, roi]
        }),
      );

      router.push("/diagnostic-result");
    }
  };

  return (
    <section>
      <Header />
      <Container className=" min-h-screen pt-36 md:pt-40 pb-20">
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
              onClick={() => handleNext(option.id)}
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
