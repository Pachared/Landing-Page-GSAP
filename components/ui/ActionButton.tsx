import type { ReactNode } from "react";
import Link from "next/link";

type ActionButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
};

const variantStyles = {
  primary: "text-white",
  secondary: "text-white/[0.62]"
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
      className={`group inline-flex items-center gap-3 border-b border-current/25 pb-1 text-sm font-light tracking-[0.12em] transition-all duration-700 hover:border-current/70 hover:text-white ${variantStyles[variant]} ${className ?? ""}`}
    >
      <span>{children}</span>
      <span className="translate-y-px text-base leading-none opacity-55 transition-transform duration-700 group-hover:translate-x-1 group-hover:opacity-90">
        →
      </span>
    </Link>
  );
}
