import FadeIn from "../components/FadeIn";
import { asset, H2_STYLE, NUM_STYLE } from "../lib";
import { experience, skills } from "../data";

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      aria-labelledby="exp-title"
      className="on-light rounded-t-[40px] bg-white px-5 py-20 text-[#0C0C0C] sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32"
    >
      <h2 id="exp-title" className="mb-16 text-center font-black uppercase leading-none sm:mb-20 md:mb-28" style={H2_STYLE}>
        Experience
      </h2>

      <ol className="mx-auto max-w-5xl">
        {experience.map((j, i) => (
          <FadeIn
            as="li"
            key={`${j.company}-${j.role}`}
            delay={i * 0.1}
            className="flex gap-4 border-t py-8 last:border-b sm:gap-8 sm:py-10 md:gap-12 md:py-12"
          >
            <span aria-hidden="true" className="font-black leading-none" style={NUM_STYLE}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="font-medium uppercase" style={{ fontSize: "clamp(1rem, 2.2vw, 2.1rem)" }}>
                    {j.role}
                    {j.current && (
                      <span className="ml-3 inline-flex items-center gap-1.5 rounded-full bg-[#0C0C0C] px-3 py-1 align-middle text-xs font-medium tracking-wider text-white">
                        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#5fd4c4]" />
                        Current
                      </span>
                    )}
                  </h3>
                  <p className="mt-1 font-medium opacity-70" style={{ fontSize: "clamp(0.85rem, 1.4vw, 1.1rem)" }}>
                    {j.company} · {j.dates}
                  </p>
                </div>
                <img
                  src={asset(j.logo)}
                  alt={j.logoAlt}
                  loading="lazy"
                  className="h-12 w-24 shrink-0 rounded-xl border bg-white object-contain p-2 sm:h-16 sm:w-36 md:h-[72px] md:w-44 md:p-2.5"
                  style={{ borderColor: "rgba(12,12,12,0.15)" }}
                />
              </div>
              <ul className="mt-4 max-w-2xl list-none space-y-2 font-light leading-relaxed opacity-70" style={{ fontSize: "clamp(0.85rem, 1.6vw, 1.25rem)" }}>
                {j.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
              <ul aria-label="Technologies" className="mt-5 flex flex-wrap gap-2">
                {j.tech.map((t) => (
                  <li key={t} className="rounded-full border px-3 py-1 text-xs font-medium sm:text-sm" style={{ borderColor: "rgba(12,12,12,0.25)" }}>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        ))}
      </ol>
      <style>{`#experience ol > li { border-color: rgba(12,12,12,0.15); }`}</style>

      <div className="mx-auto mt-24 max-w-5xl md:mt-32">
        <h3 className="mb-10 font-black uppercase leading-none" style={{ fontSize: "clamp(2rem, 6vw, 4.5rem)" }}>
          Skills
        </h3>
        <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((g) => (
            <div key={g.title}>
              <h4 className="mb-4 text-sm font-medium uppercase tracking-widest opacity-60">{g.title}</h4>
              <ul className="flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <li key={s} className="rounded-full border px-4 py-1.5 text-sm font-medium" style={{ borderColor: "rgba(12,12,12,0.25)" }}>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
