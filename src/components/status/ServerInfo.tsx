"use client";

import { Server, Layers } from "lucide-react";
import { SERVER_CONFIG } from "@/lib/constants";

interface Props {
  status: {
    online: boolean;
    version: string;
    software?: string;
    plugins?: string[];
  } | null;
}

export default function ServerInfo({ status }: Props) {
  const info = [
    { label: "服务器地址", value: SERVER_CONFIG.serverIP, mono: true },
    { label: "游戏版本", value: status?.version || "--" },
    { label: "服务端", value: status?.software || "Paper/Spigot" },
    { label: "最大人数", value: `${SERVER_CONFIG.maxPlayers}` },
    { label: "成立时间", value: SERVER_CONFIG.foundedDate },
  ];

  return (
    <div className="glass rounded-xl p-6">
      <div className="flex items-center gap-2 mb-5">
        <Server size={18} className="text-[#d4a853]" />
        <h3 className="text-white font-semibold">服务器信息</h3>
      </div>

      <div className="space-y-3">
        {info.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between py-2 border-b border-[#2a2520]/40 last:border-0"
          >
            <span className="text-[#8a8279] text-sm">{item.label}</span>
            <span
              className={`text-sm ${
                item.mono ? "font-mono text-[#d4a853]" : "text-white"
              }`}
            >
              {item.value}
            </span>
          </div>
        ))}
      </div>

      {status?.plugins && status.plugins.length > 0 && (
        <div className="mt-5 pt-5 border-t border-[#2a2520]/40">
          <div className="flex items-center gap-2 mb-3">
            <Layers size={16} className="text-[#7db87b]" />
            <span className="text-[#8a8279] text-sm">已安装插件</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {status.plugins.map((p) => (
              <span
                key={p}
                className="px-2 py-1 bg-[#0f0e0b]/50 rounded text-xs text-[#f0ece4]/70 border border-[#2a2520]/40"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
