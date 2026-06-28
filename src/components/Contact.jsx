import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaWhatsapp, FaInstagram, FaLinkedinIn, FaGithub } from "react-icons/fa";

const PHONE = "917349378152";

const SOCIALS = [
  { Icon: FaWhatsapp, href: `https://wa.me/${PHONE}`, label: "WhatsApp" },
  { Icon: FaInstagram, href: "https://www.instagram.com/steve._santhosh._", label: "Instagram" },
  { Icon: FaLinkedinIn, href: "https://www.linkedin.com/in/stevesanthosh08/", label: "LinkedIn" },
  { Icon: FaGithub, href: "https://github.com/Stevieee08", label: "GitHub" },
];

export default function Contact() {
  const root = useRef(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    const ctx = gsap.context(() => {
      // pin (footer slides over) only on desktop — avoids mobile layout gaps
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        const st = ScrollTrigger.create({
          trigger: root.current,
          start: "bottom bottom",
          pin: true,
          pinSpacing: false,
        });
        return () => st.kill();
      });
      gsap.from(".contact-rise", {
        y: 60,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 70%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) {
      setError("Name and message are required.");
      return;
    }
    setError("");
    const text = `Portfolio Inquiry%0A%0AName: ${form.name}%0AEmail: ${form.email}%0A%0A${form.message}`;
    window.open(`https://wa.me/${PHONE}?text=${text}`, "_blank");
  };

  return (
    <section
      id="contact"
      ref={root}
      className="relative z-20 flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#0a0a0a] py-24 md:rounded-t-[40px]"
    >
      {/* huge background typography */}
      <h2 className="pointer-events-none absolute select-none text-[25vw] font-black uppercase tracking-tighter text-white/[0.03]">
        Connect
      </h2>

      <div className="relative z-10 mx-auto w-full max-w-2xl px-6 text-center">
        <h3 className="contact-rise text-[12vw] font-black uppercase leading-none tracking-tighter text-white sm:text-[8vw]">
          Let's Talk
        </h3>

        <p className="contact-rise mt-5 text-sm text-white/60">
          <a href="mailto:stevesanthosh2004@gmail.com" className="hover:text-white">
            stevesanthosh2004@gmail.com
          </a>{" "}
          • +91 73493 78152 • Thiruvalla, Kerala
        </p>

        {/* social icons */}
        <div className="contact-rise mt-10 flex flex-wrap items-center justify-center gap-4">
          {SOCIALS.map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="group flex h-14 w-14 items-center justify-center rounded-full border-2 border-white text-white transition-all duration-500 hover:scale-105 hover:bg-white hover:text-black hover:shadow-[0_0_40px_rgba(255,255,255,0.4)]"
            >
              <Icon size={22} />
            </a>
          ))}
        </div>

        {/* form */}
        <form onSubmit={submit} className="contact-rise mt-12 space-y-4 text-left">
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Your Name"
            className="w-full rounded-xl border border-white/10 bg-zinc-900/50 px-5 py-4 text-white placeholder-white/40 outline-none transition focus:border-white/50"
          />
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="Your Email"
            className="w-full rounded-xl border border-white/10 bg-zinc-900/50 px-5 py-4 text-white placeholder-white/40 outline-none transition focus:border-white/50"
          />
          <textarea
            rows={4}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="Your Message"
            className="w-full resize-none rounded-xl border border-white/10 bg-zinc-900/50 px-5 py-4 text-white placeholder-white/40 outline-none transition focus:border-white/50"
          />
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button
            type="submit"
            className="w-full rounded-xl bg-white py-4 font-bold uppercase tracking-widest text-black transition hover:bg-zinc-200 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
          >
            Send
          </button>
        </form>
      </div>
    </section>
  );
}
