"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Container from "../ui/Container";
import Button from "../ui/Button";
import { variants, viewportConfig } from "@/app/lib/animations";
import { getWhatsAppUrl } from "@/app/lib/whatsapp";
import CollaborationImg from "../../assets/img/collaboration.webp";
import { useTranslations } from "next-intl";

export default function MethodSteps() {
  const t = useTranslations("MethodSteps");

  const steps = [
    {
      title: t("steps.0.title"),
      description: t("steps.0.description"),
      status: "checked",
    },
    {
      title: t("steps.1.title"),
      description: t("steps.1.description"),
      status: "solid",
    },
    {
      title: t("steps.2.title"),
      description: t("steps.2.description"),
      status: "solid",
    },
    {
      title: t("steps.3.title"),
      description: t("steps.3.description"),
      status: "solid",
    },
  ];

  return (
    <section className="bg-light py-24 md:py-32 overflow-hidden">
      <Container>
        <motion.div
          variants={variants.staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={viewportConfig}
          className="space-y-16"
        >
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <motion.h2
              variants={variants.fadeInUp}
              className="text-4xl md:text-5xl font-bold text-dark leading-tight"
            >
              {t("title")}
            </motion.h2>
            <motion.p
              variants={variants.fadeInUp}
              className="text-dark/70 text-lg text-pretty md:text-xl"
            >
              {t("description")}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
            <div className="flex flex-col space-y-8 pt-4">
              <motion.h3
                variants={variants.fadeInUp}
                className="text-xl md:text-2xl font-bold text-dark leading-tight"
              >
                {t("productsTitle")}
              </motion.h3>
              <motion.div
                variants={variants.staggerContainer}
                className="relative"
              >
                <motion.div
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  className="absolute left-[19px] top-4 bottom-4 w-[1.5px] bg-dark origin-top opacity-20"
                />

                <div className="space-y-6">
                  {steps.map((step, index) => (
                    <motion.div
                      key={index}
                      variants={variants.fadeInUp}
                      className="relative flex items-start group"
                    >
                      <div className="relative z-10 flex items-center justify-center w-10 h-10 shrink-0">
                        <div className="w-8 h-8 rounded-full bg-dark flex items-center justify-center border border-white/10 shadow-lg">
                          {step.status === "checked" && (
                            <Check size={18} className="text-white" />
                          )}
                        </div>
                      </div>

                      <div
                        className={`ml-6 flex-1 transition-all p-6 duration-300 
                        ${index === 0 ? "bg-white border border-primary-vibrant rounded-2xl shadow-xl -mt-2" : "py-2"}`}
                      >
                        <div className="flex flex-col-reverse md:flex-row md:gap-4 ">
                          <h3 className="text-xl font-medium text-dark mb-2">
                            {step.title}
                          </h3>

                          {index === 0 && (
                            <div className="inline-flex items-center gap-2 px-3 py-1 w-fit rounded-full border border-dark/60 bg-transparent mb-4">
                              <div className="w-2 h-2 rounded-full bg-primary-vibrant" />
                              <span className="text-xs md:text-sm tracking-wider text-dark font-semibold">
                                {t("freeSessionBadge")}
                              </span>
                            </div>
                          )}
                        </div>
                        <p
                          className={`text-pretty leading-relaxed text-base ${index === 0 ? "text-dark/80" : "text-dark/70"}`}
                        >
                          {step.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                variants={variants.fadeInUp}
                className="space-y-8 pt-4"
              >
                <h3 className="text-xl text-dark font-medium">
                  {t("ctaDescription")}
                </h3>

                <Button
                  variant="black"
                  className="w-full md:w-auto px-10"
                  href={getWhatsAppUrl("sessaoEstrategica")}
                  target="_blank"
                >
                  {t("ctaButton")}
                </Button>
              </motion.div>
            </div>

            <motion.div
              variants={variants.fadeIn}
              className="relative aspect-[16/14] lg:h-full w-full rounded-lg overflow-hidden shadow-xl"
            >
              <Image
                src={CollaborationImg}
                alt={t("imageAlt")}
                fill
                className="object-cover hover:scale-105 transition-transform duration-1000"
                priority
              />
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
