"use client";

import { MessageCircle, Video, Lightbulb } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { SERVER_CONFIG } from "@/lib/constants";

const platforms = [
  {
    name: "QQ 群",
    icon: MessageCircle,
    description: SERVER_CONFIG.community.qq.groupName,
    detail: `群号: ${SERVER_CONFIG.community.qq.groupNumber}`,
    href: SERVER_CONFIG.community.qq.joinUrl,
    color: "#12b7f5",
    btnText: "加入群聊",
  },
  {
    name: "B 站",
    icon: Video,
    description: SERVER_CONFIG.community.bilibili.channelName,
    detail: "关注我们",
    href: SERVER_CONFIG.community.bilibili.spaceUrl,
    color: "#fb7299",
    btnText: "前往主页",
  },
  {
    name: "建议反馈",
    icon: Lightbulb,
    description: "你的声音很重要",
    detail: "提交建议与反馈",
    href: SERVER_CONFIG.community.feedback.url,
    color: "#e8a94e",
    btnText: "提交反馈",
  },
];

export default function CommunityModule() {
  return (
    <SectionWrapper
      title="加入社区"
      subtitle="和志同道合的伙伴一起，创造属于我们的故事"
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
        {platforms.map((p, i) => (
          <GlassCard key={p.name} delay={i * 0.08}>
            <div className="text-center">
              <div
                className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center"
                style={{ backgroundColor: `${p.color}12`, border: `1px solid ${p.color}20` }}
              >
                <p.icon size={22} style={{ color: p.color }} />
              </div>
              <h3 className="text-white font-semibold mb-1">{p.name}</h3>
              <p className="text-[#8a8279] text-sm mb-1">{p.description}</p>
              <p className="text-[#8a8279]/60 text-xs mb-4">{p.detail}</p>
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
                style={{
                  backgroundColor: `${p.color}10`,
                  border: `1px solid ${p.color}20`,
                  color: p.color,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = `${p.color}20`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = `${p.color}10`;
                }}
              >
                {p.btnText}
              </a>
            </div>
          </GlassCard>
        ))}
      </div>
    </SectionWrapper>
  );
}
