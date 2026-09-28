"use client";

import Link from "next/link";
import { useLocale } from "next-intl";

export default function LPHeader() {
  const locale = useLocale();

  return (
    <header className="w-full bg-dark/95 backdrop-blur-md border-b border-white/5 py-4 px-6 fixed top-0 left-0 z-50 transition-all duration-300">
      <div className="max-w-6xl mx-auto flex items-center justify-center">
        <Link
          href={`/${locale}/`}
          className="inline-block transition-transform hover:scale-[1.02] active:scale-[0.98]"
          title="FinanceiraMente"
        >
          <img
            src="/logo-financeiramente.svg"
            alt="Logo FinanceiraMente"
            className="h-7 sm:h-8 w-auto object-contain"
          />
        </Link>
      </div>
    </header>
  );
}
