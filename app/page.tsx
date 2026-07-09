import About from "@/components/sections/About";
import ContactSection from "@/components/sections/ContactSection";
import Experience from "@/components/sections/Experience";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Projects />
      <ContactSection />
    </>
  );
}
