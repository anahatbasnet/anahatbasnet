import FadeIn from "../components/FadeIn";
import FitText from "../components/FitText";
import Magnet from "../components/Magnet";
import LocalTime from "../components/LocalTime";
import { ContactButton } from "../components/Buttons";
import { asset } from "../lib";
import { currentRole, experience, profile } from "../data";

const NAV = [
  ["About", "#about"],
  ["Work", "#work"],
  ["Experience", "#experience"],
  ["Projects", "#projects"],
  ["Contact", "#contact"],
] as const;

const chip =
  "rounded-3xl border border-[#D7E2EA]/30 bg-[#0C0C0C]/60 backdrop-blur-md shadow-[0_30px_70px_-35px_rgba(187,204,215,0.4)]";

export default function HeroSection() {
  const current = experience.find((j) => j.current) ?? experience[0];
  return (
    <header className="relative flex h-screen min-h-[640px] flex-col px-6 md:px-10" style={{ overflowX: "clip" }}>
      <FadeIn delay={0} y={-20}>
        <nav aria-label="Primary" className="flex justify-between pt-6 md:pt-8">
          {NAV.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="inline-flex min-h-11 items-center text-sm font-medium uppercase tracking-wider text-[#D7E2EA] transition-opacity duration-200 hover:opacity-70 md:text-lg lg:text-[1.4rem]"
            >
              {label}
            </a>
          ))}
        </nav>
      </FadeIn>

      <FadeIn delay={0.15} y={40} className="mt-6 sm:mt-4 md:-mt-1">
        <FitText className="hero-heading font-black uppercase leading-none tracking-tight">Hi, i&apos;m anahat</FitText>
      </FadeIn>

      {/* Portrait: soft brand glow behind, bottom fades into the page, gentle magnetic parallax */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 h-[70%] w-[90%] max-w-[900px] -translate-x-1/2"
        style={{ background: "radial-gradient(ellipse 50% 55% at 50% 60%, rgba(118,33,176,0.28), rgba(190,76,0,0.08) 55%, transparent 75%)" }}
      />
      <Magnet
        padding={200}
        strength={14}
        className="pointer-events-none absolute bottom-0 left-1/2 z-10 w-[125vw] -translate-x-1/2 sm:w-[400px] md:w-[470px] lg:w-[min(540px,64vh)]"
      >
        <FadeIn delay={0.6} y={30}>
          <img
            src={asset("images/anahat.webp")}
            alt={`Portrait of ${profile.name} in sunglasses, taking a selfie`}
            width={1000}
            height={1200}
            {...({ fetchpriority: "high" } as object)}
            decoding="async"
            className="block h-auto w-full select-none"
            style={{
              WebkitMaskImage: "linear-gradient(to bottom, transparent 0, #000 22%, #000 70%, transparent 100%), linear-gradient(to right, transparent 0, #000 18%, #000 82%, transparent 100%)",
              WebkitMaskComposite: "source-in",
              maskImage: "linear-gradient(to bottom, transparent 0, #000 22%, #000 70%, transparent 100%), linear-gradient(to right, transparent 0, #000 18%, #000 82%, transparent 100%)",
              maskComposite: "intersect",
            }}
          />
        </FadeIn>
      </Magnet>

      <Magnet padding={120} strength={5} className="absolute left-10 top-[46%] z-20 hidden md:block">
        <FadeIn delay={0.8} y={20}>
          <div className={`${chip} px-5 py-3 text-xs font-medium uppercase tracking-wider text-[#D7E2EA] lg:text-sm`}>
            <LocalTime tz={profile.timezone} place="Kathmandu" />
          </div>
        </FadeIn>
      </Magnet>

      <Magnet padding={120} strength={5} className="absolute right-10 top-[42%] z-20 hidden w-[250px] md:block lg:w-[280px]">
        <FadeIn delay={0.9} y={20}>
          <aside aria-label="Current role" className={`${chip} p-5`}>
            <div className="flex items-center justify-between gap-3 text-xs font-medium uppercase tracking-wider text-[#D7E2EA]">
              <span className="inline-flex items-center gap-2">
                <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[#5fd4c4] shadow-[0_0_0_4px_rgba(95,212,196,0.18)]" />
                Currently
              </span>
              <span className="whitespace-nowrap text-[#D7E2EA]/70">{current.dates.replace(" – Present", "")} →</span>
            </div>
            <div className="my-4 flex h-12 items-center justify-center rounded-xl bg-white px-3 py-1.5">
              <img src={asset(current.logo)} alt={current.logoAlt} className="max-h-full max-w-full object-contain" />
            </div>
            <h2 className="text-xl font-black uppercase leading-tight text-[#D7E2EA]">{current.role}</h2>
            <p className="mt-1 text-sm font-light text-[#D7E2EA]/80">{currentRole[1][1]}</p>
          </aside>
        </FadeIn>
      </Magnet>

      <div className="relative z-20 mt-auto flex items-end justify-between gap-4 pb-7 sm:pb-8 md:pb-10">
        <FadeIn delay={0.35} y={20}>
          <p
            className="max-w-[180px] font-light uppercase leading-snug tracking-wide text-[#D7E2EA] sm:max-w-[260px] md:max-w-[340px] lg:max-w-[400px]"
            style={{ fontSize: "clamp(0.75rem, 1.4vw, 1.5rem)" }}
          >
            software engineer in java, grails and react. open to new roles
          </p>
        </FadeIn>
        <FadeIn delay={0.5} y={20}>
          <div className="flex flex-col-reverse items-end gap-3 sm:flex-row sm:items-center">
            <a
              href={asset(profile.resume)}
              download
              className="inline-flex min-h-11 items-center rounded-full border-2 border-[#D7E2EA] px-6 text-xs font-medium uppercase tracking-widest text-[#D7E2EA] transition-colors duration-200 hover:bg-[#D7E2EA]/10 sm:px-8 sm:text-sm md:text-base"
            >
              Resume
            </a>
            <ContactButton href="#contact" />
          </div>
        </FadeIn>
      </div>
    </header>
  );
}
