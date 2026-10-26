import { useEffect, useRef, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";

type Props = {
  children: ReactNode;
  padding?: number;
  strength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  className?: string;
};

/** Mouse-following magnetic effect. Off for touch devices and reduced-motion users. */
export default function Magnet({
  children,
  padding = 150,
  strength = 3,
  activeTransition = "transform 0.3s ease-out",
  inactiveTransition = "transform 0.6s ease-in-out",
  className,
}: Props) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || window.matchMedia("(pointer: coarse)").matches) return;
    const move = (e: MouseEvent) => {
      const o = outer.current;
      const i = inner.current;
      if (!o || !i) return;
      const r = o.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const near =
        Math.abs(cx - e.clientX) < r.width / 2 + padding && Math.abs(cy - e.clientY) < r.height / 2 + padding;
      i.style.transition = near ? activeTransition : inactiveTransition;
      i.style.transform = near
        ? `translate3d(${(e.clientX - cx) / strength}px, ${(e.clientY - cy) / strength}px, 0)`
        : "translate3d(0, 0, 0)";
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [reduce, padding, strength, activeTransition, inactiveTransition]);

  return (
    <div ref={outer} className={className}>
      <div ref={inner} style={{ willChange: "transform" }}>
        {children}
      </div>
    </div>
  );
}
