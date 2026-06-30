import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import portrait from "../assets/portrait-real.png";

export default function Welcome() {
  const root = useRef(null);
  const animRef = useRef(null);
  const wordRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(animRef.current, { transformOrigin: "top center" });

      gsap.fromTo(
        animRef.current,
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
      id="welcome"
      ref={root}
      className="noise relative h-screen w-full overflow-hidden bg-white text-black md:flex md:items-start md:justify-center md:bg-gradient-to-b md:from-white md:via-zinc-50 md:to-white md:pt-[8vh]"
    >
      <h2
        ref={wordRef}
        className="pointer-events-none absolute top-[34%] left-1/2 z-10 w-full -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap text-center text-[18vw] font-black uppercase leading-none tracking-tighter text-black/[0.12]"
      >
        Welcome
      </h2>

      {/* mobile: top 3/4 crop, scroll animated; desktop: full portrait */}
      <div className="absolute inset-0 z-20 flex items-center justify-center overflow-hidden md:relative md:inset-auto md:z-20 md:flex md:w-full md:justify-center md:overflow-visible">
        <div className="h-[75svh] w-full overflow-hidden md:h-auto md:overflow-visible">
          <div className="flex h-full w-full items-start justify-center">
            <div ref={animRef} className="will-change-transform">
              <img
                src={portrait}
                alt="Steve Varkey Santhosh"
                className="block h-[100svh] w-auto max-w-none object-contain object-top md:h-[135%] md:[-webkit-mask-image:linear-gradient(to_bottom,#000_70%,transparent_96%)] md:[mask-image:linear-gradient(to_bottom,#000_70%,transparent_96%)]"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 hidden h-32 bg-gradient-to-t from-white to-transparent md:block" />
    </section>
  );
}
