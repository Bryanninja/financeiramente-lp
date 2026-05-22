"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Container from "../ui/Container";
import { variants, viewportConfig } from "@/app/lib/animations";

import Footer from "./Footer";
import Header from "./Header";
import { useLocale, useTranslations } from "next-intl";

export default function DiagnosticQuiz() {
  const t = useTranslations("DiagnosticQuiz");
  const locale = useLocale();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const totalSteps = 12;

  const currentData = currentStep < totalSteps ? {
    pilar: t(`questions.${currentStep}.pilar`),
    question: t(`questions.${currentStep}.question`),
    options: [
      { id: "A", text: t(`questions.${currentStep}.options.0.text`) },
      { id: "B", text: t(`questions.${currentStep}.options.1.text`) },
      { id: "C", text: t(`questions.${currentStep}.options.2.text`) },
      { id: "D", text: t(`questions.${currentStep}.options.3.text`) },
    ],
  } : null;

  const router = useRouter();

  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkGuard = async () => {
      const user = localStorage.getItem("fm_user");
      if (!user) {
        router.push(`/${locale}/diagnostic`);
      } else {
        setIsAuthorized(true);
      }
    };
    checkGuard();
  }, [router]);

  if (!isAuthorized) return null;

  if (!currentData) {
    return (
      <section className="bg-white min-h-screen flex items-center justify-center">
        <p className="text-dark/70 font-medium">{t("loading")}</p>
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
      const scoreMap: Record<string, number> = { A: 1, B: 2, C: 3, D: 4 };

      const pilarScores = [0, 3, 6, 9].map((start) =>
        [0, 1, 2].reduce((sum, offset) => {
          const ans = newAnswers[start + offset] ?? "A";
          return sum + (scoreMap[ans] ?? 1);
        }, 0),
      );

      const totalScore = pilarScores.reduce((a, b) => a + b, 0);

      let phase: number;
      if (totalScore <= 18) phase = 1;
      else if (totalScore <= 30) phase = 2;
      else if (totalScore <= 40) phase = 3;
      else phase = 4;

      localStorage.setItem(
        "fm_result",
        JSON.stringify({
          totalScore,
          phase,
          pilarScores,
        }),
      );

      router.push(`/${locale}/diagnostic-result`);
    }
  };

  return (
    <section>
      <Header />
      <Container className=" min-h-screen pt-36 md:pt-40 pb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={`step-${currentStep}`}
            variants={variants.staggerContainer}
            initial="initial"
            animate="animate"
            exit="initial"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start border-b border-dark/20 pb-16">
              <div className="lg:col-span-7 space-y-6">
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
                  {t("chooseBestOption")}
                </motion.p>
              </div>

              <div className="lg:col-span-5 space-y-4 lg:pt-2">
                <motion.div
                  variants={variants.fadeIn}
                  className="w-full h-1.5 bg-dark/10 rounded-full overflow-hidden"
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className="h-full bg-primary-deep"
                  />
                </motion.div>
                <motion.div
                  variants={variants.fadeInUp}
                  className="flex flex-col gap-4"
                >
                  <span className="text-2xl md:text-3xl text-dark">
                    {t("question", {
                      current: currentStep + 1,
                      total: totalSteps,
                    })}
                  </span>
                  <span className="text-sm font-medium text-dark/70 uppercase tracking-widest">
                    {currentData.pilar}
                  </span>
                </motion.div>
              </div>
            </div>

            <motion.div
              variants={variants.staggerContainer}
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
          </motion.div>
        </AnimatePresence>
      </Container>
      <Footer />
    </section>
  );
}
