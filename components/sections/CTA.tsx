"use client";

import { useRef } from "react";
import { ActionButton } from "@/components/ui/ActionButton";
import { initGSAP, gsap, useIsomorphicLayoutEffect } from "@/lib/gsap";

export function CTA() {
  const root = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (!root.current) return;

    initGSAP();

    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const reveal = gsap.timeline({
          scrollTrigger: { trigger: root.current, start: "top 72%" }
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
              <span className="section-kicker cta-content">เริ่มต้นโปรเจกต์</span>
              <h2 className="cta-content mt-8 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.055em] text-white sm:text-5xl lg:text-6xl">
                เล่าให้เราฟังว่า
                <span className="text-gradient"> คุณอยากให้พื้นที่รู้สึกอย่างไร</span>
              </h2>
              <p className="cta-content mt-6 max-w-2xl text-base leading-8 text-white/[0.68] sm:text-lg">
                ไม่ว่าจะเป็นบ้านหลังใหม่ พื้นที่ทำงาน คาเฟ่ หรืออาคารขนาดเล็ก เราพร้อมเริ่มจากบทสนทนาแรก เพื่อค่อย ๆ แปลความต้องการให้กลายเป็นพื้นที่ที่มีจังหวะและเหตุผลของตัวเอง
              </p>
            </div>

            <div className="cta-content rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
              <p className="text-[0.68rem] tracking-[0.22em] text-white/[0.42]">นัดพูดคุยเบื้องต้น</p>
              <p className="mt-5 text-base leading-8 text-white/[0.64]">
                ส่งรายละเอียดพื้นที่ งบประมาณโดยประมาณ และบรรยากาศที่คุณชอบ ทีมออกแบบจะช่วยจัดลำดับแนวคิดและเสนอทิศทางที่เหมาะกับโปรเจกต์ของคุณ
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <ActionButton href="mailto:hello@ruenstudio.co">ติดต่อทีมออกแบบ</ActionButton>
                <ActionButton href="#showcase" variant="secondary">
                  ดูผลงานก่อนหน้า
                </ActionButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
