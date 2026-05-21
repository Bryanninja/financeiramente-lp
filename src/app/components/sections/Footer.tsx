"use client";

import { useEffect, useState } from "react";
import Link from "next/link"; // Importação essencial
import { motion } from "framer-motion";
import Container from "../ui/Container";
import { variants, viewportConfig } from "@/app/lib/animations";
import { Mail } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "O Mapa", href: "/#mapa" },
  { name: "O Método", href: "/#metodo" },
  { name: "Sobre", href: "/#sobre" },
];

const legalLinks = [
  { name: "Política de privacidade", href: "/politica-de-privacidade" },
  { name: "Termos de serviço", href: "/termos-de-servico" },
  { name: "Configurações de cookies", href: "/cookies" },
];

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const setYear = async () => {
      setCurrentYear(new Date().getFullYear());
    };
    setYear();
  }, []);

  return (
    <footer className="bg-dark pt-16 pb-8 border-t border-white/5 overflow-hidden">
      <Container>
        <motion.div
          variants={variants.staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={viewportConfig}
          className="space-y-12"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-4">
            {/* Logo */}
            <motion.div variants={variants.fadeInUp}>
              <Link href="/" className="hover:opacity-80 transition-opacity">
                <img
                  src="/logo-financeiramente.svg"
                  className="w-48"
                  alt="Logo FinanceiraMente"
                />
              </Link>
            </motion.div>

            {/* Navegação Central - AGORA COM <Link> */}
            <motion.nav variants={variants.fadeInUp} className="flex gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-light/70 hover:text-light transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </motion.nav>

            {/* Ícones Sociais - MANTEMOS <a> POIS SÃO EXTERNOS */}
            <motion.div
              variants={variants.fadeInUp}
              className="flex gap-6 items-center"
            >
              <a
                href="mailto:michel@msfinanceiramente.com"
                className="text-light/70 hover:text-light transition-colors"
                aria-label="Enviar e-mail para Michel"
              >
                <Mail />
              </a>
              <a
                href="https://www.instagram.com/michel.financeiramente/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-light/70 hover:text-light transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon />
              </a>
              <a
                href="https://www.linkedin.com/in/michel-stawicki/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-light/70 hover:text-light transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedInIcon />
              </a>
            </motion.div>
          </div>

          <motion.div
            variants={variants.fadeIn}
            className="h-[1px] w-full bg-white/10"
          />

          <motion.div
            variants={variants.fadeInUp}
            className="flex flex-col md:flex-row justify-between items-center gap-6"
          >
            <p className="text-xs text-light/40 font-medium">
              © {currentYear} FinanceiraMente. Todos os direitos reservados.
            </p>

            <div className="flex flex-wrap justify-center gap-6 md:gap-8">
              {legalLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-[11px] font-medium text-light/40 hover:text-light/80 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </footer>
  );
}

// Componentes de ícone isolados para limpar o código (opcional)
const InstagramIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13 0H5C2.23858 0 0 2.23858 0 5V13C0 15.7614 2.23858 18 5 18H13C15.7614 18 18 15.7614 18 13V5C18 2.23858 15.7614 0 13 0ZM16.25 13C16.2445 14.7926 14.7926 16.2445 13 16.25H5C3.20735 16.2445 1.75549 14.7926 1.75 13V5C1.75549 3.20735 3.20735 1.75549 5 1.75H13C14.7926 1.75549 16.2445 3.20735 16.25 5V13ZM13.75 5.25C14.3023 5.25 14.75 4.80228 14.75 4.25C14.75 3.69772 14.3023 3.25 13.75 3.25C13.1977 3.25 12.75 3.69772 12.75 4.25C12.75 4.80228 13.1977 5.25 13.75 5.25ZM9 4.5C6.51472 4.5 4.5 6.51472 4.5 9C4.5 11.4853 6.51472 13.5 9 13.5C11.4853 13.5 13.5 11.4853 13.5 9C13.5027 7.8057 13.0294 6.65957 12.1849 5.81508C11.3404 4.97059 10.1943 4.49734 9 4.5ZM6.25 9C6.25 10.5188 7.4812 11.75 9 11.75C10.5188 11.75 11.75 10.5188 11.75 9C11.75 7.4812 10.5188 6.25 9 6.25C7.4812 6.25 6.25 7.4812 6.25 9Z"
      fill="currentColor"
    />
  </svg>
);

const LinkedInIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"
      fill="currentColor"
    />
  </svg>
);
