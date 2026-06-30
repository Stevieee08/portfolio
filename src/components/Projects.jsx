import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiArrowUpRight, FiX, FiGithub, FiChevronRight } from "react-icons/fi";

const IMG = "?auto=format&fit=crop&w=900&q=80";

const PROJECTS = [
  {
    id: "fitness",
    title: "AI-Powered Fitness Trainer",
    tag: "React Native • Gemini AI",
    desc: "Cross-platform fitness app powered by Google Gemini with a FastAPI + PostgreSQL backend, adaptive workouts and personalized nutrition.",
    meta: "Internship Project · Jun 2025 – Jul 2025 · Team Size: 2",
    github: "https://github.com/Stevieee08/AI-Fitness-Agent",
    grad: "from-emerald-500 to-teal-700",
    image: `https://images.unsplash.com/photo-1534438327276-14e5300c3a48${IMG}`,
    stack: ["React Native", "Google Gemini AI", "FastAPI", "PostgreSQL", "Expo"],
    details:
      "A full-stack, cross-platform fitness application powered by Google Gemini. Delivers personalized workout and nutrition plans tailored to user needs with intelligent real-time adaptation.",
    features: [
      "Developed a robust FastAPI backend with modular architecture integrated with PostgreSQL for scalable REST APIs.",
      "Designed an intuitive React Native (Expo) frontend with 8+ onboarding screens and offline data persistence.",
      "Leveraged Google Gemini AI for intelligent workout generation and progressive overload algorithms.",
      "Real-time adaptive plan modifications based on user progress and live feedback.",
      "AI tracks daily routines (steps, sleep, meals) with personalized Nutritionix API integration.",
      "Gamification elements: challenges and leaderboards for sustained user engagement.",
    ],
  },
  {
    id: "blockchain",
    title: "Dual-Layer Blockchain Health Records",
    tag: "Python • Flask • Solidity",
    desc: "Hybrid two-layer blockchain for secure health records: private SHA-256 PoW layer + Ethereum anchoring, with role-based access and QR credentials.",
    meta: "Final Year Project · Team Size: 4",
    github: null,
    grad: "from-indigo-500 to-blue-800",
    image: `https://images.unsplash.com/photo-1639762681485-074b7f938ba0${IMG}`,
    stack: ["Python/Flask", "Solidity", "Ethereum", "SHA256 PoW"],
    details:
      "A hospital management system using a hybrid two-layer blockchain architecture for government data governance and sovereign patient credential issuance.",
    features: [
      "Private layer with custom SHA256 Proof-of-Work blockchain for government data governance and patient credential issuance.",
      "Public layer anchoring records permanently on Ethereum via Solidity smart contracts.",
      "Five role-based access levels with strict code-level access control.",
      "Each patient issued a 64-character cryptographic QR key — self-sovereign and independently verifiable.",
      "No dependency on the issuing institution for credential verification.",
    ],
  },
  {
    id: "ayush",
    title: "AYUSH Startup Registration",
    tag: "ReactJS • Node • MySQL",
    desc: "Full-stack platform streamlining startup registration in the AYUSH sector, featuring an AI chatbot and role-based workflows.",
    meta: "Hackathon Project · Team Size: 6",
    github: "https://github.com/Stevieee08/ayush",
    grad: "from-orange-500 to-rose-700",
    image: `https://images.unsplash.com/photo-1522071820081-009f0129c71c${IMG}`,
    stack: ["ReactJS", "Node.js", "Express.js", "MySQL", "NLP Chatbot"],
    details:
      "A full-stack web platform to streamline registration for startups in the AYUSH sector (Ayurveda, Yoga, Unani, Siddha, Homoeopathy) — built for a government hackathon.",
    features: [
      "Responsive ReactJS frontend enabling startups to submit applications, track progress, and manage documents.",
      "Secure Node.js + Express.js backend handling API requests with MySQL for robust data storage.",
      "AI-powered chatbot using NLP frameworks for real-time assistance across stakeholder roles.",
      "Role-based access for startups, government clerks, authorities, and admins.",
      "Full regulatory compliance pipeline with document verification and status tracking.",
    ],
  },
  {
    id: "solar",
    title: "SolYield Solar Monitoring",
    tag: "React Native • Expo • TS",
    desc: "Real-time solar asset monitoring app for field engineers using Expo Router, Zustand, a service-layer pattern and type-safe forms.",
    meta: "Production Internship · Solyield · Jan 2026 – Present",
    github: null,
    grad: "from-amber-500 to-yellow-700",
    image: `https://images.unsplash.com/photo-1509391366360-2e959784a276${IMG}`,
    stack: ["React Native", "Expo Router", "TypeScript", "Zustand", "Axios", "Zod"],
    details:
      "A real-time cross-platform mobile application for Solyield (ClimAI Cleantech) — enabling field engineers to monitor and maintain solar assets. Currently live in production.",
    features: [
      "Real-time monitoring and maintenance of solar assets for field engineers across multiple sites.",
      "Scalable frontend with Expo Router for file-based navigation and Zustand for global state management.",
      "Service Layer pattern decoupling API interaction from UI logic — 30% reduction in code redundancy.",
      "Type-safe forms for ticket updates and site reporting using React Hook Form + Zod schema validation.",
      "Complex flows: ticket creation, user authentication, and site-specific reporting with strict data integrity.",
    ],
  },
];

function ProjectModal({ project, onClose }) {
  const modalRef = useRef(null);
  const bodyRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    gsap.fromTo(
      modalRef.current,
      { y: 40, opacity: 0, scale: 0.96 },
      { y: 0, opacity: 1, scale: 1, duration: 0.45, ease: "power3.out" }
    );

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md sm:p-6"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className={`relative flex max-h-[88vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br shadow-2xl ${project.grad}`}
      >
        {/* soft tint so text stays readable over the gradient */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/25 via-black/45 to-black/70" />

        {/* header — fixed, does not scroll */}
        <div className="relative z-10 flex shrink-0 items-start justify-between gap-4 border-b border-white/15 px-6 py-5 sm:px-8">
          <div>
            <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white backdrop-blur">
              {project.tag}
            </span>
            <h3 className="mt-3 text-2xl font-black tracking-tight text-white sm:text-3xl">
              {project.title}
            </h3>
            <p className="mt-1 text-sm text-white/75">{project.meta}</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15 text-white transition hover:bg-white/25"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* scrollable body — lenis must not hijack this */}
        <div
          ref={bodyRef}
          data-lenis-prevent
          className="relative z-10 min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-6 sm:px-8 sm:py-8"
          style={{ WebkitOverflowScrolling: "touch" }}
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          <div className="mb-5 flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <span
                key={s}
                className="rounded-md border border-white/20 bg-white/10 px-3 py-1 font-mono text-xs text-white/90 backdrop-blur"
              >
                {s}
              </span>
            ))}
          </div>

          <p className="text-sm leading-relaxed text-white/85 sm:text-base">
            {project.details}
          </p>

          <p className="mb-3 mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold">
            Key Features
          </p>
          <ul className="space-y-3">
            {project.features.map((f) => (
              <li
                key={f}
                className="flex gap-3 border-b border-white/10 pb-3 text-sm leading-relaxed text-white/80 last:border-0"
              >
                <span className="shrink-0 text-brand-gold">→</span>
                {f}
              </li>
            ))}
          </ul>

          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-zinc-900 transition hover:bg-brand-gold hover:shadow-[0_0_28px_rgba(250,204,21,0.45)]"
            >
              <FiGithub size={18} />
              View on GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const root = useRef(null);
  const [active, setActive] = useState(null);

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
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-brand-yellow/40 blur-[120px]" />

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
          <p className="mt-4 flex items-center justify-center gap-1.5 text-xs font-medium uppercase tracking-widest text-zinc-400 md:hidden">
            Swipe
            <FiChevronRight className="animate-bounce-x" size={16} />
          </p>
        </div>

        <div
          className="proj-grid flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 no-scrollbar md:grid md:grid-cols-2 md:overflow-visible"
          style={{ perspective: "2000px" }}
        >
          {PROJECTS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setActive(p)}
              className="proj-card group relative flex h-[400px] w-[80vw] shrink-0 snap-center cursor-pointer flex-col justify-end overflow-hidden rounded-[28px] p-7 text-left shadow-xl transition-transform duration-500 hover:-translate-y-2 hover:scale-[1.02] sm:w-[62vw] md:h-[380px] md:w-auto"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${p.grad}`} />
              <img
                src={p.image}
                alt={p.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover opacity-55 transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/25 transition group-hover:from-black/90" />

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
                <span className="mt-4 inline-block text-xs font-semibold uppercase tracking-widest text-white/60 transition group-hover:text-brand-gold">
                  View Details →
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {active &&
        createPortal(
          <ProjectModal project={active} onClose={() => setActive(null)} />,
          document.body
        )}
    </section>
  );
}
