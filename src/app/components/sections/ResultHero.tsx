"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronsDown } from "lucide-react";
import Container from "../ui/Container";
import { variants } from "@/app/lib/animations";
import bgReport from "@/app/assets/img/bg-result.webp";
import Image from "next/image";
import Header from "./Header";
import { useLocale, useTranslations } from "next-intl";

export default function ResultHero() {
  const t = useTranslations("ResultHero");
  const locale = useLocale();
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  const handleSendEmail = async () => {
    if (sending || sent) return;
    setSending(true);
    try {
      const user = JSON.parse(localStorage.getItem("fm_user") || "{}");
      const result = JSON.parse(localStorage.getItem("fm_result") || "{}");
      await fetch("/enviar.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: user.name ?? "Usuário",
          email: user.email ?? "",
          company: user.company ?? "",
          phase: result.phase ?? 2,
          score: result.totalScore ?? 24,
          pilarScores: result.pilarScores ?? [7, 8, 10, 7],
          locale: locale,
        }),
      });
      setSent(true);
    } catch {
      // falha silenciosa
    } finally {
      setSending(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: t("shareTitle"),
          text: t("shareText"),
          url: window.location.href,
        });
      } catch {
        /* ignorar */
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      setShareSuccess(true);
      setTimeout(() => setShareSuccess(false), 2000);
    }
  };

  return (
    <section className="relative w-full min-h-[800px] flex flex-col justify-center overflow-hidden">
      <Header />
      <div className="absolute inset-0 z-0">
        <Image
          fill
          className="object-cover"
          src={bgReport}
          alt={t("bgAlt")}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/80 via-dark/60 to-dark/80" />
      </div>

      <Container className="relative z-10">
        <motion.div
          className="max-w-[900px] mx-auto text-center space-y-10"
          variants={variants.staggerContainer}
          initial="initial"
          animate="animate"
        >
          <div className="space-y-6">
            <motion.h1
              variants={variants.fadeInUp}
              className="text-3xl md:text-5xl pt-32 font-bold text-white leading-tight tracking-tight"
            >
              {t("title.part1")} <br className="hidden md:block" />{" "}
              {t("title.part2")}
            </motion.h1>

            <motion.p
              variants={variants.fadeInUp}
              className="text-sm md:text-lg text-pretty text-white/80 max-w-2xl mx-auto leading-relaxed"
            >
              {t("subtitle")}
            </motion.p>
          </div>

          <motion.div
            variants={variants.fadeInUp}
            className="flex flex-col md:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={handleShare}
              className="w-full md:w-[220px] px-8 py-4 cursor-pointer rounded-md border border-white text-white font-medium hover:bg-white/10 transition-all duration-300 active:scale-95"
            >
              {shareSuccess ? t("buttonShareSuccess") : t("buttonShare")}
            </button>

            <button
              onClick={handleSendEmail}
              disabled={sending || sent}
              className="w-full md:w-[220px] px-8 py-4 cursor-pointer rounded-md bg-white text-dark font-bold hover:bg-neutral-100 transition-all duration-300 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {sent
                ? t("buttonEmailSuccess")
                : sending
                  ? t("buttonEmailSending")
                  : t("buttonEmail")}
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 1.2,
              duration: 1,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="pt-12 flex justify-center"
          >
            <div className="p-2 rounded-full border border-white/20 flex items-center justify-center">
              <ChevronsDown className="text-white w-6 h-6" strokeWidth={1.5} />
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
