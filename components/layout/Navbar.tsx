import Link from "next/link";
import { ActionButton } from "@/components/ui/ActionButton";

const navItems = [
  { label: "Philosophy", href: "#intro" },
  { label: "Highlights", href: "#features" },
  { label: "Story", href: "#story" },
  { label: "Launch", href: "#cta" }
];

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <div className="section-shell">
        <div className="glass-panel flex items-center justify-between rounded-full px-4 py-3 sm:px-5">
          <Link href="#" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.04] text-sm font-semibold tracking-[0.2em] text-white">
              A1
            </span>
            <div className="leading-none">
              <p className="font-display text-sm font-semibold tracking-[0.18em] text-white">
                ASTRA ONE
              </p>
              <p className="mt-1 text-[0.65rem] uppercase tracking-[0.28em] text-white/[0.44]">
                premium intelligence
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-xs font-medium uppercase tracking-[0.22em] text-white/[0.56] transition-colors duration-300 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden sm:block">
            <ActionButton href="#cta" variant="secondary" className="px-4 py-2 text-xs">
              Private Preview
            </ActionButton>
          </div>
        </div>
      </div>
    </header>
  );
}
