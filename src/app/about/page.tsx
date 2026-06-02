"use client";

import { motion } from "framer-motion";
import {
  Info,
  Calendar,
  Server,
  Cpu,
  MemoryStick,
  HardDrive,
  Users,
  Heart,
} from "lucide-react";
import { SERVER_CONFIG } from "@/lib/constants";
import { getPlayerAvatar } from "@/lib/utils";
import timelineData from "@/data/timeline.json";

const specs = [
  { icon: Cpu, label: "CPU", value: "AMD Ryzen 9 5900X (12核)" },
  { icon: MemoryStick, label: "内存", value: "64GB DDR4" },
  { icon: HardDrive, label: "存储", value: "1TB NVMe SSD" },
  { icon: Server, label: "网络", value: "1Gbps 带宽" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 bg-[#d4a853]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Info size={32} className="text-[#d4a853]" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">关于我们</h1>
          <p className="text-[#8a8279] max-w-xl mx-auto">
            了解 {SERVER_CONFIG.serverName} 的故事和团队
          </p>
        </motion.div>

        {/* Server Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-8 mb-8"
        >
          <h2 className="text-xl font-bold text-white mb-4">服务器简介</h2>
          <p className="text-[#f0ece4]/80 leading-relaxed mb-4">
            {SERVER_CONFIG.serverName} 成立于 {SERVER_CONFIG.foundedDate}
            ，是一个专注于长期运营的纯净养老生存服务器。
            我们致力于打造一个温馨、友好、自由的游戏环境，让每位玩家都能找到属于自己的归属感。
          </p>
          <p className="text-[#f0ece4]/80 leading-relaxed">
            服务器运行在高性能硬件上，采用 Paper 服务端，确保流畅的游戏体验。
            我们拥有专业的管理团队和活跃的社区，定期举办各种活动。
          </p>
        </motion.div>

        {/* Hardware Specs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-8 mb-8"
        >
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Server size={20} className="text-[#d4a853]" />
            服务器配置
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {specs.map((spec) => {
              const Icon = spec.icon;
              return (
                <div
                  key={spec.label}
                  className="flex items-center gap-4 p-4 bg-[#0f0e0b]/50 rounded-xl"
                >
                  <div className="w-10 h-10 bg-[#d4a853]/10 rounded-lg flex items-center justify-center">
                    <Icon size={20} className="text-[#d4a853]" />
                  </div>
                  <div>
                    <p className="text-[#8a8279] text-sm">{spec.label}</p>
                    <p className="text-white font-medium">{spec.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Team */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-8 mb-8"
        >
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Users size={20} className="text-[#e8a94e]" />
            管理团队
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {SERVER_CONFIG.teamMembers.map((member) => (
              <div
                key={member.name}
                className="flex flex-col items-center p-4 bg-[#0f0e0b]/50 rounded-xl"
              >
                <img
                  src={getPlayerAvatar(member.uuid, 64)}
                  alt={member.name}
                  className="w-16 h-16 rounded-lg mb-3"
                />
                <p className="text-white font-semibold">{member.name}</p>
                <span className="text-[#d4a853] text-sm">{member.role}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-8"
        >
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Calendar size={20} className="text-[#d4a853]" />
            发展历程
          </h2>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-[#2a2520]" />
            <div className="space-y-6">
              {timelineData.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="relative pl-10"
                >
                  <div className="absolute left-2.5 top-1.5 w-3 h-3 bg-[#d4a853] rounded-full border-2 border-[#0f0e0b]" />
                  <div>
                    <span className="text-[#d4a853] text-sm font-mono">
                      {item.date}
                    </span>
                    <h3 className="text-white font-semibold mt-1">
                      {item.title}
                    </h3>
                    <p className="text-[#8a8279] text-sm mt-1">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <p className="text-[#8a8279] text-sm flex items-center justify-center gap-1">
            Made with <Heart size={14} className="text-[#d96b5c]" /> by{" "}
            {SERVER_CONFIG.serverName} Team
          </p>
        </motion.div>
      </div>
    </div>
  );
}
