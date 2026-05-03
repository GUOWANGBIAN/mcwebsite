import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SERVER_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: {
    default: `${SERVER_CONFIG.serverName} - Minecraft Java 版服务器`,
    template: `%s | ${SERVER_CONFIG.serverName}`,
  },
  description: SERVER_CONFIG.serverDescription,
  keywords: [
    "Minecraft",
    "服务器",
    "Java版",
    "多人游戏",
    SERVER_CONFIG.serverName,
  ],
  openGraph: {
    title: `${SERVER_CONFIG.serverName} - Minecraft Java 版服务器`,
    description: SERVER_CONFIG.serverDescription,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="dark h-full antialiased">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Noto+Sans+SC:wght@300;400;500;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#0a0e14] text-[#e8e6e3]">
        <Navbar />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
