"use client";

import { useRef } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { initGSAP, gsap, useIsomorphicLayoutEffect } from "@/lib/gsap";

const steps = [
  {
    label: "Signal intake",
    title: "The room quiets as the right context comes into focus.",
    copy: "Astra One absorbs fragmented inputs and resolves them into a single, readable atmosphere."
  },
  {
    label: "Model alignment",
    title: "Priority layers separate themselves from the noise.",
    copy: "Relevance sharpens. The canvas becomes more intentional with every moment of scroll."
  },
  {
    label: "Orchestration",
    title: "Teams, agents, and intent begin moving as one system.",
    copy: "Narrative, operations, and intelligence lock together without losing elegance or pace."
  },
  {
    label: "Release",
    title: "The final decision lands with confidence, not friction.",
    copy: "By the last beat, the product feels inevitable: decisive, premium, and fully alive."
  }
];

const storyGradients = [
  "radial-gradient(circle at 30% 25%, rgba(152,181,255,0.3), transparent 38%), radial-gradient(circle at 75% 70%, rgba(126,242,215,0.12), transparent 30%), linear-gradient(180deg, rgba(12,18,34,0.95), rgba(6,8,20,0.98))",
  "radial-gradient(circle at 62% 20%, rgba(152,181,255,0.38), transparent 34%), radial-gradient(circle at 20% 82%, rgba(126,242,215,0.12), transparent 26%), linear-gradient(180deg, rgba(12,18,34,0.95), rgba(6,8,20,0.98))",
  "radial-gradient(circle at 22% 18%, rgba(126,242,215,0.2), transparent 32%), radial-gradient(circle at 82% 72%, rgba(152,181,255,0.3), transparent 32%), linear-gradient(180deg, rgba(12,18,34,0.95), rgba(6,8,20,0.98))",
  "radial-gradient(circle at 50% 20%, rgba(255,255,255,0.12), transparent 28%), radial-gradient(circle at 70% 72%, rgba(152,181,255,0.32), transparent 30%), linear-gradient(180deg, rgba(12,18,34,0.95), rgba(6,8,20,0.98))"
];

export function StoryScroll() {
  const root = useRef<HTMLElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (!root.current || !wrapper.current || !stage.current) {
      return;
    }

    initGSAP();

    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      mm.add("(prefers-reduced-motion: no-preference) and (min-width: 1024px)", () => {
        const storySteps = gsap.utils.toArray<HTMLElement>(".story-step");
        const storyLayers = gsap.utils.toArray<HTMLElement>(".story-layer");

        gsap.set(storySteps, {
          opacity: 0.24,
          y: 18
        });
        gsap.set(storySteps[0], {
          opacity: 1,
          y: 0
        });

        gsap.set(storyLayers, {
          opacity: 0,
          scale: 0.96,
          y: 30
        });
        gsap.set(storyLayers[0], {
          opacity: 1,
          scale: 1,
          y: 0
        });

        gsap.set(".story-progress", {
          scaleY: 0.16,
          transformOrigin: "top center"
        });

        const timeline = gsap.timeline({
          defaults: {
            ease: "power2.inOut"
          },
          scrollTrigger: {
            trigger: wrapper.current,
            start: "top top+=88",
            end: "+=2600",
            scrub: 1,
            pin: stage.current,
            anticipatePin: 1
          }
        });

        steps.forEach((_, index) => {
          const previousIndex = index === 0 ? 0 : index - 1;
          const label = `step-${index}`;

          timeline.to(
            ".story-stage-bg",
            {
              background: storyGradients[index],
              duration: 0.6
            },
            label
          );

          timeline.to(
            ".story-progress",
            {
              scaleY: (index + 1) / steps.length,
              duration: 0.55
            },
            label
          );

          timeline.to(
            `.story-step-${previousIndex}`,
            {
              opacity: index === 0 ? 1 : 0.24,
              y: index === 0 ? 0 : -16,
              duration: 0.45
            },
            label
          );

          timeline.to(
            `.story-step-${index}`,
            {
              opacity: 1,
              y: 0,
              duration: 0.55
            },
            label
          );

          timeline.to(
            `.story-layer-${previousIndex}`,
            {
              opacity: index === 0 ? 1 : 0.18,
              scale: index === 0 ? 1 : 0.95,
              y: index === 0 ? 0 : -24,
              duration: 0.5
            },
            label
          );

          timeline.to(
            `.story-layer-${index}`,
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.62
            },
            label
          );

          timeline.to(
            ".story-core",
            {
              rotate: index * 22,
              scale: 1 + index * 0.03,
              duration: 0.7
            },
            label
          );
        });
      });

      mm.add("(prefers-reduced-motion: no-preference) and (max-width: 1023px)", () => {
        gsap.from(".story-mobile-card", {
          y: 36,
          opacity: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: root.current,
            start: "top 72%"
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
    <section id="story" ref={root} className="section-space">
      <div className="section-shell">
        <SectionHeading
          kicker="Scroll Storytelling"
          title={
            <>
              A cinematic narrative that
              <br />
              <span className="text-gradient">unfolds as you move.</span>
            </>
          }
          description="This sequence uses pinned scroll on larger screens to reveal the product in four emotional beats. On mobile, the same story becomes a lighter stacked experience to protect performance and readability."
        />

        <div ref={wrapper} className="mt-12 hidden lg:block">
          <div
            ref={stage}
            className="story-stage-bg glass-panel story-gradient relative overflow-hidden rounded-[2.8rem]"
          >
            <div className="noise-overlay" />
            <div className="soft-grid opacity-40" />
            <div className="grid min-h-[78vh] grid-cols-[0.92fr_1.08fr]">
              <div className="relative flex h-full flex-col justify-between border-r border-white/10 p-10 xl:p-12">
                <div className="absolute left-10 top-10 bottom-10 w-px bg-white/10">
                  <span className="story-progress absolute inset-x-0 top-0 h-full origin-top bg-gradient-to-b from-white via-accent to-accent-secondary" />
                </div>

                <div className="space-y-10 pl-10">
                  {steps.map((step, index) => (
                    <article key={step.label} className={`story-step story-step-${index}`}>
                      <p className="text-[0.68rem] uppercase tracking-[0.24em] text-white/[0.44]">
                        {step.label}
                      </p>
                      <h3 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-[-0.05em] text-white">
                        {step.title}
                      </h3>
                      <p className="mt-4 max-w-xl text-base leading-8 text-white/60">
                        {step.copy}
                      </p>
                    </article>
                  ))}
                </div>

                <div className="pl-10 text-sm leading-7 text-white/[0.42]">
                  Premium motion is used here as a narrative device: light, hierarchy, and
                  depth evolve together instead of competing for attention.
                </div>
              </div>

              <div className="relative flex items-center justify-center p-10 xl:p-12">
                <div className="story-core absolute h-[28rem] w-[28rem] rounded-full border border-white/10" />
                <div className="absolute h-[18rem] w-[18rem] rounded-full border border-accent/[0.30]" />
                <div className="absolute h-[10rem] w-[10rem] rounded-full bg-accent/[0.16] blur-3xl" />

                <div className="relative h-[31rem] w-full max-w-[31rem]">
                  {steps.map((step, index) => (
                    <div
                      key={step.label}
                      className={`story-layer story-layer-${index} absolute inset-0 glass-panel rounded-[2.3rem] p-7`}
                    >
                      <div className="absolute inset-x-10 top-6 h-24 rounded-full bg-accent/[0.14] blur-[90px]" />
                      <div className="relative flex h-full flex-col justify-between rounded-[1.8rem] border border-white/10 bg-background-soft/[0.72] p-6">
                        <div className="flex items-center justify-between text-[0.68rem] uppercase tracking-[0.22em] text-white/[0.42]">
                          <span>Phase 0{index + 1}</span>
                          <span>Astra One</span>
                        </div>

                        <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
                          <p className="text-[0.68rem] uppercase tracking-[0.22em] text-white/40">
                            Active frame
                          </p>
                          <p className="mt-5 font-display text-3xl tracking-[-0.05em] text-white">
                            {step.label}
                          </p>
                          <p className="mt-4 text-base leading-7 text-white/[0.62]">{step.copy}</p>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-3">
                          {[74, 88, 92].map((value, cardIndex) => (
                            <div
                              key={`${step.label}-${value}-${cardIndex}`}
                              className="rounded-[1.15rem] border border-white/10 bg-background/70 p-4"
                            >
                              <p className="text-[0.62rem] uppercase tracking-[0.2em] text-white/[0.38]">
                                node 0{cardIndex + 1}
                              </p>
                              <p className="mt-5 font-display text-3xl tracking-[-0.05em] text-white">
                                {value - index * (cardIndex + 2)}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-4 lg:hidden">
          {steps.map((step, index) => (
            <article
              key={step.label}
              className="story-mobile-card glass-panel story-gradient overflow-hidden rounded-[2rem] p-6"
            >
              <div className="relative rounded-[1.5rem] border border-white/10 bg-background-soft/75 p-5">
                <p className="text-[0.68rem] uppercase tracking-[0.22em] text-white/[0.42]">
                  Phase 0{index + 1}
                </p>
                <h3 className="mt-5 font-display text-3xl font-semibold tracking-[-0.05em] text-white">
                  {step.title}
                </h3>
                <p className="mt-4 text-base leading-8 text-white/[0.62]">{step.copy}</p>
                <div className="mt-8 flex items-end gap-2">
                  {[36, 44, 58, 70, 52].map((height, barIndex) => (
                    <span
                      key={`${step.label}-${height}-${barIndex}`}
                      className="w-full rounded-full bg-[linear-gradient(180deg,rgba(126,242,215,0.84),rgba(152,181,255,0.35))]"
                      style={{ height: `${height + index * 3}px` }}
                    />
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
