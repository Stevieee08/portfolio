import { useEffect, useRef } from "react";
import gsap from "gsap";
import portrait from "../assets/portrait-real.png";

const BG = "#f4c400";
const BOX = 280;

const imgLayout =
  "pointer-events-none absolute inset-0 flex items-start justify-center pt-[6vh]";
const imgClass = "h-[150%] w-auto max-w-none object-contain object-top";

export default function Portfolio() {
  const sectionRef = useRef(null);
  const revealRef = useRef(null);
  const innerRef = useRef(null);
  const frameRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;

    gsap.fromTo(
      ".pf-img",
      { scale: 0.92, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.1, ease: "power3.out" }
    );

    const mq = window.matchMedia("(min-width: 768px)");
    if (!mq.matches) return;

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const cur = { ...target };
    let raf;

    const tick = () => {
      cur.x += (target.x - cur.x) * 0.14;
      cur.y += (target.y - cur.y) * 0.14;

      const rx = cur.x - BOX / 2;
      const ry = cur.y - BOX / 2;

      gsap.set(revealRef.current, { x: rx, y: ry });
      gsap.set(frameRef.current, { x: rx, y: ry });
      gsap.set(innerRef.current, { x: -rx, y: -ry });

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const move = (clientX, clientY) => {
      const r = el.getBoundingClientRect();
      target.x = clientX - r.left;
      target.y = clientY - r.top;
    };

    const onPointerMove = (e) => move(e.clientX, e.clientY);

    el.addEventListener("pointermove", onPointerMove);

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="fixed inset-0 z-0 h-screen w-full overflow-hidden"
      style={{ backgroundColor: BG }}
    >
      <div className="pointer-events-none absolute inset-0 flex items-start justify-center pt-[20vh] md:items-center md:pt-0">
        <h1 className="select-none text-[18vw] font-black leading-[0.9] tracking-tighter text-black/10 md:text-[18vw] md:leading-none">
          P<span className="text-outline-dark">O</span>RTF
          <span className="text-outline-dark">O</span>LI
          <span className="text-black/10">O</span>
        </h1>
      </div>

      {/* mobile: plain clear portrait */}
      <div className={`${imgLayout} flex md:hidden`}>
        <img
          src={portrait}
          alt="Steve Varkey Santhosh"
          className={`pf-img ${imgClass}`}
        />
      </div>

      {/* desktop: blurred base image */}
      <div className={`${imgLayout} hidden md:flex`}>
        <img
          src={portrait}
          alt="Steve Varkey Santhosh"
          className={`pf-img ${imgClass}`}
          style={{ filter: "blur(7px) brightness(0.82)", opacity: 0.9 }}
        />
      </div>

      {/* sharp magnifier — desktop only */}
      <div
        ref={revealRef}
        className="pointer-events-none absolute left-0 top-0 z-10 hidden overflow-hidden rounded-2xl md:block"
        style={{
          width: BOX,
          height: BOX,
          WebkitMaskImage:
            "radial-gradient(circle at center, #000 60%, transparent 100%)",
          maskImage:
            "radial-gradient(circle at center, #000 60%, transparent 100%)",
        }}
      >
        <div
          ref={innerRef}
          className="absolute left-0 top-0"
          style={{ width: "100vw", height: "100vh" }}
        >
          <div className={imgLayout}>
            <img src={portrait} alt="" className={imgClass} />
          </div>
        </div>
      </div>

      {/* square marching-ants frame — desktop only */}
      <div
        ref={frameRef}
        className="pointer-events-none absolute left-0 top-0 z-20 hidden md:block"
        style={{ width: BOX, height: BOX }}
      >
        <div className="ants relative h-full w-full rounded-2xl">
          {[
            "-top-1 -left-1",
            "-top-1 -right-1",
            "-bottom-1 -left-1",
            "-bottom-1 -right-1",
          ].map((pos) => (
            <span
              key={pos}
              className={`absolute h-3 w-3 rounded-sm bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.9)] ${pos}`}
            />
          ))}
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 z-30 -translate-x-1/2 select-none text-center text-[10px] font-medium uppercase tracking-[0.3em] text-black/60 sm:text-xs">
        <span className="hidden md:inline">Hover to magnify • </span>
        Scroll to explore
      </div>

      <style>{`
        .ants {
          border: 2px dashed rgba(59,130,246,0.9);
          background-image:
            linear-gradient(90deg, rgba(59,130,246,0.9) 50%, transparent 50%),
            linear-gradient(90deg, rgba(59,130,246,0.9) 50%, transparent 50%),
            linear-gradient(0deg, rgba(59,130,246,0.9) 50%, transparent 50%),
            linear-gradient(0deg, rgba(59,130,246,0.9) 50%, transparent 50%);
          background-repeat: repeat-x, repeat-x, repeat-y, repeat-y;
          background-size: 16px 2px, 16px 2px, 2px 16px, 2px 16px;
          background-position: 0 0, 0 100%, 0 0, 100% 0;
          animation: ants 0.6s linear infinite;
        }
        @keyframes ants {
          to { background-position: 16px 0, -16px 100%, 0 -16px, 100% 16px; }
        }
      `}</style>
    </section>
  );
}
