"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Copy, Check, Users, Gamepad2 } from "lucide-react";
import { copyToClipboard } from "@/lib/utils";
import { SERVER_CONFIG } from "@/lib/constants";

export default function HeroSection() {
  const [copied, setCopied] = useState(false);
  const [playerCount, setPlayerCount] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/status")
      .then((r) => r.json())
      .then((d) => {
        if (d.online) setPlayerCount(d.players?.online);
      })
      .catch(() => {});
  }, []);

  const handleCopy = async () => {
    await copyToClipboard(SERVER_CONFIG.serverIP);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 grid-bg" />
      <div className="particles" />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0e14]" />
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#0a0e14] to-transparent" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Online badge */}
        {playerCount !== null && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#4ade80]/10 border border-[#4ade80]/20 rounded-full mb-6"
          >
            <span className="w-2 h-2 bg-[#4ade80] rounded-full pulse-green" />
            <span className="text-[#4ade80] text-sm font-medium">
              {playerCount} 名玩家在线
            </span>
          </motion.div>
        )}

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl sm:text-7xl lg:text-8xl font-extrabold mb-6 tracking-tight"
        >
          <span className="text-white">My</span>
          <span className="text-[#4ade80] glow-green">Craft</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-xl sm:text-2xl text-[#64748b] mb-8 max-w-2xl mx-auto leading-relaxed"
        >
          {SERVER_CONFIG.serverDescription}
        </motion.p>

        {/* IP Copy Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <button
            onClick={handleCopy}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-[#111820] border-2 border-[#1e2d3d] hover:border-[#4ade80]/50 rounded-xl transition-all duration-300 mc-btn"
          >
            <span className="text-[#64748b] text-sm">服务器地址</span>
            <span className="text-xl font-mono font-bold text-[#4ade80]">
              {SERVER_CONFIG.serverIP}
            </span>
            {copied ? (
              <Check size={20} className="text-[#4ade80]" />
            ) : (
              <Copy
                size={20}
                className="text-[#64748b] group-hover:text-[#4ade80] transition-colors"
              />
            )}
          </button>
          {copied && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[#4ade80] text-sm mt-2"
            >
              已复制到剪贴板！
            </motion.p>
          )}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-6"
        >
          <div className="flex items-center gap-2 px-4 py-2 bg-[#111820]/50 rounded-lg border border-[#1e2d3d]">
            <Users size={16} className="text-[#06b6d4]" />
            <span className="text-sm text-[#64748b]">
              最大 <span className="text-white font-semibold">{SERVER_CONFIG.maxPlayers}</span> 人
            </span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-[#111820]/50 rounded-lg border border-[#1e2d3d]">
            <Gamepad2 size={16} className="text-[#f59e0b]" />
            <span className="text-sm text-[#64748b]">
              版本 <span className="text-white font-semibold">{SERVER_CONFIG.serverVersion}</span>
            </span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-[#111820]/50 rounded-lg border border-[#1e2d3d]">
            <span className="w-2 h-2 bg-[#4ade80] rounded-full" />
            <span className="text-sm text-[#64748b]">Paper/Spigot 服务端</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
