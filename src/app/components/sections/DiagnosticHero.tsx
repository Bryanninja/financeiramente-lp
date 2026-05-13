"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Watch } from "lucide-react";
import Container from "../ui/Container";
import Button from "../ui/Button";
import { variants } from "@/app/lib/animations";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

const leadSchema = z.object({
  name: z.string().min(2, "O nome é obrigatório."),
  email: z.string().email("Digite um e-mail válido."),
  company: z.string().min(2, "O nome da empresa é obrigatório."),
  phone: z.string().min(12, "Digite um telefone válido."),
});

type LeadFormData = z.infer<typeof leadSchema>;

export default function DiagnosticHero() {
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const router = useRouter();

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
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      localStorage.setItem("fm_user", JSON.stringify(data));
      router.push("/questions");
    } catch {
      setSubmitError(
        "Erro ao iniciar. Verifique sua conexão e tente novamente.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-light flex justify-center items-center pt-32 pb-20 min-h-screen">
      <Container>
        {/* O PAI do grid agora controla o fluxo de ambas as colunas */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start"
          variants={variants.staggerContainer}
          initial="initial"
          animate="animate"
        >
          {/* Lado Esquerdo: Texto (Inicia a cascata interna) */}
          <motion.div
            variants={variants.staggerContainer}
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
              respostas fornecidas no diagnóstico.
            </motion.p>
          </motion.div>

          {/* Lado Direito: Formulário (Entra por último na fila do grid) */}
          <motion.form
            variants={variants.fadeInUp}
            onSubmit={handleSubmit(onSubmit)}
            className="rounded-2xl space-y-6"
          >
            <div className="space-y-2">
              <label className="text-sm font-semibold text-dark">
                Seu Nome
              </label>
              <input
                type="text"
                placeholder="Digite seu nome completo"
                {...register("name")}
                className={`w-full px-4 py-3 mt-2 rounded-lg border focus:border-primary-deep outline-none transition-colors ${
                  errors.name ? "border-red-500" : "border-dark/40"
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-dark">
                E-mail Profissional
              </label>
              <input
                type="email"
                placeholder="Digite seu e-mail"
                {...register("email")}
                className={`w-full px-4 py-3 rounded-lg border mt-2 focus:border-primary-deep outline-none transition-colors ${
                  errors.email ? "border-red-500" : "border-dark/40"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-dark">
                WhatsApp
              </label>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <div
                    className={`flex mt-2 rounded-lg border transition-colors focus-within:border-primary-deep ${
                      errors.phone ? "border-red-500" : "border-dark/40"
                    }`}
                  >
                    <PhoneInput
                      defaultCountry="br"
                      value={field.value}
                      onChange={field.onChange}
                      className="w-full flex items-center"
                      inputClassName="!w-full !h-auto !border-none !bg-transparent !px-4 !py-3 !text-base !text-dark focus:!outline-none focus:!ring-0 !shadow-none"
                      countrySelectorStyleProps={{
                        buttonClassName:
                          "!h-auto !py-3 !border-none !bg-transparent !pl-4 !pr-2 !shadow-none hover:!bg-transparent",
                      }}
                    />
                  </div>
                )}
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-dark">
                Nome da Empresa
              </label>
              <input
                type="text"
                placeholder="Digite o nome da sua empresa"
                {...register("company")}
                className={`w-full px-4 py-3 rounded-lg border mt-2 focus:border-primary-deep outline-none transition-colors ${
                  errors.company ? "border-red-500" : "border-dark/40"
                }`}
              />
              {errors.company && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.company.message}
                </p>
              )}
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                variant="black"
                className="w-full text-lg disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? "Iniciando..." : "Começar Diagnóstico Agora"}
              </Button>
              {submitError && (
                <p className="text-red-500 text-sm mt-4 text-center">
                  {submitError}
                </p>
              )}
            </div>
          </motion.form>
        </motion.div>
      </Container>
    </section>
  );
}
