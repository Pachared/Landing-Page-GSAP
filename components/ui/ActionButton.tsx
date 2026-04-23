import type { ReactNode } from "react";
import Link from "next/link";

type ActionButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
};

const variantStyles = {
  primary:
    "border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.16),rgba(152,181,255,0.18))] text-white shadow-[0_20px_80px_rgba(98,128,255,0.24)]",
  secondary:
    "border-white/[0.14] bg-white/[0.03] text-white/[0.88] backdrop-blur-xl"
};

export function ActionButton({
  href,
  children,
  variant = "primary",
  className
}: ActionButtonProps) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-3 rounded-full border px-5 py-3 text-sm font-semibold tracking-[0.12em] uppercase transition-all duration-500 hover:-translate-y-0.5 hover:border-white/20 hover:text-white ${variantStyles[variant]} ${className ?? ""}`}
    >
      <span>{children}</span>
      <span className="h-2 w-2 rounded-full bg-current opacity-80 transition-transform duration-500 group-hover:translate-x-1" />
    </Link>
  );
}
