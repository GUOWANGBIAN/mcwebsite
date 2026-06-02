"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Copy, Check, Users, Clock, Gamepad2, Wifi } from "lucide-react";
import { copyToClipboard } from "@/lib/utils";
import { SERVER_CONFIG } from "@/lib/constants";

function getDaysSince(dateStr: string) {
  const founded = new Date(dateStr);
  const now = new Date();
  return Math.floor((now.getTime() - founded.getTime()) / (1000 * 60 * 60 * 24));
}

export default function HeroSection() {
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<{ online: boolean; players: { online: number; max: number }; latency: number } | null>(null);
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 600], [0, 100]);

  useEffect(() => {
    fetch("/api/status")
      .then((r) => r.json())
      .then(setStatus)
      .catch(() => {});
  }, []);

  const handleCopy = async () => {
    await copyToClipboard(SERVER_CONFIG.serverIP);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const daysRunning = getDaysSince(SERVER_CONFIG.foundedDate);

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
      {/* Background image with parallax */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 -top-20">
        <Image
          src="/hero-bg.jpg"
          alt="云栖物语服务器背景"
          fill
          className="object-cover scale-110"
          priority
          quality={75}
        />
      </motion.div>

      {/* Warm overlay */}
      <div className="absolute inset-0 bg-[#0f0e0b]/60" />
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0f0e0b]/20 to-[#0f0e0b]" />
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#0f0e0b] to-transparent" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Online badge */}
        {status?.online && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#d4a853]/8 border border-[#d4a853]/15 rounded-full mb-8"
          >
            <span className="w-2 h-2 bg-[#7db87b] rounded-full pulse-green" />
            <span className="text-[#7db87b] text-sm font-medium">
              {status.players.online} 名玩家在线
            </span>
          </motion.div>
        )}

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-5xl sm:text-7xl lg:text-8xl font-extrabold mb-6 tracking-tight"
        >
          <span className="text-white">云栖</span>
          <span className="text-[#d4a853] glow-amber">物语</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          className="text-xl sm:text-2xl text-[#8a8279] mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          {SERVER_CONFIG.serverDescription}
        </motion.p>

        {/* IP Copy Button */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
          className="mb-12"
        >
          <button
            onClick={handleCopy}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-[#1a1814]/80 border border-[#2a2520] hover:border-[#d4a853]/30 rounded-2xl transition-all duration-300 backdrop-blur-sm"
          >
            <span className="text-[#8a8279] text-sm">服务器地址</span>
            <span className="text-xl font-mono font-bold text-[#d4a853]">
              {SERVER_CONFIG.serverIP}
            </span>
            {copied ? (
              <Check size={18} className="text-[#7db87b]" />
            ) : (
              <Copy
                size={18}
                className="text-[#8a8279] group-hover:text-[#d4a853] transition-colors"
              />
            )}
          </button>
          {copied && (
            <motion.p
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[#7db87b] text-sm mt-3"
            >
              已复制到剪贴板
            </motion.p>
          )}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
          className="flex flex-wrap justify-center gap-4 sm:gap-6"
        >
          <div className="flex items-center gap-2 px-4 py-2.5 glass rounded-xl">
            <Users size={15} className="text-[#d4a853]" />
            <span className="text-sm text-[#8a8279]">
              最大 <span className="text-white font-semibold">{SERVER_CONFIG.maxPlayers}</span> 人
            </span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2.5 glass rounded-xl">
            <Gamepad2 size={15} className="text-[#7db87b]" />
            <span className="text-sm text-[#8a8279]">
              版本 <span className="text-white font-semibold">{SERVER_CONFIG.serverVersion}</span>
            </span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2.5 glass rounded-xl">
            <Clock size={15} className="text-[#e8a94e]" />
            <span className="text-sm text-[#8a8279]">
              已运行 <span className="text-white font-semibold">{daysRunning}</span> 天
            </span>
          </div>
          {status?.latency && (
            <div className="flex items-center gap-2 px-4 py-2.5 glass rounded-xl">
              <Wifi size={15} className="text-[#7db87b]" />
              <span className="text-sm text-[#8a8279]">
                延迟 <span className="text-white font-semibold">{status.latency}</span> ms
              </span>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
