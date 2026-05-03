"use client";

import { motion } from "framer-motion";
import { ExternalLink, Users, MessageSquare } from "lucide-react";
import { SERVER_CONFIG } from "@/lib/constants";

export default function DiscordBanner() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#5865f2] to-[#4752c4] p-8 sm:p-12"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-6">
              <MessageSquare size={16} className="text-white" />
              <span className="text-white/90 text-sm font-medium">
                加入我们的 Discord 社区
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              与玩家一起交流
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
              加入 Discord 社区，获取最新公告、参与讨论、组队游戏，还能第一时间了解服务器更新
            </p>

            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <div className="flex items-center gap-2 text-white/80">
                <Users size={18} />
                <span className="text-sm">活跃社区</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <MessageSquare size={18} />
                <span className="text-sm">实时聊天</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <ExternalLink size={18} />
                <span className="text-sm">独家内容</span>
              </div>
            </div>

            <a
              href={SERVER_CONFIG.discordInvite}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#5865f2] rounded-xl font-bold text-lg hover:bg-white/90 transition-colors mc-btn"
            >
              <ExternalLink size={20} />
              加入 Discord
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
