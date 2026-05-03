"use client";

import { motion } from "framer-motion";
import {
  Swords,
  Palette,
  Gamepad2,
  Coins,
  Shield,
  Trophy,
} from "lucide-react";
import { SERVER_CONFIG } from "@/lib/constants";

const iconMap: Record<string, React.ElementType> = {
  Swords,
  Palette,
  Gamepad2,
  Coins,
  Shield,
  Trophy,
};

export default function FeatureShowcase() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            服务器特色
          </h2>
          <p className="text-[#64748b] text-lg max-w-2xl mx-auto">
            我们精心打造了多种游戏模式和系统，让每位玩家都能找到乐趣
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVER_CONFIG.features.map((feature, i) => {
            const Icon = iconMap[feature.icon] || Swords;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-[#111820] border border-[#1e2d3d] rounded-xl p-6 hover:border-[#4ade80]/30 transition-all duration-300 card-glow"
              >
                <div className="w-12 h-12 bg-[#4ade80]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#4ade80]/20 transition-colors">
                  <Icon size={24} className="text-[#4ade80]" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-[#64748b] text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
