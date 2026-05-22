"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Container from "../ui/Container";
import Button from "../ui/Button";
import { variants, viewportConfig } from "@/app/lib/animations";
import { useTranslations, useLocale } from "next-intl";

// Imagens
import Fase1Img from "../../assets/img/fase-1.webp";
import Fase2Img from "../../assets/img/fase-2.webp";
import Fase3Img from "../../assets/img/fase-3.webp";
import Fase4Img from "../../assets/img/fase-4.webp";

export default function MaturityMap() {
  const t = useTranslations("MaturityMap");
  const locale = useLocale();

  const phases = [
    {
      number: 1,
      title: t("phases.0.title"),
      description: t("phases.0.description"),
      image: Fase1Img,
    },
    {
      number: 2,
      title: t("phases.1.title"),
      description: t("phases.1.description"),
      image: Fase2Img,
    },
    {
      number: 3,
      title: t("phases.2.title"),
      description: t("phases.2.description"),
      image: Fase3Img,
    },
    {
      number: 4,
      title: t("phases.3.title"),
      description: t("phases.3.description"),
      image: Fase4Img,
    },
  ];

  const benefits = [
    t("benefits.0"),
    t("benefits.1"),
    t("benefits.2"),
    t("benefits.3"),
  ];

  return (
    <section id="mapa" className="bg-dark py-24 md:py-32 overflow-hidden">
      <Container className="space-y-20">
        <motion.div
          variants={variants.staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={viewportConfig}
          className="text-center max-w-4xl mx-auto space-y-6"
        >
          <motion.div
            variants={variants.fadeInUp}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary-vibrant/30 bg-primary-vibrant/5"
          >
            <div className="w-2 h-2 rounded-full bg-primary-vibrant" />
            <span className="text-sm font-semibold text-light/70 tracking-widest">
              {t("badge")}
            </span>
          </motion.div>

          <motion.h2
            variants={variants.fadeInUp}
            className="text-4xl md:text-5xl text-balance leading-tight font-bold text-light"
          >
            {t("title")}
          </motion.h2>

          <motion.p
            variants={variants.fadeInUp}
            className="text-light/60 text-lg leading-relaxed"
          >
            {t("description")}
          </motion.p>
        </motion.div>

        <motion.div
          variants={variants.staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={viewportConfig}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {phases.map((phase) => (
            <motion.div
              key={phase.number}
              variants={variants.fadeInUp}
              className="group bg-[#1A1A1A] rounded-xl overflow-hidden border border-white/5 hover:border-primary-vibrant/30 transition-all duration-500"
            >
              <div className="relative h-64 w-full">
                <Image
                  src={phase.image}
                  alt={phase.title}
                  fill
                  className="object-cover brightness-75 group-hover:brightness-100 transition-all duration-700"
                />
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded text-xs font-bold text-light border border-white/10">
                  {t("phase")} {phase.number}
                </div>
              </div>
              <div className="p-8 space-y-4">
                <h3 className="text-2xl font-semibold text-light">
                  {phase.title}
                </h3>
                <p className="text-light/60 leading-relaxed text-pretty text-sm md:text-base">
                  {phase.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={variants.staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={viewportConfig}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:pt-12 items-center"
        >
          <div className="space-y-8">
            <motion.h3
              variants={variants.fadeInUp}
              className="text-4xl md:text-5xl text-balance leading-tight font-bold text-light"
            >
              {t("ctaTitle.part1")} <br className="hidden md:block" /> {t("ctaTitle.part2")}
            </motion.h3>

            <motion.div
              variants={variants.fadeInUp}
              className="hidden md:block"
            >
              <Button href={`/${locale}/diagnostic`}>
                {t("ctaButton")}
              </Button>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <motion.h3
              variants={variants.fadeInUp}
              className="text-lg text-light font-medium"
            >
              {t("benefitsTitle")}
            </motion.h3>

            <motion.div
              variants={variants.staggerContainer}
              className="grid grid-cols-1 gap-4"
            >
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  variants={variants.fadeInUp}
                  className="flex items-center gap-4 p-5 rounded-lg border border-white/5 hover:bg-white/5 transition-colors"
                >
                  <div className="shrink-0 w-10 h-10 md:w-12 md:h-12 rounded bg-light/5 flex items-center justify-center border-2 border-primary-deep shadow-inner">
                    <img src="/check.svg" alt="check icon" />
                  </div>
                  <p className="text-light/80 text-sm text-pretty md:text-base font-medium">
                    {benefit}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              variants={variants.fadeInUp}
              className="block md:hidden mt-4"
            >
              <Button href={`/${locale}/diagnostic`} className="w-full">
                {t("ctaButtonMobile")}
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
