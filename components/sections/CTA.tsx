"use client";

import { useRef } from "react";
import { ActionButton } from "@/components/ui/ActionButton";
import { initGSAP, gsap, useIsomorphicLayoutEffect } from "@/lib/gsap";

export function CTA() {
  const root = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (!root.current) {
      return;
    }

    initGSAP();

    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const reveal = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top 72%"
          }
        });

        reveal
          .from(".cta-panel", {
            y: 40,
            opacity: 0,
            scale: 0.98,
            duration: 1,
            ease: "power3.out"
          })
          .from(
            ".cta-content",
            {
              y: 26,
              opacity: 0,
              duration: 0.75,
              stagger: 0.1,
              ease: "power3.out"
            },
            "-=0.62"
          );

        gsap.to(".cta-glow", {
          scale: 1.08,
          opacity: 0.85,
          repeat: -1,
          yoyo: true,
          duration: 2.8,
          ease: "sine.inOut"
        });
      });
    }, root);

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section id="cta" ref={root} className="section-space pt-8">
      <div className="section-shell">
        <div className="cta-panel glass-panel relative overflow-hidden rounded-[2.5rem] p-6 sm:p-10 lg:p-12">
          <div className="noise-overlay" />
          <div className="cta-glow absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-[110px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_48%)]" />

          <div className="relative grid gap-10 xl:grid-cols-[1fr_0.8fr] xl:items-end">
            <div>
              <span className="section-kicker cta-content">Premium CTA</span>
              <h2 className="cta-content mt-8 font-display text-4xl font-semibold leading-[0.95] tracking-[-0.06em] text-white sm:text-5xl lg:text-6xl">
                Make the next launch feel
                <span className="text-gradient"> inevitable.</span>
              </h2>
              <p className="cta-content mt-6 max-w-2xl text-base leading-8 text-white/[0.68] sm:text-lg">
                Astra One turns launch-day complexity into a luxury-grade experience for your
                team and your audience. The result is sharper presence, faster decisions, and a
                first impression that actually lasts.
              </p>
            </div>

            <div className="cta-content rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
              <p className="text-[0.68rem] uppercase tracking-[0.22em] text-white/[0.42]">
                Early access
              </p>
              <p className="mt-5 text-base leading-8 text-white/[0.64]">
                Secure a private walkthrough, review the narrative system, and adapt the launch
                flow to your own product or brand campaign.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <ActionButton href="#">Book A Guided Demo</ActionButton>
                <ActionButton href="#" variant="secondary">
                  Download Launch Deck
                </ActionButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
