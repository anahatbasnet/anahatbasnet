import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";

const LINKS = [
  ["About", "about"],
  ["Work", "work"],
  ["Experience", "experience"],
  ["Projects", "projects"],
  ["Contact", "contact"],
] as const;

/** Reading-progress bar plus a compact nav that appears once the hero nav has scrolled away. */
export default function FloatingNav() {
  const [show, setShow] = useState(false);
  const [active, setActive] = useState<string>("");
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.3 });

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    LINKS.forEach(([, id]) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left"
        style={{ scaleX: progress, background: "linear-gradient(90deg, #7621B0, #B600A8, #BE4C00)" }}
      />
      <AnimatePresence>
        {show && (
          <div className="pointer-events-none fixed inset-x-0 top-4 z-40 flex justify-center">
          <motion.nav
            aria-label="Section"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            className="pointer-events-auto"
          >
            <ul className="flex items-center gap-0.5 rounded-full border border-[#D7E2EA]/25 bg-[#0C0C0C]/75 p-1 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.8)] backdrop-blur-md">
              {LINKS.map(([label, id]) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    aria-current={active === id ? "true" : undefined}
                    className={`inline-flex min-h-11 items-center rounded-full px-2 text-[11px] font-medium uppercase tracking-wider transition-colors duration-200 sm:px-4 sm:text-sm ${
                      active === id ? "bg-[#D7E2EA] text-[#0C0C0C]" : "text-[#D7E2EA] hover:bg-[#D7E2EA]/10"
                    }`}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
