import Link from "next/link";

const navItems = [
  { label: "แนวคิด", href: "#intro" },
  { label: "บริการ", href: "#features" },
  { label: "ผลงาน", href: "#showcase" },
  { label: "กระบวนการ", href: "#story" },
  { label: "ติดต่อ", href: "#cta" }
];

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-5">
      <div className="section-shell">
        <div className="flex items-center justify-between border-b border-white/[0.08] bg-background/45 px-0 pb-5 backdrop-blur-md">
          <Link href="#" className="flex items-baseline gap-3">
            <span className="font-display text-sm font-light tracking-[0.18em] text-white">
              เรือนสถาปัตย์
            </span>
            <span className="hidden text-[0.62rem] tracking-[0.22em] text-white/[0.38] sm:inline">
              architecture studio
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-xs font-light tracking-[0.18em] text-white/[0.48] transition-colors duration-500 hover:text-white/86"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Link
            href="#cta"
            className="text-xs font-light tracking-[0.18em] text-white/[0.58] transition-colors duration-500 hover:text-white"
          >
            เริ่มโปรเจกต์
          </Link>
        </div>
      </div>
    </header>
  );
}
