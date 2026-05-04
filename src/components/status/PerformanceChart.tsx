"use client";

import { useState, useEffect } from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { BarChart3 } from "lucide-react";

interface DataPoint {
  time: string;
  players: number;
  latency: number;
}

export default function PerformanceChart() {
  const [data, setData] = useState<DataPoint[]>([]);

  useEffect(() => {
    const initial: DataPoint[] = [];
    const now = new Date();
    for (let i = 23; i >= 0; i--) {
      const d = new Date(now.getTime() - i * 5 * 60 * 1000);
      initial.push({
        time: d.toLocaleTimeString("zh-CN", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        players: 0,
        latency: 0,
      });
    }
    setData(initial);

    const interval = setInterval(() => {
      fetch("/api/status")
        .then((r) => r.json())
        .then((status) => {
          setData((prev) => {
            const next = [
              ...prev.slice(1),
              {
                time: new Date().toLocaleTimeString("zh-CN", {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
                players: status.online ? status.players.online : 0,
                latency: status.online ? status.latency : 0,
              },
            ];
            return next;
          });
        })
        .catch(() => {});
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const CustomTooltip = ({
    active,
    payload,
    label,
  }: {
    active?: boolean;
    payload?: Array<{ value: number; dataKey: string }>;
    label?: string;
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#1a2332] border border-[#1e2d3d] rounded-lg p-3 shadow-xl">
          <p className="text-[#64748b] text-xs mb-2">{label}</p>
          {payload.map((p) => (
            <p key={p.dataKey} className="text-sm">
              <span
                className="inline-block w-2 h-2 rounded-full mr-2"
                style={{
                  backgroundColor:
                    p.dataKey === "players" ? "#4ade80" : "#06b6d4",
                }}
              />
              <span className="text-[#64748b]">
                {p.dataKey === "players" ? "玩家数" : "延迟"}:{" "}
              </span>
              <span className="text-white font-medium">
                {p.value}
                {p.dataKey === "latency" ? "ms" : ""}
              </span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-[#111820] border border-[#1e2d3d] rounded-xl p-6">
      <div className="flex items-center gap-2 mb-5">
        <BarChart3 size={18} className="text-[#4ade80]" />
        <h3 className="text-white font-semibold">服务器趋势</h3>
        <span className="text-[#64748b] text-xs ml-auto">最近 2 小时</span>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorPlayers" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4ade80" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#4ade80" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorLatency" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e2d3d" />
            <XAxis
              dataKey="time"
              stroke="#475569"
              tick={{ fill: "#64748b", fontSize: 11 }}
              tickLine={false}
            />
            <YAxis
              stroke="#475569"
              tick={{ fill: "#64748b", fontSize: 11 }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="players"
              stroke="#4ade80"
              strokeWidth={2}
              fill="url(#colorPlayers)"
            />
            <Area
              type="monotone"
              dataKey="latency"
              stroke="#06b6d4"
              strokeWidth={2}
              fill="url(#colorLatency)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <span className="w-3 h-0.5 bg-[#4ade80] rounded" />
          <span className="text-[#64748b] text-xs">玩家数</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-0.5 bg-[#06b6d4] rounded" />
          <span className="text-[#64748b] text-xs">延迟 (ms)</span>
        </div>
      </div>
    </div>
  );
}
