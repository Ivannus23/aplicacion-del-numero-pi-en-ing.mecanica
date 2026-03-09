import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PiApplications from "@/components/PiApplications";
import PiSnakeGame from "@/components/PiSnakegame";
import RevolutionSolids from "@/components/RevolutionSolids";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Header />
      <Hero />
      <PiApplications />
      <PiSnakeGame />
      <RevolutionSolids />
      <Footer />
    </main>
  );
}