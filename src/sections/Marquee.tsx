import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { asset } from "../lib";
import { featured, more } from "../data";

type Shot = { src: string; alt: string; contain: boolean };
const shots: Shot[] = [
  ...featured.map((p) => ({ src: p.image, alt: p.imageAlt, contain: false })),
  ...more.filter((p) => !["Tic-tac-toe", "Practice"].includes(p.title)).map((p) => ({ src: p.image, alt: p.imageAlt, contain: p.contain })),
];
const ROW1 = shots.slice(0, 7);
const ROW2 = shots.slice(7);
const TILE = 260;
const GAP = 12;

function Row({ items, rowRef, startOffset }: { items: Shot[]; rowRef: React.RefObject<HTMLDivElement>; startOffset: number }) {
  const tripled = [...items, ...items, ...items];
  return (
    <div
      ref={rowRef}
      className="flex w-max gap-3"
      style={{ willChange: "transform", marginLeft: startOffset }}
    >
      {tripled.map((s, i) => (
        <img
          key={i}
          src={asset(s.src)}
          alt=""
          loading="lazy"
          decoding="async"
          width={TILE}
          height={165}
          className={`h-[165px] w-[260px] shrink-0 rounded-xl border border-[#D7E2EA]/10 ${s.contain ? "bg-white object-contain" : "object-cover object-top"}`}
        />
      ))}
    </div>
  );
}

/** Decorative duplicate of the project screenshots: hidden from assistive tech, scrolls with the page. */
export default function MarqueeSection() {
  const section = useRef<HTMLElement>(null);
  const r1 = useRef<HTMLDivElement>(null);
  const r2 = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const update = () => {
      const s = section.current;
      if (!s) return;
      const top = s.getBoundingClientRect().top + window.scrollY;
      const offset = (window.scrollY - top + window.innerHeight) * 0.3;
      if (r1.current) r1.current.style.transform = `translateX(${offset - 200}px)`;
      if (r2.current) r2.current.style.transform = `translateX(${-(offset - 200)}px)`;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [reduce]);

  return (
    <section
      ref={section}
      aria-hidden="true"
      style={{ WebkitMaskImage: "linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)", maskImage: "linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)" }}
      className="flex flex-col gap-3 overflow-hidden bg-[#0C0C0C] pb-6 pt-10 sm:pt-14 md:pt-16"
    >
      <Row items={ROW1} rowRef={r1} startOffset={-(ROW1.length * (TILE + GAP))} />
      <Row items={ROW2} rowRef={r2} startOffset={0} />
    </section>
  );
}
