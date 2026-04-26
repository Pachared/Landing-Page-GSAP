"use client";

import { useRef } from "react";
import { ActionButton } from "@/components/ui/ActionButton";
import {
  createGSAPMatchMedia,
  gsap,
  gsapMediaQueries,
  useIsomorphicLayoutEffect
} from "@/lib/gsap";

const heroLines = ["พื้นที่ที่สงบ", "และอยู่กับชีวิตจริง"];
const heroStats = [
  { value: "12+", label: "ปีของประสบการณ์ออกแบบพื้นที่" },
  { value: "48", label: "โปรเจกต์บ้านและพื้นที่พาณิชย์" },
  { value: "01", label: "กระบวนการดูแลตั้งแต่แนวคิดถึงส่งมอบ" }
];

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (!root.current) return;

    const mm = createGSAPMatchMedia();
    const ctx = gsap.context(() => {
      mm.add(gsapMediaQueries.motionSafe, () => {
        const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

        tl.from(".hero-kicker", { y: 18, opacity: 0, duration: 0.9 })
          .from(".hero-line-inner", { yPercent: 104, opacity: 0, duration: 1.35, stagger: 0.18 }, "-=0.12")
          .from(".hero-copy", { y: 24, opacity: 0, duration: 1.1 }, "-=0.72")
          .from(".hero-action", { y: 20, opacity: 0, duration: 0.85, stagger: 0.14 }, "-=0.62")
          .from(".hero-stat", { y: 18, opacity: 0, duration: 0.85, stagger: 0.16 }, "-=0.38")
          .from(".hero-image", { scale: 1.04, y: 34, opacity: 0, duration: 1.45 }, "-=1")
          .from(".hero-float", { y: 24, opacity: 0, duration: 1, stagger: 0.16 }, "-=0.82");

        gsap.to(".hero-orb-a", { yPercent: -6, xPercent: 4, repeat: -1, yoyo: true, duration: 14, ease: "sine.inOut" });
        gsap.to(".hero-orb-b", { yPercent: 5, xPercent: -4, repeat: -1, yoyo: true, duration: 16, ease: "sine.inOut" });
        gsap.to(".hero-visual-stack", {
          yPercent: -7,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 1.6 }
        });
        gsap.to(".hero-backdrop", {
          yPercent: 9,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 1.8 }
        });
      });

      mm.add(gsapMediaQueries.reduceMotion, () => {
        gsap.set(".hero-kicker, .hero-line-inner, .hero-copy, .hero-action, .hero-stat, .hero-image, .hero-float", {
          clearProps: "all",
          opacity: 1
        });
      });
    }, root);

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section ref={root} className="relative flex min-h-screen items-end overflow-hidden pt-28 sm:pt-32">
      <div className="hero-backdrop absolute inset-0">
        <div className="soft-grid" />
        <div className="hero-orb-a absolute left-[8%] top-28 h-56 w-56 rounded-full bg-accent/[0.12] blur-[120px]" />
        <div className="hero-orb-b absolute right-[10%] top-[18%] h-64 w-64 rounded-full bg-accent-secondary/10 blur-[130px]" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-background" />
      </div>

      <div className="section-shell section-space relative grid min-h-[calc(100vh-7rem)] items-center gap-16 lg:grid-cols-[1.12fr_0.88fr]">
        <div className="max-w-3xl">
          <span className="section-kicker hero-kicker">สตูดิโอสถาปัตยกรรมและออกแบบภายใน</span>

          <div className="mt-10 space-y-3">
            {heroLines.map((line) => (
              <span key={line} className="line-mask">
                <span className="hero-line-inner font-display block text-5xl font-medium leading-[1.08] tracking-[-0.055em] text-white sm:text-6xl md:text-7xl xl:text-[6.15rem]">
                  {line}
                </span>
              </span>
            ))}
          </div>

          <p className="hero-copy mt-10 max-w-2xl text-base font-light leading-9 text-white/64 sm:text-lg">
            เราออกแบบบ้าน อาคาร และพื้นที่ภายในให้เรียบง่าย มีจังหวะ และตอบรับวิถีชีวิตของผู้ใช้งานจริง ทุกเส้นสายถูกคิดจากแสง วัสดุ สัดส่วน และความรู้สึกของการอยู่อาศัย
          </p>

          <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="hero-action">
              <ActionButton href="#cta">เริ่มคุยโปรเจกต์</ActionButton>
            </div>
            <div className="hero-action">
              <ActionButton href="#showcase" variant="secondary">
                ดูแนวทางผลงาน
              </ActionButton>
            </div>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-3">
            {heroStats.map((stat) => (
              <div key={stat.label} className="hero-stat border-t border-white/[0.10] pt-5">
                <p className="font-display text-2xl font-medium tracking-[-0.04em] text-white">{stat.value}</p>
                <p className="mt-3 text-sm font-light leading-6 text-white/[0.52]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-visual-stack relative mx-auto w-full max-w-[32rem]">
          <figure className="hero-image group glass-panel relative aspect-[4/5] overflow-hidden rounded-[2.4rem] border-white/[0.10]">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=82"
              alt="บ้านสไตล์มินิมอลที่ใช้แสงธรรมชาติและเส้นสายเรียบง่าย"
              decoding="async"
              fetchPriority="high"
              className="h-full w-full object-cover opacity-88 saturate-[0.82] transition duration-[1800ms] ease-out group-hover:scale-[1.035] group-hover:opacity-100 group-hover:saturate-[0.9]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,6,0.05),rgba(8,8,6,0.52))] transition duration-[1400ms] group-hover:bg-[linear-gradient(180deg,rgba(8,8,6,0.02),rgba(8,8,6,0.46))]" />
            <figcaption className="absolute inset-x-6 bottom-6 flex items-end justify-between gap-6 border-t border-white/15 pt-5 text-white/70 transition duration-700 group-hover:border-white/25 group-hover:text-white/84">
              <span className="max-w-[13rem] text-sm font-light leading-6">
                แสง เงา และระยะว่างถูกใช้เป็นวัสดุหนึ่งของงานออกแบบ
              </span>
              <span className="text-[0.68rem] tracking-[0.22em] text-white/45 transition duration-700 group-hover:text-white/60">RESIDENTIAL</span>
            </figcaption>
          </figure>

          <div className="hero-float glass-panel absolute -left-5 top-[16%] rounded-[1.4rem] px-4 py-3">
            <p className="text-[0.65rem] tracking-[0.22em] text-white/[0.42]">MOOD</p>
            <p className="mt-2 font-display text-xl font-light text-white">Quiet Luxury</p>
          </div>

          <div className="hero-float glass-panel absolute -right-4 bottom-[16%] rounded-[1.4rem] px-4 py-3">
            <p className="text-[0.65rem] tracking-[0.22em] text-white/[0.42]">SPACE</p>
            <p className="mt-2 font-display text-xl font-light text-white">Human Scale</p>
          </div>
        </div>
      </div>
    </section>
  );
}
