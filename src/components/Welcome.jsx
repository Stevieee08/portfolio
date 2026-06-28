import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import portrait from "../assets/portrait-real.png";

export default function Welcome() {
  const root = useRef(null);
  const imgRef = useRef(null);
  const wordRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // portrait descends from the top to the middle and zooms so the
      // face / upper half is prominent behind the WELCOME text
      gsap.fromTo(
        imgRef.current,
        { yPercent: -55, scale: 0.55, opacity: 0 },
        {
          yPercent: 0,
          scale: 1,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top bottom",
            end: "top top",
            scrub: 1,
          },
        }
      );

      // subtle parallax on the WELCOME word
      gsap.fromTo(
        wordRef.current,
        { y: 80 },
        {
          y: -80,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="noise relative flex h-screen w-full items-start justify-center overflow-hidden bg-gradient-to-b from-white via-zinc-50 to-white pt-[8vh] text-black"
    >
      {/* giant WELCOME word (behind the portrait) */}
      <h2
        ref={wordRef}
        className="pointer-events-none absolute top-[34%] left-1/2 z-10 w-full -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap text-center text-[18vw] font-black uppercase leading-none tracking-tighter text-black/[0.12]"
      >
        Welcome
      </h2>

      {/* portrait coming down + zoom (top-anchored so the face stays visible) */}
      <img
        ref={imgRef}
        src={portrait}
        alt="Steve Varkey Santhosh"
        className="relative z-20 h-[105%] w-auto origin-top object-contain object-top sm:h-[125%] md:h-[135%]"
        style={{
          WebkitMaskImage:
            "linear-gradient(to bottom, #000 70%, transparent 96%)",
          maskImage: "linear-gradient(to bottom, #000 70%, transparent 96%)",
        }}
      />

      {/* soft white fade at the very bottom */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
