"use client";
import { motion } from "framer-motion";
import Container from "../ui/Container";
import { variants, viewportConfig } from "@/app/lib/animations";
import Image from "next/image";
import BusinessWomanImg from "../../assets/img/fase-2.webp";
import { phaseContent } from "@/app/data/resultContent";
import { PieChart, BarChart3, Wallet, TrendingUp } from "lucide-react";

const pillarIcons = [PieChart, BarChart3, Wallet, TrendingUp];

const pillarData = [
  { label: "Rentabilidade", score: 7, max: 12 },
  { label: "Resultado", score: 8, max: 12 },
  { label: "Caixa", score: 10, max: 12 },
  { label: "Retorno sobre investimento", score: 7, max: 12 },
];

// Simple SVG Radar Chart
function RadarChart({
  data,
}: {
  data: { label: string; score: number; max: number }[];
}) {
  const size = 320;
  const center = size / 2;
  const radius = 110;
  const levels = 4;

  const angleStep = (2 * Math.PI) / data.length;

  const getPoint = (index: number, r: number) => {
    const angle = angleStep * index - Math.PI / 2;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  const axisLabels = data.map((d, i) => {
    const pt = getPoint(i, radius + 28);
    return { x: pt.x, y: pt.y, label: d.label };
  });

  // Grid polygons
  const gridPolygons = Array.from({ length: levels }, (_, lvl) => {
    const r = (radius / levels) * (lvl + 1);
    const points = data.map((_, i) => {
      const p = getPoint(i, r);
      return `${p.x},${p.y}`;
    });
    return points.join(" ");
  });

  // Data polygon
  const dataPoints = data.map((d, i) => {
    const r = (d.score / d.max) * radius;
    const p = getPoint(i, r);
    return `${p.x},${p.y}`;
  });

  return (
    <div className="flex flex-col items-center gap-2">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="overflow-visible"
      >
        {/* Grid polygons */}
        {gridPolygons.map((pts, i) => (
          <polygon
            key={i}
            points={pts}
            fill="none"
            stroke="#d1d5db"
            strokeWidth="0.8"
            opacity={0.5}
          />
        ))}

        {/* Axis lines */}
        {data.map((_, i) => {
          const p = getPoint(i, radius);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={p.x}
              y2={p.y}
              stroke="#d1d5db"
              strokeWidth="0.8"
              opacity={0.5}
            />
          );
        })}

        {/* Data area */}
        <polygon
          points={dataPoints.join(" ")}
          fill="rgba(30,58,138,0.15)"
          stroke="#1e3a8a"
          strokeWidth="1.5"
        />

        {/* Data dots */}
        {data.map((d, i) => {
          const r = (d.score / d.max) * radius;
          const p = getPoint(i, r);
          return <circle key={i} cx={p.x} cy={p.y} r={4} fill="#1e3a8a" />;
        })}

        {/* Axis labels */}
        {axisLabels.map((l, i) => (
          <text
            key={i}
            x={l.x}
            y={l.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="10"
            fill="#374151"
            fontWeight="500"
          >
            {l.label}
          </text>
        ))}
      </svg>
      <p className="text-xs text-dark/30 tracking-widest uppercase">
        Radar FinanceiraMente
      </p>
    </div>
  );
}

export default function ResultAnalysis({ phase = 2, score = 24 }) {
  const content = phaseContent[phase];

  return (
    <section className="bg-light space-y-0">
      {/* ─── Banner de Identificação ─── */}
      <Container className=" pt-20">
        <div className="bg-[#E3E2DE] rounded-lg border border-primary-vibrant py-14 px-8 text-center border-b border-dark/5">
          <h2 className="text-xl md:text-4xl font-bold text-dark leading-[1.15]  mb-2">
            Identificação do Perfil <br /> Financeiro do negócio
          </h2>
          <p className="text-dark/70 text-base ">
            Seu desempenho em resumo abaixo.
          </p>
        </div>
      </Container>

      {/* ─── Perfil e Score ─── */}
      <Container className="py-20">
        {/* Header: Fase + Pontuação */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-dark/10 pb-6 mb-12 gap-4">
          <div>
            <span className="text-4xl font-bold text-dark ">
              Perfil financeiro do negócio
            </span>
            <p className="text-xl mt-2 text-dark/70">Fase: {content.title}</p>
          </div>
          <div className="flex flex-col border border-primary-vibrant rounded-lg p-4 items-center gap-1">
            <span className="text-sm text-dark/70 ">
              Pontuação do diagnóstico
            </span>
            <div className=" text-dark rounded text-2xl font-semibold">
              {23}/48 pontos
            </div>
          </div>
        </div>

        {/* Perfil Card + Imagem */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center mb-24">
          {/* Card de Fase */}
          <motion.div
            variants={variants.staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={viewportConfig}
            className="bg-[#E3E2DE] h-full col-span-5 flex flex-col justify-center rounded-lg border border-dark/8 shadow-sm p-8 space-y-5"
          >
            <motion.div variants={variants.fadeInUp}>
              <div className="inline-flex items-center gap-2 px-3 py-1 w-fit rounded-full border border-dark/60 bg-transparent mb-4">
                <div className="w-2 h-2 rounded-full bg-primary-vibrant" />
                <span className="text-sm  tracking-wider text-dark font-semibold">
                  Fase
                </span>
              </div>
              <h3 className="text-4xl font-bold text-dark mb-4">
                {content.title}
              </h3>
              <p className="text-dark leading-relaxed mb-4 text-base">
                Negócio em Consciência Financeira
              </p>
              <p className="text-dark/70 leading-relaxed text-sm md:text-base">
                {content.description}
              </p>
            </motion.div>
          </motion.div>

          {/* Imagem */}
          <motion.div
            variants={variants.fadeIn}
            initial="initial"
            whileInView="animate"
            viewport={viewportConfig}
            className="relative aspect-[10/8] col-span-7  rounded-lg overflow-hidden shadow-xl"
          >
            <Image
              src={BusinessWomanImg}
              alt="Análise de perfil"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>

        {/* ─── Avaliação dos pilares (título + radar) ─── */}
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
            className="text-dark/70 max-w-xl mx-auto  text-sm md:text-base leading-relaxed"
          >
            O diagnóstico analisa o nível de desenvolvimento dos quatro pilares
            que sustentam a gestão financeira do negócio. Esses pilares
            representam os principais momentos que influenciam a capacidade da
            empresa de compreender a agir diante das suas informações com
            clareza e conviência.
          </motion.p>
        </motion.div>

        {/* Radar Chart */}
        <motion.div
          variants={variants.fadeIn}
          initial="initial"
          whileInView="animate"
          viewport={viewportConfig}
          className="flex flex-col items-center"
        >
          {/* Label superior */}
          <div className="w-full max-w-2xl">
            <div className="bg-white border border-dark/8 rounded-xl shadow-sm px-6 py-3 mb-0">
              <p className="text-xs text-dark/40 font-semibold uppercase tracking-widest">
                Avaliação dos Pilares Financeiros
              </p>
              <p className="text-[10px] text-dark/30 uppercase tracking-widest mt-0.5">
                Pontuação
              </p>
            </div>
            <div className="bg-white border border-dark/8 border-t-0 rounded-b-xl shadow-sm flex justify-center py-10">
              <RadarChart data={pillarData} />
            </div>
          </div>
        </motion.div>
      </Container>

      {/* ─── Grid de Pilares (fundo escuro) ─── */}
      <div className="bg-dark py-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Título esquerda */}
            <motion.div
              variants={variants.staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={viewportConfig}
            >
              <motion.h3
                variants={variants.fadeInUp}
                className="text-3xl md:text-4xl  font-bold text-light leading-tight"
              >
                Avaliação dos
                <br />
                Pilares Financeiros
              </motion.h3>
            </motion.div>

            {/* Grid 2x2 dos pilares */}
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
                    className="flex flex-col items-center text-center space-y-3"
                  >
                    <div className="w-14 h-14 rounded-full bg-white/8 border border-white/10 flex items-center justify-center">
                      <Icon
                        className="w-6 h-6 text-light/70"
                        strokeWidth={1.5}
                      />
                    </div>
                    <span className="text-light/40 font-bold uppercase text-[10px] tracking-widest">
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
