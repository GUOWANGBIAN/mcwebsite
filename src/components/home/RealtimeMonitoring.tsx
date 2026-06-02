"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Users, Wifi, Activity, Cpu, HardDrive } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import SectionWrapper from "@/components/ui/SectionWrapper";

// Dynamic import to reduce initial bundle size
const AreaChart = dynamic(
  () => import("recharts").then((mod) => mod.AreaChart),
  { ssr: false }
);
const Area = dynamic(
  () => import("recharts").then((mod) => mod.Area),
  { ssr: false }
);
const XAxis = dynamic(
  () => import("recharts").then((mod) => mod.XAxis),
  { ssr: false }
);
const YAxis = dynamic(
  () => import("recharts").then((mod) => mod.YAxis),
  { ssr: false }
);
const Tooltip = dynamic(
  () => import("recharts").then((mod) => mod.Tooltip),
  { ssr: false }
);
const ResponsiveContainer = dynamic(
  () => import("recharts").then((mod) => mod.ResponsiveContainer),
  { ssr: false }
);

interface Snapshot {
  timestamp: string;
  players: { online: number; max: number };
  tps: number | null;
  cpu: number | null;
  memory: { used: number; total: number } | null;
  ping: number | null;
}

function MiniChart({
  data,
  dataKey,
  color,
  label,
  icon: Icon,
  value,
  unit,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  dataKey: string;
  color: string;
  label: string;
  icon: React.ElementType;
  value: string | number;
  unit: string;
}) {
  return (
    <GlassCard className="p-5" hover={false}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Icon size={16} className="text-[#d4a853]" />
          <span className="text-[#8a8279] text-sm">{label}</span>
        </div>
        <div className="text-right">
          <span className="text-white font-semibold text-lg">{value}</span>
          <span className="text-[#8a8279] text-xs ml-1">{unit}</span>
        </div>
      </div>
      <div className="h-24">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id={`grad-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.2} />
                <stop offset="100%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              strokeWidth={1.5}
              fill={`url(#grad-${dataKey})`}
              isAnimationActive={false}
            />
            <XAxis dataKey="time" hide />
            <YAxis hide domain={["auto", "auto"]} />
            <Tooltip
              contentStyle={{
                background: "rgba(26, 24, 20, 0.9)",
                border: "1px solid rgba(212, 168, 83, 0.15)",
                borderRadius: "12px",
                color: "#f0ece4",
                fontSize: "12px",
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
}

export default function RealtimeMonitoring() {
  const [data, setData] = useState<Snapshot[]>([]);
  const [current, setCurrent] = useState<Snapshot | null>(null);

  useEffect(() => {
    const fetchData = () => {
      fetch("/api/monitoring")
        .then((r) => r.json())
        .then((d) => {
          setCurrent(d.current);
          setData(
            d.history.map((s: Snapshot) => ({
              ...s,
              time: new Date(s.timestamp).toLocaleTimeString("zh-CN", {
                hour: "2-digit",
                minute: "2-digit",
              }),
            }))
          );
        })
        .catch(() => {});
    };

    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <SectionWrapper
      title="实时监控"
      subtitle="服务器运行状态一目了然"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MiniChart
          data={data}
          dataKey="players.online"
          color="#d4a853"
          label="在线玩家"
          icon={Users}
          value={current?.players.online ?? "—"}
          unit="人"
        />
        <MiniChart
          data={data}
          dataKey="ping"
          color="#7db87b"
          label="网络延迟"
          icon={Wifi}
          value={current?.ping ?? "—"}
          unit="ms"
        />
        <MiniChart
          data={data}
          dataKey="tps"
          color="#e8a94e"
          label="TPS"
          icon={Activity}
          value={current?.tps ?? "—"}
          unit="/20"
        />
        <MiniChart
          data={data}
          dataKey="cpu"
          color="#d4a853"
          label="CPU 使用率"
          icon={Cpu}
          value={current?.cpu ?? "—"}
          unit="%"
        />
      </div>
      <p className="text-center text-[#8a8279]/50 text-xs mt-4">
        TPS / CPU / 内存数据需要服务端监控插件支持，当前仅显示在线人数与延迟
      </p>
    </SectionWrapper>
  );
}
