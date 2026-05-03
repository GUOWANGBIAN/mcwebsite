"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Users, Trophy, Clock, Sword, Pickaxe } from "lucide-react";
import PlayerCard from "@/components/players/PlayerCard";
import Leaderboard from "@/components/players/Leaderboard";

// Demo data for the leaderboard
const demoLeaderboard = {
  playtime: [
    { rank: 1, uuid: "demo-uuid-1", name: "Steve", value: 1250, label: "小时" },
    { rank: 2, uuid: "demo-uuid-2", name: "Alex", value: 980, label: "小时" },
    { rank: 3, uuid: "demo-uuid-3", name: "Notch", value: 756, label: "小时" },
    { rank: 4, uuid: "demo-uuid-4", name: "Herobrine", value: 623, label: "小时" },
    { rank: 5, uuid: "demo-uuid-5", name: "Dream", value: 512, label: "小时" },
  ],
  kills: [
    { rank: 1, uuid: "demo-uuid-6", name: "PVP_Master", value: 3420, label: "击杀" },
    { rank: 2, uuid: "demo-uuid-7", name: "Warrior", value: 2890, label: "击杀" },
    { rank: 3, uuid: "demo-uuid-8", name: "Fighter", value: 2156, label: "击杀" },
    { rank: 4, uuid: "demo-uuid-9", name: "Knight", value: 1890, label: "击杀" },
    { rank: 5, uuid: "demo-uuid-10", name: "Swordsman", value: 1567, label: "击杀" },
  ],
  blocks: [
    { rank: 1, uuid: "demo-uuid-11", name: "Builder_Pro", value: 125000, label: "方块" },
    { rank: 2, uuid: "demo-uuid-12", name: "Architect", value: 98000, label: "方块" },
    { rank: 3, uuid: "demo-uuid-13", name: "Designer", value: 76500, label: "方块" },
    { rank: 4, uuid: "demo-uuid-14", name: "Craftsman", value: 65400, label: "方块" },
    { rank: 5, uuid: "demo-uuid-15", name: "Miner", value: 54300, label: "方块" },
  ],
};

export default function PlayersPage() {
  const [search, setSearch] = useState("");
  const [onlinePlayers, setOnlinePlayers] = useState<
    Array<{ uuid: string; name: string }>
  >([]);
  const [activeTab, setActiveTab] = useState<"playtime" | "kills" | "blocks">(
    "playtime"
  );

  useEffect(() => {
    fetch("/api/status")
      .then((r) => r.json())
      .then((d) => {
        if (d.online && d.players?.list) {
          setOnlinePlayers(d.players.list);
        }
      })
      .catch(() => {});
  }, []);

  const tabs = [
    { id: "playtime" as const, label: "游戏时长", icon: Clock },
    { id: "kills" as const, label: "击杀数", icon: Sword },
    { id: "blocks" as const, label: "方块放置", icon: Pickaxe },
  ];

  const filteredPlayers = onlinePlayers.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Users size={28} className="text-[#06b6d4]" />
            玩家中心
          </h1>
          <p className="text-[#64748b]">
            查看在线玩家和排行榜数据
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="relative max-w-md">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748b]"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="搜索玩家..."
              className="w-full pl-11 pr-4 py-3 bg-[#111820] border border-[#1e2d3d] rounded-xl text-white text-sm placeholder-[#475569] focus:border-[#4ade80]/50 focus:outline-none transition-colors"
            />
          </div>
        </motion.div>

        {/* Online Players */}
        {onlinePlayers.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-10"
          >
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#4ade80] rounded-full pulse-green" />
              当前在线 ({filteredPlayers.length})
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {filteredPlayers.map((player, i) => (
                <PlayerCard
                  key={player.uuid}
                  uuid={player.uuid}
                  name={player.name}
                  index={i}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Leaderboards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Trophy size={20} className="text-[#f59e0b]" />
            排行榜
          </h2>

          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? "bg-[#4ade80]/10 text-[#4ade80] border border-[#4ade80]/20"
                      : "bg-[#111820] text-[#64748b] border border-[#1e2d3d] hover:text-white"
                  }`}
                >
                  <Icon size={14} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          <Leaderboard
            title={
              tabs.find((t) => t.id === activeTab)?.label || "排行榜"
            }
            entries={demoLeaderboard[activeTab]}
            icon={tabs.find((t) => t.id === activeTab)?.icon || Trophy}
          />
        </motion.div>
      </div>
    </div>
  );
}
