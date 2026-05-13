"use client";

import { motion } from "framer-motion";
import Container from "../ui/Container";
import { variants, viewportConfig } from "@/app/lib/animations";
import Image, { StaticImageData } from "next/image";
import { phaseContent } from "@/app/data/resultContent";
import {
  LucideIcon,
  PieChart,
  BarChart3,
  Wallet,
  TrendingUp,
} from "lucide-react";
import dynamic from "next/dynamic";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  ChartOptions,
  ChartData,
} from "chart.js";

import Fase1Img from "../../assets/img/fase-1.webp";
import Fase2Img from "../../assets/img/fase-2.webp";
import Fase3Img from "../../assets/img/fase-3.webp";
import Fase4Img from "../../assets/img/fase-4.webp";

// 1. Importação dinâmica do Radar para evitar problemas de SSR e remover a necessidade do useEffect/mounted
const Radar = dynamic(
  () => import("react-chartjs-2").then((mod) => mod.Radar),
  {
    ssr: false,
    loading: () => (
      <div className="h-[300px] flex items-center justify-center text-dark/20">
        Carregando gráfico...
      </div>
    ),
  },
);

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip);

const phaseImages: Record<number, StaticImageData> = {
  1: Fase1Img,
  2: Fase2Img,
  3: Fase3Img,
  4: Fase4Img,
};

// Tipagem explícita para evitar o erro de 'any'
const pillarIcons: LucideIcon[] = [PieChart, BarChart3, Wallet, TrendingUp];

interface RadarChartProps {
  data: { label: string; score: number; max: number }[];
}

function RadarChart({ data }: RadarChartProps) {
  const chartData: ChartData<"radar"> = {
    labels: data.map((d) => d.label),
    datasets: [
      {
        data: data.map((d) => (d.score / d.max) * 100),
        backgroundColor: "rgba(66, 133, 244, 0.3)",
        borderColor: "#4285F4",
        borderWidth: 2,
        pointBackgroundColor: "#4285F4",
        pointBorderColor: "#4285F4",
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const options: ChartOptions<"radar"> = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      r: {
        min: 0,
        max: 100,
        ticks: { display: false },
        grid: { color: "rgba(0, 0, 0, 0.15)" },
        angleLines: { color: "rgba(0, 0, 0, 0.15)" },
        pointLabels: {
          font: { size: 16, family: "Inter, sans-serif" },
          color: "#121212",
        },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
  };

  return <Radar data={chartData} options={options} />;
}

interface ResultAnalysisProps {
  phase?: number;
  score?: number;
  pilarScores?: number[];
}

export default function ResultAnalysis({
  phase = 2,
  score = 24,
  pilarScores = [7, 8, 10, 7],
}: ResultAnalysisProps) {
  const content = phaseContent[phase];
  const phaseImage = phaseImages[phase] ?? Fase2Img;

  const pillarData = [
    { label: "Rentabilidade", score: pilarScores[0] ?? 7, max: 12 },
    { label: "Resultado", score: pilarScores[1] ?? 8, max: 12 },
    { label: "Caixa", score: pilarScores[2] ?? 10, max: 12 },
    {
      label: "Retorno sobre investimento",
      score: pilarScores[3] ?? 7,
      max: 12,
    },
  ];

  return (
    <section className="bg-light space-y-0">
      {/* ─── Banner de Identificação ─── */}
      <Container className=" pt-20">
        <motion.div
          variants={variants.fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={viewportConfig}
          className="bg-[#E3E2DE] rounded-lg border border-primary-vibrant/40 py-14 px-8 text-center border-b border-dark/5"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-dark leading-tight mb-2">
            Identificação do Perfil <br /> Financeiro do negócio
          </h2>
          <p className="text-dark/70 text-base ">
            Seu desempenho em resumo abaixo.
          </p>
        </motion.div>
      </Container>

      {/* ─── Perfil e Score ─── */}
      <Container className="py-20">
        <motion.div
          variants={variants.staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={viewportConfig}
          className="justify-center text-center text-balance items-center flex flex-col md:flex-row md:justify-between md:items-start md:text-left border-b border-dark/10 pb-6 mb-12 gap-4"
        >
          <motion.div variants={variants.fadeInUp}>
            <span className=" text-2xl md:text-4xl font-bold text-dark ">
              Perfil financeiro do negócio
            </span>
            <p className="text-lg md:text-xl mt-2 text-dark/70">
              Fase: {content.title}
            </p>
          </motion.div>

          <motion.div
            variants={variants.fadeInUp}
            className="flex flex-col border border-primary-vibrant rounded-lg p-4 items-center gap-1"
          >
            <span className="text-sm text-dark/70 ">
              Pontuação do diagnóstico
            </span>
            <div className=" text-dark rounded text-2xl font-semibold">
              {score}/48 pontos
            </div>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center mb-24">
          <motion.div
            variants={variants.staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={viewportConfig}
            className="bg-[#E3E2DE] h-full col-span-12 md:col-span-5 flex flex-col justify-center rounded-lg border border-dark/8 shadow-sm p-8 space-y-5"
          >
            <motion.div variants={variants.fadeInUp}>
              <div className="inline-flex items-center gap-2 px-3 py-1 w-fit rounded-full border border-dark/60 bg-transparent mb-4">
                <div className="w-2 h-2 rounded-full bg-primary-vibrant" />
                <span className="text-sm tracking-wider text-dark font-semibold">
                  Fase
                </span>
              </div>
              <h3 className="text-4xl font-bold text-dark mb-4">
                {content.title}
              </h3>
              <p className="text-dark leading-relaxed mb-4 text-base">
                Negócio em {content.title}
              </p>
              <p className="text-dark/70 leading-relaxed text-sm md:text-base">
                {content.description}
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            variants={variants.fadeIn}
            initial="initial"
            whileInView="animate"
            whileHover="hover"
            viewport={viewportConfig}
            className="relative aspect-[10/8] h-full col-span-12 md:col-span-7 rounded-lg overflow-hidden shadow-xl cursor-pointer"
          >
            <motion.div
              variants={{
                initial: { scale: 1 },
                animate: { scale: 1 },
                hover: { scale: 1.05 },
              }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="absolute inset-0 w-full h-full"
            >
              <Image
                src={phaseImage}
                alt="Análise de perfil"
                fill
                className="object-cover"
              />
            </motion.div>

            <motion.div
              variants={{
                initial: { opacity: 0.2 },
                animate: { opacity: 0.2 },
                hover: { opacity: 0.1 },
              }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="absolute inset-0 z-10 bg-primary-deep pointer-events-none"
            />
          </motion.div>
        </div>

        <motion.div
          variants={variants.staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={viewportConfig}
          className="text-center space-y-6 mb-12"
        >
          <motion.h3
            variants={variants.fadeInUp}
            className="text-3xl md:text-4xl leading-[1.15] font-bold text-dark"
          >
            Avaliação dos <br /> pilares financeiros
          </motion.h3>
          <motion.p
            variants={variants.fadeInUp}
            className="text-dark/70 max-w-xl mx-auto text-sm md:text-base leading-relaxed"
          >
            O diagnóstico também analisa o nível de desenvolvimento dos quatro
            pilares financeiros que sustentam a gestão financeira do negócio.
            Esses pilares representam os principais elementos que influenciam a
            capacidade da empresa de compreender seus números e tomar decisões
            financeiras com mais clareza.
          </motion.p>
        </motion.div>

        <motion.div
          variants={variants.fadeIn}
          initial="initial"
          whileInView="animate"
          viewport={viewportConfig}
          className="w-full mx-auto mt-12"
        >
          <div className="relative flex flex-col border border-[#4285F4] rounded-lg p-6 md:p-10 bg-transparent">
            <motion.div
              variants={variants.fadeInUp}
              className="text-left z-10 md:absolute md:top-8 md:left-8 mb-8 md:mb-0"
            >
              <h4 className="text-lg md:text-xl font-medium text-dark">
                Avaliação dos Pilares Financeiros
              </h4>
              <p className="text-sm text-dark/50 mt-2">Pontuações</p>
            </motion.div>

            <div className="flex justify-center items-center w-full max-w-2xl mx-auto py-4 md:py-16">
              <RadarChart data={pillarData} />
            </div>

            <motion.div
              variants={variants.fadeInUp}
              className="text-right z-10 md:absolute md:bottom-8 md:right-8 mt-4 md:mt-0"
            >
              <p className="text-sm text-dark/50">Pilares Financeiro</p>
            </motion.div>
          </div>
        </motion.div>
      </Container>

      {/* ─── Grid de Pilares (fundo escuro) ─── */}
      <div className="bg-dark py-24 md:py-32">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              variants={variants.staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={viewportConfig}
            >
              <motion.h3
                variants={variants.fadeInUp}
                className="text-3xl md:text-5xl text-center md:text-left font-bold text-light leading-tight"
              >
                Avaliação dos <br /> Pilares Financeiros
              </motion.h3>
            </motion.div>

            <motion.div
              variants={variants.staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={viewportConfig}
              className="grid grid-cols-2 gap-8"
            >
              {pillarData.map((pilar, i) => {
                const Icon = pillarIcons[i];
                return (
                  <motion.div
                    key={i}
                    variants={variants.fadeInUp}
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="group flex flex-col items-center text-center space-y-3"
                  >
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/5 border border-white/5 flex items-center justify-center transition-all duration-300 group-hover:bg-primary-deep/20 group-hover:border-primary-deep/40">
                      <Icon
                        className="w-6 h-6 text-light transition-colors duration-300 group-hover:text-primary-vibrant"
                        strokeWidth={1.5}
                      />
                    </div>
                    <span className="text-light font-medium text-base">
                      {pilar.label}
                    </span>
                    <p className="text-2xl font-bold text-light">
                      {pilar.score}/{pilar.max}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </Container>
      </div>
    </section>
  );
}
