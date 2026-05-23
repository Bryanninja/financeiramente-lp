"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Search, DollarSign, Wallet, HelpCircle } from "lucide-react";
import Container from "../ui/Container";
import { variants, viewportConfig } from "@/app/lib/animations";
import StressImg from "../../assets/img/stress-business.webp";
import { useTranslations } from "next-intl";

export default function ProblemSection() {
  const t = useTranslations("ProblemSection");

  const painCards = [
    {
      icon: <Search className="w-5 h-5" />,
      text: t("painCards.0"),
    },
    {
      icon: <DollarSign className="w-5 h-5" />,
      text: t("painCards.1"),
    },
    {
      icon: <Wallet className="w-5 h-5" />,
      text: t("painCards.2"),
    },
    {
      icon: <HelpCircle className="w-5 h-5" />,
      text: t("painCards.3"),
    },
  ];

  return (
    <section className="bg-dark py-24 md:py-32">
      <Container>
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start"
          variants={variants.staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={viewportConfig}
        >
          <div className="space-y-10">
            <div className="space-y-6">
              <motion.div
                variants={variants.fadeInUp}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-light/40 bg-light/5"
              >
                <div className="w-2 h-2 rounded-full bg-primary-vibrant" />
                <span className="text-sm font-semibold text-light/70">
                  {t("badge")}
                </span>
              </motion.div>

              <motion.h2
                variants={variants.fadeInUp}
                className="text-3xl md:text-5xl font-bold text-light leading-tight"
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
              variants={variants.fadeIn}
              className="relative aspect-video rounded-xl overflow-hidden shadow-2xl border border-white/5"
            >
              <Image
                src={StressImg}
                alt={t("imageAlt")}
                fill
                className="object-cover brightness-90 hover:brightness-100 transition-all duration-500"
              />
            </motion.div>

            <div className="space-y-8 pt-4">
              <motion.div variants={variants.fadeInUp} className="space-y-2">
                <h3 className="text-light text-xl font-bold leading-snug">
                  {t("consequenceTitle")}
                </h3>
                <p className="text-light/60 text-lg leading-relaxed">
                  {t("consequenceDesc")}
                </p>
              </motion.div>

              <motion.div variants={variants.fadeInUp} className="  space-y-2">
                <p className="text-light/60 text-lg leading-relaxed">
                  <strong className="text-light">
                    {t("methodName")}
                  </strong>{" "}
                  {t("methodDesc")}
                </p>
              </motion.div>
            </div>
          </div>

          <motion.div
            variants={variants.staggerContainer}
            className="grid grid-cols-1 gap-6 sticky top-32"
          >
            <motion.p
              variants={variants.fadeInUp}
              className="text-light text-lg text-pretty font-medium"
            >
              {t("painListTitle")}
            </motion.p>
            {painCards.map((card, index) => (
              <motion.div
                key={index}
                variants={variants.fadeInUp}
                className="group bg-[#1a1a1a] p-8 rounded-xl border border-white/5 hover:border-primary-vibrant/30 transition-all shadow-lg"
              >
                <div className="flex flex-col gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-primary-deep transition-colors text-light">
                    {card.icon}
                  </div>
                  <p className="text-light text-xl font-medium leading-snug">
                    {card.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
