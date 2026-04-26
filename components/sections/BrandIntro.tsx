"use client";

import { useRef } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { initGSAP, gsap, useIsomorphicLayoutEffect } from "@/lib/gsap";

const principles = [
  {
    title: "ความเงียบของพื้นที่",
    copy: "เราเชื่อว่าพื้นที่ที่ดีไม่จำเป็นต้องพูดดัง แต่ต้องทำให้ผู้ใช้งานรู้สึกพอดีตั้งแต่วินาทีแรกที่เดินเข้าไป"
  },
  {
    title: "แสงและจังหวะ",
    copy: "ทุกช่องเปิด เงา และระยะถอยถูกจัดวางให้สัมพันธ์กับเวลา เพื่อให้บ้านเปลี่ยนบรรยากาศอย่างนุ่มนวลตลอดวัน"
  },
  {
    title: "วัสดุที่อยู่ได้นาน",
    copy: "เราเลือกใช้ภาษาของวัสดุที่เรียบง่าย ซื่อสัตย์ และไม่ตามกระแส เพื่อให้พื้นที่ยังคงงดงามเมื่อเวลาผ่านไป"
  }
];

const metrics = [
  { value: "03", label: "ชั้นความคิด: บริบท แสง และการอยู่อาศัย" },
  { value: "1:1", label: "สัดส่วนที่คิดจากผู้ใช้งานจริง" },
  { value: "360°", label: "ดูแลภาพรวมตั้งแต่แนวคิดถึงรายละเอียด" }
];

export function BrandIntro() {
  const root = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (!root.current) return;

    initGSAP();

    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const timeline = gsap.timeline({
          scrollTrigger: { trigger: root.current, start: "top 72%" }
        });

        timeline
          .from(".intro-heading", { y: 32, opacity: 0, duration: 0.9, ease: "power3.out" })
          .from(".intro-panel", { y: 40, opacity: 0, duration: 0.8, stagger: 0.12, ease: "power3.out" }, "-=0.55")
          .from(".intro-metric", { y: 24, opacity: 0, duration: 0.65, stagger: 0.1, ease: "power3.out" }, "-=0.4");
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
            kicker="แนวคิด"
            title={
              <>
                ออกแบบจากความพอดี
                <br />
                <span className="text-gradient">ไม่ใช่จากความมากเกินไป</span>
              </>
            }
            description="เรือนสถาปัตย์ทำงานกับพื้นที่อย่างละเอียด ตั้งแต่บริบทของที่ดิน แสงธรรมชาติ ทิศทางลม ไปจนถึงจังหวะการใช้ชีวิต เพื่อให้ทุกโครงการมีความนิ่ง เรียบ และมีเหตุผลของตัวเอง"
          />
        </div>

        <div className="mt-12 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="grid gap-6 md:grid-cols-3">
            {principles.map((item) => (
              <article key={item.title} className="intro-panel glass-panel rounded-[1.75rem] p-6">
                <p className="text-[0.7rem] tracking-[0.18em] text-white/[0.42]">{item.title}</p>
                <p className="mt-8 text-lg leading-8 text-white/[0.76]">{item.copy}</p>
              </article>
            ))}
          </div>

          <div className="glass-panel relative overflow-hidden rounded-[2rem] p-6 sm:p-8">
            <div className="noise-overlay" />
            <div className="absolute inset-x-10 top-6 h-24 rounded-full bg-accent/[0.18] blur-[90px]" />
            <div className="relative">
              <p className="text-sm tracking-[0.22em] text-white/[0.42]">สถาปัตยกรรมที่อยู่กับเวลา</p>
              <p className="mt-6 font-display text-3xl font-semibold leading-tight tracking-[-0.04em] text-white sm:text-4xl">
                บ้านที่ดีควรทำให้ทุกวันรู้สึกเบา สบาย และเป็นตัวเองมากขึ้น
              </p>
              <p className="mt-5 max-w-xl text-base leading-8 text-white/[0.62]">
                เราไม่เริ่มจากรูปทรงที่หวือหวา แต่เริ่มจากคำถามง่าย ๆ ว่าผู้ใช้งานต้องการอยู่กับพื้นที่แบบไหน จากนั้นจึงค่อยแปลคำตอบให้เป็นแปลน สัดส่วน วัสดุ และแสงที่เหมาะสม
              </p>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {metrics.map((metric) => (
                  <div key={metric.label} className="intro-metric rounded-[1.35rem] border border-white/10 bg-white/[0.03] p-4">
                    <p className="font-display text-4xl font-semibold tracking-[-0.05em] text-white">{metric.value}</p>
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
