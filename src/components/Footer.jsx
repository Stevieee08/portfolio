import avatar from "../assets/avatar-cartoon.png";

const NAV = ["Home", "About", "Portfolio", "Service", "Contact"];

function MarqueeRow({ reverse, opacity }) {
  return (
    <div className="flex overflow-hidden">
      <div
        className={`marquee-track ${reverse ? "animate-marquee-right" : "animate-marquee-left"}`}
        style={{ opacity }}
      >
        {Array.from({ length: 2 }).map((_, k) => (
          <span
            key={k}
            className="px-6 text-[14vw] font-black uppercase leading-none tracking-tighter text-black"
          >
            Let's Create • Steve Varkey Santhosh •{" "}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="relative z-30 w-full overflow-hidden bg-brand-yellow text-black">
      {/* layered marquee background */}
      <div className="pointer-events-none absolute inset-0 flex flex-col justify-center gap-2">
        <MarqueeRow opacity={0.06} />
        <MarqueeRow reverse opacity={0.1} />
        <MarqueeRow opacity={0.06} />
        <MarqueeRow reverse opacity={0.1} />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-20">
        {/* profile */}
        <div className="flex flex-col items-center text-center">
          <img
            src={avatar}
            alt="Steve Varkey Santhosh"
            className="h-72 w-auto animate-floaty object-contain drop-shadow-2xl sm:h-96"
          />

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://www.instagram.com/steve._santhosh._"
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-brand-blue px-8 py-3.5 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_32px_rgba(37,99,235,0.7)]"
            >
              Follow
            </a>
            <a
              href="https://wa.me/917349378152"
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-white px-8 py-3.5 font-semibold text-black transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              Message
            </a>
          </div>
        </div>

        {/* branding */}
        <div className="mt-16 text-center">
          <h2 className="text-4xl font-black tracking-tighter sm:text-6xl">
            Steve Varkey
            <span className="text-white drop-shadow-[0_2px_12px_rgba(255,255,255,0.5)]">
              {" "}Santhosh
            </span>
          </h2>
          <p className="mt-3 text-sm font-medium uppercase tracking-[0.3em] text-black/60">
            Full Stack & React Native Developer
          </p>
        </div>

        {/* nav links */}
        <nav className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {NAV.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase() === "portfolio" ? "projects" : l.toLowerCase()}`}
              className="text-sm font-bold uppercase tracking-widest text-black/70 transition hover:text-black"
            >
              {l}
            </a>
          ))}
        </nav>

        {/* divider */}
        <div className="mx-auto mt-12 h-px w-full max-w-4xl rounded-full bg-black/20" />

        {/* copyright */}
        <div className="mt-8 text-center text-xs font-bold text-black/70">
          <span>© {new Date().getFullYear()} Steve Varkey Santhosh — All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
