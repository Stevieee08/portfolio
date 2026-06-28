import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { FiMenu, FiX, FiStar } from "react-icons/fi";

const LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Portfolio", href: "#projects" },
  { label: "Service", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef([]);
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScroll = useRef(0);

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

  // hide on scroll down, show on scroll up
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > lastScroll.current && y > 120);
      lastScroll.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
        <nav className="mx-auto mt-4 flex max-w-7xl items-center justify-between rounded-2xl px-5 py-3.5 glass sm:px-7">
          {/* Logo */}
          <a
            ref={logoRef}
            href="#home"
            className="group text-xl font-bold tracking-tight font-display sm:text-2xl"
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
                  className="group relative text-sm font-medium text-white/80 transition hover:text-white"
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
              className="flex h-10 w-10 items-center justify-center rounded-full text-white md:hidden"
              aria-label="Menu"
            >
              {open ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile fullscreen overlay */}
      <div
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-zinc-950/95 backdrop-blur-3xl transition-all duration-500 md:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {LINKS.map((l, i) => (
          <a
            key={l.label}
            href={l.href}
            onClick={() => setOpen(false)}
            className={`text-4xl font-bold tracking-tight transition-all duration-500 ${
              open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
            style={{ transitionDelay: `${i * 70}ms` }}
          >
            {l.label}
          </a>
        ))}
        <button
          onClick={() => {
            setOpen(false);
            setModal(true);
          }}
          className="mt-4 rounded-full bg-brand-gold px-8 py-3 font-semibold text-black"
        >
          Add Feedback
        </button>
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
