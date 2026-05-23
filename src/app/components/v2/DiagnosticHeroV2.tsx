"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Loader2, ShieldCheck, X, BookOpen } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { useLocale, useTranslations } from "next-intl";

export default function DiagnosticHeroV2() {
  const t = useTranslations("DiagnosticHero");
  const locale = useLocale();
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const leadSchema = z.object({
    name: z.string().min(2, t("errors.nameRequired")),
    email: z.string().email(t("errors.emailInvalid")),
    company: z.string().min(2, t("errors.companyRequired")),
    phone: z.string().min(12, t("errors.phoneInvalid")),
  });

  type LeadFormData = z.infer<typeof leadSchema>;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
    defaultValues: { name: "", email: "", company: "", phone: "" },
  });

  const onSubmit = async (data: LeadFormData) => {
    setSubmitError("");
    setLoading(true);
    try {
      const res = await fetch("/enviar.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, locale }),
      });
      if (!res.ok) throw new Error();
      localStorage.setItem("fm_user", JSON.stringify(data));
      router.push(`/${locale}/v2/questions`);
    } catch {
      setSubmitError(t("form.submitError"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex flex-col lg:flex-row w-full bg-light">
      {/* Left Side: Dark Theme with Impact Headline */}
      <div className="relative w-full lg:w-[45%] bg-dark text-light flex flex-col justify-center px-8 py-20 lg:px-20 overflow-hidden">
        {/* Logo */}
        <div className="absolute top-8 left-8 lg:top-12 lg:left-20 z-20">
          <img src="/logo-financeiramente.svg" alt="FinanceiraMente" className="h-6 md:h-8" />
        </div>
        
        {/* Subtle Graphical Background Element */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -left-[20%] w-[70%] h-[70%] rounded-full bg-primary-deep/10 blur-[120px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative z-10 space-y-8"
        >
          {/* Time Indicator & Free Badge */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-light/10 bg-light/5 backdrop-blur-sm">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold tracking-widest text-emerald-400 uppercase">
                {locale === "en" ? "Free" : "Gratuito"}
              </span>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-light/5 backdrop-blur-sm">
              <Clock className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium tracking-wide text-white/80">
                {t("timeLabel")}
              </span>
            </div>
          </div>

          <h1 className="text-4xl md:text-4xl lg:text-[3.2rem] font-bold tracking-tight leading-[1.1] text-balance">
            {t("title")}
          </h1>

          <p className="text-lg md:text-xl text-white/60 leading-relaxed max-w-lg">
            {t("subtitle1")} {t("subtitle2")}
          </p>

          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex  items-center cursor-pointer gap-2 px-6 py-3 rounded-full border border-white/20 bg-transparent hover:bg-white/10 transition-colors text-white text-sm font-semibold tracking-wide"
          >
            <BookOpen className="w-4 h-4" />
            {locale === "en"
              ? "Learn the Methodology"
              : "Conheça a Metodologia"}
          </button>
        </motion.div>
      </div>

      {/* Right Side: Form (Light Theme) */}
      <div className="w-full lg:w-[55%] flex flex-col items-center justify-center px-6 py-20 lg:p-20 relative">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="w-full max-w-md"
        >
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-bold text-dark tracking-tight mb-2">
              {locale === "en"
                ? "Start your diagnostic"
                : "Comece seu diagnóstico"}
            </h2>
            <p className="text-dark/60">
              {locale === "en"
                ? "Fill out the data below to begin."
                : "Preencha os dados abaixo para iniciar."}
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name Field (Floating Label) */}
            <div className="relative group">
              <input
                type="text"
                id="name"
                {...register("name")}
                className="block w-full px-5 pb-3 pt-7 text-dark bg-white border border-dark/40  rounded-2xl appearance-none focus:outline-none focus:ring-0 focus:border-primary-deep peer transition-all duration-300"
                placeholder=" "
              />
              <label
                htmlFor="name"
                className="absolute text-gray-500 duration-300 transform -translate-y-3 scale-75 top-5 z-10 origin-[0] left-5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-primary-deep font-medium cursor-text"
              >
                {t("form.name")}
              </label>
              {errors.name && (
                <p className="text-red-500 text-xs mt-2 ml-1 font-medium">
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
                className="block w-full px-5 pb-3 pt-7 text-dark bg-white border border-dark/40 rounded-2xl appearance-none focus:outline-none focus:ring-0 focus:border-primary-deep peer transition-all duration-300"
                placeholder=" "
              />
              <label
                htmlFor="email"
                className="absolute text-gray-500 duration-300 transform -translate-y-3 scale-75 top-5 z-10 origin-[0] left-5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-primary-deep font-medium cursor-text"
              >
                {t("form.email")}
              </label>
              {errors.email && (
                <p className="text-red-500 text-xs mt-2 ml-1 font-medium">
                  {errors.email.message as string}
                </p>
              )}
            </div>

            {/* Phone Field */}
            <div className="relative group">
              <label className="block text-xs font-medium text-gray-500 ml-1 mb-1">
                {t("form.whatsapp")}
              </label>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <div
                    className={`flex bg-white rounded-2xl border transition-all duration-300 focus-within:border-primary-deep focus-within:ring-1 focus-within:ring-primary-deep/20 ${
                      errors.phone ? "border-red-500" : "border-dark/40"
                    }`}
                  >
                    <PhoneInput
                      defaultCountry="br"
                      value={field.value}
                      onChange={field.onChange}
                      className="w-full flex items-center"
                      inputClassName="!w-full !h-auto !border-none !bg-transparent !px-5 !py-4 !text-base !text-dark focus:!outline-none focus:!ring-0 !shadow-none font-medium"
                      countrySelectorStyleProps={{
                        buttonClassName:
                          "!h-auto  !py-4 !border-none !bg-transparent !pl-5 !pr-2 !shadow-none hover:!bg-transparent",
                      }}
                    />
                  </div>
                )}
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-2 ml-1 font-medium">
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
                className="block w-full px-5 pb-3 pt-7 text-dark bg-white border border-dark/40 rounded-2xl appearance-none focus:outline-none focus:ring-0 focus:border-primary-deep peer transition-all duration-300"
                placeholder=" "
              />
              <label
                htmlFor="company"
                className="absolute text-gray-500 duration-300 transform -translate-y-3 scale-75 top-5 z-10 origin-[0] left-5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-primary-deep font-medium cursor-text"
              >
                {t("form.company")}
              </label>
              {errors.company && (
                <p className="text-red-500 text-xs mt-2 ml-1 font-medium">
                  {errors.company.message as string}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="relative w-full py-4 px-8 cursor-pointer bg-dark hover:bg-black text-light rounded-2xl font-semibold text-lg transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.12)] disabled:opacity-80 disabled:cursor-not-allowed flex items-center justify-center overflow-hidden group"
              >
                <AnimatePresence mode="wait">
                  {loading ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex items-center gap-2"
                    >
                      <Loader2 className="w-6 h-6 animate-spin" />
                    </motion.div>
                  ) : (
                    <motion.span
                      key="text"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      {t("form.submitButton")}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              {submitError && (
                <p className="text-red-500 text-sm mt-4 text-center font-medium">
                  {submitError}
                </p>
              )}
            </div>
          </form>

          {/* Institutional Authority / Shield */}
          <div className="mt-8 flex flex-col items-center justify-center">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-gray-100/50 border border-gray-200/50">
              <div className="bg-primary-deep p-1.5 rounded-lg">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <p className="text-sm font-semibold text-dark/80">
                {locale === "en"
                  ? "FinanceiraMente Exclusive Methodology"
                  : "Metodologia Exclusiva FinanceiraMente"}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Methodology Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-6 md:p-10 max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute  cursor-pointer top-6 right-6 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-dark tracking-tight mb-3">
                    {locale === "en" ? "Methodology" : "Metodologia"}
                  </h3>
                  <p className="text-gray-600 font-medium">
                    {locale === "en"
                      ? "The analysis is based on the Financial Maturity Map, which organizes the financial evolution of companies into four phases."
                      : "A análise é baseada no Mapa de Maturidade Financeira - FinanceiraMente. Que organiza a evolução financeira das empresas em quatro fases."}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      id: 1,
                      pt: "Negócio no Escuro",
                      en: "Business in the Dark",
                    },
                    {
                      id: 2,
                      pt: "Consciência Financeira",
                      en: "Financial Awareness",
                    },
                    {
                      id: 3,
                      pt: "Estrutura Financeira",
                      en: "Financial Structure",
                    },
                    {
                      id: 4,
                      pt: "Inteligência Financeira",
                      en: "Financial Intelligence",
                    },
                  ].map((fase) => (
                    <div
                      key={fase.id}
                      className="flex items-center gap-4 bg-primary-vibrant/10 p-4 rounded-2xl border border-dark/10"
                    >
                      <div className="w-8 h-8 flex items-center justify-center rounded-full bg-dark text-light font-bold shrink-0">
                        {fase.id}
                      </div>
                      <span className="font-semibold text-gray-800">
                        {locale === "en" ? fase.en : fase.pt}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t border-dark/10">
                  <p className="text-gray-600 mb-6">
                    {locale === "en"
                      ? "The diagnostic is based on the 4 Financial Pillars of the FinanceiraMente Method, which support the company's financial management:"
                      : "O diagnóstico é baseado nos 4 Pilares Financeiros do Método FinanceiraMente, que representam os principais elementos da estrutura financeira de um negócio:"}
                  </p>

                  <div className="space-y-4">
                    {[
                      {
                        ptTitle: "Rentabilidade",
                        ptDesc:
                          "Entender onde o negócio realmente ganha dinheiro.",
                        enTitle: "Profitability",
                        enDesc:
                          "Understand where the business actually makes money.",
                      },
                      {
                        ptTitle: "Resultado",
                        ptDesc:
                          "Ter clareza sobre o desempenho financeiro da empresa.",
                        enTitle: "Result",
                        enDesc:
                          "Have clarity about the company's financial performance.",
                      },
                      {
                        ptTitle: "Caixa",
                        ptDesc: "Garantir liquidez para operar e crescer.",
                        enTitle: "Cash",
                        enDesc: "Ensure liquidity to operate and grow.",
                      },
                      {
                        ptTitle: "Retorno sobre investimento",
                        ptDesc:
                          "Avaliar se as decisões financeiras estão gerando valor.",
                        enTitle: "Return on investment",
                        enDesc:
                          "Evaluate if financial decisions are generating value.",
                      },
                    ].map((pilar, idx) => (
                      <div
                        key={idx}
                        className="bg-blue-50/50 p-4 rounded-2xl border border-dark/20"
                      >
                        <h4 className="font-bold text-dark mb-1">
                          {locale === "en" ? pilar.enTitle : pilar.ptTitle}
                        </h4>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {locale === "en" ? pilar.enDesc : pilar.ptDesc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 text-center">
                  <p className="text-gray-500 italic text-sm">
                    {locale === "en"
                      ? "Together, these pillars help identify weaknesses, opportunities for improvement, and financial evolution priorities."
                      : "Juntos, esses pilares ajudam a identificar fragilidades, oportunidades de melhoria e prioridades de evolução financeira."}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
