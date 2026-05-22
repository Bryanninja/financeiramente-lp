"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ResultHero from "../../components/sections/ResultHero";
import ResultAnalysis from "../../components/sections/ResultAnalysis";
import ResultNextSteps from "../../components/sections/FinalCTARes";
import Footer from "../../components/sections/Footer";

import { useLocale } from "next-intl";

export default function DiagnosticResultClient() {
  const router = useRouter();
  const locale = useLocale();
  const [phase, setPhase] = useState(2);
  const [score, setScore] = useState(24);
  const [pilarScores, setPilarScores] = useState([7, 8, 10, 7]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const localStorageFunc = () => {
      const raw = localStorage.getItem("fm_result");
      if (raw) {
        const data = JSON.parse(raw);
        setPhase(data.phase ?? 2);
        setScore(data.totalScore ?? 24);
        setPilarScores(data.pilarScores ?? [7, 8, 10, 7]);
        setLoaded(true);
      } else {
        router.push(`/${locale}/diagnostic`);
      }
    };
    localStorageFunc();
  }, [router]);

  if (!loaded) return null;

  return (
    <main>
      <ResultHero />
      <ResultAnalysis phase={phase} score={score} pilarScores={pilarScores} />
      <ResultNextSteps phase={phase} />
      <Footer />
    </main>
  );
}
