"use client";

import Link from "next/link";
import { GitCommit, Clock, MapPin, Gamepad2 } from "lucide-react";
import { SERVER_CONFIG, NAV_LINKS } from "@/lib/constants";
import changelog from "@/data/changelog.json";

const GIT_HASH = process.env.NEXT_PUBLIC_GIT_HASH || "dev";

function getDaysSince(dateStr: string) {
  const founded = new Date(dateStr);
  const now = new Date();
  return Math.floor((now.getTime() - founded.getTime()) / (1000 * 60 * 60 * 24));
}

export default function Footer() {
  const daysRunning = getDaysSince(SERVER_CONFIG.foundedDate);
  const recentChanges = changelog.slice(0, 3);

  return (
    <footer className="border-t border-[#2a2520]/60 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand & Uptime */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 bg-[#d4a853] rounded-lg flex items-center justify-center text-black font-bold text-sm">
                云
              </div>
              <span className="text-lg font-bold text-white">
                {SERVER_CONFIG.serverName}
              </span>
            </div>
            <p className="text-[#8a8279] text-sm leading-relaxed mb-5">
              {SERVER_CONFIG.serverDescription}
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2.5 glass rounded-xl">
              <Clock size={14} className="text-[#d4a853]" />
              <span className="text-sm text-[#8a8279]">
                已稳定运行{" "}
                <span className="text-white font-semibold">{daysRunning}</span>{" "}
                天
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">快速链接</h3>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#8a8279] text-sm hover:text-[#d4a853] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">资源</h3>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="https://www.minecraft.net/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#8a8279] text-sm hover:text-[#d4a853] transition-colors"
                >
                  Minecraft 官网
                </a>
              </li>
              <li>
                <a
                  href="https://papermc.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#8a8279] text-sm hover:text-[#d4a853] transition-colors"
                >
                  PaperMC
                </a>
              </li>
              <li>
                <a
                  href="https://www.curseforge.com/minecraft"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#8a8279] text-sm hover:text-[#d4a853] transition-colors"
                >
                  CurseForge
                </a>
              </li>
              <li>
                <Link
                  href="/docs"
                  className="text-[#8a8279] text-sm hover:text-[#d4a853] transition-colors"
                >
                  服务器文档
                </Link>
              </li>
            </ul>
          </div>

          {/* Server Info & Changelog */}
          <div>
            <h3 className="text-white font-semibold mb-4">服务器信息</h3>
            <div className="space-y-3 text-sm mb-6">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-[#d4a853]" />
                <span className="text-[#8a8279] font-mono">
                  {SERVER_CONFIG.serverIP}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Gamepad2 size={14} className="text-[#7db87b]" />
                <span className="text-[#8a8279]">
                  {SERVER_CONFIG.serverVersion} · 最多 {SERVER_CONFIG.maxPlayers} 人
                </span>
              </div>
            </div>

            <h3 className="text-white font-semibold mb-3 text-sm">最近更新</h3>
            <ul className="space-y-2">
              {recentChanges.map((c) => (
                <li key={c.version} className="text-xs">
                  <span className="text-[#d4a853] font-mono">v{c.version}</span>
                  <span className="text-[#8a8279]/50 ml-2">{c.date}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-[#2a2520]/40 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <p className="text-[#8a8279]/60 text-xs">
              &copy; 2026 {SERVER_CONFIG.serverName}. 与 Mojang AB 无关联。
            </p>
            <a
              href={`https://github.com/GUOWANGBIAN/mcwebsite/commit/${GIT_HASH}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2 py-0.5 glass rounded text-[#8a8279]/50 hover:text-[#d4a853] transition-colors text-xs font-mono"
              title="查看当前部署的 commit"
            >
              <GitCommit size={11} />
              {GIT_HASH}
            </a>
          </div>

          {/* 备案区域 */}
          <div className="flex items-center gap-1.5 text-[#8a8279]/60 text-xs whitespace-nowrap">
            <a
              href="https://beian.miit.gov.cn/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#d4a853] transition-colors"
            >
              青ICP备2026000189号-1
            </a>
            <span>|</span>
            <a
              href="https://beian.mps.gov.cn/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="./beian.png"
                alt="警徽"
                className="h-5 w-auto object-contain opacity-60"
              />
            </a>
            <a
              href="https://beian.mps.gov.cn/#/query/webSearch?code=63012102000179"
              rel="noopener noreferrer"
              target="_blank"
              className="hover:text-[#d4a853] transition-colors"
            >
              青公网安备63012102000179号
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
