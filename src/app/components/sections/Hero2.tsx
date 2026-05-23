"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import Button from "../ui/Button";
import { variants } from "@/app/lib/animations";
import BgHeroCutout from "../../assets/img/hero2.webp";
import Container from "../ui/Container";
import { getWhatsAppUrl } from "@/app/lib/whatsapp";
import { useTranslations } from "next-intl";

export default function Hero() {
  const t = useTranslations("Hero");

  return (
    <motion.section
      id="home"
      variants={variants.staggerContainer}
      initial="initial"
      animate="animate"
      className="relative w-full h-auto md:h-screen md:min-h-[700px] flex flex-col overflow-hidden bg-dark"
    >
      <motion.div
        variants={variants.fadeIn}
        className="z-30 w-full bg-primary-deep/60 backdrop-blur-xl py-3 text-center"
      >
        <span className="text-sm md:text-base tracking-[0.1em] text-light">
          {t("topBar")}
        </span>
      </motion.div>

      <div className="flex flex-col md:block flex-1 relative">
        <motion.div
          variants={variants.staggerContainer}
          className="relative z-20 order-first flex flex-col justify-center pt-20 pb-16 md:pt-0 md:pb-0 md:absolute md:inset-0 md:flex-1"
        >
          <Container>
            <div className="max-w-[750px] md:w-[60%] space-y-6">
              <motion.div variants={variants.fadeInUp}>
                <img
                  src="/logo-financeiramente.svg"
                  alt="logo Financeiramente"
                  className="h-8 md:h-10"
                />
              </motion.div>

              <motion.h1
                variants={variants.fadeInUp}
                className="text-4xl md:text-5xl font-bold text-balance text-light leading-[1.15] tracking-tight"
              >
                {t("title.part1")} <br className="hidden md:block" />
                <span className="text-light">{t("title.part2")}</span>
              </motion.h1>

              <motion.p
                variants={variants.fadeInUp}
                className="text-lg md:text-xl text-light/80 max-w-[550px] leading-relaxed"
              >
                {t("subtitle")}
              </motion.p>

              <motion.div variants={variants.fadeInUp} className="pt-2">
                <Button
                  href={getWhatsAppUrl("sessaoEstrategica")}
                  target="_blank"
                >
                  {t("cta")}
                </Button>
              </motion.div>
            </div>
          </Container>
        </motion.div>

        <div className="relative order-last w-full h-[550px] md:h-auto md:absolute md:inset-y-0 md:right-0 md:z-10 md:w-1/2 overflow-hidden flex items-end justify-center md:justify-end">
          <Image
            src={BgHeroCutout}
            alt={t("imageAlt")}
            className="w-full h-full md:w-auto md:h-full object-cover object-top md:object-contain md:object-right-bottom md:max-h-[96%]"
            priority
          />
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-dark via-dark/80 to-transparent z-20" />
        </div>
      </div>

      <motion.div
        variants={variants.fadeInRight}
        className="hidden md:flex absolute bottom-10 right-6 md:right-12 z-30 bg-[#1a1a1a]/85 backdrop-blur-sm p-4 pr-8 rounded-md border border-white/5 items-center gap-5 shadow-2xl max-w-[380px]"
      >
        <div className="bg-primary-deep/60 p-3 rounded flex items-center justify-center">
          <TrendingUp className="text-light w-6 h-6" />
        </div>
        <div className="text-light text-sm md:text-[15px] leading-snug opacity-90 font-normal">
          {t("floatingBadge.part1")} <br />
          {t("floatingBadge.part2")}
        </div>
      </motion.div>
    </motion.section>
  );
}
