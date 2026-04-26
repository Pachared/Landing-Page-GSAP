"use client";

import { useRef } from "react";
import { ActionButton } from "@/components/ui/ActionButton";
import { initGSAP, gsap, useIsomorphicLayoutEffect } from "@/lib/gsap";

const contactItems = [
  { label: "Email", value: "hello@ruenstudio.co", href: "mailto:hello@ruenstudio.co" },
  { label: "Line", value: "@ruenstudio", href: "#" },
  { label: "Studio", value: "Bangkok, Thailand", href: "#" }
];

export function CTA() {
  const root = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (!root.current) return;

    initGSAP();

    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".cta-content", {
          y: 34,
          opacity: 0,
          duration: 1,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: { trigger: root.current, start: "top 72%" }
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
        <div className="border-y border-white/[0.10] py-14 lg:py-20">
          <div className="grid gap-12 xl:grid-cols-[1.08fr_0.92fr] xl:items-end">
            <div>
              <span className="section-kicker cta-content">เริ่มต้นโปรเจกต์</span>
              <h2 className="cta-content mt-9 max-w-5xl font-display text-4xl font-light leading-[1.12] tracking-[-0.06em] text-white sm:text-5xl lg:text-7xl">
                เล่าให้เราฟังว่า
                <span className="text-gradient"> คุณอยากให้พื้นที่รู้สึกอย่างไร</span>
              </h2>
              <p className="cta-content mt-8 max-w-2xl text-base font-light leading-9 text-white/[0.58] sm:text-lg">
                ไม่ว่าจะเป็นบ้านหลังใหม่ พื้นที่ทำงาน คาเฟ่ หรืออาคารขนาดเล็ก เราพร้อมเริ่มจากบทสนทนาแรก เพื่อค่อย ๆ แปลความต้องการให้กลายเป็นพื้นที่ที่มีจังหวะและเหตุผลของตัวเอง
              </p>

              <div className="cta-content mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <ActionButton href="mailto:hello@ruenstudio.co">ติดต่อทีมออกแบบ</ActionButton>
                <ActionButton href="#showcase" variant="secondary">
                  ดูผลงานก่อนหน้า
                </ActionButton>
              </div>
            </div>

            <div className="cta-content divide-y divide-white/[0.10] border-y border-white/[0.10]">
              {contactItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="group grid gap-3 py-6 sm:grid-cols-[0.28fr_0.72fr] sm:items-center"
                >
                  <span className="text-[0.68rem] tracking-[0.24em] text-white/[0.38]">
                    {item.label}
                  </span>
                  <span className="text-base font-light text-white/[0.70] transition-colors duration-500 group-hover:text-white">
                    {item.value}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
