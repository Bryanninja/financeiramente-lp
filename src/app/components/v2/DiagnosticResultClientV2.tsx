"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image, { StaticImageData } from "next/image";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import {
  Calendar,
  ChevronDown,
  CheckCircle2,
  Share2,
  Search,
  BarChart3,
  TrendingUp,
  Target,
  BookOpen,
  Compass,
} from "lucide-react";
import { getWhatsAppUrl } from "@/app/lib/whatsapp";
import dynamic from "next/dynamic";

// Images
import Fase1Img from "../../assets/img/fase-1.webp";
import Fase2Img from "../../assets/img/fase-2.webp";
import Fase3Img from "../../assets/img/fase-3.webp";
import Fase4Img from "../../assets/img/fase-4.webp";
import NextStepImg from "../../assets/img/bg-report.webp";

// Chart setup
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
import Container from "../ui/Container";
import Link from "next/link";

const Radar = dynamic(
  () => import("react-chartjs-2").then((mod) => mod.Radar),
  {
    ssr: false,
    loading: () => (
      <div className="h-[300px] flex items-center justify-center text-gray-400">
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

const phaseSvgs_pt: Record<number, string> = {
  1: "/financeiramente-escuro.svg",
  2: "/financeiramente-consciencia.svg",
  3: "/financeiramente-estrutura.svg",
  4: "/financeiramente-inteligencia.svg",
};

const phaseSvgs_en: Record<number, string> = {
  1: "/financeiramente-dark.svg",
  2: "/financeiramente-awareness.svg",
  3: "/financeiramente-structure.svg",
  4: "/financeiramente-intelligence.svg",
};

function RadarChart({
  data,
}: {
  data: { label: string; score: number; max: number }[];
}) {
  const chartData: ChartData<"radar"> = {
    labels: data.map((d) => d.label),
    datasets: [
      {
        data: data.map((d) => (d.score / d.max) * 100),
        backgroundColor: "rgba(37, 99, 235, 0.3)", // blue-600
        borderColor: "#2563eb",
        borderWidth: 2,
        pointBackgroundColor: "#2563eb",
        pointBorderColor: "#ffffff",
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
        grid: { color: "rgba(0, 0, 0, 0.1)" },
        angleLines: { color: "rgba(0, 0, 0, 0.1)" },
        pointLabels: {
          font: { size: 16, family: "Inter, sans-serif", weight: "normal" },
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

export default function DiagnosticResultClientV2() {
  const tResult = useTranslations("ResultAnalysis");
  const tCTA = useTranslations("FinalCTARes");
  const locale = useLocale();
  const router = useRouter();

  const [phase, setPhase] = useState(2);
  const [score, setScore] = useState(24);
  const [pilarScores, setPilarScores] = useState([7, 8, 10, 7]);
  const [loaded, setLoaded] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [showSticky, setShowSticky] = useState(false);

  const tPhase = useTranslations(`Phases.${phase}`);
  const phaseImage = phaseImages[phase] ?? Fase2Img;
  const phaseSvgUrl =
    (locale === "en" ? phaseSvgs_en : phaseSvgs_pt)[phase] ??
    "/financeiramente-consciencia.svg";

  // Animated Score
  const count = useMotionValue(0);
  const roundedCount = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    const raw = localStorage.getItem("fm_result");
    const rawUser = localStorage.getItem("fm_user");
    if (raw) {
      const data = JSON.parse(raw);
      setPhase(data.phase ?? 2);
      setScore(data.totalScore ?? 24);
      setPilarScores(data.pilarScores ?? [7, 8, 10, 7]);
      setLoaded(true);

      // Trigger email dispatch in background
      if (rawUser) {
        const user = JSON.parse(rawUser);
        fetch("/enviar.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: user.name ?? "Usuário",
            email: user.email ?? "",
            company: user.company ?? "",
            phase: data.phase ?? 2,
            score: data.totalScore ?? 24,
            pilarScores: data.pilarScores ?? [7, 8, 10, 7],
            locale: locale,
          }),
        }).catch(() => {});
      }
    } else {
      router.push(`/${locale}/v2/diagnostic`);
    }
  }, [router, locale]);

  // Animate score when loaded
  useEffect(() => {
    if (loaded) {
      const controls = animate(count, score, {
        duration: 1.5,
        ease: "easeOut",
      });
      return controls.stop;
    }
  }, [loaded, score, count]);

  // Show sticky CTA after 3 seconds
  useEffect(() => {
    if (loaded) {
      const timer = setTimeout(() => setShowSticky(true), 3000);
      return () => clearTimeout(timer);
    }
  }, [loaded]);

  if (!loaded) return null;

  const pilarMax = 12;
  const pillarTitles = [
    tResult("pillarsData.0"),
    tResult("pillarsData.1"),
    tResult("pillarsData.2"),
    tResult("pillarsData.3"),
  ];

  const pillarDataForChart = [
    { label: pillarTitles[0], score: pilarScores[0], max: pilarMax },
    { label: pillarTitles[1], score: pilarScores[1], max: pilarMax },
    { label: pillarTitles[2], score: pilarScores[2], max: pilarMax },
    { label: "ROI", score: pilarScores[3], max: pilarMax },
  ];

  const ctaItems = [
    { icon: Search, text: tCTA("ctaItems.0") },
    { icon: BarChart3, text: tCTA("ctaItems.1") },
    { icon: TrendingUp, text: tCTA("ctaItems.2") },
    { icon: Target, text: tCTA("ctaItems.3") },
  ];

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "FinanceiraMente - Diagnóstico Financeiro",
          text:
            locale === "en" ? "My Financial Profile" : "Meu Perfil Financeiro",
          url: window.location.href,
        });
      } catch (err) {
        console.error(err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert(locale === "en" ? "Link copied!" : "Link copiado!");
    }
  };

  const removeBold = (text: string) => text.replace(/\*\*/g, "");

  return (
    <main className="min-h-screen bg-[#faf9f6] font-sans overflow-x-hidden pb-32">
      {/* Top Banner (Logo + Email Notification) */}
      <div className="w-full bg-dark py-4  border-b border-white/10 ">
        <Container className="flex flex-col md:flex-row items-center justify-between gap-4">
          <Link href="/">
            <img
              src="/logo-financeiramente.svg"
              alt="FinanceiraMente"
              className="w-48"
            />
          </Link>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-light/5  border border-light/15 text-light/60 text-sm font-medium">
            <CheckCircle2 className="w-4 h-4 text-primary-vibrant" />
            {locale === "en"
              ? "A copy of this report was sent to your email"
              : "Uma cópia deste relatório foi enviada para o seu e-mail"}
          </div>
        </Container>
      </div>

      {/* Hero Reveal Area */}
      <section className="bg-light pt-12 pb-16 lg:pt-20 lg:pb-24 px-6 rounded-b-[3rem] shadow-2xl relative z-20">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
          <div className="flex flex-col items-center mb-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-dark/30 mb-6"
            >
              <div className="w-2 h-2 rounded-full bg-primary-vibrant animate-pulse" />
              <span className="text-sm tracking-widest font-medium text-dark/60 uppercase">
                {locale === "en"
                  ? "Diagnostic Complete"
                  : "Diagnóstico Concluído"}
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-4xl md:text-5xl font-bold text-dark tracking-tight leading-tight max-w-2xl text-balance"
            >
              {tResult("bannerTitle.part1")} {tResult("bannerTitle.part2")}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-dark/70 mt-4 text-lg"
            >
              {tResult("bannerSubtitle")}
            </motion.p>
          </div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-[#E3E2DE] border border-primary-deep/20 p-8 lg:p-12 rounded-[2.5rem] backdrop-blur-md w-full relative overflow-hidden group"
          >
            {/* Subtle glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary-deep/6 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-600 pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="flex-1 text-left space-y-8">
                <div>
                  <p className="text-primary-deep font-semibold tracking-widest uppercase text-sm mb-2">
                    {tResult("profileTitle")}
                  </p>
                  <h2 className="text-4xl md:text-5xl font-bold text-dark tracking-tight leading-none mb-2">
                    {tPhase("title")}
                  </h2>
                </div>

                <div className="bg-dark/5 border border-primary-vibrant rounded-2xl p-6 inline-flex flex-col gap-2">
                  <span className="text-sm text-dark uppercase tracking-widest font-semibold">
                    {tResult("scoreLabel")}
                  </span>
                  <div className="flex items-end gap-2">
                    <motion.span className="text-5xl md:text-6xl font-bold text-dark tabular-nums leading-none">
                      {roundedCount}
                    </motion.span>
                    <span className="text-lg text-dark/70 font-medium pb-1">
                      / 48 {tResult("pointsLabel")}
                    </span>
                  </div>
                </div>

                {/* Desktop Share Button */}
                <div className="hidden md:block">
                  <button
                    onClick={handleShare}
                    className="inline-flex cursor-pointer items-center gap-2 text-dark/70 hover:text-primary-vibrant transition-colors font-medium"
                  >
                    <Share2 className="w-5 h-5" />
                    {locale === "en"
                      ? "Share Report"
                      : "Compartilhar Relatório"}
                  </button>
                </div>
              </div>

              <div className="w-full md:w-[45%] relative aspect-9/8 rounded-2xl overflow-hidden shadow-2xl">
                <motion.div
                  initial={{ scale: 1.1, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="absolute inset-0 w-full h-full"
                >
                  <Image
                    src={phaseImage}
                    alt="Phase Graphic"
                    fill
                    className="object-cover"
                  />
                </motion.div>
                <div className="absolute inset-0 z-10 bg-blue-900/10 pointer-events-none" />
              </div>

              {/* Mobile Share Button */}
              <div className="w-full md:hidden flex justify-center pt-4">
                <button
                  onClick={handleShare}
                  className="inline-flex cursor-pointer items-center gap-2 text-gray-400 hover:text-white transition-colors font-medium"
                >
                  <Share2 className="w-5 h-5" />
                  {locale === "en" ? "Share Report" : "Compartilhar"}
                </button>
              </div>
            </div>
          </motion.div>

          {!isRevealed && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              onClick={() => {
                setIsRevealed(true);
                setTimeout(() => {
                  document.getElementById("full-report")?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }, 100);
              }}
              className="mt-12 flex items-center gap-3 px-8 py-4 cursor-pointer bg-dark hover:bg-primary-deep transition-all text-light rounded-full font-semibold text-lg]"
            >
              {locale === "en"
                ? "View Full Report"
                : "Ver meu diagnóstico completo"}
              <ChevronDown className="w-5 h-5" />
            </motion.button>
          )}
        </div>
      </section>

      {/* Revealed Content */}
      <AnimatePresence>
        {isRevealed && (
          <motion.div
            id="full-report"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="max-w-5xl mx-auto px-6 pt-20 pb-12 space-y-24">
              {/* Detailed Phase Overview */}
              <div className="space-y-8">
                <p className="text-2xl max-w-3xl font-semibold text-dark">
                  {locale === "en"
                    ? "This report presents an initial reading of your business's financial structure based on the answers provided in the diagnostic."
                    : "Este relatório apresenta uma leitura inicial da estrutura financeira do seu negócio com base nas respostas fornecidas no diagnóstico."}
                </p>

                <div className="inline-flex items-center gap-2 px-3 py-1 w-fit rounded-full border border-gray-300 bg-transparent mb-4">
                  <div className="w-2 h-2 rounded-full bg-primary-vibrant" />
                  <span className="text-sm tracking-wider text-[#121212] font-bold ">
                    {tResult("phaseBadge")}
                  </span>
                </div>
                <h3 className="text-4xl md:text-5xl font-bold text-[#121212] tracking-tight">
                  {tResult("businessIn")} {tPhase("title")}
                </h3>
                <p className="text-xl max-w-3xl text-dark/70 leading-relaxed text-pretty  whitespace-pre-line">
                  {tPhase("description")}
                </p>
              </div>

              {/* Pillars Evaluation (Spider + Cards) */}
              <div className="space-y-12">
                <div className="flex flex-col gap-12 items-center">
                  {/* Spider Chart - Full Width Row */}
                  <div className="w-full bg-white border border-gray-200 rounded-3xl p-8 shadow-sm flex flex-col items-center">
                    <h4 className="text-2xl font-bold text-[#121212] mb-2 text-center">
                      {tResult("radarTitle")}
                    </h4>
                    <p className="text-dark/70 text-lg mb-8 text-center">
                      {tResult("radarSubtitle")}
                    </p>
                    <div className="w-full max-w-xl aspect-square">
                      <RadarChart data={pillarDataForChart} />
                    </div>
                  </div>

                  <div className="text-center space-y-4 max-w-3xl mx-auto">
                    <h3 className="text-3xl md:text-4xl font-bold text-[#121212] tracking-tight">
                      {tResult("pillarsEvaluationTitle.part1")}{" "}
                      {tResult("pillarsEvaluationTitle.part2")}
                    </h3>
                    <p className="text-xl text-dark/70  leading-relaxed text-pretty">
                      {tResult("pillarsEvaluationDesc")}
                    </p>
                  </div>

                  {/* Progress Cards - 2x2 Mobile / 4x1 Desktop */}
                  <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {pilarScores.map((score, idx) => {
                      const percentage = Math.min(
                        (score / pilarMax) * 100,
                        100,
                      );
                      return (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.1 + 0.3 }}
                          className="bg-[#E3E2DE] p-5 rounded-xl  border border-primary-deep/10 flex flex-col justify-between h-full"
                        >
                          <h3 className="text-sm font-medium text-[#121212] mb-4">
                            {pillarTitles[idx]}
                          </h3>
                          <div>
                            <div className="h-2 w-full bg-gray-300 rounded-full overflow-hidden mb-2">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${percentage}%` }}
                                transition={{
                                  duration: 1,
                                  delay: 0.5 + idx * 0.1,
                                  ease: "easeOut",
                                }}
                                className="h-full rounded-full bg-[#25448C]"
                              />
                            </div>
                            <div className="text-right text-sm font-bold text-[#25448C]">
                              {score}/{pilarMax}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Interpretation & Next Steps - Stacked Vertically */}
              <div className="pt-12 border-t border-gray-200 space-y-12">
                {/* Interpretation Block */}
                <div className="flex flex-col  lg:flex-row gap-8 items-center bg-dark p-6 md:p-8 rounded-[2rem] border border-gray-200 shadow-sm">
                  <div className="w-full lg:w-[56%] flex-shrink-0 flex justify-center">
                    <img
                      src={phaseSvgUrl}
                      alt="Fase atual"
                      className="w-full max-w-[280px] lg:max-w-full h-auto min-h-[200px] object-contain mx-auto"
                    />
                  </div>
                  <div className="w-full flex-1 flex flex-col">
                    <div className="flex items-center gap-3 mb-6">
                      <BookOpen size={80} className=" text-[#25448C]" />
                      <h3 className="text-2xl font-semibold text-light uppercase tracking-widest">
                        {tCTA("interpretationTitle")}
                      </h3>
                    </div>
                    {tPhase("interpretation")
                      .split("\n")
                      .map((paragraph, i) => {
                        const cleanText = removeBold(paragraph).trim();
                        if (!cleanText) return null;
                        return (
                          <p
                            key={i}
                            className="text-base font-normal text-light/60 leading-relaxed mb-4"
                          >
                            {cleanText}
                          </p>
                        );
                      })}
                  </div>
                </div>

                {/* Next Steps Block */}
                <div className="bg-[#E3E2DE] p-6 md:p-8 rounded-[2rem] border border-primary-deep/10 shadow-sm flex flex-col">
                  <div className="flex items-center gap-3 mb-6">
                    <Compass className="w-6 h-6 text-[#25448C]" />
                    <h3 className="text-lg font-semibold text-[#121212] uppercase tracking-widest">
                      {tCTA("nextStepTitle.part1")}{" "}
                      {tCTA("nextStepTitle.part2")}
                    </h3>
                  </div>
                  {`${tPhase("nextStep")}\n\n${tPhase("nextStepDetails")}`
                    .split("\n")
                    .map((paragraph, i) => {
                      const cleanText = removeBold(paragraph).trim();
                      if (!cleanText) return null;
                      return (
                        <p
                          key={i}
                          className="text-base font-normal text-dark/70 leading-relaxed mb-4"
                        >
                          {cleanText}
                        </p>
                      );
                    })}
                </div>
              </div>

              {/* Deepen Analysis (Michel Stawicki Section) */}
              <div className="pt-12 border-t border-gray-200">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
                  <div className="space-y-6">
                    <h2 className="text-3xl md:text-5xl font-bold text-[#121212] leading-tight">
                      {tCTA("deepenTitle")}
                    </h2>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      {tCTA("deepenDesc")}
                    </p>
                    <p className="text-[#121212] text-xl font-bold pt-4">
                      {tCTA("duringConversation")}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                      {ctaItems.map((item, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-4 p-4 rounded-xl bg-[#E3E2DE] border border-gray-100"
                        >
                          <item.icon
                            className="w-6 h-6 text-primary-vibrant shrink-0"
                            strokeWidth={2}
                          />
                          <p className="text-sm font-semibold text-[#121212] leading-tight">
                            {item.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="relative aspect-[7/8] rounded-3xl overflow-hidden shadow-2xl">
                    <Image
                      src={NextStepImg}
                      alt={tCTA("nextStepAlt")}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky Bottom CTA */}
      <AnimatePresence>
        {showSticky && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed bottom-0 left-0 w-full z-50 p-4 md:p-6 pointer-events-none"
          >
            <div className="max-w-4xl mx-auto bg-[#121212]/90 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 pointer-events-auto">
              <div className="text-center md:text-left">
                <p className="text-white font-bold text-lg">
                  {locale === "en"
                    ? "Ready to evolve?"
                    : "Pronto para evoluir?"}
                </p>
                <p className="text-white/60 text-sm max-w-sm">
                  {locale === "en"
                    ? "Schedule your free strategic session and let's deepen the analysis of your business."
                    : "Agende sua sessão estratégica gratuita e vamos aprofundar a análise do seu negócio."}
                </p>
              </div>
              <a
                href={getWhatsAppUrl("sessaoEstrategica")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full md:w-auto px-8 py-3 bg-primary-deep hover:bg-primary-vibrant text-white rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(37,99,235,0.2)] flex items-center justify-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                {tCTA("button")}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
