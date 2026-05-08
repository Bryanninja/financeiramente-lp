"use client";

import Container from "../ui/Container";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
// Importamos o sistema centralizado
import { variants } from "@/app/lib/animations";

interface LegalPageProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

export default function LegalPage({
  title,
  lastUpdated,
  children,
}: LegalPageProps) {
  const router = useRouter();

  return (
    <section className="bg-light min-h-screen py-16 md:py-24">
      <Container>
        <motion.div
          variants={variants.staggerContainer} // Cascata: Botão -> Header -> Conteúdo
          initial="initial"
          animate="animate"
          className="max-w-3xl mx-auto"
        >
          {/* Botão Voltar - Agora com variante centralizada */}
          <motion.button
            variants={variants.fadeInUp}
            onClick={() => router.back()}
            className="group flex items-center gap-2 text-dark/40 hover:text-dark transition-colors mb-12 cursor-pointer"
          >
            <div className="p-2 rounded-full border border-dark/10 group-hover:border-dark/20 transition-colors">
              <ArrowLeft size={16} />
            </div>
            <span className="text-sm font-medium">Voltar</span>
          </motion.button>

          <div className="space-y-12">
            {/* Cabeçalho da Página */}
            <motion.header
              variants={variants.fadeInUp}
              className="space-y-4 border-b border-dark/10 pb-8"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-dark tracking-tight">
                {title}
              </h1>
              <p className="text-dark/40 text-sm font-medium uppercase tracking-widest">
                Última atualização: {lastUpdated}
              </p>
            </motion.header>

            {/* Conteúdo do Documento */}
            <motion.article
              variants={variants.fadeInUp}
              className="
                prose prose-slate prose-lg max-w-none 
                prose-headings:text-dark prose-headings:font-bold prose-headings:mt-12 prose-headings:mb-6
                prose-p:text-dark/70 prose-p:leading-relaxed prose-p:mb-6
                prose-li:text-dark/70 prose-li:mb-2
                prose-strong:text-dark prose-strong:font-bold
                prose-ul:list-disc prose-ul:pl-5
              "
            >
              {children}
            </motion.article>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
