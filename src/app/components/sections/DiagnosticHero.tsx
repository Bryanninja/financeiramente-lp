"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Watch } from "lucide-react";
import Container from "../ui/Container";
import Button from "../ui/Button";
import { variants } from "@/app/lib/animations";

// Importações do Formulário e Validação
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Importações do Telefone
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css"; // CSS base da biblioteca

// 1. Criando o Schema de Validação com Zod
const leadSchema = z.object({
  name: z.string().min(2, "O nome é obrigatório."),
  email: z.string().email("Digite um e-mail válido."),
  company: z.string().min(2, "O nome da empresa é obrigatório."),
  phone: z.string().min(12, "Digite um telefone válido."), // min 12 para garantir o código do país + DDD
});

type LeadFormData = z.infer<typeof leadSchema>;

export default function DiagnosticHero() {
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const router = useRouter();

  // 2. Configurando o React Hook Form com Zod
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      phone: "",
    },
  });

  // 3. Função de envio
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

      // Salva no localStorage para usar na tela de resultado depois
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Lado Esquerdo: Texto */}
          <motion.div
            variants={variants.staggerContainer}
            initial="initial"
            animate="animate"
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
              respostas fornecidas.
            </motion.p>
          </motion.div>

          {/* Lado Direito: Formulário com React Hook Form */}
          <motion.form
            variants={variants.fadeInUp}
            initial="initial"
            animate="animate"
            onSubmit={handleSubmit(onSubmit)}
            className="rounded-2xl space-y-6"
          >
            {/* Campo: Nome */}
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

            {/* Campo: E-mail */}
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

            {/* Campo: Telefone/WhatsApp */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-dark">
                WhatsApp
              </label>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <div
                    // 1. Removi o 'overflow-hidden' para o dropdown poder "vazar" pra fora
                    // 2. Removi o 'bg-white' para o fundo ficar idêntico aos outros inputs
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

            {/* Campo: Empresa */}
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

            {/* Botão Submit */}
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
        </div>
      </Container>
    </section>
  );
}
