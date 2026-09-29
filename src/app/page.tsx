import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { SafetySection } from "@/components/landing/SafetySection";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col selection:bg-[#f5bfd0] selection:text-[#493741]">
      <Navbar />
      <HeroSection />
      <HowItWorksSection />
      <FeaturesSection />
      <SafetySection />
      <Footer />
    </main>
  );
}
