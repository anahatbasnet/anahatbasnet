import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import FadeIn from "../components/FadeIn";
import { asset } from "../lib";
import { featured as allFeatured, more as allMore } from "../data";

// Strongest, most complete projects first.
const ORDER = ["Bike Rental System", "E-commerce Website", "Second-Hand Car Price Prediction", "Weather App"];
const featured = [...allFeatured].sort((a, b) => ORDER.indexOf(a.title) - ORDER.indexOf(b.title));

const more = allMore.filter((m) => !["Tic-tac-toe", "Practice"].includes(m.title));

type Project = (typeof featured)[number];

const btn =
  "inline-flex min-h-11 items-center gap-1.5 rounded-full px-5 text-sm font-medium uppercase tracking-wider transition-colors duration-200";

function Card({ p, index, total, progress }: { p: Project; index: number; total: number; progress: MotionValue<number> }) {
  const reduce = useReducedMotion();
  const targetScale = 1 - (total - 1 - index) * 0.03;
  const scale = useTransform(progress, [index / total, 1], [1, targetScale]);

  return (
    <div className="h-[64vh] min-h-[480px] md:min-h-[440px]">
      <motion.article
        aria-labelledby={`proj-${index}`}
        style={{ scale: reduce ? 1 : scale, willChange: "transform", top: `calc(5.5rem + ${index * 16}px)` }}
        className="sticky grid origin-top gap-4 rounded-[28px] border border-[#D7E2EA]/25 bg-[#111315] p-4 shadow-[0_30px_60px_-40px_#000] sm:rounded-[32px] sm:p-5 md:grid-cols-[2fr_3fr] md:gap-6 md:p-6"
      >
        <div className="order-2 flex flex-col md:order-1 md:py-2 md:pl-2">
          <p className="text-sm font-light tabular-nums text-[#D7E2EA]/60">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")} · {p.type}
          </p>
          <h3 id={`proj-${index}`} className="mt-2 font-bold uppercase leading-tight text-[#D7E2EA]" style={{ fontSize: "clamp(1.3rem, 2.4vw, 2rem)" }}>
            {p.title}
          </h3>
          <p className="mt-3 max-w-md font-light leading-relaxed text-[#D7E2EA]/80" style={{ fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)" }}>
            {p.desc}
          </p>
          <ul aria-label="Stack" className="mt-4 flex flex-wrap gap-2">
            {p.stack.split(" · ").map((s) => (
              <li key={s} className="rounded-full border border-[#D7E2EA]/30 px-3 py-1 text-xs font-medium text-[#D7E2EA] sm:text-sm">
                {s}
              </li>
            ))}
          </ul>
          <div className="mt-auto flex flex-wrap gap-2 pt-5">
            {p.links.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${btn} ${i === 0 ? "bg-[#D7E2EA] text-[#0C0C0C] hover:bg-white" : "border border-[#D7E2EA]/60 text-[#D7E2EA] hover:bg-[#D7E2EA]/10"}`}
              >
                {l.label === "View live" ? "Live project" : l.label}
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        <div className="relative order-1 h-[200px] overflow-hidden rounded-2xl bg-[#0C0C0C] sm:h-[260px] md:order-2 md:h-auto md:min-h-[320px]">
          <img src={asset(p.image)} alt={p.imageAlt} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover object-top" />
        </div>
      </motion.article>
    </div>
  );
}

export default function ProjectsSection() {
  const list = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: list, offset: ["start start", "end end"] });

  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="relative z-10 -mt-10 rounded-t-[40px] bg-[#0C0C0C] px-5 pb-20 pt-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 sm:pt-24 md:-mt-14 md:rounded-t-[60px] md:px-10 md:pt-28"
    >
      <FadeIn>
        <h2 id="projects-title" className="hero-heading mb-12 text-center font-black uppercase leading-none tracking-tight sm:mb-16" style={{ fontSize: "clamp(2.5rem, 9vw, 120px)" }}>
          Projects
        </h2>
      </FadeIn>

      <div ref={list} className="mx-auto max-w-6xl">
        {featured.map((p, i) => (
          <Card key={p.title} p={p} index={i} total={featured.length} progress={scrollYProgress} />
        ))}
      </div>

      <div className="mx-auto mt-20 max-w-6xl md:mt-28">
        <h3 className="mb-8 font-bold uppercase leading-none text-[#D7E2EA]" style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)" }}>
          More on GitHub
        </h3>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {more.map((m) => (
            <li key={m.title} className="group flex flex-col overflow-hidden rounded-2xl border border-[#D7E2EA]/20 bg-[#111315] transition-colors duration-200 hover:border-[#D7E2EA]/50">
              <img
                src={asset(m.image)}
                alt={m.imageAlt}
                loading="lazy"
                decoding="async"
                className={`h-36 w-full ${m.contain ? "bg-white object-contain p-4" : "object-cover object-top"}`}
              />
              <div className="flex flex-1 flex-col p-5">
                <p className="text-xs font-light text-[#D7E2EA]/60">{m.langs}</p>
                <h4 className="mt-1 text-lg font-medium uppercase text-[#D7E2EA]">{m.title}</h4>
                <p className="mt-2 flex-1 text-sm font-light leading-relaxed text-[#D7E2EA]/80">{m.desc}</p>
                <div className="mt-3 flex flex-wrap gap-x-5">
                  {m.links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center gap-1 text-sm font-medium uppercase tracking-wider text-[#D7E2EA] underline-offset-4 hover:underline"
                    >
                      {l.label} <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
