"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Search, DollarSign, Calculator } from "lucide-react";
import Container from "../ui/Container";
import Button from "../ui/Button";
import { variants, viewportConfig } from "@/app/lib/animations";
import { getWhatsAppUrl } from "@/app/lib/whatsapp";
import { useTranslations } from "next-intl";

import FinalMeetingImg from "../../assets/img/final-meeting.webp";

export default function FinalCTA() {
  const t = useTranslations("FinalCTA");

  const clarityPoints = [
    {
      icon: <Search className="w-6 h-6" />,
      text: t("points.0"),
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      text: t("points.1"),
    },
    {
      icon: <Calculator className="w-6 h-6" />,
      text: t("points.2"),
    },
  ];

  return (
    <section className="bg-dark py-24 md:py-32 overflow-hidden">
      <Container>
        <motion.div
          variants={variants.staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={viewportConfig}
          className="space-y-16"
        >
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <motion.h2
              variants={variants.fadeInUp}
              className="text-3xl md:text-5xl font-bold text-light leading-tight"
            >
              {t("title.part1")} <br /> {t("title.part2")}
            </motion.h2>

            <motion.p
              variants={variants.fadeInUp}
              className="text-light/70 text-base md:text-lg leading-relaxed max-w-3xl mx-auto"
            >
              {t("description")}
            </motion.p>
          </div>

          <motion.div
            variants={variants.fadeInUp}
            className="relative w-full aspect-square md:aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl"
          >
            <Image
              src={FinalMeetingImg}
              alt="Reunião estratégica com Michel Stawicki"
              fill
              className="object-cover object-top hover:scale-105 transition-transform duration-1000"
            />
          </motion.div>

          <div className="space-y-12 pt-8">
            <motion.h3
              variants={variants.fadeInUp}
              className="text-2xl md:text-4xl font-bold text-light text-center leading-tight"
            >
              {t("clarityTitle.part1")} <br /> {t("clarityTitle.part2")}
            </motion.h3>

            <motion.div
              variants={variants.staggerContainer}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {clarityPoints.map((point, index) => (
                <motion.div
                  key={index}
                  variants={variants.fadeInUp}
                  className="bg-[#1a1a1a] p-8 rounded-xl border border-white/5 space-y-6 hover:border-primary-vibrant/20 transition-all group"
                >
                  <div className="text-light group-hover:text-primary-vibrant transition-colors">
                    {point.icon}
                  </div>
                  <p className="text-light/80 text-base md:text-lg leading-snug font-medium">
                    {point.text}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div
            variants={variants.fadeInUp}
            className="flex justify-center"
          >
            <Button
              variant="white"
              href={getWhatsAppUrl("sessaoEstrategica")}
              target="_blank"
            >
              {t("button")}
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
