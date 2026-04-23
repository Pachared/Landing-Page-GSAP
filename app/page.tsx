import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { BrandIntro } from "@/components/sections/BrandIntro";
import { CTA } from "@/components/sections/CTA";
import { Features } from "@/components/sections/Features";
import { Hero } from "@/components/sections/Hero";
import { Showcase } from "@/components/sections/Showcase";
import { StoryScroll } from "@/components/sections/StoryScroll";

export default function HomePage() {
  return (
    <main className="page-shell">
      <Navbar />
      <Hero />
      <BrandIntro />
      <Features />
      <Showcase />
      <StoryScroll />
      <CTA />
      <Footer />
    </main>
  );
}
