import DiagnosticHero from "@/app/components/sections/DiagnosticHero";
import DiagnosticInfo from "@/app/components/sections/DiagnosticInfo";
import Footer from "@/app/components/sections/Footer";
import Header from "../components/sections/Header";

export default function DiagnosticPage() {
  return (
    <main className="bg-light">
      <Header />
      <DiagnosticHero />
      <DiagnosticInfo />
      <Footer />
    </main>
  );
}
