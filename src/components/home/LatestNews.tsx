"use client";

import { motion } from "framer-motion";
import { Megaphone, Wrench, Calendar, AlertTriangle } from "lucide-react";
import news from "@/data/news.json";

const typeConfig: Record<
  string,
  { icon: React.ElementType; color: string; label: string }
> = {
  update: { icon: Megaphone, color: "#4ade80", label: "更新" },
  event: { icon: Calendar, color: "#06b6d4", label: "活动" },
  maintenance: { icon: Wrench, color: "#f59e0b", label: "维护" },
  warning: { icon: AlertTriangle, color: "#ef4444", label: "警告" },
};

export default function LatestNews() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            最新公告
          </h2>
          <p className="text-[#64748b] text-lg">了解服务器最新动态</p>
        </motion.div>

        <div className="space-y-4">
          {news.map((item, i) => {
            const config = typeConfig[item.type] || typeConfig.update;
            const Icon = config.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`bg-[#111820] border rounded-xl p-5 flex items-start gap-4 hover:bg-[#1a2332] transition-colors ${
                  item.important
                    ? "border-[#4ade80]/30"
                    : "border-[#1e2d3d]"
                }`}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${config.color}15` }}
                >
                  <Icon size={18} style={{ color: config.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-white font-semibold truncate">
                      {item.title}
                    </h3>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full flex-shrink-0"
                      style={{
                        backgroundColor: `${config.color}20`,
                        color: config.color,
                      }}
                    >
                      {config.label}
                    </span>
                  </div>
                  <p className="text-[#64748b] text-sm">{item.content}</p>
                  <p className="text-[#475569] text-xs mt-2">{item.date}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
