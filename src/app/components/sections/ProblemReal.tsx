"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  TrendingUp,
  Search,
  Users,
  Settings,
  MinusCircle,
  Layers,
  PieChart,
  Target,
  Zap,
  Activity,
  BarChart3,
} from "lucide-react";
import Container from "../ui/Container";
import Button from "../ui/Button";
import { fadeInUp, staggerContainer } from "@/app/lib/animations";

// Imagens (substitua pelos seus caminhos)
import PaymentImg from "../../assets/img/payment.webp";
import CalcImg from "../../assets/img/calculation.webp";

const IconChip = ({
  icon: Icon,
  text,
  color = "primary",
}: {
  icon: any;
  text: string;
  color?: "primary" | "accent";
}) => (
  <div className="flex items-center gap-2 px-3 py-3 bg-[#E3E2DE] backdrop-blur-sm rounded-lg border border-black/5">
    <div
      className={`p-2 rounded-lg ${color === "primary" ? "bg-primary-deep" : "bg-accent-bronze"} text-white`}
    >
      <Icon size={16} />
    </div>
    <span className="text-base font-normal text-dark/80">{text}</span>
  </div>
);

export default function ProblemReal() {
  return (
    <section className="bg-light py-24 space-y-32">
      <Container className="space-y-16 md:space-y-32">
        {/* PARTE 1: O Problema Real */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-5xl font-bold text-dark leading-tight">
                  O problema real do <br /> pequeno empresário
                </h2>
                <p className="text-dark font-medium text-2xl">
                  A maioria dos empresários aprende a:
                </p>
              </div>

              <div className="flex flex-wrap gap-6">
                <IconChip icon={ArrowUpRight} text="Vender" />
                <IconChip icon={Users} text="Atender Clientes" />
                <IconChip icon={Settings} text="Fazer o negócio funcionar" />
              </div>
            </div>

            <div className="p-4 bg-accent-bronze/20 rounded-lg border-accent-bronze rounded-r-md">
              <p className="text-accent-bronze font-bold">
                Mas raramente aprende a estruturar financeiramente a empresa.
              </p>
            </div>

            <Button
              variant="outline"
              className="border-dark text-dark hover:bg-dark hover:text-white"
            >
              Agendar Sessão Estratégica FinanceiraMente
            </Button>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            className="relative aspect-square rounded-2xl overflow-hidden "
          >
            <Image
              src={PaymentImg}
              alt="Pagamento com cartão"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>

        {/* PARTE 2: Conforme o negócio cresce */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            className="order-2 lg:order-1 relative aspect-square rounded-2xl overflow-hidden"
          >
            <Image
              src={CalcImg}
              alt="Cálculos financeiros"
              fill
              className="object-cover"
            />
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="order-1 lg:order-2 space-y-8"
          >
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-dark leading-tight">
                Conforme o negócio cresce, aumentam também:
              </h2>

              <div className="flex flex-wrap gap-3">
                <IconChip icon={MinusCircle} text="Despesas" color="accent" />
                <IconChip icon={Layers} text="Complexidade" color="accent" />
                <IconChip
                  icon={PieChart}
                  text="Decisões financeiras"
                  color="accent"
                />
              </div>
            </div>

            <Button
              variant="outline"
              className="border-dark text-dark hover:bg-dark hover:text-white"
            >
              Agendar Sessão Estratégica
            </Button>
          </motion.div>
        </div>

        {/* PARTE 3: Administrar no escuro */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className=" space-y-12"
        >
          <div className="max-w-3xl space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-dark leading-tight">
              Sem uma estrutura clara de gestão financeira, o empresário passa a
              administrar o negócio no escuro.
            </h2>
            <p className="text-dark/80 text-xl font-medium">
              O dinheiro entra, mas não fica claro:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Search, text: "Onde está o lucro." },
              { icon: Activity, text: "Quanto o negócio realmente gera." },
              { icon: BarChart3, text: "Se o caixa sustenta a operação." },
              { icon: Target, text: "Se as decisões estão criando valor." },
            ].map((card, i) => (
              <div
                key={i}
                className="bg-[#E3E2DE] p-8 rounded-xl border border-black/5 flex flex-col gap-6 transition-all duration-300 hover:brightness-95 hover:shadow-md cursor-default"
              >
                <div className="w-12 h-12 flex items-center justify-center bg-white rounded-lg shadow-sm">
                  <card.icon size={24} className="text-dark" />
                </div>
                <p className="text-dark font-bold text-xl leading-snug">
                  {card.text}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
