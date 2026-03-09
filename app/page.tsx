import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PiApplications from "@/components/PiApplications";
import PiSnakeGame from "@/components/PiSnakegame";
import RevolutionSolids from "@/components/RevolutionSolids";
import Footer from "@/components/Footer";
import PiTools from "@/components/PiTools";

export default function Home() {
  return (
    <main className="min-h-screen text-white">
      <Header />
      <Hero />
      <PiApplications />
      <PiTools/>
      <PiSnakeGame />
      <RevolutionSolids />
      <Footer />
    </main>
  );
}