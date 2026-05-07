import { main } from "framer-motion/client";
import Image from "next/image";
import Hero from "./components/sections/Hero";
import ProblemSection from "./components/sections/ProblemSection";
import ProblemReal from "./components/sections/ProblemReal";
import MaturityMap from "./components/sections/MaturityMap";

export default function Home() {
  return (
    <main>
      <Hero />
      <ProblemSection />
      <ProblemReal />
      <MaturityMap />
    </main>
  );
}
