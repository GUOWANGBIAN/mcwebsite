import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SERVER_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: {
    default: `${SERVER_CONFIG.serverName} - ${SERVER_CONFIG.serverDescription}`,
    template: `%s | ${SERVER_CONFIG.serverName}`,
  },
  description: SERVER_CONFIG.serverDescription,
  keywords: [
    "Minecraft",
    "服务器",
    "Java版",
    "纯净生存",
    "养老服",
    "长期运营",
    SERVER_CONFIG.serverName,
  ],
  icons: {
    icon: [
      { url: "/Java_Edition_icon_2.png", type: "image/png" },
    ],
    shortcut: "/Java_Edition_icon_2.png",
  },
  openGraph: {
    title: `${SERVER_CONFIG.serverName} - ${SERVER_CONFIG.serverDescription}`,
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
      <body className="min-h-full flex flex-col bg-[#0f0e0b] text-[#f0ece4]">
        <Navbar />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
