import FadeIn from "../components/FadeIn";
import { work } from "../data";

export default function WorkSection() {
  return (
    <section id="work" aria-labelledby="work-title" className="bg-[#0C0C0C] px-5 pb-28 pt-12 sm:px-8 md:px-10">
      <FadeIn>
        <h2 id="work-title" className="hero-heading mb-12 text-center font-black uppercase leading-none tracking-tight sm:mb-16" style={{ fontSize: "clamp(2.5rem, 9vw, 120px)" }}>
          Selected work
        </h2>
      </FadeIn>
      <ul className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
        {work.map((w, i) => (
          <FadeIn as="li" key={w.title} delay={i * 0.1} className="flex flex-col rounded-[28px] border border-[#D7E2EA]/25 bg-[#111315] p-6 md:p-7 transition-colors duration-200 hover:border-[#D7E2EA]/50">
            <p className="text-sm font-light text-[#D7E2EA]/60">{w.where}</p>
            <h3 className="mt-1 text-xl font-bold uppercase leading-tight text-[#D7E2EA] md:text-2xl">{w.title}</h3>
            <dl className="mt-5 space-y-4 text-[#D7E2EA]/85">
              <div>
                <dt className="text-sm font-medium text-[#D7E2EA]">The problem</dt>
                <dd className="mt-1 font-light leading-relaxed">{w.problem}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-[#D7E2EA]">What I built</dt>
                <dd className="mt-1 font-light leading-relaxed">{w.built}</dd>
              </div>
              {w.result && (
                <div>
                  <dt className="text-sm font-medium text-[#5fd4c4]">Result</dt>
                  <dd className="mt-1 font-medium">{w.result}</dd>
                </div>
              )}
            </dl>
            <ul aria-label="Technologies" className="mt-auto flex flex-wrap gap-2 pt-6">
              {w.stack.map((s) => (
                <li key={s} className="rounded-full border border-[#D7E2EA]/30 px-3 py-1 text-xs font-medium text-[#D7E2EA] sm:text-sm">
                  {s}
                </li>
              ))}
            </ul>
          </FadeIn>
        ))}
      </ul>
    </section>
  );
}
