import ResultHero from "../components/sections/ResultHero";
import ResultAnalysis from "../components/sections/ResultAnalysis";
import ResultNextSteps from "../components/sections/FinalCTARes";
import Footer from "../components/sections/Footer";

export default function DiagnosticResult() {
  return (
    <main>
      <ResultHero />
      <ResultAnalysis phase={2} score={24} />
      <ResultNextSteps phase={2} />
      <Footer />
    </main>
  );
}
