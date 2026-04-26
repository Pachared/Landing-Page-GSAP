"use client";

import { useRef } from "react";
import Link from "next/link";
import { initGSAP, gsap, useIsomorphicLayoutEffect } from "@/lib/gsap";

const footerLinks = ["Instagram", "Line", "Email", "Location"];

export function Footer() {
  const root = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (!root.current) return;

    initGSAP();

    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".footer-reveal", {
          y: 22,
          opacity: 0,
          duration: 0.95,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: root.current,
            start: "top 88%"
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
    <footer ref={root} className="pb-10 pt-4">
      <div className="section-shell border-t border-white/[0.10] pt-7">
        <div className="grid gap-8 md:grid-cols-[0.72fr_1fr_auto] md:items-end">
          <div className="footer-reveal">
            <p className="font-display text-sm font-light tracking-[0.18em] text-white">
              เรือนสถาปัตย์
            </p>
            <p className="mt-3 text-[0.68rem] tracking-[0.22em] text-white/[0.36]">
              architecture studio
            </p>
          </div>

          <p className="footer-reveal max-w-xl text-sm font-light leading-7 text-white/[0.42]">
            สตูดิโอออกแบบสถาปัตยกรรมและพื้นที่ภายใน ที่ให้ความสำคัญกับแสง วัสดุ และการอยู่อาศัยจริง
          </p>

          <div className="footer-reveal flex flex-wrap gap-x-5 gap-y-3 text-sm font-light text-white/[0.44]">
            {footerLinks.map((link) => (
              <Link key={link} href="#" className="transition-colors duration-500 hover:text-white/82">
                {link}
              </Link>
            ))}
          </div>
        </div>

        <div className="footer-reveal mt-10 flex flex-col gap-3 border-t border-white/[0.08] pt-5 text-[0.68rem] font-light tracking-[0.18em] text-white/[0.30] sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 RUEN ARCHITECTURE STUDIO</span>
          <span>BANGKOK / THAILAND</span>
        </div>
      </div>
    </footer>
  );
}
