"use client";

import { useRef } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { initGSAP, gsap, useIsomorphicLayoutEffect } from "@/lib/gsap";

const features = [
  {
    title: "ออกแบบสถาปัตยกรรม",
    copy: "พัฒนาแนวคิด แปลน รูปด้าน รูปตัด และภาพรวมของอาคารให้สัมพันธ์กับพื้นที่ แสง ลม และการใช้ชีวิตจริง",
    detail: "บ้านพักอาศัย อาคารพาณิชย์ สตูดิโอ และพื้นที่เฉพาะทาง"
  },
  {
    title: "ออกแบบภายใน",
    copy: "จัดวางบรรยากาศภายในให้ต่อเนื่องกับสถาปัตยกรรม ผ่านวัสดุ แสง เฟอร์นิเจอร์ และรายละเอียดที่พอดี",
    detail: "โทนสงบ เรียบ และใช้ได้จริงในชีวิตประจำวัน"
  },
  {
    title: "วางผังและแนวคิดพื้นที่",
    copy: "อ่านบริบทของที่ดิน ทิศทางแดดลม ความเป็นส่วนตัว และเส้นทางการใช้งาน เพื่อวางระบบพื้นที่ตั้งแต่ต้น",
    detail: "เหมาะสำหรับเริ่มโปรเจกต์ใหม่หรือปรับทิศทางงานเดิม"
  },
  {
    title: "ดูแลภาพรวมงานออกแบบ",
    copy: "จัดภาษาของงานให้สอดคล้องกันตั้งแต่ concept, mood, material ไปจนถึงรายละเอียดก่อนเข้าสู่ขั้นตอนก่อสร้าง",
    detail: "ช่วยให้แบบ ภาพ และพื้นที่จริงไปในทิศทางเดียวกัน"
  }
];

export function Features() {
  const root = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (!root.current) return;

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
          scrollTrigger: { trigger: root.current, start: "top 68%" }
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
          kicker="บริการ"
          title={
            <>
              ดูแลตั้งแต่แนวคิด
              <br />
              <span className="text-gradient">จนถึงภาษาของพื้นที่จริง</span>
            </>
          }
          description="เราออกแบบโดยมองพื้นที่ทั้งหมดร่วมกัน เพื่อให้สถาปัตยกรรม ภายใน แสง วัสดุ และการใช้งานเดินไปในจังหวะเดียวกัน"
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature, index) => (
            <article key={feature.title} className="feature-card glass-panel group relative overflow-hidden rounded-[1.8rem] p-6">
              <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-60" />
              <div className="absolute right-0 top-0 h-36 w-36 rounded-full bg-accent/10 blur-[90px] transition-opacity duration-500 group-hover:opacity-80" />
              <p className="text-[0.72rem] tracking-[0.24em] text-white/40">0{index + 1}</p>
              <h3 className="mt-8 font-display text-2xl font-semibold tracking-[-0.04em] text-white">{feature.title}</h3>
              <p className="mt-5 text-base leading-8 text-white/[0.64]">{feature.copy}</p>
              <p className="mt-8 border-t border-white/[0.08] pt-5 text-sm leading-7 text-white/[0.48]">{feature.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
