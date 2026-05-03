"use client";

import { motion } from "framer-motion";
import { Download, Copy, Play } from "lucide-react";

const steps = [
  {
    step: 1,
    title: "安装 Java",
    description:
      "下载并安装 Java 17 或更高版本。推荐使用 Adoptium 或 Oracle JDK。",
    icon: Download,
    color: "#4ade80",
  },
  {
    step: 2,
    title: "复制服务器地址",
    description: "点击上方的服务器地址复制按钮，或手动输入 play.example.com",
    icon: Copy,
    color: "#06b6d4",
  },
  {
    step: 3,
    title: "开始游戏",
    description:
      "打开 Minecraft 1.20.4，添加服务器并连接，开始你的冒险之旅！",
    icon: Play,
    color: "#f59e0b",
  },
];

export default function QuickStartGuide() {
  return (
    <section className="py-20 px-4 bg-[#0d1117]">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            快速开始
          </h2>
          <p className="text-[#64748b] text-lg">
            只需三步，即可加入我们的服务器
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative"
              >
                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-[calc(50%+40px)] right-[calc(-50%+40px)] h-px bg-[#1e2d3d]" />
                )}

                <div className="bg-[#111820] border border-[#1e2d3d] rounded-xl p-6 text-center relative">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: `${step.color}15` }}
                  >
                    <Icon size={28} style={{ color: step.color }} />
                  </div>
                  <div
                    className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-3"
                    style={{
                      backgroundColor: `${step.color}20`,
                      color: step.color,
                    }}
                  >
                    步骤 {step.step}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-[#64748b] text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
