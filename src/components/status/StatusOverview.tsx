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
      color: "#d4a853",
    },
    {
      label: "服务器状态",
      value: status?.online ? "在线" : "离线",
      icon: Activity,
      color: status?.online ? "#7db87b" : "#d96b5c",
    },
    {
      label: "网络延迟",
      value: status?.online ? `${status.latency}` : "--",
      suffix: status?.online ? "ms" : "",
      icon: Wifi,
      color: "#7db87b",
    },
    {
      label: "服务器版本",
      value: status?.online ? status.version : "--",
      icon: Clock,
      color: "#e8a94e",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {cards.map((card, i) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, ease: "easeOut" }}
            className="glass rounded-xl p-5"
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${card.color}15` }}
              >
                <Icon size={20} style={{ color: card.color }} />
              </div>
              <span className="text-[#8a8279] text-sm">{card.label}</span>
            </div>
            <div className="text-3xl font-bold text-white">
              {card.value}
              {card.suffix && (
                <span className="text-sm font-normal text-[#8a8279] ml-1">
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
