"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

export default function LPFooter() {
  const locale = useLocale();
  const t = useTranslations("LPVideo");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#121212] text-light/60 border-t border-white/5 py-8 px-6 text-sm">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <p className="text-xs sm:text-sm text-light/50">
          © {currentYear} FinanceiraMente — {t("footerText")}
        </p>

        <div className="flex items-center gap-6 text-xs sm:text-sm">
          <Link
            href={`/${locale}/politica-de-privacidade`}
            className="hover:text-light transition-colors duration-200"
          >
            {t("privacy")}
          </Link>
          <span className="text-white/20">·</span>
          <Link
            href={`/${locale}/termos-de-servico`}
            className="hover:text-light transition-colors duration-200"
          >
            {t("terms")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
