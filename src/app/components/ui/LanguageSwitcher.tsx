"use client";

import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export default function LanguageSwitcher({
  locale,
}: {
  locale: string;
}) {
  const t = useTranslations("Switcher");
  const router = useRouter();
  const pathname = usePathname();

  const handleSwitch = (newLocale: string) => {
    if (newLocale === locale) return;

    localStorage.setItem("fm_locale", newLocale);
    const newPathname = pathname.replace(new RegExp(`^/${locale}`), `/${newLocale}`);
    router.push(newPathname === "" ? `/${newLocale}` : newPathname);
  };

  // Do not show language switcher on /lp (video is Portuguese-only, keep zero distraction)
  if (pathname.includes("/lp")) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center bg-dark/90 backdrop-blur-md shadow-lg rounded-full p-1 border border-white/10">
      <button
        onClick={() => handleSwitch("pt")}
        className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-colors ${
          locale === "pt"
            ? "bg-primary-vibrant text-white"
            : "text-light/50 hover:text-light"
        }`}
      >
        {t("pt")}
      </button>
      <button
        onClick={() => handleSwitch("en")}
        className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-colors ${
          locale === "en"
            ? "bg-primary-vibrant text-white"
            : "text-light/50 hover:text-light"
        }`}
      >
        {t("en")}
      </button>
    </div>
  );
}
