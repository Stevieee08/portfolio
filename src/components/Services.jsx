import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiChevronRight } from "react-icons/fi";

const IMG = "?auto=format&fit=crop&w=800&q=80";

const SERVICES = [
  {
    title: "Full Stack Web App",
    tag: "App",
    color: "#3f3f46",
    description: "Scalable web apps with powerful FastAPI / Node backends.",
    image: `https://images.unsplash.com/photo-1461749280684-dccba630e2f6${IMG}`,
  },
  {
    title: "Mobile App Development",
    tag: "React Native",
    color: "#c81e1e",
    description: "Cross-platform iOS & Android apps built with React Native and Expo.",
    image: `https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c${IMG}`,
  },
  {
    title: "Business Website",
    tag: "Corporate",
    color: "#648c11",
    description: "Corporate websites optimized for conversion and premium branding.",
    image: `https://images.unsplash.com/photo-1486406146926-c627a92ad1ab${IMG}`,
  },
  {
    title: "Portfolio Website",
    tag: "Creative",
    color: "#b59000",
    description: "High-end portfolio experiences for creators and agencies.",
    image: `https://images.unsplash.com/photo-1499951360447-b19be8fe80f5${IMG}`,
  },
  {
    title: "Admin Dashboard",
    tag: "SaaS",
    color: "#ff4500",
    description: "Advanced dashboards with analytics and data visualization.",
    image: `https://images.unsplash.com/photo-1551288049-bebda4e38f71${IMG}`,
  },
];

const RADIUS = 1100;

export default function Services() {
  const root = useRef(null);
  const stage = useRef(null);
  const cardsRef = useRef([]);
  const bgRef = useRef(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const cards = cardsRef.current;
      const total = cards.length;

      const layout = (active) => {
        cards.forEach((card, i) => {
          const offset = i - active;
          const angle = offset * 0.32; // radians along the arc
          const x = Math.sin(angle) * RADIUS;
          const y = RADIUS - Math.cos(angle) * RADIUS;
          const z = -Math.abs(offset) * 60;
          const scale = Math.max(0.4, 1 - Math.abs(offset) * 0.15);
          const opacity = Math.max(0, 1 - Math.abs(offset) * 0.3);
          gsap.set(card, {
            x,
            y: y * 0.4,
            z,
            rotationZ: offset * 6,
            scale,
            opacity,
            zIndex: 100 - Math.round(Math.abs(offset) * 10),
          });
        });
      };

      layout(0);

      const st = ScrollTrigger.create({
        trigger: root.current,
        start: "top top",
        end: "+=500%",
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          const active = self.progress * (total - 1);
          layout(active);
          const idx = Math.round(active);
          if (bgRef.current) {
            gsap.to(bgRef.current, {
              backgroundColor: SERVICES[idx].color,
              duration: 0.6,
              overwrite: true,
            });
          }
        },
      });

      return () => st.kill();
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="services"
      ref={root}
      className="relative flex h-screen w-full items-center justify-center overflow-hidden"
    >
      <div
        ref={bgRef}
        className="absolute inset-0 -z-10 transition-colors"
        style={{ backgroundColor: "#0a0a0a" }}
      />
      <div className="absolute inset-0 -z-10 bg-black/55" />

      {/* outlined typography */}
      <h2 className="pointer-events-none absolute select-none text-[18vw] font-black uppercase tracking-tighter text-white/10 mix-blend-overlay">
        Services
      </h2>

      {/* heading */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/60">
          What I offer
        </p>
        <h3 className="mt-1 text-3xl font-black uppercase tracking-tight text-white sm:text-4xl">
          Services
        </h3>
        <p className="mt-3 flex items-center justify-center gap-1.5 text-xs font-medium uppercase tracking-widest text-white/50 md:hidden">
          Swipe
          <FiChevronRight className="animate-bounce-x" size={16} />
        </p>
      </div>

      {/* Desktop 3D carousel */}
      <div
        ref={stage}
        className="relative hidden h-[550px] w-full items-center justify-center md:flex"
        style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
      >
        {SERVICES.map((s, i) => (
          <div
            key={s.title}
            ref={(el) => (cardsRef.current[i] = el)}
            className="absolute h-[550px] w-[420px] overflow-hidden rounded-[30px] border border-white/15 glass"
          >
            <CardBody s={s} />
          </div>
        ))}
      </div>

      {/* Mobile snap carousel */}
      <div className="mt-28 flex w-full snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-6 no-scrollbar md:mt-0 md:hidden">
        {SERVICES.map((s) => (
          <div
            key={s.title}
            className="h-[450px] w-[80vw] shrink-0 snap-center overflow-hidden rounded-[30px] border border-white/15 glass"
          >
            <CardBody s={s} />
          </div>
        ))}
      </div>
    </section>
  );
}

function CardBody({ s }) {
  return (
    <div className="group/card relative h-full w-full overflow-hidden">
      {/* full-card faded image */}
      <img
        src={s.image}
        alt={s.title}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-40 transition-transform duration-700 ease-out group-hover/card:scale-110"
      />
      {/* color tint + dark gradient so the text stays readable */}
      <div
        className="absolute inset-0 opacity-40 mix-blend-multiply"
        style={{ background: `linear-gradient(160deg, ${s.color}, transparent)` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/20" />

      {/* text on top */}
      <div className="relative flex h-full flex-col justify-end p-7 text-white sm:p-8">
        <span
          className="mb-4 inline-block w-fit rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wide"
          style={{ backgroundColor: s.color }}
        >
          {s.tag}
        </span>
        <h4 className="text-2xl font-black leading-tight tracking-tight sm:text-3xl">
          {s.title}
        </h4>
        <p className="mt-3 text-sm leading-relaxed text-white/85">
          {s.description}
        </p>
      </div>
    </div>
  );
}
