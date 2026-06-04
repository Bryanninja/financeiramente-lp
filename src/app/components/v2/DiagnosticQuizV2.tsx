"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { ArrowLeft, Loader2 } from "lucide-react";

export default function DiagnosticQuizV2() {
  const t = useTranslations("DiagnosticQuiz");
  const locale = useLocale();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const totalSteps = 12;
  const router = useRouter();

  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isFinishing, setIsFinishing] = useState(false);
  const [loadingTextIndex, setLoadingTextIndex] = useState(0);

  const loadingTexts =
    locale === "en"
      ? [
          "Analyzing your answers...",
          "Calculating your financial profile...",
          "Preparing your report...",
        ]
      : [
          "Analisando suas respostas...",
          "Calculando seu perfil financeiro...",
          "Preparando seu relatório...",
        ];

  const currentData =
    currentStep < totalSteps
      ? {
          pilar: t(`questions.${currentStep}.pilar`),
          question: t(`questions.${currentStep}.question`),
          options: [
            { id: "A", text: t(`questions.${currentStep}.options.0.text`) },
            { id: "B", text: t(`questions.${currentStep}.options.1.text`) },
            { id: "C", text: t(`questions.${currentStep}.options.2.text`) },
            { id: "D", text: t(`questions.${currentStep}.options.3.text`) },
          ],
        }
      : null;

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
  }, [router, locale]);

  // Loading text rotation
  useEffect(() => {
    if (isFinishing) {
      const interval = setInterval(() => {
        setLoadingTextIndex((prev) => (prev + 1) % loadingTexts.length);
      }, 1500);
      return () => clearInterval(interval);
    }
  }, [isFinishing, loadingTexts.length]);

  if (!isAuthorized) return null;

  const progress = ((currentStep + 1) / totalSteps) * 100;

  const handleNext = (optionId: string) => {
    const newAnswers = { ...answers, [currentStep]: optionId };
    setAnswers(newAnswers);

    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      finishQuiz(newAnswers);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const finishQuiz = (finalAnswers: Record<number, string>) => {
    setIsFinishing(true);

    const scoreMap: Record<string, number> = { A: 1, B: 2, C: 3, D: 4 };

    const pilarScores = [0, 3, 6, 9].map((start) =>
      [0, 1, 2].reduce((sum, offset) => {
        const ans = finalAnswers[start + offset] ?? "A";
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

    const rawUser = localStorage.getItem("fm_user");
    if (rawUser) {
      const user = JSON.parse(rawUser);

      // Dispara o evento de Lead do Meta Pixel
      if (typeof window !== "undefined" && (window as any).fbq) {
        (window as any).fbq("track", "Lead");
      }

      fetch("/enviar.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: user.name ?? "Usuário",
          email: user.email ?? "",
          company: user.company ?? "",
          phone: user.phone ?? "",
          phase: phase,
          score: totalScore,
          pilarScores: pilarScores,
          locale: locale,
        }),
      }).catch(() => {});
    }

    // Fake loading screen for 4 seconds
    setTimeout(() => {
      router.push(`/${locale}/diagnostic-result`);
    }, 4500);
  };

  if (isFinishing) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-light">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-8"
        >
          {/* Animated pulsing bars / circle */}
          <div className="relative flex items-center justify-center w-24 h-24">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              className="absolute inset-0 rounded-full border-[3px] border-primary-deep border-t-transparent"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
              className="absolute inset-2 rounded-full border-[3px] border-blue-400 border-b-transparent opacity-70"
            />
            <Loader2 className="w-8 h-8 text-primary-deep animate-pulse" />
          </div>

          <div className="h-8 overflow-hidden relative w-full max-w-sm text-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={loadingTextIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="text-xl font-medium tracking-tight text-dark"
              >
                {loadingTexts[loadingTextIndex]}
              </motion.p>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!currentData) return null;

  return (
    <section className="min-h-screen flex flex-col bg-light">
      {/* Top Header & Progress */}
      <div className="w-full bg-dark shadow-sm sticky top-0 z-50">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="h-1.5 bg-primary-vibrant"
        />
        <div className="max-w-4xl mx-auto w-full px-6 py-4 flex items-center justify-between">
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className={`flex items-center gap-2 font-medium transition-colors ${
              currentStep === 0
                ? "text-gray-700 cursor-not-allowed"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
            {locale === "en" ? "Back" : "Voltar"}
          </button>
          <div className="text-sm font-semibold tracking-widest uppercase text-gray-500">
            {t("question", { current: currentStep + 1, total: totalSteps })}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center px-6 py-12 lg:py-20 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={`step-${currentStep}`}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="w-full max-w-3xl flex flex-col items-center"
          >
            <div className="text-center mb-12 space-y-4">
              <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 border border-dark/60 text-primary-deep text-xs font-bold tracking-widest uppercase mb-4">
                {currentData.pilar}
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark leading-[1.2] tracking-tight text-balance">
                {currentData.question}
              </h2>
            </div>

            <div className="w-full grid grid-cols-1 gap-4">
              {currentData.options.map((option, index) => (
                <motion.button
                  key={option.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  onClick={() => handleNext(option.id)}
                  className="w-full text-left p-6 md:p-8 rounded-2xl border-2 border-gray-300 bg-white hover:border-primary-deep hover:shadow-[0_8px_30px_rgb(37,99,235,0.12)] transition-all duration-300 group flex items-center gap-6"
                >
                  <div className="w-12 h-12 shrink-0 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-700 group-hover:bg-primary-deep group-hover:text-white transition-colors">
                    {option.id}
                  </div>
                  <span className="text-lg md:text-xl font-medium text-gray-700 group-hover:text-dark transition-colors leading-relaxed">
                    {option.text}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
