import Hero from "./components/sections/Hero";
import ProblemSection from "./components/sections/ProblemSection";
import ProblemReal from "./components/sections/ProblemReal";
import MaturityMap from "./components/sections/MaturityMap";
import Methodology from "./components/sections/Methodology";
import MethodSteps from "./components/sections/MethodSteps";
import Experience from "./components/sections/Experience";
import FinalCTA from "./components/sections/FinalCTA";
import Footer from "./components/sections/Footer";

export const metadata = {
  title: "Sessão Estratégica e Mentoria Financeira",
  description:
    "Agende sua Sessão Estratégica. Use nosso Diagnóstico de Maturidade Financeira para identificar gargalos e estruturar o crescimento do seu negócio.",
};

export default function Home() {
  return (
    <main>
      <Hero />
      <ProblemSection />
      <ProblemReal />
      <MaturityMap />
      <Methodology />
      <MethodSteps />
      <Experience />
      <FinalCTA />
      <Footer />
    </main>
  );
}
