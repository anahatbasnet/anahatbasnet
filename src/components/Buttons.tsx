import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

export function ContactButton({ href = "#contact", children = "Contact Me" }: { href?: string; children?: ReactNode }) {
  return (
    <a
      href={href}
      className="contact-btn inline-flex min-h-11 items-center justify-center rounded-full px-8 py-3 text-xs font-medium uppercase tracking-widest text-white sm:px-10 sm:py-3.5 sm:text-sm md:px-12 md:py-4 md:text-base"
    >
      {children}
    </a>
  );
}

export function LiveProjectButton({ href, label = "Live Project" }: { href: string; label?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex min-h-11 items-center gap-2 rounded-full border-2 border-[#D7E2EA] px-8 py-3 text-sm font-medium uppercase tracking-widest text-[#D7E2EA] transition-colors duration-200 hover:bg-[#D7E2EA]/10 sm:px-10 sm:py-3.5 sm:text-base"
    >
      {label}
      <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
    </a>
  );
}
