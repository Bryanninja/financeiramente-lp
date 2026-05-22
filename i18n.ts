import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

export const locales = ["pt", "en"];
export const defaultLocale = "pt";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  
  if (!locale || !locales.includes(locale)) {
    locale = defaultLocale;
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
