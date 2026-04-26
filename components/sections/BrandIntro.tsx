"use client";

import { useRef } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { initGSAP, gsap, useIsomorphicLayoutEffect } from "@/lib/gsap";

const principles = [
  {
    title: "ความเงียบของพื้นที่",
    copy: "พื้นที่ที่ดีไม่จำเป็นต้องพูดดัง แต่ต้องทำให้ผู้ใช้งานรู้สึกพอดีตั้งแต่วินาทีแรกที่เดินเข้าไป"
  },
  {
    title: "แสงและจังหวะ",
    copy: "ช่องเปิด เงา และระยะถอยถูกจัดวางให้สัมพันธ์กับเวลา เพื่อให้บ้านเปลี่ยนบรรยากาศอย่างนุ่มนวลตลอดวัน"
  },
  {
    title: "วัสดุที่อยู่ได้นาน",
    copy: "เราเลือกใช้ภาษาของวัสดุที่เรียบง่าย ซื่อสัตย์ และไม่ตามกระแส เพื่อให้พื้นที่ยังคงงดงามเมื่อเวลาผ่านไป"
  }
];

const metrics = [
  { value: "03", label: "บริบท / แสง / การอยู่อาศัย" },
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
          .from(".intro-heading", { y: 32, opacity: 0, duration: 1, ease: "power2.out" })
          .from(".intro-image", { y: 46, opacity: 0, scale: 1.03, duration: 1.15, ease: "power2.out" }, "-=0.55")
          .from(".intro-panel", { y: 30, opacity: 0, duration: 0.95, stagger: 0.12, ease: "power2.out" }, "-=0.55")
          .from(".intro-metric", { y: 22, opacity: 0, duration: 0.9, stagger: 0.1, ease: "power2.out" }, "-=0.45");
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
        <div className="intro-heading max-w-5xl">
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

        <div className="mt-16 grid gap-12 xl:grid-cols-[1.08fr_0.92fr] xl:items-end">
          <figure className="intro-image group relative aspect-[16/10] overflow-hidden rounded-[2.4rem] border border-white/[0.10]">
            <img
              src="https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1400&q=82"
              alt="พื้นผิววัสดุและแสงธรรมชาติในงานสถาปัตยกรรม"
              className="h-full w-full object-cover opacity-88 saturate-[0.76] transition duration-[1600ms] ease-out group-hover:scale-[1.035] group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,6,0.03),rgba(8,8,6,0.50))]" />
            <figcaption className="absolute inset-x-8 bottom-7 flex items-end justify-between gap-6 border-t border-white/15 pt-5 text-white/70">
              <span className="max-w-sm text-sm font-light leading-6">
                เราเริ่มจากการมองเห็นสิ่งเล็ก ๆ: แสงที่ตกบนผิววัสดุ ระยะที่พอดี และความเงียบระหว่างองค์ประกอบ
              </span>
              <span className="text-[0.68rem] tracking-[0.22em] text-white/45">MATERIAL / LIGHT</span>
            </figcaption>
          </figure>

          <div className="grid gap-9">
            <div className="intro-panel border-y border-white/[0.10] py-8">
              <p className="text-[0.68rem] tracking-[0.24em] text-white/[0.42]">สถาปัตยกรรมที่อยู่กับเวลา</p>
              <p className="mt-7 font-display text-3xl font-light leading-tight tracking-[-0.04em] text-white sm:text-4xl">
                บ้านที่ดีควรทำให้ทุกวันรู้สึกเบา สบาย และเป็นตัวเองมากขึ้น
              </p>
              <p className="mt-7 max-w-xl text-base font-light leading-9 text-white/[0.58]">
                เราไม่เริ่มจากรูปทรงที่หวือหวา แต่เริ่มจากคำถามง่าย ๆ ว่าผู้ใช้งานต้องการอยู่กับพื้นที่แบบไหน จากนั้นจึงค่อยแปลคำตอบให้เป็นแปลน สัดส่วน วัสดุ และแสงที่เหมาะสม
              </p>
            </div>

            <div className="grid gap-6">
              {principles.map((item, index) => (
                <article key={item.title} className="intro-panel grid gap-4 border-t border-white/[0.08] pt-6 sm:grid-cols-[0.16fr_0.34fr_0.50fr]">
                  <p className="text-[0.68rem] tracking-[0.22em] text-white/36">0{index + 1}</p>
                  <p className="text-base font-light text-white/82">{item.title}</p>
                  <p className="text-sm font-light leading-7 text-white/[0.52]">{item.copy}</p>
                </article>
              ))}
            </div>

            <div className="grid gap-5 sm:grid-cols-3">
              {metrics.map((metric) => (
                <div key={metric.label} className="intro-metric border-t border-white/[0.10] pt-5">
                  <p className="font-display text-3xl font-light tracking-[-0.05em] text-white">{metric.value}</p>
                  <p className="mt-4 text-sm font-light leading-6 text-white/[0.52]">{metric.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
