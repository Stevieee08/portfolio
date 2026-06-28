const ROW_1 = [
  "React Native",
  "React",
  "JavaScript",
  "TypeScript",
  "Expo",
  "Zustand",
  "Tailwind CSS",
  "HTML",
  "CSS",
];

const ROW_2 = [
  "Python",
  "C Programming",
  "FastAPI",
  "Node.js",
  "Express.js",
  "Flask",
  "REST APIs",
  "Google Gemini AI",
];

const ROW_3 = [
  "PostgreSQL",
  "MongoDB",
  "SQL",
  "Solidity",
  "Git & GitHub",
  "Axios",
  "Zod",
];

function Pill({ label }) {
  return (
    <span className="mx-3 inline-flex shrink-0 items-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-lg font-semibold text-white/90 backdrop-blur sm:text-2xl">
      <span className="h-2 w-2 rounded-full bg-brand-gold" />
      {label}
    </span>
  );
}

function Row({ items, reverse }) {
  return (
    <div className="flex overflow-hidden py-2">
      <div
        className={`marquee-track ${
          reverse ? "animate-marquee-right" : "animate-marquee-left"
        }`}
      >
        {[...items, ...items].map((s, i) => (
          <Pill key={i} label={s} />
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative w-full overflow-hidden bg-zinc-950 py-24 text-white"
    >
      {/* ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-brand-yellow/20 blur-[130px]" />

      <div className="relative mx-auto mb-14 max-w-7xl px-6 text-center" data-aos="fade-up">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-brand-gold">
          Tech I work with
        </p>
        <h3 className="mt-2 text-4xl font-black uppercase tracking-tight sm:text-6xl">
          My Skills
        </h3>
      </div>

      <div className="relative flex flex-col gap-3">
        <Row items={ROW_1} />
        <Row items={ROW_2} reverse />
        <Row items={ROW_3} />
      </div>

      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-zinc-950 to-transparent sm:w-40" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-zinc-950 to-transparent sm:w-40" />
    </section>
  );
}
