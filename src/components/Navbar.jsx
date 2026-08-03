import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { FiMenu, FiX, FiStar } from "react-icons/fi";

const LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Service", href: "#services" },
  { label: "Contact", href: "#contact" },
];

// darkText: true → black nav text (light page bg), false → white nav text
const SECTION_NAV_THEMES = [
  { id: "about", darkText: true },
  { id: "skills", darkText: false },
  { id: "projects", darkText: true },
  { id: "services", darkText: false },
  { id: "contact", darkText: false },
];

export default function Navbar() {
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef([]);
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lightBg, setLightBg] = useState(false);
  const lastScroll = useRef(0);

  const updateNavTheme = () => {
    const y = window.scrollY;
    const vh = window.innerHeight;
    const probeY = 72;

    if (y < vh * 0.85) {
      setLightBg(false);
      return;
    }

    for (const { id, darkText } of SECTION_NAV_THEMES) {
      const el = document.getElementById(id);
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      if (probeY >= rect.top && probeY <= rect.bottom) {
        setLightBg(darkText);
        return;
      }
    }

    setLightBg(false);
  };

  // intro animation
  useEffect(() => {
    const links = linksRef.current.filter(Boolean);
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(
      logoRef.current,
      { x: -40, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8 }
    ).fromTo(
      links,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.08, duration: 0.5 },
      "-=0.4"
    );
  }, []);

  // hide on scroll down, show on scroll up + sync nav theme with section bg
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > lastScroll.current && y > 120);
      lastScroll.current = y;
      updateNavTheme();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateNavTheme);
    updateNavTheme();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateNavTheme);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open || modal ? "hidden" : "";
  }, [open, modal]);

  return (
    <>
      <header
        ref={navRef}
        className={`fixed inset-x-0 top-0 z-50 transition-transform duration-500 ${
          hidden ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 transition-colors duration-300 md:mt-4 md:rounded-2xl md:px-7 md:py-3.5 md:glass">
          {/* Logo */}
          <a
            ref={logoRef}
            href="#home"
            className={`group text-xl font-bold tracking-tight font-display transition-colors duration-300 sm:text-2xl ${
              lightBg ? "text-zinc-900" : "text-white"
            }`}
          >
            <span className="transition-all duration-300 group-hover:drop-shadow-[0_0_12px_rgba(250,204,21,0.9)]">
              SVS
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-8 md:flex">
            {LINKS.map((l, i) => (
              <li key={l.label}>
                <a
                  ref={(el) => (linksRef.current[i] = el)}
                  href={l.href}
                  className={`group relative text-sm font-medium transition ${
                    lightBg
                      ? "text-zinc-800/90 hover:text-zinc-950"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {l.label}
                  <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-brand-gold transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setModal(true)}
              className="hidden items-center gap-2 rounded-full bg-brand-gold px-4 py-2 text-sm font-semibold text-black transition-transform duration-300 hover:scale-105 hover:shadow-[0_0_24px_rgba(250,204,21,0.6)] sm:flex"
            >
              <FiStar /> Feedback
            </button>

            <button
              onClick={() => setOpen((o) => !o)}
              className={`flex h-10 w-10 items-center justify-center transition-colors duration-300 md:hidden ${
                lightBg ? "text-zinc-900" : "text-white"
              }`}
              aria-label="Menu"
            >
              {open ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile compact dropdown */}
      {open && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
        />
      )}
      <div
        className={`fixed right-4 top-14 z-50 w-44 rounded-xl border border-white/10 bg-zinc-950/95 py-3 shadow-xl backdrop-blur-xl transition-all duration-300 md:hidden ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        <ul className="flex flex-col">
          {LINKS.map((l, i) => (
            <li key={l.label}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className={`block px-4 py-2.5 text-sm font-medium text-white/85 transition hover:bg-white/5 hover:text-white ${
                  open ? "translate-x-0 opacity-100" : "translate-x-2 opacity-0"
                }`}
                style={{ transitionDelay: `${i * 40}ms` }}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="mx-3 mt-1 border-t border-white/10 pt-2">
          <button
            onClick={() => {
              setOpen(false);
              setModal(true);
            }}
            className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-brand-gold px-3 py-2 text-xs font-semibold text-black"
          >
            <FiStar size={12} /> Feedback
          </button>
        </div>
      </div>

      {/* Feedback modal */}
      {modal && <FeedbackModal onClose={() => setModal(false)} />}
    </>
  );
}

function FeedbackModal({ onClose }) {
  const cardRef = useRef(null);
  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { y: 40, opacity: 0, scale: 0.96 },
      { y: 0, opacity: 1, scale: 1, duration: 0.45, ease: "power3.out" }
    );
  }, []);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        ref={cardRef}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-3xl p-7 glass"
      >
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-xl font-bold">Add Testimonial</h3>
          <button onClick={onClose} className="text-white/60 hover:text-white">
            <FiX size={22} />
          </button>
        </div>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            onClose();
          }}
        >
          <input
            required
            placeholder="Your name"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none transition focus:border-white/40"
          />
          <input
            placeholder="Your role (e.g. Founder, Designer)"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none transition focus:border-white/40"
          />
          <textarea
            required
            rows={4}
            placeholder="Your message"
            className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none transition focus:border-white/40"
          />
          <button
            type="submit"
            className="w-full rounded-xl bg-brand-gold py-3 font-semibold text-black transition hover:shadow-[0_0_24px_rgba(250,204,21,0.5)]"
          >
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
}
