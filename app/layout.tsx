import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ruenstudio.co"),
  title: {
    default: "เรือนสถาปัตย์ | Architecture Studio",
    template: "%s | เรือนสถาปัตย์"
  },
  description:
    "เรือนสถาปัตย์คือสตูดิโอออกแบบสถาปัตยกรรมและพื้นที่ภายในที่ให้ความสำคัญกับแสง วัสดุ สัดส่วน และการอยู่อาศัยจริง",
  keywords: [
    "สถาปัตยกรรม",
    "ออกแบบบ้าน",
    "ออกแบบภายใน",
    "architecture studio",
    "interior design",
    "minimal architecture",
    "Bangkok architecture"
  ],
  authors: [{ name: "เรือนสถาปัตย์" }],
  creator: "เรือนสถาปัตย์",
  openGraph: {
    title: "เรือนสถาปัตย์ | Architecture Studio",
    description:
      "สตูดิโอออกแบบสถาปัตยกรรมและพื้นที่ภายในที่เริ่มจากแสง วัสดุ สัดส่วน และชีวิตจริงของผู้ใช้งาน",
    type: "website",
    locale: "th_TH",
    siteName: "เรือนสถาปัตย์"
  },
  twitter: {
    card: "summary_large_image",
    title: "เรือนสถาปัตย์ | Architecture Studio",
    description:
      "สตูดิโอออกแบบสถาปัตยกรรมและพื้นที่ภายในที่ให้ความสำคัญกับแสง วัสดุ และการอยู่อาศัยจริง"
  },
  robots: {
    index: true,
    follow: true
  }
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
