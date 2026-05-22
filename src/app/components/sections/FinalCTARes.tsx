"use client";
import Container from "../ui/Container";
import Button from "../ui/Button";
import { variants, viewportConfig } from "@/app/lib/animations";
import { motion } from "framer-motion";
import NextStepImg from "../../assets/img/bg-report.webp";
import { phaseContent } from "@/app/data/resultContent";
import Image from "next/image";
import { Search, BarChart3, TrendingUp, Target } from "lucide-react";
import { getWhatsAppUrl } from "@/app/lib/whatsapp";
import { useLocale, useTranslations } from "next-intl";

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

export default function ResultNextSteps({ phase = 2 }) {
  const tPhase = useTranslations(`Phases.${phase}`);
  const t = useTranslations("FinalCTARes");
  const locale = useLocale();
  const phaseSvgs = locale === "en" ? phaseSvgs_en : phaseSvgs_pt;

  const ctaItems = [
    {
      icon: Search,
      text: t("ctaItems.0"),
    },
    { icon: BarChart3, text: t("ctaItems.1") },
    {
      icon: TrendingUp,
      text: t("ctaItems.2"),
    },
    {
      icon: Target,
      text: t("ctaItems.3"),
    },
  ];

  return (
    <section className="bg-light">
      <div className="bg-dark pb-24 md:pb-32">
        <Container>
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center"
            variants={variants.staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={viewportConfig}
          >
            <motion.div
              variants={variants.fadeIn}
              className="flex justify-center lg:justify-start"
            >
              <img
                src={phaseSvgs[phase] ?? "/financeiramente-consciencia.svg"}
                alt={t("interpretationAlt")}
                className="w-full"
              />
            </motion.div>

            <div className="space-y-6">
              <motion.h3
                variants={variants.fadeInUp}
                className="text-3xl font-bold text-light/90 uppercase"
              >
                {t("interpretationTitle")}
              </motion.h3>
              <motion.p
                variants={variants.fadeInUp}
                className="text-base md:text-lg whitespace-pre-line text-light/70 leading-relaxed"
              >
                {tPhase("interpretation")}
              </motion.p>
            </div>
          </motion.div>
        </Container>
      </div>

      <div className="bg-light py-32">
        <Container>
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
            variants={variants.staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={viewportConfig}
          >
            <div className="space-y-8">
              <motion.div variants={variants.fadeInUp} className="space-y-2">
                <h3 className="text-4xl md:text-5xl font-bold text-dark leading-tight">
                  {t("nextStepTitle.part1")} <br /> {t("nextStepTitle.part2")}
                </h3>
              </motion.div>

              <motion.div variants={variants.fadeInUp} className="space-y-4">
                <div className="inline-flex items-center gap-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 w-fit rounded-full border border-dark/60 bg-transparent">
                    <div className="w-2 h-2 rounded-full bg-primary-vibrant" />
                    <span className="text-sm tracking-wider text-dark font-semibold">
                      {t("phaseLabel")}
                    </span>
                  </div>
                  <span className="text-2xl font-semibold text-dark">
                    {tPhase("title")}
                  </span>
                </div>
                <p className="text-dark/70 leading-relaxed max-w-xl whitespace-pre-line text-pretty text-base md:text-lg">
                  {tPhase("nextStep")} {tPhase("nextStepDetails")}
                </p>
              </motion.div>

              <motion.div variants={variants.fadeInUp}>
                <Button
                  variant="outline"
                  className="w-full md:w-auto px-10"
                  href={getWhatsAppUrl("sessaoEstrategica")}
                  target="_blank"
                >
                  {t("button")}
                </Button>
              </motion.div>
            </div>

            <div className="relative">
              <motion.img
                variants={variants.fadeIn}
                src="/financeiramente-arrow-growth.svg"
                alt=""
                className="absolute left-1/2 right-1/2 -translate-x-1/2 top-[92%] md:-translate-x-0 backdrop-blur-lg pointer-events-none w-20 rounded-full z-10 md:left-[90%] md:top-[-4%]"
              />

              <motion.div
                variants={variants.fadeIn}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
                className="relative aspect-[7/8] rounded-2xl overflow-hidden shadow-2xl"
              >
                <Image
                  src={NextStepImg}
                  alt={t("nextStepAlt")}
                  fill
                  className="object-cover"
                />
              </motion.div>
            </div>
          </motion.div>
        </Container>
      </div>

      <div className="bg-dark py-24">
        <Container>
          <motion.div
            variants={variants.staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={viewportConfig}
            className="space-y-12"
          >
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <motion.h2
                variants={variants.fadeInUp}
                className="text-3xl md:text-5xl text-balance font-bold text-light leading-tight"
              >
                {t("deepenTitle")}
              </motion.h2>
              <motion.p
                variants={variants.fadeInUp}
                className="text-light/55 text-sm md:text-base leading-relaxed"
              >
                {t("deepenDesc")}
              </motion.p>
              <motion.p
                variants={variants.fadeInUp}
                className="text-light/80 text-lg font-medium"
              >
                {t("duringConversation")}
              </motion.p>
            </div>

            <motion.div
              variants={variants.staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mx-auto"
            >
              {ctaItems.map((item, i) => (
                <motion.div
                  key={i}
                  variants={variants.fadeInUp}
                  className="bg-[#1A1A1A] p-8 rounded-xl border border-white/5 space-y-6 hover:border-primary-vibrant/20 transition-all group"
                >
                  <item.icon
                    className="text-light group-hover:text-primary-vibrant transition-colors duration-300"
                    strokeWidth={1.5}
                  />
                  <p className="text-light/80 text-base md:text-lg leading-snug font-medium">
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              variants={variants.fadeInUp}
              className="flex justify-center"
            >
              <Button
                variant="white"
                className="w-full md:w-auto px-10"
                href={getWhatsAppUrl("sessaoEstrategica")}
                target="_blank"
              >
                {t("button")}
              </Button>
            </motion.div>
          </motion.div>
        </Container>
      </div>
    </section>
  );
}
