"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function LanguageDetector({
  locale,
}: {
  locale: string;
}) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const savedLocale = localStorage.getItem("fm_locale");
    const browserLang = navigator.language.startsWith("en") ? "en" : "pt";
    const targetLocale = savedLocale || browserLang;

    if (locale !== targetLocale) {
      const newPathname = pathname.replace(
        new RegExp(`^/${locale}`),
        `/${targetLocale}`,
      );
      localStorage.setItem("fm_locale", targetLocale);
      router.replace(newPathname === "" ? `/${targetLocale}` : newPathname);
    }
  }, [locale, pathname, router]);

  return null;
}
