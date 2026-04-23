import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Astra One | Cinematic Premium Launch Experience",
  description:
    "A cinematic high-end landing page crafted with Next.js, Tailwind CSS, GSAP, and ScrollTrigger."
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
