import DiagnosticHero from "@/app/components/sections/DiagnosticHero";
import DiagnosticInfo from "@/app/components/sections/DiagnosticInfo";
import Footer from "@/app/components/sections/Footer";
import Header from "../components/sections/Header";

export default function DiagnosticPage() {
  return (
    <main className="min-h-screen bg-light">
      {/* Aqui você pode inserir sua Navbar se tiver ela separada */}
      <Header />
      <DiagnosticHero />
      <DiagnosticInfo />
      <Footer />
    </main>
  );
}
