import { useEffect, useState } from "react";

const make = (tz: string) => new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: tz });

/** Live local time for a timezone, so visitors know when a reply is likely. */
export default function LocalTime({ tz, place, className = "" }: { tz: string; place: string; className?: string }) {
  const [now, setNow] = useState(() => make(tz).format(new Date()));
  useEffect(() => {
    const f = make(tz);
    const id = setInterval(() => setNow(f.format(new Date())), 15000);
    return () => clearInterval(id);
  }, [tz]);
  return (
    <p className={`inline-flex items-center gap-2 ${className}`}>
      <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[#5fd4c4] shadow-[0_0_0_4px_rgba(95,212,196,0.18)]" />
      <span>
        {place}, <time className="tabular-nums">{now}</time>
      </span>
    </p>
  );
}
