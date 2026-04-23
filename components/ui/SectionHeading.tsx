import type { ReactNode } from "react";

type SectionHeadingProps = {
  kicker: string;
  title: ReactNode;
  description: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  kicker,
  title,
  description,
  align = "left",
  className
}: SectionHeadingProps) {
  const alignment = align === "center" ? "items-center text-center" : "items-start";

  return (
    <div className={`flex flex-col gap-5 ${alignment} ${className ?? ""}`}>
      <span className="section-kicker">{kicker}</span>
      <div className="max-w-3xl space-y-4">
        <h2 className="font-display text-4xl font-semibold leading-[0.92] tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
          {title}
        </h2>
        <p className="max-w-2xl text-base leading-8 text-muted sm:text-lg">{description}</p>
      </div>
    </div>
  );
}
