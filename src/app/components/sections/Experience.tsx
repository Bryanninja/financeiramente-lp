"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Container from "../ui/Container";
import { fadeInUp } from "@/app/lib/animations";
import Image from "next/image";

import MichelExperienceImg from "../../assets/img/michel-experience.webp";
import MichelExperienceImg2 from "../../assets/img/michel-experience2.webp";

const results = [
  {
    value: "+45%",
    label: "Crescimento no EBITDA por unidade produzida ao longo de três anos.",
  },
  {
    value: "-55%",
    label:
      "Reequilíbrio do ciclo financeiro com redução no prazo médio de recebimento.",
  },
  {
    value: "+24%",
    label:
      "Reequilíbrio do ciclo financeiro com aumento no prazo médio de pagamento.",
  },
  {
    value: "40%",
    label:
      "Reestruturação operacional responsável pelo EBITDA anual da operação.",
  },
  { value: "50 M", label: "USD Gerados à controladora sob restrição cambial." },
  {
    value: "Liderança",
    label:
      "De projetos de integração e padronização financeira em operações internacionais.",
  },
];

export default function Experience() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Função para verificar se ainda há conteúdo para rolar
  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      // Pequeno delay para checar o scroll após a animação
      setTimeout(checkScroll, 400);
    }
  };

  return (
    <section className="bg-light py-24 md:py-32">
      <Container className="space-y-20">
        {/* Cabeçalho */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-dark/60 mb-6">
              <div className="w-2 h-2 rounded-full bg-primary-vibrant" />
              <span className="text-[10px] uppercase tracking-wider text-dark font-bold">
                Experiência
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl text-balance font-bold text-dark leading-tight">
              O Método FinanceiraMente nasce da prática
            </h2>
          </motion.div>

          <div className="space-y-6 text-dark/80 text-lg leading-relaxed">
            <p>
              Ao longo de mais de 30 anos de atuação em finanças, gestão e
              liderança empresarial, Michel Stawicki participou de projetos
              financeiros em organizações de grande porte no Brasil e no
              exterior.
            </p>
            <p>
              Essa experiência prática em ambientes corporativos complexos foi a
              base para o desenvolvimento do Método FinanceiraMente, que traduz
              princípios de gestão financeira utilizados em grandes organizações
              para a realidade de pequenos negócios.
            </p>
          </div>
        </div>

        {/* Bloco Michel 30+ */}
        <div className=" hidden md:flex relative w-full aspect-video rounded-2xl overflow-hidden bg-dark">
          <Image
            src={MichelExperienceImg}
            alt="Michel Stawicki"
            fill
            className="object-cover opacity-95"
          />
          <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-16 space-y-6 max-w-xl">
            <p className="text-light/90 text-base md:text-lg leading-relaxed font-light">
              Michel Stawicki atua há mais de 30 anos em finanças, gestão e
              liderança empresarial. Ao longo de sua carreira ocupou posições
              executivas em grandes organizações no Brasil e no exterior,
              liderando áreas financeiras responsáveis por operações complexas,
              projetos de transformação e decisões estratégicas de negócio.
            </p>
            {/* SVG 30+ para Stroke perfeito */}
            <svg className="w-full h-32 md:h-48 overflow-visible">
              <text
                x="0"
                y="80%"
                className="text-8xl md:text-[12rem] font-bold"
                fill="rgba(255,255,255,0.05)"
                stroke="white"
                strokeWidth="1"
              >
                30+
              </text>
            </svg>
          </div>
        </div>

        {/* Bloco Michel 30+ */}
        <div className=" md:hidden relative w-full h-[1000px] rounded-2xl overflow-hidden bg-dark">
          <Image
            src={MichelExperienceImg2}
            alt="Michel Stawicki"
            fill
            className="object-cover object-top opacity-95"
          />
          <div className="relative mt-8 z-10 h-full flex flex-col justify-start items-center px-8 md:px-16 space-y-2 max-w-xl">
            <p className="text-light/90 text-base md:text-lg leading-relaxed font-light">
              Michel Stawicki atua há mais de 30 anos em finanças, gestão e
              liderança empresarial. Ao longo de sua carreira ocupou posições
              executivas em grandes organizações no Brasil e no exterior,
              liderando áreas financeiras responsáveis por operações complexas,
              projetos de transformação e decisões estratégicas de negócio.
            </p>
            {/* SVG 30+ para Stroke perfeito */}
            <svg className="w-full h-32 md:h-48 overflow-visible">
              <text
                x="0"
                y="80%"
                className="text-8xl md:text-[12rem] font-bold"
                fill="rgba(255,255,255,0.05)"
                stroke="white"
                strokeWidth="1"
              >
                30+
              </text>
            </svg>
          </div>
        </div>

        {/* Seção de Resultados com Navegação Netflix */}
        <div className="space-y-12">
          <div className="max-w-2xl">
            <h3 className="text-2xl md:text-3xl font-bold text-dark mb-4">
              Os resultados falam por si.
            </h3>
            <p className="text-dark/80">
              Hoje Michel aplica essa visão para ajudar empresários a tomar
              decisões com mais clareza.
            </p>
          </div>

          <div className="group relative">
            {/* Botão Voltar (Esquerda) */}
            {canScrollLeft && (
              <button
                onClick={() => scroll("left")}
                className="absolute -left-5 top-1/2 cursor-pointer -translate-y-1/2 z-30 bg-dark text-white p-4 rounded-full shadow-2xl hover:bg-primary-vibrant transition-all duration-300"
              >
                <ChevronLeft size={24} />
              </button>
            )}

            {/* Contêiner de Cards */}
            <div
              ref={scrollRef}
              onScroll={checkScroll}
              className="flex gap-6 overflow-hidden pb-4 snap-x snap-mandatory"
            >
              {results.map((item, i) => (
                <div
                  key={i}
                  className="min-w-[280px] md:min-w-[350px] bg-[#E3E2DE] p-10 rounded-lg border border-primary-deep/60 snap-start hover:shadow-xl transition-all"
                >
                  <div className=" text-5xl md:text-7xl text-dark mb-6 text-center tracking-tighter leading-none">
                    {item.value}
                  </div>
                  <p className="text-dark/70 tracking-wide text-center text-pretty leading-relaxed">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Botão Avançar (Direita) */}
            {canScrollRight && (
              <button
                onClick={() => scroll("right")}
                className="absolute -right-5 cursor-pointer top-1/2 -translate-y-1/2 z-30 bg-dark text-white p-4 rounded-full shadow-2xl hover:bg-primary-deep transition-all duration-300"
              >
                <ChevronRight size={24} />
              </button>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
