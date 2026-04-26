"use client";

import { useRef } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { initGSAP, gsap, useIsomorphicLayoutEffect } from "@/lib/gsap";

const projects = [
  "บ้านพักอาศัยที่จัดวางแสงเช้าให้เป็นส่วนหนึ่งของพื้นที่นั่งเล่น",
  "พื้นที่พาณิชย์ขนาดเล็กที่ใช้ความเรียบแทนการตกแต่งเกินจำเป็น",
  "คาเฟ่และสตูดิโอที่เชื่อมงานบริการเข้ากับจังหวะของผู้มาเยือน",
  "บ้านเมืองร้อนที่เปิดรับลม เงา และความเป็นส่วนตัวในเวลาเดียวกัน"
];

export function Showcase() {
  const root = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (!root.current) return;

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
          scrollTrigger: { trigger: root.current, start: "top 70%" }
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
              kicker="ผลงาน"
              title={
                <>
                  พื้นที่ที่ปล่อยให้แสง
                  <br />
                  <span className="text-gradient">และความเงียบเป็นตัวเล่าเรื่อง</span>
                </>
              }
              description="เราเลือกนำเสนอผลงานผ่านบรรยากาศมากกว่าความซับซ้อนของรูปทรง เพื่อให้เห็นความสัมพันธ์ระหว่างผู้ใช้งาน วัสดุ และช่วงเวลาของพื้นที่"
            />
          </div>

          <p className="showcase-copy max-w-2xl text-base leading-8 text-white/[0.62]">
            ทุกโครงการถูกพัฒนาจากบริบทเฉพาะของเจ้าของ พื้นที่ และการใช้งานจริง ผลลัพธ์จึงไม่ใช่ภาพที่สวยเพียงชั่วคราว แต่เป็นพื้นที่ที่ค่อย ๆ เปิดเผยคุณค่าผ่านการอยู่อาศัย
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            {projects.map((project, index) => (
              <div key={project} className="showcase-copy rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">
                <p className="text-[0.68rem] tracking-[0.22em] text-white/40">PROJECT 0{index + 1}</p>
                <p className="mt-5 text-base leading-7 text-white/[0.76]">{project}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative min-h-[36rem]">
          <div data-parallax="-8" className="glass-panel absolute inset-x-0 bottom-0 top-12 overflow-hidden rounded-[2.4rem] p-5">
            <div className="soft-grid" />
            <div className="noise-overlay" />
            <div className="absolute left-[12%] top-[10%] h-32 w-32 rounded-full bg-accent/[0.16] blur-[90px]" />
            <div className="absolute bottom-[8%] right-[10%] h-36 w-36 rounded-full bg-accent-secondary/10 blur-[100px]" />
            <div className="relative flex h-full flex-col justify-between rounded-[1.8rem] border border-white/10 bg-background-soft/[0.78] p-6">
              <div className="flex items-center justify-between text-[0.7rem] tracking-[0.24em] text-white/40">
                <span>RESIDENTIAL STUDY</span>
                <span>LIGHT / VOID / MASS</span>
              </div>

              <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
                <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.03] p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[0.68rem] tracking-[0.22em] text-white/40">โครงการตัวอย่าง</p>
                      <p className="mt-5 font-display text-3xl tracking-[-0.04em] text-white">บ้านในเงาไม้</p>
                    </div>
                    <span className="rounded-full border border-white/10 px-3 py-1 text-[0.6rem] tracking-[0.18em] text-white/[0.56]">CALM</span>
                  </div>

                  <div className="mt-8 grid gap-4 md:grid-cols-3">
                    {[
                      { value: "ทิศ", label: "รับแสงเหนือ" },
                      { value: "ลาน", label: "เปิดช่องว่างกลางบ้าน" },
                      { value: "เงา", label: "ลดความร้อนช่วงบ่าย" }
                    ].map((item) => (
                      <div key={item.label} className="rounded-[1.1rem] border border-white/[0.08] bg-background/[0.60] p-4">
                        <p className="text-[0.65rem] tracking-[0.18em] text-white/[0.38]">{item.label}</p>
                        <p className="mt-5 font-display text-3xl tracking-[-0.05em] text-white">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[1.4rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(226,221,210,0.18),transparent_52%),rgba(255,255,255,0.03)] p-5">
                  <div className="relative flex h-full min-h-64 items-center justify-center overflow-hidden rounded-[1.2rem] border border-white/10 bg-background/[0.58]">
                    <div className="absolute inset-x-[18%] top-[18%] h-[42%] border border-white/10 bg-white/[0.03]" />
                    <div className="absolute bottom-[16%] left-[16%] h-[32%] w-[32%] border border-accent/[0.25] bg-accent/[0.05]" />
                    <div className="absolute right-[16%] top-[22%] h-[46%] w-[24%] border border-white/10 bg-white/[0.04]" />
                    <div className="absolute inset-x-[20%] top-[48%] h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
                    <div className="absolute left-[50%] top-[18%] h-[62%] w-px bg-gradient-to-b from-transparent via-white/50 to-transparent" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div data-parallax="-18" className="glass-panel absolute right-6 top-0 w-[52%] rounded-[1.7rem] p-4">
            <p className="text-[0.65rem] tracking-[0.22em] text-white/[0.42]">MATERIAL PALETTE</p>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {["ปูน", "ไม้", "เงา"].map((item) => (
                <div key={item} className="flex aspect-square items-end rounded-[1rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.14),rgba(255,255,255,0.02))] p-3">
                  <span className="text-xs text-white/50">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div data-parallax="14" className="glass-panel absolute bottom-6 left-0 w-[58%] rounded-[1.7rem] p-4">
            <p className="text-[0.65rem] tracking-[0.22em] text-white/[0.42]">DAYLIGHT STUDY</p>
            <div className="mt-5 flex items-end gap-2">
              {[28, 45, 62, 80, 56, 76, 92].map((height) => (
                <span key={height} className="w-full rounded-full bg-[linear-gradient(180deg,rgba(226,221,210,0.84),rgba(152,181,255,0.28))]" style={{ height: `${height}px` }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
