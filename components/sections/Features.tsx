"use client";

import { useRef } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { initGSAP, gsap, useIsomorphicLayoutEffect } from "@/lib/gsap";

const features = [
  {
    title: "Atmospheric command canvas",
    copy: "A spatial interface that keeps critical layers visible while softening everything that would normally compete for attention.",
    detail: "Visual hierarchy that feels editorial, not operational."
  },
  {
    title: "Taste-driven intelligence",
    copy: "Responses are tuned for precision and tone, giving output that feels curated instead of merely generated.",
    detail: "Decision support with executive-grade clarity."
  },
  {
    title: "Adaptive orchestration",
    copy: "Route context, coordinate agents, and surface momentum across live workflows without sacrificing polish.",
    detail: "Architecture that bends without breaking rhythm."
  },
  {
    title: "Security at the premium tier",
    copy: "High-trust environments, policy-aware layers, and controlled exposure built into the experience from the start.",
    detail: "Confidence designed into every touchpoint."
  }
];

export function Features() {
  const root = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (!root.current) {
      return;
    }

    initGSAP();

    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".feature-card", {
          y: 44,
          opacity: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: root.current,
            start: "top 68%"
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
    <section id="features" ref={root} className="section-space">
      <div className="section-shell">
        <SectionHeading
          kicker="Highlights"
          title={
            <>
              Premium capabilities,
              <br />
              <span className="text-gradient">expressed with restraint.</span>
            </>
          }
          description="The feature set is positioned like a luxury campaign: fewer promises, sharper proof, and a product language that never needs to shout to feel advanced."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature, index) => (
            <article
              key={feature.title}
              className="feature-card glass-panel group relative overflow-hidden rounded-[1.8rem] p-6"
            >
              <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-60" />
              <div className="absolute right-0 top-0 h-36 w-36 rounded-full bg-accent/10 blur-[90px] transition-opacity duration-500 group-hover:opacity-80" />
              <p className="text-[0.72rem] uppercase tracking-[0.24em] text-white/40">
                0{index + 1}
              </p>
              <h3 className="mt-8 font-display text-2xl font-semibold tracking-[-0.04em] text-white">
                {feature.title}
              </h3>
              <p className="mt-5 text-base leading-8 text-white/[0.64]">{feature.copy}</p>
              <p className="mt-8 border-t border-white/[0.08] pt-5 text-sm leading-7 text-white/[0.48]">
                {feature.detail}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
