"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Users } from "lucide-react";
import Image from "next/image";
import { getPlayerBody, getPlayerAvatar } from "@/lib/utils";

export default function PlayersPage() {
  const [search, setSearch] = useState("");
  const [onlinePlayers, setOnlinePlayers] = useState<
    Array<{ uuid: string; name: string }>
  >([]);
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/status")
      .then((r) => r.json())
      .then((d) => {
        if (d.online && d.players?.list) {
          setOnlinePlayers(d.players.list);
          if (d.players.list.length > 0) {
            setSelectedPlayer(d.players.list[0].uuid);
          }
        }
      })
      .catch(() => {});
  }, []);

  const filteredPlayers = onlinePlayers.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const selectedName = onlinePlayers.find(p => p.uuid === selectedPlayer)?.name || "";

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ease: "easeOut" }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Users size={28} className="text-[#d4a853]" />
            玩家中心
          </h1>
          <p className="text-[#8a8279]">
            查看在线玩家和皮肤展示
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 3D Skin Viewer */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, ease: "easeOut" }}
            className="lg:col-span-2"
          >
            <div className="glass rounded-xl overflow-hidden">
              <div className="px-5 py-3 border-b border-[#2a2520]/40 flex items-center justify-between">
                <span className="text-white font-semibold text-sm">皮肤预览</span>
                {selectedName && (
                  <span className="text-[#d4a853] text-sm font-mono">{selectedName}</span>
                )}
              </div>
              <div className="relative h-[480px] flex items-center justify-center bg-gradient-to-b from-[#1a1814] to-[#0f0e0b] overflow-hidden">
                {/* Grid background */}
                <div className="absolute inset-0 grid-bg opacity-20" />

                {selectedPlayer ? (
                  <div className="relative" style={{ perspective: "800px" }}>
                    <div
                      className="animate-spin-slow"
                      style={{
                        transformStyle: "preserve-3d",
                        animation: "spin-y 8s linear infinite",
                      }}
                    >
                      <img
                        src={getPlayerBody(selectedPlayer, 280)}
                        alt={selectedName}
                        className="h-[320px] w-auto drop-shadow-2xl"
                        style={{ imageRendering: "pixelated" }}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = getPlayerAvatar(selectedPlayer, 128);
                        }}
                      />
                    </div>
                    {/* Shadow */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-4 bg-[#d4a853]/10 rounded-full blur-xl" />
                  </div>
                ) : (
                  <div className="text-center">
                    <Users size={64} className="mx-auto mb-4 text-[#2a2520]" />
                    <p className="text-[#8a8279]">暂无在线玩家</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Player List */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, ease: "easeOut" }}
          >
            <div className="glass rounded-xl overflow-hidden">
              <div className="px-5 py-3 border-b border-[#2a2520]/40">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-white font-semibold text-sm">在线玩家</span>
                  <span className="text-[#8a8279] text-xs">{filteredPlayers.length} 人</span>
                </div>
                <div className="relative">
                  <Search
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8a8279]"
                  />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="搜索玩家..."
                    className="w-full pl-9 pr-3 py-2 bg-[#0f0e0b]/50 rounded-lg text-white text-sm placeholder-[#8a8279]/50 focus:border-[#d4a853]/30 focus:outline-none border border-transparent transition-colors"
                  />
                </div>
              </div>

              <div className="max-h-[400px] overflow-y-auto">
                {filteredPlayers.length === 0 ? (
                  <div className="p-8 text-center">
                    <Users size={32} className="mx-auto mb-3 text-[#2a2520]" />
                    <p className="text-[#8a8279] text-sm">暂无在线玩家</p>
                  </div>
                ) : (
                  <div className="p-2 space-y-1">
                    {filteredPlayers.map((player, i) => (
                      <motion.button
                        key={player.uuid}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.03, ease: "easeOut" }}
                        onClick={() => setSelectedPlayer(player.uuid)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 ${
                          selectedPlayer === player.uuid
                            ? "bg-[#d4a853]/10 border border-[#d4a853]/20"
                            : "hover:bg-[#23201a]/65 border border-transparent"
                        }`}
                      >
                        <img
                          src={getPlayerAvatar(player.uuid, 32)}
                          alt={player.name}
                          className="w-8 h-8 rounded"
                          loading="lazy"
                        />
                        <span className={`text-sm font-medium ${
                          selectedPlayer === player.uuid ? "text-[#d4a853]" : "text-[#f0ece4]/80"
                        }`}>
                          {player.name}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
