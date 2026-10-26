import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";

function Char({ char, progress, start, end }: { char: string; progress: MotionValue<number>; start: number; end: number }) {
  const opacity = useTransform(progress, [start, end], [0.2, 1]);
  return (
    <span className="relative inline-block">
      <span className="opacity-0">{char}</span>
      <motion.span style={{ opacity }} className="absolute left-0 top-0">
        {char}
      </motion.span>
    </span>
  );
}

/** Character-by-character scroll reveal. Screen readers get the plain text. */
export default function AnimatedText({ text, className, style }: { text: string; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.2"] });

  if (reduce) {
    return (
      <p ref={ref} className={className} style={style}>
        {text}
      </p>
    );
  }

  const words = text.split(" ");
  const total = text.length;
  let idx = 0;
  return (
    <p ref={ref} className={className} style={style}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, wi) => (
          <span key={wi}>
            <span className="inline-block whitespace-nowrap">
              {[...word].map((ch) => {
                const i = idx++;
                return <Char key={i} char={ch} progress={scrollYProgress} start={i / total} end={(i + 1) / total} />;
              })}
            </span>
            {wi < words.length - 1 && (idx++, " ")}
          </span>
        ))}
      </span>
    </p>
  );
}
