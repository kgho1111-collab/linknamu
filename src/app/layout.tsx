import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "링크나무 - 나의 모든 링크를 한 곳에",
  description: "여러 SNS·블로그·포트폴리오 링크를 하나의 프로필 페이지로 모아 공유하세요.",
};

// Pretendard 가변 폰트 (dynamic subset: 페이지에 쓰인 글자 범위의 조각만 내려받아 한글 폰트 용량 부담을 줄임)
const PRETENDARD_CSS =
  "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${geistMono.variable} h-full antialiased`}>
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <link rel="stylesheet" href={PRETENDARD_CSS} precedence="default" />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
