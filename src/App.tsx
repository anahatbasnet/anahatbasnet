import HeroSection from "./sections/Hero";
import MarqueeSection from "./sections/Marquee";
import WorkSection from "./sections/Work";
import AboutSection from "./sections/About";
import ExperienceSection from "./sections/Experience";
import ProjectsSection from "./sections/Projects";
import ContactSection from "./sections/Contact";
import FloatingNav from "./components/FloatingNav";

export default function App() {
  return (
    <>
      <a className="skip-link" href="#about">
        Skip to content
      </a>
      <FloatingNav />
      <main id="top" className="bg-[#0C0C0C]" style={{ overflowX: "clip" }}>
        <HeroSection />
        <MarqueeSection />
        <AboutSection />
        <WorkSection />
        <ExperienceSection />
        <ProjectsSection />
        <ContactSection />
      </main>
    </>
  );
}
