import About from "@/features/about/About";
import ContactSection from "@/features/contact/ContactSection";
import Experience from "@/features/experience/Experience";
import Hero from "@/features/hero/Hero";
import Projects from "@/features/projects/Projects";
import Skills from "@/features/skills/Skills";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <ContactSection />
    </>
  );
}
