"use client";

import { useRef } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { initGSAP, gsap, useIsomorphicLayoutEffect } from "@/lib/gsap";

const projects = [
  {
    title: "บ้านในเงาไม้",
    type: "Residential",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=82"
  },
  {
    title: "พื้นที่พักกลางวัน",
    type: "Interior",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=82"
  },
  {
    title: "ผิววัสดุและแสงบ่าย",
    type: "Material Study",
    image: "https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&w=1200&q=82"
  }
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
          duration: 1,
          stagger: 0.14,
          ease: "power2.out",
          scrollTrigger: { trigger: root.current, start: "top 70%" }
        });

        gsap.from(".project-image", {
          y: 46,
          opacity: 0,
          scale: 1.03,
          duration: 1.15,
          stagger: 0.18,
          ease: "power2.out",
          scrollTrigger: { trigger: root.current, start: "top 62%" }
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
              scrub: 1.4
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
      <div className="section-shell">
        <div className="grid gap-12 xl:grid-cols-[0.78fr_1.22fr] xl:items-end">
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

            <p className="showcase-copy max-w-2xl text-base font-light leading-9 text-white/[0.58]">
              ทุกโครงการถูกพัฒนาจากบริบทเฉพาะของเจ้าของ พื้นที่ และการใช้งานจริง ผลลัพธ์จึงไม่ใช่ภาพที่สวยเพียงชั่วคราว แต่เป็นพื้นที่ที่ค่อย ๆ เปิดเผยคุณค่าผ่านการอยู่อาศัย
            </p>
          </div>

          <figure className="project-image group relative aspect-[16/10] cursor-default overflow-hidden rounded-[2.4rem] border border-white/[0.10]">
            <img
              src={projects[0].image}
              alt={projects[0].title}
              className="h-full w-full object-cover opacity-90 saturate-[0.82] transition duration-[1600ms] ease-out group-hover:scale-[1.045] group-hover:opacity-100 group-hover:saturate-[0.92]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,6,0.02),rgba(8,8,6,0.55))] transition duration-[1200ms] group-hover:bg-[linear-gradient(180deg,rgba(8,8,6,0),rgba(8,8,6,0.48))]" />
            <figcaption className="absolute inset-x-8 bottom-7 flex items-end justify-between gap-6 border-t border-white/15 pt-5 text-white/72 transition duration-700 group-hover:border-white/25 group-hover:text-white/84">
              <span className="font-display text-2xl font-light tracking-[-0.04em]">{projects[0].title}</span>
              <span className="text-[0.68rem] tracking-[0.22em] text-white/45 transition duration-700 group-hover:text-white/58">{projects[0].type}</span>
            </figcaption>
          </figure>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <figure data-parallax="-6" className="project-image group relative aspect-[4/5] cursor-default overflow-hidden rounded-[2rem] border border-white/[0.10]">
            <img
              src={projects[1].image}
              alt={projects[1].title}
              className="h-full w-full object-cover opacity-88 saturate-[0.78] transition duration-[1600ms] ease-out group-hover:scale-[1.045] group-hover:opacity-100 group-hover:saturate-[0.9]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,6,0.02),rgba(8,8,6,0.46))] transition duration-[1200ms] group-hover:bg-[linear-gradient(180deg,rgba(8,8,6,0),rgba(8,8,6,0.42))]" />
            <figcaption className="absolute inset-x-6 bottom-6 flex items-end justify-between gap-5 border-t border-white/15 pt-5 text-white/70 transition duration-700 group-hover:border-white/25 group-hover:text-white/82">
              <span className="font-display text-xl font-light tracking-[-0.04em]">{projects[1].title}</span>
              <span className="text-[0.64rem] tracking-[0.20em] text-white/42 transition duration-700 group-hover:text-white/56">{projects[1].type}</span>
            </figcaption>
          </figure>

          <div className="grid gap-8">
            <figure data-parallax="8" className="project-image group relative aspect-[16/9] cursor-default overflow-hidden rounded-[2rem] border border-white/[0.10]">
              <img
                src={projects[2].image}
                alt={projects[2].title}
                className="h-full w-full object-cover opacity-86 saturate-[0.72] transition duration-[1600ms] ease-out group-hover:scale-[1.045] group-hover:opacity-100 group-hover:saturate-[0.88]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,6,0.02),rgba(8,8,6,0.48))] transition duration-[1200ms] group-hover:bg-[linear-gradient(180deg,rgba(8,8,6,0),rgba(8,8,6,0.42))]" />
              <figcaption className="absolute inset-x-6 bottom-6 flex items-end justify-between gap-5 border-t border-white/15 pt-5 text-white/70 transition duration-700 group-hover:border-white/25 group-hover:text-white/82">
                <span className="font-display text-xl font-light tracking-[-0.04em]">{projects[2].title}</span>
                <span className="text-[0.64rem] tracking-[0.20em] text-white/42 transition duration-700 group-hover:text-white/56">{projects[2].type}</span>
              </figcaption>
            </figure>

            <div className="showcase-copy grid gap-5 sm:grid-cols-3">
              {["แสง", "ช่องว่าง", "วัสดุ"].map((item, index) => (
                <div key={item} className="border-t border-white/[0.10] pt-5 transition duration-500 hover:border-white/[0.22]">
                  <p className="text-[0.66rem] tracking-[0.22em] text-white/38">0{index + 1}</p>
                  <p className="mt-5 text-base font-light text-white/70">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
