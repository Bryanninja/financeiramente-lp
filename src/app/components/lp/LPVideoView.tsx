"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, FileChartColumn } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import HeroThumb from "../../assets/img/hero2.webp";

interface LPVideoViewProps {
  vimeoUrlOrId?: string;
}

export default function LPVideoView({ vimeoUrlOrId }: LPVideoViewProps) {
  const t = useTranslations("LPVideo");
  const locale = useLocale();

  // Determine Vimeo embed details from prop or environment variable
  const rawVideoSource =
    vimeoUrlOrId ||
    process.env.NEXT_PUBLIC_VIMEO_URL ||
    process.env.NEXT_PUBLIC_VIMEO_ID ||
    "https://player.vimeo.com/video/1230954509?h=ffac121f43";

  // Parse Vimeo ID and optional unlisted hash
  const parseVimeoSource = (source: string) => {
    if (!source) return null;
    const clean = source.trim();

    // Check for query parameter ?h=xxx or &h=xxx
    const hashMatch = clean.match(/[?&]h=([a-zA-Z0-9]+)/);
    const queryHash = hashMatch ? hashMatch[1] : null;

    // Check for unlisted path format: vimeo.com/123456789/abcdef
    const unlistedSlashMatch = clean.match(/vimeo\.com\/(\d+)\/([a-zA-Z0-9]+)/);
    if (unlistedSlashMatch && unlistedSlashMatch[2] !== "videos") {
      return { id: unlistedSlashMatch[1], hash: unlistedSlashMatch[2] };
    }

    // Check for player.vimeo.com/video/123456789 or vimeo.com/123456789 or vimeo.com/.../videos/123456789
    const idMatch = clean.match(/(?:videos\/|video\/|vimeo\.com\/)(\d+)/);
    if (idMatch) {
      return { id: idMatch[1], hash: queryHash };
    }

    // Check if numeric ID directly provided
    const numericMatch = clean.match(/^(\d+)/);
    if (numericMatch) {
      return { id: numericMatch[1], hash: queryHash };
    }

    return null;
  };

  const vimeoData = parseVimeoSource(rawVideoSource);

  const getVimeoEmbedUrl = () => {
    if (!vimeoData) return "";
    const base = `https://player.vimeo.com/video/${vimeoData.id}?badge=0&autopause=0&player_id=0&app_id=58479&color=2563eb&title=0&byline=0&portrait=0&playsinline=1&dnt=1`;
    return vimeoData.hash ? `${base}&h=${vimeoData.hash}` : base;
  };

  // Track ViewContent on page load for Meta Pixel
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "ViewContent", {
        content_name: "LP Video Diagnostic",
        content_category: "Video Funnel",
      });
    }
  }, []);

  const handleCtaClick = () => {
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("trackCustom", "ClickCTA_LP_Diagnostic", {
        source: "LP Video Hero CTA",
      });
    }
  };

  return (
    <section className="relative w-full min-h-screen bg-[#F8F7F5] pt-24 pb-20 px-4 sm:px-6 flex flex-col justify-center items-center overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-deep/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto w-full flex flex-col items-center text-center">
        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary-vibrant/40 text-primary-deep font-semibold text-xs sm:text-sm tracking-wide shadow-xs"
        >
          <FileChartColumn className="w-3.5 h-3.5 text-primary-vibrant" />
          <span>{t("badge")}</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-dark tracking-tight leading-[1.15] max-w-3xl mt-6 text-balance"
        >
          {t("headline")}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl sm:max-w-3xl text-pretty text-dark/70 max-w-xl mt-4 leading-relaxed font-normal"
        >
          {t("subtitle")}
        </motion.p>

        {/* Video Player Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="w-full max-w-3xl mx-auto mt-8 sm:mt-10 relative"
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute -inset-1.5 bg-gradient-to-r from-primary-deep/20 via-primary-vibrant/25 to-primary-deep/20 rounded-[2rem] blur-xl opacity-75 -z-10" />

          <div className="relative w-full aspect-video rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-dark/10 bg-[#121212]">
            {vimeoData ? (
              <iframe
                src={getVimeoEmbedUrl()}
                className="w-full h-full border-0 absolute inset-0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title="FinanceiraMente - Diagnóstico"
              />
            ) : (
              <div className="w-full h-full relative flex items-center justify-center">
                <Image
                  src={HeroThumb}
                  alt="Michel Stawicki - FinanceiraMente"
                  fill
                  priority
                  className="object-cover object-top opacity-70"
                />
              </div>
            )}
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 sm:mt-10 w-full flex flex-col items-center"
        >
          <Link
            href={`/${locale}/questions`}
            onClick={handleCtaClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-primary-vibrant hover:bg-primary-deep text-white font-bold text-lg sm:text-xl rounded-2xl shadow-[0_10px_30px_rgba(37,99,235,0.3)] hover:shadow-[0_15px_40px_rgba(30,58,138,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 group"
          >
            <span>{t("ctaButton")}</span>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1.5 transition-transform duration-300" />
          </Link>

          {/* Social Proof Line */}
          <div className="flex flex-col items-center justify-center gap-2 mt-4 text-xs sm:text-sm text-dark/65 max-w-md text-center font-medium">
            <span>{t("socialProof")}</span>
            <ShieldCheck className="w-4 h-4 text-primary-deep shrink-0" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
