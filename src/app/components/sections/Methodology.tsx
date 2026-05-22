"use client";

import { motion } from "framer-motion";
import Container from "../ui/Container";
import { variants, viewportConfig } from "@/app/lib/animations";
import { useLocale, useTranslations } from "next-intl";

export default function Methodology() {
  const t = useTranslations("Methodology");
  const locale = useLocale();
  const mapSvg = locale === "en" ? "/map.svg" : "/mapa.svg";

  const pillars = [
    {
      title: t("pillars.0.title"),
      description: t("pillars.0.description"),
    },
    {
      title: t("pillars.1.title"),
      description: t("pillars.1.description"),
    },
    {
      title: t("pillars.2.title"),
      description: t("pillars.2.description"),
    },
    {
      title: t("pillars.3.title"),
      description: t("pillars.3.description"),
    },
  ];

  return (
    <section id="metodo" className="bg-dark py-8 md:pb-32 overflow-hidden">
      <Container>
        <motion.div
          variants={variants.staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={viewportConfig}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          <div className="space-y-12">
            <div className="space-y-6">
              <motion.div
                variants={variants.fadeInUp}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-light/70 bg-primary-vibrant/5"
              >
                <div className="w-2 h-2 rounded-full bg-primary-vibrant" />
                <span className="text-sm tracking-wider text-light/70 font-semibold">
                  {t("badge")}
                </span>
              </motion.div>

              <motion.h2
                variants={variants.fadeInUp}
                className="text-3xl md:text-[2.6rem] font-bold text-light leading-tight"
              >
                {t("title")}
              </motion.h2>

              <motion.p
                variants={variants.fadeInUp}
                className="text-light/60 text-lg leading-relaxed max-w-xl"
              >
                {t("description")}
              </motion.p>
            </div>

            <motion.div
              variants={variants.staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {pillars.map((pillar, index) => (
                <motion.div
                  key={index}
                  variants={variants.fadeInUp}
                  className="bg-[#1A1A1A] p-8 flex flex-col justify-center rounded-lg border border-white/5 hover:border-primary-vibrant/20 hover:bg-light/5 transition-all group"
                >
                  <h3 className="text-light text-xl font-semibold mb-3 group-hover:text-primary-vibrant transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-light/60 text-base text-pretty leading-relaxed">
                    {pillar.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div
            variants={variants.fadeInRight}
            className="relative flex justify-center lg:justify-end"
          >
            <img
              src={mapSvg}
              alt={t("imageAlt")}
              className="w-full max-w-[550px] hover:scale-105 transition-transform duration-500 drop-shadow-[0_0_30px_rgba(30,58,138,0.3)]"
            />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
