import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

const tags = {
  div: motion.div,
  li: motion.li,
  p: motion.p,
  h2: motion.h2,
  article: motion.article,
} as const;

type Props = {
  as?: keyof typeof tags;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
  children: ReactNode;
};

export default function FadeIn({ as = "div", delay = 0, duration = 0.7, x = 0, y = 30, className, children }: Props) {
  const reduce = useReducedMotion();
  const Comp = tags[as] as typeof motion.div;
  return (
    <Comp
      className={className}
      initial={reduce ? false : { opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "50px", amount: 0 }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </Comp>
  );
}
