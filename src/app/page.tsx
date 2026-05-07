import { main } from "framer-motion/client";
import Image from "next/image";
import Hero from "./components/sections/Hero";
import ProblemSection from "./components/sections/ProblemSection";
import ProblemReal from "./components/sections/ProblemReal";
import MaturityMap from "./components/sections/MaturityMap";
import Methodology from "./components/sections/Methodology";
import MethodSteps from "./components/sections/MethodSteps";
import Experience from "./components/sections/Experience";
import FinalCTA from "./components/sections/FinalCTA";
import Footer from "./components/sections/Footer";

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
