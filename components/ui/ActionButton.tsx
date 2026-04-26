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
    "border-white/10 bg-white/[0.06] text-white shadow-none",
  secondary:
    "border-white/[0.12] bg-transparent text-white/[0.72]"
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
      className={`group inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-medium tracking-[0.08em] transition-all duration-500 hover:-translate-y-0.5 hover:text-white ${variantStyles[variant]} ${className ?? ""}`}
    >
      <span>{children}</span>
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-60 transition-transform duration-500 group-hover:translate-x-1" />
    </Link>
  );
}
