import FadeIn from "../components/FadeIn";
import AnimatedText from "../components/AnimatedText";
import { ContactButton } from "../components/Buttons";
import { H2_STYLE } from "../lib";
import { education } from "../data";

const BIO =
  "I like following a request from the screen to the database and back. I started in React, moved into Java, and now build healthcare software at Cedar Gate with Grails and React. Before that I built flight booking and notification backends for a payments company.";

export default function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="relative flex min-h-screen flex-col items-center justify-center bg-[#0C0C0C] px-5 py-20 sm:px-8 md:px-10"
    >
      <div className="relative z-10 flex flex-col items-center gap-16 sm:gap-20 md:gap-24">
        <div className="flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
          <FadeIn delay={0} y={40}>
            <h2 id="about-title" className="hero-heading text-center font-black uppercase leading-none tracking-tight" style={H2_STYLE}>
              About me
            </h2>
          </FadeIn>
          <AnimatedText
            text={BIO}
            className="max-w-[560px] text-center font-medium leading-relaxed text-[#D7E2EA]"
            style={{ fontSize: "clamp(1rem, 2vw, 1.35rem)" }}
          />
          <FadeIn delay={0.1}>
            <ul className="flex max-w-[560px] flex-wrap justify-center gap-x-6 gap-y-2 text-center text-sm font-light uppercase tracking-wider text-[#D7E2EA]/80">
              {education.map((e) => (
                <li key={e.degree}>
                  <span className="font-medium text-[#D7E2EA]">{e.degree}</span> · {e.school}
                  {e.note ? ` · ${e.note}` : ""}
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
        <ContactButton href="#contact" />
      </div>
    </section>
  );
}
