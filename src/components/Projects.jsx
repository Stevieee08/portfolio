import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiArrowUpRight } from "react-icons/fi";

const IMG = "?auto=format&fit=crop&w=900&q=80";

const PROJECTS = [
  {
    title: "AI-Powered Fitness Trainer",
    tag: "React Native • Gemini AI",
    desc: "Cross-platform fitness app powered by Google Gemini with a FastAPI + PostgreSQL backend, adaptive workouts and personalized nutrition.",
    href: "https://github.com/Stevieee08/AI-Fitness-Agent",
    grad: "from-emerald-500 to-teal-700",
    image: `https://images.unsplash.com/photo-1534438327276-14e5300c3a48${IMG}`,
  },
  {
    title: "Dual-Layer Blockchain Health Records",
    tag: "Python • Flask • Solidity",
    desc: "Hybrid two-layer blockchain for secure health records: private SHA-256 PoW layer + Ethereum anchoring, with role-based access and QR credentials.",
    href: "#",
    grad: "from-indigo-500 to-blue-800",
    image: `https://images.unsplash.com/photo-1639762681485-074b7f938ba0${IMG}`,
  },
  {
    title: "AYUSH Startup Registration",
    tag: "ReactJS • Node • MySQL",
    desc: "Full-stack platform streamlining startup registration in the AYUSH sector, featuring an AI chatbot and role-based workflows.",
    href: "https://github.com/Stevieee08/ayush",
    grad: "from-orange-500 to-rose-700",
    image: `https://images.unsplash.com/photo-1522071820081-009f0129c71c${IMG}`,
  },
  {
    title: "SolYield Solar Monitoring",
    tag: "React Native • Expo • TS",
    desc: "Real-time solar asset monitoring app for field engineers using Expo Router, Zustand, a service-layer pattern and type-safe forms.",
    href: "#",
    grad: "from-amber-500 to-yellow-700",
    image: `https://images.unsplash.com/photo-1509391366360-2e959784a276${IMG}`,
  },
];

export default function Projects() {
  const root = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".proj-card",
        { y: 120, opacity: 0, rotateX: -25, scale: 0.85 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          scale: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: ".proj-grid",
            start: "top 78%",
          },
        }
      );
      gsap.to(".proj-watermark", {
        xPercent: -12,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={root}
      className="relative w-full overflow-hidden bg-[#f7f6f2] py-28 text-zinc-900"
    >
      {/* ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-brand-yellow/40 blur-[120px]" />

      {/* watermark */}
      <h2 className="proj-watermark pointer-events-none absolute left-0 top-10 select-none whitespace-nowrap text-[22vw] font-black uppercase leading-none tracking-tighter text-black/[0.04]">
        My Work
      </h2>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mb-14 text-center" data-aos="fade-up">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-zinc-500">
            Selected projects
          </p>
          <h3 className="mt-2 text-4xl font-black uppercase tracking-tight sm:text-6xl">
            Featured Work
          </h3>
        </div>

        {/* desktop grid + mobile carousel */}
        <div
          className="proj-grid flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 no-scrollbar md:grid md:grid-cols-2 md:overflow-visible"
          style={{ perspective: "2000px" }}
        >
          {PROJECTS.map((p) => (
            <a
              key={p.title}
              href={p.href}
              target={p.href !== "#" ? "_blank" : undefined}
              rel="noreferrer"
              className="proj-card group relative flex h-[400px] w-[80vw] shrink-0 snap-center flex-col justify-end overflow-hidden rounded-[28px] p-7 shadow-xl transition-transform duration-500 hover:-translate-y-2 hover:scale-[1.02] sm:w-[62vw] md:h-[380px] md:w-auto"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${p.grad}`} />
              <img
                src={p.image}
                alt={p.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover opacity-55 transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/25 transition group-hover:from-black/90" />

              {/* explore overlay */}
              <div className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-black opacity-0 transition duration-500 group-hover:opacity-100">
                <FiArrowUpRight size={22} />
              </div>

              <div className="relative text-white">
                <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium uppercase tracking-wide backdrop-blur">
                  {p.tag}
                </span>
                <h4 className="mt-4 text-2xl font-black tracking-tight sm:text-3xl">
                  {p.title}
                </h4>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-white/85">
                  {p.desc}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
