import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AOS from "aos";

import Navbar from "./components/Navbar.jsx";
import Portfolio from "./components/Portfolio.jsx";
import Hero from "./components/Hero.jsx";
import Welcome from "./components/Welcome.jsx";
import Skills from "./components/Skills.jsx";
import Projects from "./components/Projects.jsx";
import Services from "./components/Services.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true, easing: "ease-out-cubic" });

    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      smoothTouch: true,
      touchMultiplier: 2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);

    return () => {
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
      lenis.destroy();
      window.removeEventListener("load", refresh);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="relative w-full overflow-x-hidden bg-zinc-950 text-white">
      <Navbar />

      {/* Fixed fullscreen portfolio background — content scrolls over it */}
      <Portfolio />

      {/* Spacer lets the fixed Portfolio background show first */}
      <div className="h-screen w-full" aria-hidden="true" />

      {/* Content that overlaps the fixed background */}
      <main className="relative z-20">
        <Hero />
        <Welcome />
        <Skills />
        <Projects />
        <Services />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}
