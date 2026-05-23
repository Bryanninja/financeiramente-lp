"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  LucideIcon,
  ArrowUpRight,
  Users,
  Settings,
  MinusCircle,
  Layers,
  PieChart,
  Target,
  Activity,
  BarChart3,
  Search,
} from "lucide-react";
import Container from "../ui/Container";
import Button from "../ui/Button";
import { variants, viewportConfig } from "@/app/lib/animations";

// Imagens
import PaymentImg from "../../assets/img/payment.webp";
import CalcImg from "../../assets/img/calculation.webp";
import { getWhatsAppUrl } from "@/app/lib/whatsapp";
import { useTranslations } from "next-intl";

interface IconChipProps {
  icon: LucideIcon;
  text: string;
  color?: "primary" | "accent";
}

const IconChip = ({ icon: Icon, text, color = "primary" }: IconChipProps) => (
  <motion.div
    variants={variants.fadeInUp}
    className="flex items-center gap-2 px-3 py-3 bg-[#E3E2DE] backdrop-blur-sm rounded-lg border border-black/5"
  >
    <div
      className={`p-2 rounded-lg ${color === "primary" ? "bg-primary-deep" : "bg-accent-bronze"} text-white`}
    >
      <Icon size={16} />
    </div>
    <span className="text-base font-normal text-dark/80">{text}</span>
  </motion.div>
);

export default function ProblemReal() {
  const t = useTranslations("ProblemReal");

  return (
    <section className="bg-light py-24 md:py-32 space-y-32 overflow-hidden">
      <Container className="space-y-16 md:space-y-32">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          variants={variants.staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={viewportConfig}
        >
          <div className="space-y-8">
            <div className="space-y-6">
              <motion.div variants={variants.fadeInUp} className="space-y-4">
                <h2 className="text-3xl md:text-5xl font-bold text-dark leading-tight">
                  {t("title.part1")} <br /> {t("title.part2")}
                </h2>
                <p className="text-dark/90 font-medium text-lg md:text-2xl">
                  {t("subtitle")}
                </p>
              </motion.div>

              <motion.div
                variants={variants.staggerContainer}
                className="flex flex-wrap gap-6"
              >
                <IconChip icon={ArrowUpRight} text={t("skills.0")} />
                <IconChip icon={Users} text={t("skills.1")} />
                <IconChip icon={Settings} text={t("skills.2")} />
              </motion.div>
            </div>

            <motion.div
              variants={variants.fadeInUp}
              className="p-4 bg-accent-bronze/32 rounded-lg border-accent-bronze"
            >
              <p className="text-dark font-medium">
                {t("butRarelyLearns")}
              </p>
            </motion.div>

            <motion.div variants={variants.fadeInUp}>
              <Button
                variant="outline"
                href={getWhatsAppUrl("sessaoEstrategica")}
                target="_blank"
              >
                {t("ctaButton")}
              </Button>
            </motion.div>
          </div>

          <motion.div
            variants={variants.fadeInUp}
            className="relative aspect-square rounded-2xl overflow-hidden shadow-xl"
          >
            <Image
              src={PaymentImg}
              alt={t("paymentImageAlt")}
              fill
              className="object-cover"
            />
          </motion.div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          variants={variants.staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={viewportConfig}
        >
          <motion.div
            variants={variants.fadeInUp}
            className="order-2 lg:order-1 relative aspect-square rounded-2xl overflow-hidden shadow-xl"
          >
            <Image
              src={CalcImg}
              alt={t("calcImageAlt")}
              fill
              className="object-cover"
            />
          </motion.div>

          <div className="order-1 lg:order-2 space-y-8">
            <motion.div variants={variants.fadeInUp} className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-dark leading-tight">
                {t("growthTitle")}
              </h2>

              <motion.div
                variants={variants.staggerContainer}
                className="flex flex-wrap gap-3"
              >
                <IconChip icon={MinusCircle} text={t("growthConsequences.0")} color="accent" />
                <IconChip icon={Layers} text={t("growthConsequences.1")} color="accent" />
                <IconChip
                  icon={PieChart}
                  text={t("growthConsequences.2")}
                  color="accent"
                />
              </motion.div>
            </motion.div>

            <motion.div variants={variants.fadeInUp}>
              <Button
                variant="outline"
                href={getWhatsAppUrl("sessaoEstrategica")}
                target="_blank"
              >
                {t("ctaButton")}
              </Button>
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
          <div className="max-w-3xl space-y-4">
            <motion.h2
              variants={variants.fadeInUp}
              className="text-3xl md:text-4xl font-bold text-dark leading-tight"
            >
              {t("darkTitle")}
            </motion.h2>
            <motion.p
              variants={variants.fadeInUp}
              className="text-dark/80 text-xl font-medium"
            >
              {t("darkSubtitle")}
            </motion.p>
          </div>

          <motion.div
            variants={variants.staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              { icon: Search, text: t("darkCards.0") },
              { icon: Activity, text: t("darkCards.1") },
              { icon: BarChart3, text: t("darkCards.2") },
              { icon: Target, text: t("darkCards.3") },
            ].map((card, i) => (
              <motion.div
                key={i}
                variants={variants.fadeInUp}
                className="bg-[#E3E2DE] p-8 rounded-2xl border border-[#70706E]/20 flex flex-col justify-center gap-6 transition-all duration-300 hover:brightness-95 hover:shadow-md cursor-default"
              >
                <card.icon size={28} className="text-dark" />
                <p className="text-dark font-bold text-xl leading-snug">
                  {card.text}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
