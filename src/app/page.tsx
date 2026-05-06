import { main } from "framer-motion/client";
import Image from "next/image";
import Hero from "./components/sections/Hero";
import ProblemSection from "./components/sections/ProblemSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <ProblemSection />
    </main>
  );
}
