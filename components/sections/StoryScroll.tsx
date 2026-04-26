"use client";

import { useRef } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  createGSAPMatchMedia,
  gsap,
  gsapMediaQueries,
  useIsomorphicLayoutEffect
} from "@/lib/gsap";

const steps = [
  {
    label: "รับฟัง",
    title: "เริ่มจากชีวิตจริงของเจ้าของพื้นที่",
    copy: "เราพูดคุยเพื่อเข้าใจจังหวะการใช้ชีวิต ความต้องการที่มองเห็น และความรู้สึกที่อยากให้เกิดขึ้นในพื้นที่"
  },
  {
    label: "อ่านบริบท",
    title: "ให้ที่ดิน แสง และลมเป็นจุดเริ่มต้น",
    copy: "ทีมออกแบบสำรวจข้อจำกัด ทิศทางแดดลม มุมมอง ความเป็นส่วนตัว และความสัมพันธ์กับพื้นที่รอบข้าง"
  },
  {
    label: "วางแนวคิด",
    title: "แปลความต้องการให้เป็นสัดส่วนและบรรยากาศ",
    copy: "แนวคิดถูกพัฒนาเป็นแปลน มวลอาคาร ช่องเปิด และภาษาวัสดุที่ชัดเจนก่อนลงรายละเอียด"
  },
  {
    label: "ส่งต่อสู่พื้นที่จริง",
    title: "เก็บรายละเอียดให้ภาพรวมยังคงสงบ",
    copy: "เราจัดระเบียบแบบ รายละเอียด และ mood ของงานให้พร้อมสำหรับขั้นตอนถัดไป โดยรักษาแก่นของแนวคิดเดิมไว้"
  }
];

const storyGradients = [
  "radial-gradient(circle at 30% 25%, rgba(226,206,194,0.14), transparent 38%), linear-gradient(180deg, rgba(12,10,9,0.96), rgba(6,6,5,0.98))",
  "radial-gradient(circle at 62% 20%, rgba(182,165,147,0.13), transparent 34%), linear-gradient(180deg, rgba(12,10,9,0.96), rgba(6,6,5,0.98))",
  "radial-gradient(circle at 22% 18%, rgba(137,126,119,0.13), transparent 32%), linear-gradient(180deg, rgba(12,10,9,0.96), rgba(6,6,5,0.98))",
  "radial-gradient(circle at 50% 20%, rgba(226,206,194,0.10), transparent 28%), linear-gradient(180deg, rgba(12,10,9,0.96), rgba(6,6,5,0.98))"
];

export function StoryScroll() {
  const root = useRef<HTMLElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (!root.current || !wrapper.current || !stage.current) return;

    const mm = createGSAPMatchMedia();
    const ctx = gsap.context(() => {
      mm.add(`${gsapMediaQueries.motionSafe} and ${gsapMediaQueries.desktop}`, () => {
        const storySteps = gsap.utils.toArray<HTMLElement>(".story-step");
        const storyLayers = gsap.utils.toArray<HTMLElement>(".story-layer");

        gsap.set(storySteps, { opacity: 0.22, y: 18 });
        gsap.set(storySteps[0], { opacity: 1, y: 0 });
        gsap.set(storyLayers, { opacity: 0, y: 28 });
        gsap.set(storyLayers[0], { opacity: 1, y: 0 });
        gsap.set(".story-progress", { scaleY: 0.16, transformOrigin: "top center" });

        const timeline = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: {
            trigger: wrapper.current,
            start: "top top+=88",
            end: "+=2600",
            scrub: 1.2,
            pin: stage.current,
            anticipatePin: 1,
            invalidateOnRefresh: true
          }
        });

        steps.forEach((_, index) => {
          const previousIndex = index === 0 ? 0 : index - 1;
          const label = `step-${index}`;

          timeline.to(".story-stage-bg", { background: storyGradients[index], duration: 0.7 }, label);
          timeline.to(".story-progress", { scaleY: (index + 1) / steps.length, duration: 0.65 }, label);
          timeline.to(`.story-step-${previousIndex}`, { opacity: index === 0 ? 1 : 0.22, y: index === 0 ? 0 : -14, duration: 0.55 }, label);
          timeline.to(`.story-step-${index}`, { opacity: 1, y: 0, duration: 0.65 }, label);
          timeline.to(`.story-layer-${previousIndex}`, { opacity: index === 0 ? 1 : 0, y: index === 0 ? 0 : -22, duration: 0.58 }, label);
          timeline.to(`.story-layer-${index}`, { opacity: 1, y: 0, duration: 0.72 }, label);
        });
      });

      mm.add(`${gsapMediaQueries.motionSafe} and ${gsapMediaQueries.mobile}`, () => {
        gsap.from(".story-mobile-card", {
          y: 34,
          opacity: 0,
          duration: 0.95,
          stagger: 0.14,
          ease: "power2.out",
          scrollTrigger: { trigger: root.current, start: "top 72%" }
        });
      });

      mm.add(gsapMediaQueries.reduceMotion, () => {
        gsap.set(".story-step, .story-layer, .story-mobile-card, .story-progress", {
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
    <section id="story" ref={root} className="section-space">
      <div className="section-shell">
        <SectionHeading
          kicker="กระบวนการ"
          title={
            <>
              จากบทสนทนาแรก
              <br />
              <span className="text-gradient">สู่พื้นที่ที่มีเหตุผลของตัวเอง</span>
            </>
          }
          description="กระบวนการของเราเรียบง่ายแต่ละเอียด ทุกขั้นถูกออกแบบมาเพื่อให้เจ้าของพื้นที่เห็นทิศทางชัดเจน และให้ทีมออกแบบรักษาแก่นของงานได้ตลอดทาง"
        />

        <div ref={wrapper} className="mt-16 hidden lg:block">
          <div ref={stage} className="story-stage-bg relative overflow-hidden border-y border-white/[0.10]">
            <div className="noise-overlay" />
            <div className="grid min-h-[76vh] grid-cols-[0.86fr_1.14fr]">
              <div className="relative flex h-full flex-col justify-between border-r border-white/[0.10] py-12 pr-12">
                <div className="absolute left-0 top-12 bottom-12 w-px bg-white/[0.10]">
                  <span className="story-progress absolute inset-x-0 top-0 h-full origin-top bg-accent" />
                </div>

                <div className="space-y-11 pl-10">
                  {steps.map((step, index) => (
                    <article key={step.label} className={`story-step story-step-${index}`}>
                      <p className="text-[0.66rem] tracking-[0.26em] text-white/[0.40]">0{index + 1} / {step.label}</p>
                      <h3 className="mt-5 font-display text-3xl font-light leading-tight tracking-[-0.05em] text-white">{step.title}</h3>
                      <p className="mt-5 max-w-xl text-base font-light leading-8 text-white/56">{step.copy}</p>
                    </article>
                  ))}
                </div>

                <div className="pl-10 text-sm font-light leading-7 text-white/[0.38]">
                  เราใช้ motion เพื่อให้ผู้ชมค่อย ๆ เข้าใจลำดับของงานออกแบบ ไม่เร่ง ไม่ซับซ้อน และปล่อยให้รายละเอียดปรากฏตามจังหวะของการอ่าน
                </div>
              </div>

              <div className="relative flex items-center justify-center py-12 pl-12">
                <div className="relative h-[31rem] w-full max-w-[34rem]">
                  {steps.map((step, index) => (
                    <div key={step.label} className={`story-layer story-layer-${index} absolute inset-0`}>
                      <div className="relative flex h-full flex-col justify-between border-y border-white/[0.10] py-9">
                        <div className="flex items-center justify-between text-[0.66rem] tracking-[0.24em] text-white/[0.38]">
                          <span>PROCESS 0{index + 1}</span>
                          <span>เรือนสถาปัตย์</span>
                        </div>

                        <div>
                          <p className="text-[0.68rem] tracking-[0.22em] text-white/38">{step.label}</p>
                          <p className="mt-7 font-display text-5xl font-light leading-[1.08] tracking-[-0.06em] text-white">
                            {step.title}
                          </p>
                          <p className="mt-7 max-w-lg text-base font-light leading-9 text-white/[0.58]">{step.copy}</p>
                        </div>

                        <div className="grid gap-5 sm:grid-cols-3">
                          {["บริบท", "แสง", "การใช้งาน"].map((item, cardIndex) => (
                            <div key={`${step.label}-${item}`} className="border-t border-white/[0.10] pt-5">
                              <p className="text-[0.62rem] tracking-[0.22em] text-white/[0.34]">NOTE 0{cardIndex + 1}</p>
                              <p className="mt-5 text-base font-light text-white/68">{item}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:hidden">
          {steps.map((step, index) => (
            <article key={step.label} className="story-mobile-card border-y border-white/[0.10] py-7">
              <p className="text-[0.68rem] tracking-[0.22em] text-white/[0.42]">ขั้นตอน 0{index + 1}</p>
              <h3 className="mt-5 font-display text-3xl font-light tracking-[-0.05em] text-white">{step.title}</h3>
              <p className="mt-5 text-base font-light leading-8 text-white/[0.58]">{step.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
