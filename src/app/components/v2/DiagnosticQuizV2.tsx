"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import {
  ArrowLeft,
  Loader2,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

export default function DiagnosticQuizV2() {
  const t = useTranslations("DiagnosticQuiz");
  const tHero = useTranslations("DiagnosticHero");
  const locale = useLocale();
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const totalSteps = 12;

  // New state: Capturing lead after 12 questions
  const [isCapturingLead, setIsCapturingLead] = useState(false);
  const [computedResult, setComputedResult] = useState<{
    totalScore: number;
    phase: number;
    pilarScores: number[];
  } | null>(null);

  const [isFinishing, setIsFinishing] = useState(false);
  const [loadingTextIndex, setLoadingTextIndex] = useState(0);
  const [formLoading, setFormLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

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

  // Lead Form Schema
  const leadSchema = z.object({
    name: z.string().min(2, tHero("errors.nameRequired")),
    email: z.string().email(tHero("errors.emailInvalid")),
    company: z.string().min(2, tHero("errors.companyRequired")),
    phone: z.string().min(12, tHero("errors.phoneInvalid")),
  });

  type LeadFormData = z.infer<typeof leadSchema>;

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
    defaultValues: { name: "", email: "", company: "", phone: "" },
  });

  // Pre-fill existing user info if previously saved in localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("fm_user");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.name) setValue("name", parsed.name);
        if (parsed.email) setValue("email", parsed.email);
        if (parsed.company) setValue("company", parsed.company);
        if (parsed.phone) setValue("phone", parsed.phone);
      }
    } catch {
      // Ignore parse errors
    }
  }, [setValue]);

  // Loading text rotation during result preparation
  useEffect(() => {
    if (isFinishing) {
      const interval = setInterval(() => {
        setLoadingTextIndex((prev) => (prev + 1) % loadingTexts.length);
      }, 1500);
      return () => clearInterval(interval);
    }
  }, [isFinishing, loadingTexts.length]);

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

  const progress = isCapturingLead
    ? 100
    : ((currentStep + 1) / totalSteps) * 100;

  const handleNext = (optionId: string) => {
    const newAnswers = { ...answers, [currentStep]: optionId };
    setAnswers(newAnswers);

    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Compute scores after Question 12 is answered
      const scoreMap: Record<string, number> = { A: 1, B: 2, C: 3, D: 4 };

      const pilarScores = [0, 3, 6, 9].map((start) =>
        [0, 1, 2].reduce((sum, offset) => {
          const ans = newAnswers[start + offset] ?? "A";
          return sum + (scoreMap[ans] ?? 1);
        }, 0)
      );

      const totalScore = pilarScores.reduce((a, b) => a + b, 0);

      let phase: number;
      if (totalScore <= 18) phase = 1;
      else if (totalScore <= 30) phase = 2;
      else if (totalScore <= 40) phase = 3;
      else phase = 4;

      setComputedResult({ totalScore, phase, pilarScores });
      setIsCapturingLead(true);
    }
  };

  const handleBack = () => {
    if (isCapturingLead) {
      setIsCapturingLead(false);
      return;
    }
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Submit Lead & Result
  const onLeadSubmit = async (data: LeadFormData) => {
    if (!computedResult) return;
    setSubmitError("");
    setFormLoading(true);

    try {
      localStorage.setItem("fm_user", JSON.stringify(data));
      localStorage.setItem("fm_result", JSON.stringify(computedResult));

      // Trigger Meta Pixel Lead event
      if (typeof window !== "undefined" && (window as any).fbq) {
        (window as any).fbq("track", "Lead");
      }

      await fetch("/enviar.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name ?? "Usuário",
          email: data.email ?? "",
          company: data.company ?? "",
          phone: data.phone ?? "",
          phase: computedResult.phase,
          score: computedResult.totalScore,
          pilarScores: computedResult.pilarScores,
          locale: locale,
        }),
      }).catch(() => {});

      setIsFinishing(true);

      setTimeout(() => {
        router.push(`/${locale}/diagnostic-result`);
      }, 4500);
    } catch {
      setSubmitError(tHero("form.submitError"));
      setFormLoading(false);
    }
  };

  // 1. Loading Screen (Rotating calculation texts)
  if (isFinishing) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-light px-4">
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
            disabled={currentStep === 0 && !isCapturingLead}
            className={`flex items-center gap-2 font-medium transition-colors ${
              currentStep === 0 && !isCapturingLead
                ? "text-gray-700 cursor-not-allowed"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
            {locale === "en" ? "Back" : "Voltar"}
          </button>
          <div className="text-sm font-semibold tracking-widest uppercase text-gray-400">
            {isCapturingLead
              ? t("finalStep")
              : t("question", { current: currentStep + 1, total: totalSteps })}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center px-4 sm:px-6 py-8 sm:py-12 lg:py-16 overflow-hidden">
        <AnimatePresence mode="wait">
          {/* STEP 2: LEAD CAPTURE AFTER QUESTION 12 */}
          {isCapturingLead ? (
            <motion.div
              key="lead-capture"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-xl flex flex-col items-center"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-semibold tracking-wide mb-6">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{t("leadBadge")}</span>
              </div>

              {/* Title & Subtitle */}
              <div className="text-center mb-8 space-y-3">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark leading-tight tracking-tight text-balance">
                  {t("leadTitle")}
                </h2>
                <p className="text-sm sm:text-base text-dark/70 max-w-md mx-auto leading-relaxed">
                  {t("leadSubtitle")}
                </p>
              </div>

              {/* Form Card */}
              <div className="w-full bg-white p-6 sm:p-8 rounded-3xl border border-dark/10 shadow-[0_10px_40px_rgba(0,0,0,0.06)]">
                {submitError && (
                  <div className="p-4 mb-6 text-sm text-red-700 bg-red-50 rounded-xl border border-red-200">
                    {submitError}
                  </div>
                )}

                <form
                  onSubmit={handleSubmit(onLeadSubmit)}
                  className="space-y-5"
                >
                  {/* Name Field (Floating Label) */}
                  <div className="relative group">
                    <input
                      type="text"
                      id="name"
                      {...register("name")}
                      className={`block w-full px-5 pb-3 pt-7 text-dark bg-white border rounded-2xl appearance-none focus:outline-none focus:ring-0 focus:border-primary-deep peer transition-all duration-300 ${
                        errors.name ? "border-red-500" : "border-dark/30"
                      }`}
                      placeholder=" "
                    />
                    <label
                      htmlFor="name"
                      className="absolute text-gray-500 duration-300 transform -translate-y-3 scale-75 top-5 z-10 origin-[0] left-5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-primary-deep font-medium cursor-text"
                    >
                      {tHero("form.name")}
                    </label>
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1.5 ml-1 font-medium">
                        {errors.name.message as string}
                      </p>
                    )}
                  </div>

                  {/* Email Field (Floating Label) */}
                  <div className="relative group">
                    <input
                      type="email"
                      id="email"
                      {...register("email")}
                      className={`block w-full px-5 pb-3 pt-7 text-dark bg-white border rounded-2xl appearance-none focus:outline-none focus:ring-0 focus:border-primary-deep peer transition-all duration-300 ${
                        errors.email ? "border-red-500" : "border-dark/30"
                      }`}
                      placeholder=" "
                    />
                    <label
                      htmlFor="email"
                      className="absolute text-gray-500 duration-300 transform -translate-y-3 scale-75 top-5 z-10 origin-[0] left-5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-primary-deep font-medium cursor-text"
                    >
                      {tHero("form.email")}
                    </label>
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1.5 ml-1 font-medium">
                        {errors.email.message as string}
                      </p>
                    )}
                  </div>

                  {/* WhatsApp Field */}
                  <div className="relative group">
                    <label className="block text-xs font-medium text-gray-500 ml-1 mb-1">
                      {tHero("form.whatsapp")}
                    </label>
                    <Controller
                      name="phone"
                      control={control}
                      render={({ field }) => (
                        <div
                          className={`flex bg-white rounded-2xl border transition-all duration-300 focus-within:border-primary-deep focus-within:ring-1 focus-within:ring-primary-deep/20 ${
                            errors.phone ? "border-red-500" : "border-dark/30"
                          }`}
                        >
                          <PhoneInput
                            defaultCountry="br"
                            value={field.value}
                            onChange={field.onChange}
                            className="w-full flex items-center"
                            inputClassName="!w-full !h-auto !border-none !bg-transparent !px-5 !py-[18px] !text-base !text-dark focus:!outline-none focus:!ring-0 !shadow-none font-medium"
                            countrySelectorStyleProps={{
                              buttonClassName:
                                "!h-auto !py-[18px] !border-none !bg-transparent !pl-5 !pr-2 !shadow-none hover:!bg-transparent",
                            }}
                          />
                        </div>
                      )}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1.5 ml-1 font-medium">
                        {errors.phone.message as string}
                      </p>
                    )}
                  </div>

                  {/* Company Field (Floating Label) */}
                  <div className="relative group">
                    <input
                      type="text"
                      id="company"
                      {...register("company")}
                      className={`block w-full px-5 pb-3 pt-7 text-dark bg-white border rounded-2xl appearance-none focus:outline-none focus:ring-0 focus:border-primary-deep peer transition-all duration-300 ${
                        errors.company ? "border-red-500" : "border-dark/30"
                      }`}
                      placeholder=" "
                    />
                    <label
                      htmlFor="company"
                      className="absolute text-gray-500 duration-300 transform -translate-y-3 scale-75 top-5 z-10 origin-[0] left-5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-primary-deep font-medium cursor-text"
                    >
                      {tHero("form.company")}
                    </label>
                    {errors.company && (
                      <p className="text-red-500 text-xs mt-1.5 ml-1 font-medium">
                        {errors.company.message as string}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-3">
                    <button
                      type="submit"
                      disabled={formLoading}
                      className="w-full py-4 px-8 cursor-pointer bg-primary-vibrant hover:bg-primary-deep text-white rounded-2xl font-bold text-base sm:text-lg transition-all duration-300 shadow-[0_10px_30px_rgba(37,99,235,0.3)] hover:shadow-[0_15px_40px_rgba(30,58,138,0.4)] hover:scale-[1.01] active:scale-[0.99] disabled:opacity-80 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                    >
                      {formLoading ? (
                        <div className="flex items-center gap-2">
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>{tHero("form.loadingButton")}</span>
                        </div>
                      ) : (
                        <>
                          <span>{t("leadButton")}</span>
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </div>

                  {/* Privacy note */}
                  <div className="flex items-center justify-center gap-2 pt-2 text-xs text-dark/60 text-center font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-primary-deep shrink-0" />
                    <span>{t("leadPrivacy")}</span>
                  </div>
                </form>
              </div>
            </motion.div>
          ) : (
            /* STEP 1: 12 INTERACTIVE QUESTIONS */
            currentData && (
              <motion.div
                key={`step-${currentStep}`}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="w-full max-w-3xl flex flex-col items-center"
              >
                <div className="text-center mb-8 sm:mb-12 space-y-3">
                  <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 border border-primary-deep/20 text-primary-deep text-xs font-bold tracking-widest uppercase">
                    {currentData.pilar}
                  </span>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-dark leading-[1.2] tracking-tight text-balance">
                    {currentData.question}
                  </h2>
                </div>

                <div className="w-full grid grid-cols-1 gap-3.5 sm:gap-4">
                  {currentData.options.map((option, index) => (
                    <motion.button
                      key={option.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.08, duration: 0.25 }}
                      onClick={() => handleNext(option.id)}
                      className="w-full text-left p-5 sm:p-6 md:p-7 rounded-2xl border-2 border-gray-200 bg-white hover:border-primary-deep hover:shadow-[0_8px_30px_rgb(37,99,235,0.12)] transition-all duration-200 group flex items-center gap-4 sm:gap-6 cursor-pointer"
                    >
                      <div className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded-full bg-gray-100 flex items-center justify-center font-bold text-sm sm:text-base text-gray-700 group-hover:bg-primary-deep group-hover:text-white transition-colors">
                        {option.id}
                      </div>
                      <span className="text-base sm:text-lg md:text-xl font-medium text-gray-800 group-hover:text-dark transition-colors leading-relaxed">
                        {option.text}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
