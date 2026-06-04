"use client";

import { motion } from "framer-motion";
import Container from "../ui/Container";
import Button from "../ui/Button";
import { variants, viewportConfig } from "@/app/lib/animations";
import { useTranslations } from "next-intl";

export default function DiagnosticInfo() {
  const t = useTranslations("DiagnosticInfo");

  const steps = [
    { id: 1, text: t("steps.0") },
    { id: 3, text: t("steps.1") },
    { id: 2, text: t("steps.2") },
    { id: 4, text: t("steps.3") },
  ];

  const pillars = [
    {
      title: t("pillars.0.title"),
      desc: t("pillars.0.desc"),
    },
    {
      title: t("pillars.1.title"),
      desc: t("pillars.1.desc"),
    },
    {
      title: t("pillars.2.title"),
      desc: t("pillars.2.desc"),
    },
    {
      title: t("pillars.3.title"),
      desc: t("pillars.3.desc"),
    },
  ];

  return (
    <section className="bg-dark py-24 md:py-32 space-y-32">
      <Container>
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center"
          variants={variants.staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={viewportConfig}
        >
          <div className="space-y-6">
            <motion.h2
              variants={variants.fadeInUp}
              className="text-3xl md:text-[2.6rem] font-bold text-light leading-tight"
            >
              {t("titleMap")}
            </motion.h2>
            <motion.p
              variants={variants.fadeInUp}
              className="text-light/60 text-lg"
            >
              {t("descMap")}
            </motion.p>
          </div>

          <motion.div
            variants={variants.staggerContainer}
            className="flex flex-col gap-4 items-start"
          >
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                variants={variants.fadeInUp}
                style={{ width: `${70 + index * 10}%` }}
                className="flex items-center gap-4 p-4 rounded-lg border border-white/5 bg-white/[0.002] hover:border-primary-deep/80 hover:bg-white/5 hover:scale-105 transition-all duration-300"
              >
                <div className="w-12 h-12 shrink-0 rounded-lg bg-primary-deep flex text-3xl items-center justify-center text-light">
                  {step.id}
                </div>
                <span className="text-light/80 font-medium">{step.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          variants={variants.fadeIn}
          className="h-[1px] w-full bg-white/5 my-20 md:my-24"
        />

        <motion.div
          className="grid grid-cols-1 lg:col-2 gap-20 items-center"
          variants={variants.staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={viewportConfig}
        >
          <div className="order-2 space-y-6">
            <motion.div
              variants={variants.staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 order-2 items-stretch"
            >
              {pillars.map((pillar, i) => (
                <motion.div
                  key={i}
                  variants={variants.fadeInUp}
                  className="h-full flex"
                >
                  <div className="p-8 rounded-lg group hover:border-primary-deep/60 transition-colors hover:bg-light/5 border border-white/5 bg-[#1a1a1a] space-y-4 w-full flex flex-col">
                    <h4 className="text-light group-hover:text-primary-vibrant duration-300 font-bold text-xl">
                      {pillar.title}
                    </h4>
                    <p className="text-light/50 text-pretty text-sm leading-relaxed flex-1">
                      {pillar.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            <motion.p
              variants={variants.fadeInUp}
              className="text-light/60 text-lg"
            >
              {t("pillarsEndDesc")}
            </motion.p>
          </div>

          <div className="space-y-6 order-1 ">
            <motion.h2
              variants={variants.fadeInUp}
              className="text-3xl  font-bold text-light leading-tight"
            >
              {t("titlePillars")}
            </motion.h2>
            <motion.p
              variants={variants.fadeInUp}
              className="text-light/60 text-lg"
            >
              {t("descPillars")}
            </motion.p>
            <motion.div variants={variants.fadeInUp}>
              <Button href="#diagnostic" className="px-10 py-4">
                {t("ctaButton")}
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
