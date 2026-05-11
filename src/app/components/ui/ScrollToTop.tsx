"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // 1. Se houver um hash na URL (ex: #sobre), não resetamos para o topo.
    // Isso permite que o nosso ScrollHandler leve o usuário até a seção.
    if (window.location.hash) return;

    // 2. Desativa a restauração automática do scroll do navegador
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // 3. Força o scroll para o topo em mudanças de rota limpas
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  // O SEGREDO: Componentes React precisam retornar null se não renderizam nada.
  return null;
}
