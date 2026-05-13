// src/app/lib/animations.ts
import { Transition, Variants } from "framer-motion";

export const transition: Transition = {
  duration: 0.8,
  ease: [0.22, 1, 0.36, 1],
};

// Tipo correto: cada entrada é um objeto { initial, animate } — não Variants diretamente
type NamedVariants = {
  [key: string]: Variants;
};

export const variants: NamedVariants = {
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition },
  },
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition },
  },
  fadeInRight: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0, transition },
  },
  staggerContainer: {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  },
};

export const viewportConfig = { once: true, amount: 0.3 };
