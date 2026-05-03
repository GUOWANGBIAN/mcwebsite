"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Activity, Users, Wifi, Clock } from "lucide-react";
import Link from "next/link";
import type { ServerStatus } from "@/lib/minecraft-query";

export default function ServerStatusCard() {
  const [status, setStatus] = useState<ServerStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatus = () => {
      fetch("/api/status")
        .then((r) => r.json())
        .then((d) => {
          setStatus(d);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    {
      label: "在线玩家",
      value: status?.online ? status.players.online : "--",
      max: status?.online ? `/ ${status.players.max}` : "",
      icon: Users,
      color: "#4ade80",
    },
    {
      label: "服务器状态",
      value: status?.online ? "在线" : loading ? "检测中" : "离线",
      icon: Activity,
      color: status?.online ? "#4ade80" : "#ef4444",
    },
    {
      label: "延迟",
      value: status?.online ? `${status.latency}ms` : "--",
      icon: Wifi,
      color: "#06b6d4",
    },
    {
      label: "版本",
      value: status?.online ? status.version : "--",
      icon: Clock,
      color: "#f59e0b",
    },
  ];

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href="/status" className="block">
                  <div className="bg-[#111820] border border-[#1e2d3d] rounded-xl p-5 hover:border-[#2a3f52] transition-all duration-300 card-glow">
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${stat.color}15` }}
                      >
                        <Icon size={16} style={{ color: stat.color }} />
                      </div>
                      <span className="text-[#64748b] text-sm">
                        {stat.label}
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-white">
                      {loading ? (
                        <div className="h-8 bg-[#1a2332] rounded animate-pulse" />
                      ) : (
                        <>
                          {stat.value}
                          {stat.max && (
                            <span className="text-sm font-normal text-[#64748b]">
                              {" "}
                              {stat.max}
                            </span>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
