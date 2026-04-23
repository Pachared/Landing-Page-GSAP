"use client";

import { useRef } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { initGSAP, gsap, useIsomorphicLayoutEffect } from "@/lib/gsap";

const principles = [
  {
    title: "Object-level detail",
    copy: "Every layer feels engineered, not assembled. Interfaces stay calm while the system does the heavy lifting."
  },
  {
    title: "Signal-first clarity",
    copy: "The product surfaces only what matters, reducing noise until action feels inevitable and fast."
  },
  {
    title: "Presence in motion",
    copy: "Transitions guide attention with restraint, creating a premium rhythm rather than decorative overload."
  }
];

const metrics = [
  { value: "03", label: "core moments from signal to action" },
  { value: "24/7", label: "intelligence layer always live" },
  { value: "1", label: "unified command experience" }
];

export function BrandIntro() {
  const root = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (!root.current) {
      return;
    }

    initGSAP();

    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top 72%"
          }
        });

        timeline
          .from(".intro-heading", {
            y: 32,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out"
          })
          .from(
            ".intro-panel",
            {
              y: 40,
              opacity: 0,
              duration: 0.8,
              stagger: 0.12,
              ease: "power3.out"
            },
            "-=0.55"
          )
          .from(
            ".intro-metric",
            {
              y: 24,
              opacity: 0,
              duration: 0.65,
              stagger: 0.1,
              ease: "power3.out"
            },
            "-=0.4"
          );
      });
    }, root);

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section id="intro" ref={root} className="section-space">
      <div className="section-shell">
        <div className="intro-heading">
          <SectionHeading
            kicker="Brand Statement"
            title={
              <>
                Built like an object of desire.
                <br />
                <span className="text-gradient">Operates like an unfair advantage.</span>
              </>
            }
            description="Astra One was imagined as a launch platform for modern operators: tactile, emotionally precise, and designed to make complexity feel almost impossibly elegant."
          />
        </div>

        <div className="mt-12 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="grid gap-6 md:grid-cols-3">
            {principles.map((item) => (
              <article
                key={item.title}
                className="intro-panel glass-panel rounded-[1.75rem] p-6"
              >
                <p className="text-[0.7rem] uppercase tracking-[0.22em] text-white/[0.42]">
                  {item.title}
                </p>
                <p className="mt-8 text-lg leading-8 text-white/[0.76]">{item.copy}</p>
              </article>
            ))}
          </div>

          <div className="glass-panel relative overflow-hidden rounded-[2rem] p-6 sm:p-8">
            <div className="noise-overlay" />
            <div className="absolute inset-x-10 top-6 h-24 rounded-full bg-accent/[0.18] blur-[90px]" />
            <div className="relative">
              <p className="text-sm uppercase tracking-[0.26em] text-white/[0.42]">
                Launch philosophy
              </p>
              <p className="mt-6 font-display text-3xl font-semibold leading-tight tracking-[-0.05em] text-white sm:text-4xl">
                Calm surfaces. Deep intelligence. Memorable control.
              </p>
              <p className="mt-5 max-w-xl text-base leading-8 text-white/[0.62]">
                The system was shaped to feel more like a luxury object than a dashboard.
                Every reveal, every panel, and every pause exists to reinforce trust,
                momentum, and presence.
              </p>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="intro-metric rounded-[1.35rem] border border-white/10 bg-white/[0.03] p-4"
                  >
                    <p className="font-display text-4xl font-semibold tracking-[-0.05em] text-white">
                      {metric.value}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-white/[0.56]">{metric.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
