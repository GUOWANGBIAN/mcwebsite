"use client";

import {
  Clock,
  Hammer,
  Coins,
  Shield,
  Mic,
  Calendar,
} from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { SERVER_CONFIG } from "@/lib/constants";

const iconMap: Record<string, React.ElementType> = {
  Clock,
  Hammer,
  Coins,
  Shield,
  Mic,
  Calendar,
};

export default function ServerFeatures() {
  return (
    <SectionWrapper
      title="服务器特色"
      subtitle="用心打造的每一个细节，只为给你最好的游戏体验"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {SERVER_CONFIG.features.map((feature, i) => {
          const Icon = iconMap[feature.icon] || Clock;
          return (
            <GlassCard key={feature.title} delay={i * 0.08}>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-[#d4a853]/8 border border-[#d4a853]/10 flex items-center justify-center">
                  <Icon size={20} className="text-[#d4a853]" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1.5">
                    {feature.title}
                  </h3>
                  <p className="text-[#8a8279] text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
