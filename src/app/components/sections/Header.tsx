"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import Container from "../ui/Container";
import { getWhatsAppUrl } from "@/app/lib/whatsapp";
import Button from "../ui/Button";
import { useTranslations, useLocale } from "next-intl";

interface HeaderProps {
  transparent?: boolean;
  noBackground?: boolean;
}

const Header = ({ transparent = false, noBackground = false }: HeaderProps) => {
  const t = useTranslations("Header");
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const NAV_LINKS = [
    { label: t("nav.home"), href: `/${locale}/` },
    { label: t("nav.map"), href: `/${locale}/#mapa` },
    { label: t("nav.method"), href: `/${locale}/#metodo` },
    { label: t("nav.about"), href: `/${locale}/#sobre` },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getHeaderStyle = () => {
    if (noBackground) return "bg-transparent py-6";
    if (isOpen) return "bg-dark py-6";
    if (transparent && !isScrolled) return "bg-transparent py-6";
    return "bg-dark/96 backdrop-blur-md border-b border-white/5 py-6 shadow-xl";
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${getHeaderStyle()}`}
    >
      <Container className="flex items-center justify-between">
        <Link
          href={`/${locale}/`}
          onClick={() => setIsOpen(false)}
          className="relative z-[110] block"
        >
          <img
            src="/logo-financeiramente.svg"
            alt="Logo FinanceiraMente"
            className="w-48 "
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-light/70 text-sm font-medium hover:text-white transition-colors duration-300"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
          className="md:hidden relative z-[110] p-2 text-light transition-transform active:scale-90"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </Container>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-dark z-[105] md:hidden"
          >
            <div className="flex flex-col h-full w-full pt-32 pb-12 px-8">
              <nav className="flex-1">
                <ul className="flex flex-col gap-6">
                  {NAV_LINKS.map((link, i) => (
                    <motion.li
                      key={link.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="text-3xl font-semibold text-light hover:text-primary-vibrant transition-colors"
                      >
                        {link.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col gap-4 w-full"
              >
                <Button
                  href={getWhatsAppUrl("sessaoEstrategica")}
                  target="_blank"
                  className="w-full py-4 text-base flex justify-center items-center gap-2"
                >
                  {t("ctaSession")}
                </Button>

                <Link
                  href={`/${locale}/diagnostic`}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-4 text-light/50 border border-white/10 rounded-xl font-medium hover:bg-white/5 active:bg-white/10 transition-all"
                >
                  {t("ctaDiagnostic")}
                  <ArrowRight size={16} />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
