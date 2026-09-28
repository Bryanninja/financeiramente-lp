"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Watch, X, Loader2 } from "lucide-react";
import Container from "../ui/Container";
import { variants } from "@/app/lib/animations";
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
      router.push(`/${locale}/questions`);
    } catch {
      setSubmitError(t("form.submitError"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="diagnostic"
      className="bg-light min-h-screen flex justify-center items-center pt-36 pb-20 2xl:pt-40"
    >
      <Container>
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start"
          variants={variants.staggerContainer}
          initial="initial"
          animate="animate"
        >
          {/* Left Column: Headlines (Identical to V1) */}
          <motion.div
            variants={variants.staggerContainer}
            className="space-y-6 md:space-y-8"
          >
            <motion.div
              variants={variants.fadeInUp}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-lg border border-primary-vibrant/70"
            >
              <Watch className="text-dark/70" />
              <span className="text-sm font-semibold text-dark/70 tracking-wider">
                {t("timeLabel")}
              </span>
            </motion.div>

            <motion.h1
              variants={variants.fadeInUp}
              className="text-4xl md:text-5xl text-balance font-bold text-dark leading-[1.1] tracking-tight"
            >
              {t("title")}
            </motion.h1>

            <motion.p
              variants={variants.fadeInUp}
              className="text-lg text-dark/70 max-w-lg leading-relaxed"
            >
              {t("subtitle1")} {t("subtitle2")}
            </motion.p>

            {/* Methodology Outline Button (Left Column) - Hidden on mobile to keep lead focused */}
            <div className="hidden md:block">
              <motion.div variants={variants.fadeInUp} className="pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center cursor-pointer gap-2 px-6 py-3 rounded-2xl border border-dark/20 hover:border-primary-deep hover:bg-primary-deep/5 transition-all text-dark text-sm font-semibold tracking-wide"
                >
                  {locale === "en"
                    ? "Learn the Methodology"
                    : "Conheça a Metodologia"}
                </button>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column: Form (V2 Floating Labels) */}
          <motion.form
            variants={variants.fadeInUp}
            onSubmit={handleSubmit(onSubmit)}
            className="rounded-2xl space-y-6"
          >
            {/* Name Field (Floating Label) */}
            <div className="relative group">
              <input
                type="text"
                id="name"
                {...register("name")}
                className={`block w-full px-5 pb-3 pt-7 text-dark bg-white border rounded-2xl appearance-none focus:outline-none focus:ring-0 focus:border-primary-deep peer transition-all duration-300 ${
                  errors.name ? "border-red-500" : "border-dark/40"
                }`}
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
                className={`block w-full px-5 pb-3 pt-7 text-dark bg-white border rounded-2xl appearance-none focus:outline-none focus:ring-0 focus:border-primary-deep peer transition-all duration-300 ${
                  errors.email ? "border-red-500" : "border-dark/40"
                }`}
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

            {/* Phone Field (Floating Label Style) */}
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
                      inputClassName="!w-full !h-auto !border-none !bg-transparent !px-5 !py-[20px] !text-base !text-dark focus:!outline-none focus:!ring-0 !shadow-none font-medium"
                      countrySelectorStyleProps={{
                        buttonClassName:
                          "!h-auto !py-[20px] !border-none !bg-transparent !pl-5 !pr-2 !shadow-none hover:!bg-transparent",
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
                className={`block w-full px-5 pb-3 pt-7 text-dark bg-white border rounded-2xl appearance-none focus:outline-none focus:ring-0 focus:border-primary-deep peer transition-all duration-300 ${
                  errors.company ? "border-red-500" : "border-dark/40"
                }`}
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

            <div className="pt-2">
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

            {submitError && (
              <p className="text-red-500 text-sm mt-4 text-center font-medium">
                {submitError}
              </p>
            )}
          </motion.form>
        </motion.div>
      </Container>

      {/* Methodology Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl max-h-[90vh] flex flex-col overflow-hidden"
            >
              {/* Sticky Top Bar for Close Button */}
              <div className="flex justify-end p-4 md:px-6 md:pt-6 pb-2 shrink-0 bg-white z-10">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="cursor-pointer p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-gray-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Content Body */}
              <div className="overflow-y-auto px-6 pb-6 md:px-10 md:pb-10 space-y-8">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-dark tracking-tight mb-3">
                    {locale === "en" ? "Methodology" : "Metodologia"}
                  </h3>
                  <p className="text-gray-600 font-medium">
                    {locale === "en"
                      ? "The analysis is based on the Financial Maturity Map from FinanceiraMente, which organizes the financial evolution of companies into four phases."
                      : "A análise é baseada no Mapa de Maturidade Financeira da FinanceiraMente. Que organiza a evolução financeira das empresas em quatro fases."}
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
