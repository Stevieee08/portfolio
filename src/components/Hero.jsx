import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaWhatsapp, FaInstagram, FaLinkedinIn, FaGithub } from "react-icons/fa";
import avatar from "../assets/avatar-cartoon.png";

const ROLES = ["Full Stack Developer", "React Native Specialist", "Team Leader"];

const SOCIALS = [
  { Icon: FaWhatsapp, href: "https://wa.me/917349378152", color: "#25d366", label: "WhatsApp" },
  { Icon: FaInstagram, href: "https://www.instagram.com/steve._santhosh._", color: "#e1306c", label: "Instagram" },
  { Icon: FaLinkedinIn, href: "https://www.linkedin.com/in/stevesanthosh08/", color: "#0a66c2", label: "LinkedIn" },
  { Icon: FaGithub, href: "https://github.com/Stevieee08", color: "#ffffff", label: "GitHub" },
];

export default function Hero() {
  const root = useRef(null);
  const imgRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-fade", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.2,
      });

      // parallax on scroll
      gsap.to(imgRef.current, {
        y: 100,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });
      gsap.to(textRef.current, {
        y: -50,
        opacity: 0.2,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={root}
      className="relative flex min-h-screen w-full items-center overflow-hidden bg-white text-black"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-6 py-28 md:grid-cols-2 md:py-0">
        {/* left text */}
        <div ref={textRef} className="order-2 md:order-1">
          <p className="hero-fade mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-zinc-500">
            Full Stack & React Native Developer
          </p>
          <h1 className="hero-fade text-[11vw] font-black uppercase leading-[0.85] tracking-tighter md:text-[5vw]">
            Hi, I'm
            <br />
            <span className="text-outline-dark">Steve</span> Varkey
            <br />
            Santhosh
          </h1>

          {/* rolling words */}
          <div className="hero-fade mt-6 flex items-baseline gap-3 text-xl font-bold sm:text-3xl">
            <span>A</span>
            <span className="relative inline-block h-[1.4em] overflow-hidden text-amber-500">
              <span className="flex flex-col" style={{ animation: "roll 7.5s infinite" }}>
                {[...ROLES, ROLES[0]].map((r, i) => (
                  <span key={i} className="h-[1.4em] whitespace-nowrap leading-[1.4em]">
                    {r}
                  </span>
                ))}
              </span>
            </span>
          </div>

          <p className="hero-fade mt-6 max-w-md text-base leading-relaxed text-zinc-600">
            Computer Science graduate with hands-on expertise in C, Python and
            React Native. I build seamless cross-platform apps and full-stack
            products, with success in hackathons and real-world projects.
          </p>

          {/* socials */}
          <div className="hero-fade mt-8 flex items-center gap-4">
            {SOCIALS.map(({ Icon, href, color, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="group flex h-12 w-12 items-center justify-center rounded-full border border-zinc-300 bg-white text-zinc-800 transition-all duration-300 hover:-translate-y-1 hover:text-white"
                style={{ ["--c"]: color }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = color;
                  e.currentTarget.style.boxShadow = `0 0 28px ${color}80`;
                  e.currentTarget.style.color = color === "#ffffff" ? "#000" : "#fff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#fff";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.color = "#27272a";
                }}
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>

        {/* right image */}
        <div className="order-1 flex justify-center md:order-2">
          <img
            ref={imgRef}
            src={avatar}
            alt="Steve Varkey Santhosh"
            className="hero-fade max-h-[52vh] w-auto object-contain drop-shadow-2xl sm:max-h-[72vh] md:max-h-[90vh] md:scale-110"
          />
        </div>
      </div>

      <style>{`
        @keyframes roll {
          0%, 26% { transform: translateY(0); }
          33%, 59% { transform: translateY(-1.4em); }
          66%, 92% { transform: translateY(-2.8em); }
          100% { transform: translateY(-4.2em); }
        }
      `}</style>
    </section>
  );
}
