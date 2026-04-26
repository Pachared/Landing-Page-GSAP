import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "เรือนสถาปัตย์ | สตูดิโอออกแบบสถาปัตยกรรมและพื้นที่อยู่อาศัย",
  description:
    "เว็บไซต์สตูดิโอสถาปัตยกรรมภาษาไทย สไตล์มินิมอลพรีเมียม สร้างด้วย Next.js, Tailwind CSS, GSAP และ ScrollTrigger."
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}
