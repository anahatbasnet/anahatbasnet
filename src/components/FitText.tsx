import { useCallback, useLayoutEffect, useRef, useState, type ReactNode } from "react";

/** One-line heading that scales to exactly fill its container's width, whatever the text or font. */
export default function FitText({ children, className = "" }: { children: ReactNode; className?: string }) {
  const box = useRef<HTMLHeadingElement>(null);
  const txt = useRef<HTMLSpanElement>(null);
  const [size, setSize] = useState<number | null>(null);

  const fit = useCallback(() => {
    const b = box.current;
    const t = txt.current;
    if (!b || !t) return;
    const prev = t.style.fontSize;
    t.style.fontSize = "100px";
    const w = t.getBoundingClientRect().width;
    t.style.fontSize = prev;
    if (w > 0) setSize(Math.floor((b.clientWidth / w) * 1000) / 10);
  }, []);

  useLayoutEffect(() => {
    fit();
    const ro = new ResizeObserver(fit);
    if (box.current) ro.observe(box.current);
    document.fonts?.ready.then(fit);
    return () => ro.disconnect();
  }, [fit]);

  return (
    <h1 ref={box} className="w-full overflow-hidden">
      <span
        ref={txt}
        className={`inline-block whitespace-nowrap pb-[0.04em] ${className}`}
        style={{ fontSize: size ? `${size}px` : "12vw" }}
      >
        {children}
      </span>
    </h1>
  );
}
