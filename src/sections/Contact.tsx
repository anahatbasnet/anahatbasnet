import { useState } from "react";
import { Check, Copy, Download, Github, Linkedin } from "lucide-react";
import LocalTime from "../components/LocalTime";
import FadeIn from "../components/FadeIn";
import { ContactButton } from "../components/Buttons";
import { asset, H2_STYLE } from "../lib";
import { profile } from "../data";

const link =
  "inline-flex min-h-11 items-center gap-2 text-sm font-medium uppercase tracking-widest text-[#D7E2EA] transition-opacity duration-200 hover:opacity-70 sm:text-base";

function CopyEmail() {
  const [done, setDone] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setDone(true);
      setTimeout(() => setDone(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };
  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex min-h-11 items-center gap-2 rounded-full border-2 border-[#D7E2EA] px-6 text-sm font-medium uppercase tracking-widest text-[#D7E2EA] transition-colors duration-200 hover:bg-[#D7E2EA]/10"
    >
      {done ? <Check aria-hidden="true" className="h-4 w-4" /> : <Copy aria-hidden="true" className="h-4 w-4" />}
      {done ? "Copied" : "Copy email"}
      <span role="status" className="sr-only">
        {done ? "Email address copied to clipboard" : ""}
      </span>
    </button>
  );
}

export default function ContactSection() {
  return (
    <footer id="contact" aria-labelledby="contact-title" className="bg-[#0C0C0C] px-5 pb-10 pt-12 sm:px-8 md:px-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 border-t border-[#D7E2EA]/20 pt-24 text-center md:gap-16 md:pt-32">
        <FadeIn>
          <h2 id="contact-title" className="hero-heading font-black uppercase leading-none tracking-tight" style={{ ...H2_STYLE, fontSize: "clamp(2.5rem, 9vw, 120px)" }}>
            Let&apos;s talk about what you&apos;re building
          </h2>
        </FadeIn>
        <a
          href={`mailto:${profile.email}`}
          className="break-all font-medium text-[#D7E2EA] underline-offset-8 hover:underline"
          style={{ fontSize: "clamp(1.1rem, 3.2vw, 2.4rem)" }}
        >
          {profile.email}
        </a>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <ContactButton href={`mailto:${profile.email}`}>Send email</ContactButton>
          <CopyEmail />
          <a href={asset(profile.resume)} download className="inline-flex min-h-11 items-center rounded-full border-2 border-[#D7E2EA] px-6 text-sm font-medium uppercase tracking-widest text-[#D7E2EA] transition-colors duration-200 hover:bg-[#D7E2EA]/10">
            Resume
          </a>
        </div>
        <LocalTime tz={profile.timezone} place="Kathmandu" className="text-sm font-light uppercase tracking-widest text-[#D7E2EA]/80" />
        <ul className="flex flex-wrap justify-center gap-x-8 gap-y-1">
          <li>
            <a className={link} href={profile.github} target="_blank" rel="noopener noreferrer">
              <Github aria-hidden="true" className="h-4 w-4" /> GitHub
            </a>
          </li>
          <li>
            <a className={link} href={profile.linkedin} target="_blank" rel="noopener noreferrer">
              <Linkedin aria-hidden="true" className="h-4 w-4" /> LinkedIn
            </a>
          </li>
          <li>
            <a className={link} href={asset(profile.resume)} download>
              <Download aria-hidden="true" className="h-4 w-4" /> Resume
            </a>
          </li>
        </ul>
        <div className="flex w-full flex-wrap items-center justify-between gap-2 border-t border-[#D7E2EA]/20 pt-6 text-sm font-light uppercase tracking-widest text-[#D7E2EA]/70">
          <span>
            © {new Date().getFullYear()} {profile.name} · {profile.location}
          </span>
          <a href="#top" className="inline-flex min-h-11 items-center text-[#D7E2EA]">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
