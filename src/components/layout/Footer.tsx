import Link from "next/link";
import { MessageCircle, Globe, AtSign, Video } from "lucide-react";
import { SERVER_CONFIG, NAV_LINKS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-[#0a0e14] border-t border-[#1e2d3d] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#4ade80] rounded flex items-center justify-center text-black font-bold text-lg mc-btn">
                M
              </div>
              <span className="text-xl font-bold text-white">
                {SERVER_CONFIG.serverName}
              </span>
            </div>
            <p className="text-[#64748b] text-sm leading-relaxed mb-4">
              {SERVER_CONFIG.serverDescription}
            </p>
            <div className="flex gap-3">
              <a
                href={SERVER_CONFIG.discordInvite}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-[#111820] border border-[#1e2d3d] rounded-lg flex items-center justify-center text-[#64748b] hover:text-[#5865f2] hover:border-[#5865f2]/30 transition-colors"
              >
                <MessageCircle size={16} />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-[#111820] border border-[#1e2d3d] rounded-lg flex items-center justify-center text-[#64748b] hover:text-white hover:border-white/30 transition-colors"
              >
                <Globe size={16} />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-[#111820] border border-[#1e2d3d] rounded-lg flex items-center justify-center text-[#64748b] hover:text-[#1da1f2] hover:border-[#1da1f2]/30 transition-colors"
              >
                <AtSign size={16} />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-[#111820] border border-[#1e2d3d] rounded-lg flex items-center justify-center text-[#64748b] hover:text-[#ff0000] hover:border-[#ff0000]/30 transition-colors"
              >
                <Video size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">快速链接</h3>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#64748b] text-sm hover:text-[#4ade80] transition-colors"
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
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.minecraft.net/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#64748b] text-sm hover:text-[#4ade80] transition-colors"
                >
                  Minecraft 官网
                </a>
              </li>
              <li>
                <a
                  href="https://papermc.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#64748b] text-sm hover:text-[#4ade80] transition-colors"
                >
                  PaperMC
                </a>
              </li>
              <li>
                <a
                  href="https://www.curseforge.com/minecraft"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#64748b] text-sm hover:text-[#4ade80] transition-colors"
                >
                  CurseForge
                </a>
              </li>
              <li>
                <Link
                  href="/docs"
                  className="text-[#64748b] text-sm hover:text-[#4ade80] transition-colors"
                >
                  服务器文档
                </Link>
              </li>
            </ul>
          </div>

          {/* Server Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">服务器信息</h3>
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-[#64748b]">服务器地址</span>
                <p className="text-[#4ade80] font-mono">
                  {SERVER_CONFIG.serverIP}
                </p>
              </div>
              <div>
                <span className="text-[#64748b]">游戏版本</span>
                <p className="text-white">{SERVER_CONFIG.serverVersion}</p>
              </div>
              <div>
                <span className="text-[#64748b]">成立时间</span>
                <p className="text-white">{SERVER_CONFIG.foundedDate}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-[#1e2d3d] flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[#64748b] text-xs">
            &copy; {new Date().getFullYear()} {SERVER_CONFIG.serverName}. Not affiliated with Mojang AB.
          </p>

          {/* 备案区域 - 已修复 JSX 语法错误 */}
          <div className="flex items-center gap-1.5 text-[#64748b] text-xs whitespace-nowrap">
            <a 
              href="https://beian.miit.gov.cn/" 
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#4ade80] transition-colors"
            >
              青ICP备2026000189号-1
            </a>
            {/* 分隔符必须用 JSX 元素包裹 */}
            <span>|</span>
            <a 
              href="https://beian.mps.gov.cn/" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <img 
                src="/beian.png" 
                alt="警徽" 
                className="h-5 w-auto object-contain"
              />
            </a>
            <a 
              href="https://beian.mps.gov.cn/#/query/webSearch?code=63012102000179" 
              rel="noopener noreferrer" 
              target="_blank"
              className="hover:text-[#4ade80] transition-colors"
            >
              青公网安备63012102000179号
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}