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
          y: 36,
          opacity: 0,
          duration: 1,
          stagger: 0.14,
          ease: "power2.out",
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
        <div className="grid gap-14 xl:grid-cols-[0.78fr_1.22fr] xl:items-start">
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

          <div className="divide-y divide-white/[0.10] border-y border-white/[0.10]">
            {features.map((feature, index) => (
              <article key={feature.title} className="feature-card group grid gap-6 py-9 md:grid-cols-[0.18fr_0.42fr_0.40fr] md:items-start">
                <p className="text-[0.72rem] tracking-[0.28em] text-white/36">0{index + 1}</p>
                <div>
                  <h3 className="font-display text-2xl font-light tracking-[-0.04em] text-white transition-colors duration-500 group-hover:text-accent">
                    {feature.title}
                  </h3>
                  <p className="mt-6 text-sm font-light leading-7 text-white/[0.46]">{feature.detail}</p>
                </div>
                <p className="max-w-xl text-base font-light leading-9 text-white/[0.62]">{feature.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
