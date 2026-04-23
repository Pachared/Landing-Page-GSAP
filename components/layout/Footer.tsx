"use client";

import { useRef } from "react";
import Link from "next/link";
import { initGSAP, gsap, useIsomorphicLayoutEffect } from "@/lib/gsap";

const footerLinks = ["Privacy", "Terms", "Contact", "Press"];

export function Footer() {
  const root = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (!root.current) {
      return;
    }

    initGSAP();

    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".footer-reveal", {
          y: 24,
          opacity: 0,
          duration: 0.75,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: root.current,
            start: "top 85%"
          }
        });
      });
    }, root);

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, []);

  return (
    <footer ref={root} className="section-space pb-10 pt-6">
      <div className="section-shell border-t border-white/[0.08] pt-8">
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <div className="footer-reveal">
            <p className="font-display text-2xl font-semibold tracking-[0.18em] text-white">
              ASTRA ONE
            </p>
            <p className="mt-4 max-w-xl text-sm leading-7 text-white/[0.48]">
              Cinematic launch systems for premium products, brands, and next-generation teams.
            </p>
          </div>

          <div className="footer-reveal flex flex-wrap gap-4 text-sm text-white/[0.46]">
            {footerLinks.map((link) => (
              <Link
                key={link}
                href="#"
                className="transition-colors duration-300 hover:text-white/80"
              >
                {link}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
