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

const timeline = [
  {
    date: "2024年1月",
    title: "服务器成立",
    description: "MyCraft 服务器正式上线，开始招募第一批玩家",
  },
  {
    date: "22024年3月",
    title: "玩家突破100",
    description: "社区快速发展，注册玩家超过100人",
  },
  {
    date: "2024年6月",
    title: "小游戏上线",
    description: "新增空岛战争、密室杀手等小游戏模式",
  },
  {
    date: "2024年9月",
    title: "升级至1.20",
    description: "服务器版本升级，支持最新游戏内容",
  },
  {
    date: "2024年12月",
    title: "社区壮大",
    description: "Discord 社区成员突破500人",
  },
];

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
          <div className="w-16 h-16 bg-[#4ade80]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Info size={32} className="text-[#4ade80]" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">关于我们</h1>
          <p className="text-[#64748b] max-w-xl mx-auto">
            了解 {SERVER_CONFIG.serverName} 的故事和团队
          </p>
        </motion.div>

        {/* Server Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#111820] border border-[#1e2d3d] rounded-xl p-8 mb-8"
        >
          <h2 className="text-xl font-bold text-white mb-4">服务器简介</h2>
          <p className="text-[#dcddde] leading-relaxed mb-4">
            {SERVER_CONFIG.serverName} 成立于 {SERVER_CONFIG.foundedDate}
            ，是一个专注于提供高质量 Minecraft 游戏体验的社区服务器。
            我们致力于打造一个友好、公平、有趣的游戏环境，让每位玩家都能找到属于自己的乐趣。
          </p>
          <p className="text-[#dcddde] leading-relaxed">
            服务器运行在高性能硬件上，采用 Paper 服务端，确保流畅的游戏体验。
            我们拥有专业的管理团队和活跃的社区，定期举办各种活动和比赛。
          </p>
        </motion.div>

        {/* Hardware Specs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#111820] border border-[#1e2d3d] rounded-xl p-8 mb-8"
        >
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Server size={20} className="text-[#06b6d4]" />
            服务器配置
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {specs.map((spec) => {
              const Icon = spec.icon;
              return (
                <div
                  key={spec.label}
                  className="flex items-center gap-4 p-4 bg-[#0d1117] rounded-lg"
                >
                  <div className="w-10 h-10 bg-[#06b6d4]/10 rounded-lg flex items-center justify-center">
                    <Icon size={20} className="text-[#06b6d4]" />
                  </div>
                  <div>
                    <p className="text-[#64748b] text-sm">{spec.label}</p>
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
          className="bg-[#111820] border border-[#1e2d3d] rounded-xl p-8 mb-8"
        >
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Users size={20} className="text-[#f59e0b]" />
            管理团队
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {SERVER_CONFIG.teamMembers.map((member) => (
              <div
                key={member.name}
                className="flex flex-col items-center p-4 bg-[#0d1117] rounded-lg"
              >
                <img
                  src={getPlayerAvatar(member.uuid, 64)}
                  alt={member.name}
                  className="w-16 h-16 rounded-lg mb-3"
                />
                <p className="text-white font-semibold">{member.name}</p>
                <span className="text-[#4ade80] text-sm">{member.role}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#111820] border border-[#1e2d3d] rounded-xl p-8"
        >
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Calendar size={20} className="text-[#4ade80]" />
            发展历程
          </h2>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 top-0 bottom-0 w-px bg-[#1e2d3d]" />

            <div className="space-y-6">
              {timeline.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative pl-10"
                >
                  {/* Dot */}
                  <div className="absolute left-2.5 top-1.5 w-3 h-3 bg-[#4ade80] rounded-full border-2 border-[#0a0e14]" />

                  <div>
                    <span className="text-[#4ade80] text-sm font-mono">
                      {item.date}
                    </span>
                    <h3 className="text-white font-semibold mt-1">
                      {item.title}
                    </h3>
                    <p className="text-[#64748b] text-sm mt-1">
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
          <p className="text-[#64748b] text-sm flex items-center justify-center gap-1">
            Made with <Heart size={14} className="text-[#ef4444]" /> by{" "}
            {SERVER_CONFIG.serverName} Team
          </p>
        </motion.div>
      </div>
    </div>
  );
}
