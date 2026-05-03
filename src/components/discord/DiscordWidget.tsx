"use client";

import { useState, useEffect } from "react";
import { MessageSquare, Users, Volume2 } from "lucide-react";
import { SERVER_CONFIG } from "@/lib/constants";

interface DiscordData {
  name: string;
  presence_count: number;
  members: Array<{
    username: string;
    status: string;
    avatar_url: string;
  }>;
  channels: Array<{
    id: string;
    name: string;
  }>;
}

export default function DiscordWidget({ compact = false }: { compact?: boolean }) {
  const [data, setData] = useState<DiscordData | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`/api/discord`)
      .then((r) => r.json())
      .then((d) => {
        if (d.error) setError(true);
        else setData(d);
      })
      .catch(() => setError(true));
  }, []);

  if (error) {
    return (
      <div className="bg-[#111820] border border-[#1e2d3d] rounded-xl p-6 text-center">
        <MessageSquare className="mx-auto mb-3 text-[#5865f2]" size={32} />
        <p className="text-[#64748b] text-sm mb-4">加入 Discord 获取最新消息</p>
        <a
          href={SERVER_CONFIG.discordInvite}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#5865f2] rounded-lg text-white text-sm font-medium hover:bg-[#4752c4] transition-colors"
        >
          加入 Discord
        </a>
      </div>
    );
  }

  if (compact) {
    return (
      <div className="bg-[#111820] border border-[#1e2d3d] rounded-xl p-4 flex items-center gap-3">
        <div className="w-10 h-10 bg-[#5865f2] rounded-lg flex items-center justify-center">
          <MessageSquare size={20} className="text-white" />
        </div>
        <div className="flex-1">
          <p className="text-white text-sm font-medium">
            {data?.name || "Discord 社区"}
          </p>
          <p className="text-[#64748b] text-xs">
            {data?.presence_count || 0} 名成员在线
          </p>
        </div>
        <a
          href={SERVER_CONFIG.discordInvite}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1.5 bg-[#5865f2] rounded-lg text-white text-xs font-medium hover:bg-[#4752c4] transition-colors"
        >
          加入
        </a>
      </div>
    );
  }

  return (
    <div className="bg-[#111820] border border-[#1e2d3d] rounded-xl overflow-hidden">
      {/* Header */}
      <div className="bg-[#5865f2] p-4 flex items-center gap-3">
        <MessageSquare size={20} className="text-white" />
        <div>
          <p className="text-white font-semibold text-sm">
            {data?.name || "Discord 社区"}
          </p>
          <p className="text-white/70 text-xs flex items-center gap-1">
            <Users size={12} />
            {data?.presence_count || 0} 在线
          </p>
        </div>
      </div>

      {/* Members */}
      <div className="p-4">
        {data?.members && data.members.length > 0 ? (
          <div className="space-y-2 mb-4">
            <p className="text-[#64748b] text-xs uppercase tracking-wider mb-2">
              在线成员
            </p>
            {data.members.slice(0, 10).map((member) => (
              <div
                key={member.username}
                className="flex items-center gap-2 py-1"
              >
                <img
                  src={member.avatar_url}
                  alt={member.username}
                  className="w-6 h-6 rounded-full"
                />
                <span className="text-[#dcddde] text-sm">{member.username}</span>
                <span
                  className={`w-2 h-2 rounded-full ml-auto ${
                    member.status === "online"
                      ? "bg-[#4ade80]"
                      : member.status === "idle"
                        ? "bg-[#f59e0b]"
                        : "bg-[#64748b]"
                  }`}
                />
              </div>
            ))}
          </div>
        ) : null}

        {/* Voice channels */}
        {data?.channels && data.channels.length > 0 && (
          <div className="mb-4">
            <p className="text-[#64748b] text-xs uppercase tracking-wider mb-2">
              语音频道
            </p>
            {data.channels.map((ch) => (
              <div
                key={ch.id}
                className="flex items-center gap-2 py-1 text-[#dcddde] text-sm"
              >
                <Volume2 size={14} className="text-[#64748b]" />
                {ch.name}
              </div>
            ))}
          </div>
        )}

        <a
          href={SERVER_CONFIG.discordInvite}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center py-2.5 bg-[#5865f2] rounded-lg text-white text-sm font-medium hover:bg-[#4752c4] transition-colors"
        >
          加入 Discord
        </a>
      </div>
    </div>
  );
}
