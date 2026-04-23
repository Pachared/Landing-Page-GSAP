"use client";

import { useRef } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { initGSAP, gsap, useIsomorphicLayoutEffect } from "@/lib/gsap";

const chapters = [
  "Ambient overview with live signal density",
  "Focused decision room for launch control",
  "Presentation mode for clients and stakeholders",
  "Private operating layer for the executive team"
];

export function Showcase() {
  const root = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (!root.current) {
      return;
    }

    initGSAP();

    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".showcase-copy", {
          y: 34,
          opacity: 0,
          duration: 0.85,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: root.current,
            start: "top 70%"
          }
        });

        root.current?.querySelectorAll<HTMLElement>("[data-parallax]").forEach((element) => {
          const shift = Number(element.dataset.parallax ?? 0);

          gsap.to(element, {
            yPercent: shift,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.15
            }
          });
        });
      });
    }, root);

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section id="showcase" ref={root} className="section-space">
      <div className="section-shell grid gap-12 xl:grid-cols-[0.95fr_1.05fr] xl:items-center">
        <div className="space-y-8">
          <div className="showcase-copy">
            <SectionHeading
              kicker="Visual Showcase"
              title={
                <>
                  A product story told through
                  <br />
                  <span className="text-gradient">depth, contrast, and control.</span>
                </>
              }
              description="Instead of relying on generic screenshots, the experience uses layered panels, abstract device frames, and motion-led hierarchy to imply a real premium product before a single asset is photographed."
            />
          </div>

          <p className="showcase-copy max-w-2xl text-base leading-8 text-white/[0.62]">
            Each scene is composed to feel like a reveal from a launch film: focused light,
            generous negative space, and enough detail to suggest a complete ecosystem waiting
            behind the glass.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            {chapters.map((chapter, index) => (
              <div
                key={chapter}
                className="showcase-copy rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl"
              >
                <p className="text-[0.68rem] uppercase tracking-[0.22em] text-white/40">
                  Chapter 0{index + 1}
                </p>
                <p className="mt-5 text-base leading-7 text-white/[0.76]">{chapter}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative min-h-[36rem]">
          <div
            data-parallax="-8"
            className="glass-panel absolute inset-x-0 bottom-0 top-12 overflow-hidden rounded-[2.4rem] p-5"
          >
            <div className="soft-grid" />
            <div className="noise-overlay" />
            <div className="absolute left-[12%] top-[10%] h-32 w-32 rounded-full bg-accent/[0.18] blur-[90px]" />
            <div className="absolute bottom-[8%] right-[10%] h-36 w-36 rounded-full bg-accent-secondary/10 blur-[100px]" />
            <div className="relative flex h-full flex-col justify-between rounded-[1.8rem] border border-white/10 bg-background-soft/[0.78] p-6">
              <div className="flex items-center justify-between text-[0.7rem] uppercase tracking-[0.24em] text-white/40">
                <span>Launch interface</span>
                <span>Orbital preview</span>
              </div>

              <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
                <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.03] p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-[0.68rem] uppercase tracking-[0.22em] text-white/40">
                        Active mode
                      </p>
                      <p className="mt-5 font-display text-3xl tracking-[-0.04em] text-white">
                        Executive Focus
                      </p>
                    </div>
                    <span className="rounded-full border border-white/10 px-3 py-1 text-[0.6rem] uppercase tracking-[0.2em] text-white/[0.56]">
                      live
                    </span>
                  </div>

                  <div className="mt-8 grid gap-4 md:grid-cols-3">
                    {[72, 84, 61].map((score, index) => (
                      <div
                        key={score}
                        className="rounded-[1.1rem] border border-white/[0.08] bg-background/[0.60] p-4"
                      >
                        <p className="text-[0.65rem] uppercase tracking-[0.22em] text-white/[0.38]">
                          lane 0{index + 1}
                        </p>
                        <p className="mt-5 font-display text-3xl tracking-[-0.05em] text-white">
                          {score}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[1.4rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(152,181,255,0.24),transparent_52%),rgba(255,255,255,0.03)] p-5">
                  <div className="relative flex h-full min-h-64 items-center justify-center overflow-hidden rounded-[1.2rem] border border-white/10 bg-background/[0.58]">
                    <div className="absolute inset-[10%] rounded-full border border-white/10" />
                    <div className="absolute inset-[22%] rounded-full border border-accent/[0.28]" />
                    <div className="absolute inset-[34%] rounded-full bg-accent/[0.18] blur-3xl" />
                    <div className="absolute h-[55%] w-[1px] bg-gradient-to-b from-transparent via-white/60 to-transparent" />
                    <div className="absolute w-[55%] h-[1px] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            data-parallax="-18"
            className="glass-panel absolute right-6 top-0 w-[52%] rounded-[1.7rem] p-4"
          >
            <p className="text-[0.65rem] uppercase tracking-[0.22em] text-white/[0.42]">
              Material study
            </p>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {["matte", "glass", "shadow"].map((item) => (
                <div
                  key={item}
                  className="aspect-square rounded-[1rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.16),rgba(255,255,255,0.02))]"
                />
              ))}
            </div>
          </div>

          <div
            data-parallax="14"
            className="glass-panel absolute bottom-6 left-0 w-[58%] rounded-[1.7rem] p-4"
          >
            <p className="text-[0.65rem] uppercase tracking-[0.22em] text-white/[0.42]">
              Session pulse
            </p>
            <div className="mt-5 flex items-end gap-2">
              {[28, 45, 62, 80, 56, 76, 92].map((height) => (
                <span
                  key={height}
                  className="w-full rounded-full bg-[linear-gradient(180deg,rgba(126,242,215,0.84),rgba(152,181,255,0.35))]"
                  style={{ height: `${height}px` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
