"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Container from "../ui/Container";
import { variants, viewportConfig } from "@/app/lib/animations";
import Image from "next/image";
import { useTranslations } from "next-intl";

import MichelExperienceImg from "../../assets/img/michel-experience.webp";
import MichelExperienceImg2 from "../../assets/img/michel-experience2.webp";

export default function Experience() {
  const t = useTranslations("Experience");
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const results = [
    {
      value: "+45%",
      label: t("results.0"),
    },
    {
      value: "-55%",
      label: t("results.1"),
    },
    {
      value: "+24%",
      label: t("results.2"),
    },
    {
      value: "40%",
      label: t("results.3"),
    },
    {
      value: "50M",
      label: t("results.4"),
    },
  ];

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
      const firstCard = scrollRef.current.children[0] as HTMLElement;
      const cardWidth = firstCard ? firstCard.offsetWidth + 24 : 400; // 24 is gap-6
      const scrollAmount = direction === "left" ? -cardWidth : cardWidth;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      setTimeout(checkScroll, 400);
    }
  };

  return (
    <section id="sobre" className="bg-light py-8 md:pb-32 overflow-hidden">
      <Container className="space-y-20">
        <motion.div
          variants={variants.staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={viewportConfig}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
        >
          <div className="space-y-6">
            <motion.div
              variants={variants.fadeInUp}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-dark/60 mb-6"
            >
              <div className="w-2 h-2 rounded-full bg-primary-vibrant" />
              <span className="text-sm tracking-wider text-dark font-semibold">
                {t("badge")}
              </span>
            </motion.div>
            <motion.h2
              variants={variants.fadeInUp}
              className="text-3xl md:text-5xl text-balance font-bold text-dark leading-tight"
            >
              {t("title")}
            </motion.h2>
          </div>

          <motion.div
            variants={variants.fadeInUp}
            className="space-y-6 text-dark/80 text-lg leading-relaxed"
          >
            <p>{t("desc1")}</p>
            <p>{t("desc2")}</p>
          </motion.div>
        </motion.div>

        <motion.div
          variants={variants.fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={viewportConfig}
          className="relative w-full aspect-video md:aspect-video h-[780px] md:h-auto rounded-2xl overflow-hidden bg-dark"
        >
          <div className="hidden md:block">
            <Image
              src={MichelExperienceImg}
              alt="Michel Stawicki"
              fill
              className="object-cover opacity-95"
            />
          </div>
          <div className="md:hidden">
            <Image
              src={MichelExperienceImg2}
              alt="Michel Stawicki"
              fill
              className="object-cover object-top opacity-95"
            />
          </div>

          <div className="relative justify-items-start py-6 z-10 h-full flex flex-col md:justify-center px-8 md:px-16 space-y-6 max-w-xl">
            <motion.p
              variants={variants.fadeInUp}
              className="text-light/90 text-base md:text-lg leading-relaxed font-light"
            >
              {t("michelBio")}
            </motion.p>

            <motion.div variants={variants.fadeIn}>
              <svg className="w-full h-12 md:h-48 overflow-visible">
                <text
                  x="0"
                  y="80%"
                  className="text-6xl md:text-[12rem] font-bold"
                  fill="rgba(255,255,255,0.05)"
                  stroke="white"
                  strokeWidth="1"
                >
                  30+
                </text>
              </svg>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          variants={variants.staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={viewportConfig}
          className="space-y-12"
        >
          <div className="max-w-2xl">
            <motion.h3
              variants={variants.fadeInUp}
              className="text-2xl md:text-3xl font-bold text-dark mb-4"
            >
              {t("resultsTitle")}
            </motion.h3>
            <motion.p variants={variants.fadeInUp} className="text-dark/80">
              {t("resultsDesc")}
            </motion.p>
          </div>

          <div className="group relative">
            {canScrollLeft && (
              <button
                onClick={() => scroll("left")}
                className="absolute -left-5 top-1/2 cursor-pointer -translate-y-1/2 z-30 bg-dark text-white p-4 rounded-full shadow-2xl hover:bg-primary-vibrant transition-all duration-300"
              >
                <ChevronLeft size={24} />
              </button>
            )}

            <motion.div
              ref={scrollRef}
              onScroll={checkScroll}
              variants={variants.staggerContainer}
              className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
              {results.map((item, i) => (
                <motion.div
                  key={i}
                  variants={variants.fadeInUp}
                  className="min-w-[280px] md:min-w-[350px] bg-[#E3E2DE] p-10 rounded-lg border border-primary-deep/60 snap-start hover:shadow-xl transition-all"
                >
                  <div className="text-5xl md:text-7xl text-dark mb-6 text-center tracking-tighter leading-none">
                    {item.value}
                  </div>
                  <p className="text-dark/70 tracking-wide text-center text-pretty leading-relaxed">
                    {item.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {canScrollRight && (
              <button
                onClick={() => scroll("right")}
                className="absolute cursor-pointer -right-5 top-1/2 -translate-y-1/2 z-30 bg-dark text-white p-4 rounded-full shadow-2xl hover:bg-primary-deep transition-all duration-300"
              >
                <ChevronRight size={24} />
              </button>
            )}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
