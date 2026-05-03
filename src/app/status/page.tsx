"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { RefreshCw, Wifi, WifiOff } from "lucide-react";
import StatusOverview from "@/components/status/StatusOverview";
import PlayerList from "@/components/status/PlayerList";
import ServerInfo from "@/components/status/ServerInfo";
import PerformanceChart from "@/components/status/PerformanceChart";
import DiscordWidget from "@/components/discord/DiscordWidget";
import type { ServerStatus } from "@/lib/minecraft-query";

export default function StatusPage() {
  const [status, setStatus] = useState<ServerStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const fetchStatus = () => {
    setLoading(true);
    fetch("/api/status")
      .then((r) => r.json())
      .then((d) => {
        setStatus(d);
        setLastUpdate(new Date());
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              服务器状态
              {status?.online ? (
                <Wifi size={24} className="text-[#4ade80]" />
              ) : (
                <WifiOff size={24} className="text-[#ef4444]" />
              )}
            </h1>
            <p className="text-[#64748b] text-sm">
              实时监控服务器运行状态
              {lastUpdate && (
                <span className="ml-2">
                  &middot; 最后更新:{" "}
                  {lastUpdate.toLocaleTimeString("zh-CN")}
                </span>
              )}
            </p>
          </div>
          <button
            onClick={fetchStatus}
            disabled={loading}
            className="mt-4 sm:mt-0 flex items-center gap-2 px-4 py-2 bg-[#111820] border border-[#1e2d3d] rounded-lg text-sm text-[#64748b] hover:text-white hover:border-[#2a3f52] transition-colors disabled:opacity-50"
          >
            <RefreshCw
              size={14}
              className={loading ? "animate-spin" : ""}
            />
            刷新
          </button>
        </motion.div>

        {/* Overview Cards */}
        <StatusOverview status={status} />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Charts & Players */}
          <div className="lg:col-span-2 space-y-6">
            <PerformanceChart />
            <PlayerList
              players={status?.players?.list || []}
            />
          </div>

          {/* Right Column - Info & Discord */}
          <div className="space-y-6">
            <ServerInfo status={status} />
            <DiscordWidget />
          </div>
        </div>
      </div>
    </div>
  );
}
