"use client";

import { motion } from "framer-motion";
import { Users, Activity, Wifi, Clock } from "lucide-react";

interface Props {
  status: {
    online: boolean;
    players: { online: number; max: number };
    version: string;
    latency: number;
  } | null;
}

export default function StatusOverview({ status }: Props) {
  const cards = [
    {
      label: "在线玩家",
      value: status?.online ? status.players.online : 0,
      suffix: status?.online ? `/ ${status.players.max}` : "",
      icon: Users,
      color: "#4ade80",
      bgColor: "#4ade8015",
    },
    {
      label: "服务器状态",
      value: status?.online ? "在线" : "离线",
      icon: Activity,
      color: status?.online ? "#4ade80" : "#ef4444",
      bgColor: status?.online ? "#4ade8015" : "#ef444415",
    },
    {
      label: "网络延迟",
      value: status?.online ? `${status.latency}` : "--",
      suffix: status?.online ? "ms" : "",
      icon: Wifi,
      color: "#06b6d4",
      bgColor: "#06b6d415",
    },
    {
      label: "服务器版本",
      value: status?.online ? status.version : "--",
      icon: Clock,
      color: "#f59e0b",
      bgColor: "#f59e0b15",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {cards.map((card, i) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-[#111820] border border-[#1e2d3d] rounded-xl p-5"
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: card.bgColor }}
              >
                <Icon size={20} style={{ color: card.color }} />
              </div>
              <span className="text-[#64748b] text-sm">{card.label}</span>
            </div>
            <div className="text-3xl font-bold text-white">
              {card.value}
              {card.suffix && (
                <span className="text-sm font-normal text-[#64748b] ml-1">
                  {card.suffix}
                </span>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
