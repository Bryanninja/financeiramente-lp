"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Clock, Watch } from "lucide-react";
import Container from "../ui/Container";
import Button from "../ui/Button";
import { variants } from "@/app/lib/animations";

export default function DiagnosticHero() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    if (!name.trim() || !email.trim() || !company.trim()) {
      setError("Preencha todos os campos para continuar.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/send-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, company }),
      });

      if (!res.ok) throw new Error();

      localStorage.setItem("fm_user", JSON.stringify({ name, email, company }));
      router.push("/questions");
    } catch {
      setError("Erro ao enviar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-light pt-32 pb-32 md:pt-44 md:pb-44">
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

          {/* Lado Direito: Formulário */}
          <motion.div
            variants={variants.fadeInUp}
            initial="initial"
            animate="animate"
            className=" rounded-2xl space-y-8"
          >
            <div className="space-y-2">
              <label className="text-sm font-semibold text-dark">
                Seu Nome
              </label>
              <input
                type="text"
                placeholder="Digite seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 mt-2 rounded-lg border border-dark/40 focus:border-primary-deep outline-none transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-dark">
                E-mail Profissional
              </label>
              <input
                type="email"
                placeholder="Digite seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border mt-2 border-dark/40 focus:border-primary-deep outline-none transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold  text-dark">
                Nome da Empresa
              </label>
              <input
                type="text"
                placeholder="Digite o nome da sua empresa"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border mt-2 border-dark/40 focus:border-primary-deep outline-none transition-colors"
              />
            </div>

            <div>
              <Button
                variant="black"
                className="w-full text-lg disabled:opacity-70 disabled:cursor-not-allowed"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Enviando..." : "Começar Diagnóstico Agora"}
              </Button>
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
