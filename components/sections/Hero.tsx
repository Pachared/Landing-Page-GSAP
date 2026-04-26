"use client";

import { useRef } from "react";
import { ActionButton } from "@/components/ui/ActionButton";
import { initGSAP, gsap, useIsomorphicLayoutEffect } from "@/lib/gsap";

const heroLines = ["พื้นที่ที่สงบ", "และอยู่กับชีวิตจริง"];
const heroStats = [
  { value: "12+", label: "ปีของประสบการณ์ออกแบบพื้นที่" },
  { value: "48", label: "โปรเจกต์บ้านและพื้นที่พาณิชย์" },
  { value: "01", label: "กระบวนการดูแลตั้งแต่แนวคิดถึงส่งมอบ" }
];

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (!root.current) {
      return;
    }

    initGSAP();

    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.from(".hero-kicker", { y: 18, opacity: 0, duration: 0.7 })
          .from(".hero-line-inner", { yPercent: 108, opacity: 0, duration: 1.1, stagger: 0.12 }, "-=0.15")
          .from(".hero-copy", { y: 28, opacity: 0, duration: 0.9 }, "-=0.68")
          .from(".hero-action", { y: 24, opacity: 0, scale: 0.97, duration: 0.7, stagger: 0.1 }, "-=0.56")
          .from(".hero-stat", { y: 20, opacity: 0, duration: 0.65, stagger: 0.1 }, "-=0.42")
          .from(".hero-visual", { scale: 0.94, y: 36, opacity: 0, duration: 1 }, "-=0.88")
          .from(".hero-float", { y: 30, opacity: 0, duration: 0.8, stagger: 0.12 }, "-=0.78");

        gsap.to(".hero-orb-a", { yPercent: -8, xPercent: 6, repeat: -1, yoyo: true, duration: 10, ease: "sine.inOut" });
        gsap.to(".hero-orb-b", { yPercent: 6, xPercent: -5, repeat: -1, yoyo: true, duration: 12, ease: "sine.inOut" });
        gsap.to(".hero-visual-stack", {
          yPercent: -10,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 1.1 }
        });
        gsap.to(".hero-backdrop", {
          yPercent: 12,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 1.4 }
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
        <div className="hero-orb-a absolute left-[8%] top-28 h-56 w-56 rounded-full bg-accent/[0.18] blur-[110px]" />
        <div className="hero-orb-b absolute right-[10%] top-[18%] h-64 w-64 rounded-full bg-accent-secondary/10 blur-[120px]" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-background" />
      </div>

      <div className="section-shell section-space relative grid min-h-[calc(100vh-7rem)] items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="max-w-3xl">
          <span className="section-kicker hero-kicker">สตูดิโอสถาปัตยกรรมและออกแบบภายใน</span>

          <div className="mt-8 space-y-2">
            {heroLines.map((line) => (
              <span key={line} className="line-mask">
                <span className="hero-line-inner font-display block text-5xl font-semibold leading-[1.02] tracking-[-0.055em] text-white sm:text-6xl md:text-7xl xl:text-[6.3rem]">
                  {line}
                </span>
              </span>
            ))}
          </div>

          <p className="hero-copy mt-8 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
            เราออกแบบบ้าน อาคาร และพื้นที่ภายในให้เรียบง่าย มีจังหวะ และตอบรับวิถีชีวิตของผู้ใช้งานจริง ทุกเส้นสายถูกคิดจากแสง วัสดุ สัดส่วน และความรู้สึกของการอยู่อาศัย
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="hero-action">
              <ActionButton href="#cta">เริ่มคุยโปรเจกต์</ActionButton>
            </div>
            <div className="hero-action">
              <ActionButton href="#showcase" variant="secondary">
                ดูแนวทางผลงาน
              </ActionButton>
            </div>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {heroStats.map((stat) => (
              <div key={stat.label} className="hero-stat rounded-[1.5rem] border border-white/[0.08] bg-white/[0.03] p-4 backdrop-blur-xl">
                <p className="font-display text-2xl font-semibold tracking-[-0.04em] text-white">{stat.value}</p>
                <p className="mt-2 text-sm leading-6 text-white/[0.56]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-visual-stack relative mx-auto w-full max-w-[34rem]">
          <div className="hero-visual glass-panel relative overflow-hidden rounded-[2rem] border-white/[0.12] p-5">
            <div className="noise-overlay" />
            <div className="glow-ring" />
            <div className="absolute inset-x-12 top-8 h-28 rounded-full bg-accent/[0.14] blur-[90px]" />
            <div className="relative rounded-[1.5rem] border border-white/[0.12] bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.01))] p-5">
              <div className="flex items-center justify-between text-[0.7rem] uppercase tracking-[0.22em] text-white/[0.42]">
                <span>site concept board</span>
                <span>2026</span>
              </div>

              <div className="mt-6 rounded-[1.35rem] border border-white/[0.08] bg-background-soft/[0.80] p-6">
                <div className="grid gap-4 sm:grid-cols-[0.9fr_1.1fr]">
                  <div className="rounded-[1.15rem] border border-white/[0.08] bg-white/[0.03] p-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-white/[0.42]">แนวคิดหลัก</p>
                    <p className="mt-5 font-display text-3xl font-semibold tracking-[-0.05em] text-white">สงบ เรียบ ลึก</p>
                    <p className="mt-3 text-sm leading-6 text-white/[0.56]">
                      พื้นที่ที่ลดความวุ่นวาย เหลือไว้เฉพาะสิ่งจำเป็น และให้แสงธรรมชาติเป็นส่วนหนึ่งของงานออกแบบ
                    </p>
                  </div>

                  <div className="relative rounded-[1.15rem] border border-white/[0.08] bg-[radial-gradient(circle_at_top,rgba(152,181,255,0.22),transparent_55%),rgba(255,255,255,0.03)] p-4">
                    <div className="absolute inset-5 rounded-full border border-white/10" />
                    <div className="absolute inset-[20%] rounded-full border border-accent/[0.30]" />
                    <div className="absolute inset-[32%] rounded-full bg-accent/[0.18] blur-3xl" />
                    <div className="relative flex h-52 items-end justify-between">
                      {[58, 74, 92, 82, 96, 71].map((height) => (
                        <span key={height} className="w-[13%] rounded-t-full bg-[linear-gradient(180deg,rgba(226,221,210,0.88),rgba(152,181,255,0.34))]" style={{ height: `${height}%` }} />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-3">
                  {["แสง", "วัสดุ", "สัดส่วน"].map((label, index) => (
                    <div key={label} className="rounded-[1.05rem] border border-white/[0.08] bg-white/[0.03] p-4">
                      <p className="text-[0.65rem] uppercase tracking-[0.22em] text-white/40">0{index + 1}</p>
                      <p className="mt-6 text-sm font-medium text-white/80">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="hero-float glass-panel absolute -left-5 top-[16%] rounded-[1.4rem] px-4 py-3">
            <p className="text-[0.65rem] uppercase tracking-[0.22em] text-white/[0.42]">mood</p>
            <p className="mt-2 font-display text-xl text-white">Quiet Luxury</p>
          </div>

          <div className="hero-float glass-panel absolute -right-4 bottom-[16%] rounded-[1.4rem] px-4 py-3">
            <p className="text-[0.65rem] uppercase tracking-[0.22em] text-white/[0.42]">space</p>
            <p className="mt-2 font-display text-xl text-white">Human Scale</p>
          </div>
        </div>
      </div>
    </section>
  );
}
