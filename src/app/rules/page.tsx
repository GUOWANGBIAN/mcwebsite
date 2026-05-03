"use client";

import { motion } from "framer-motion";
import { Shield, AlertTriangle, AlertCircle, Info } from "lucide-react";
import rules from "@/data/rules.json";

const severityConfig: Record<
  string,
  { color: string; icon: React.ElementType; label: string }
> = {
  high: { color: "#ef4444", icon: AlertTriangle, label: "严重" },
  medium: { color: "#f59e0b", icon: AlertCircle, label: "警告" },
  low: { color: "#06b6d4", icon: Info, label: "提示" },
};

export default function RulesPage() {
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="w-16 h-16 bg-[#ef4444]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Shield size={32} className="text-[#ef4444]" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">服务器规则</h1>
          <p className="text-[#64748b] max-w-xl mx-auto">
            为了维护良好的游戏环境，请所有玩家遵守以下规则。
            违规行为将根据严重程度受到相应处罚。
          </p>
        </motion.div>

        {/* Rules */}
        <div className="space-y-6">
          {rules.map((section, i) => {
            const severity =
              severityConfig[section.severity] || severityConfig.medium;
            const Icon = severity.icon;
            return (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#111820] border border-[#1e2d3d] rounded-xl overflow-hidden"
              >
                {/* Section Header */}
                <div className="px-6 py-4 flex items-center gap-3 border-b border-[#1e2d3d]">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${severity.color}15` }}
                  >
                    <Icon size={16} style={{ color: severity.color }} />
                  </div>
                  <h2 className="text-white font-semibold text-lg flex-1">
                    {section.category}
                  </h2>
                  <span
                    className="px-2 py-0.5 rounded-full text-xs font-medium"
                    style={{
                      backgroundColor: `${severity.color}20`,
                      color: severity.color,
                    }}
                  >
                    {severity.label}
                  </span>
                </div>

                {/* Rules List */}
                <div className="divide-y divide-[#1e2d3d]">
                  {section.rules.map((rule, j) => (
                    <div
                      key={j}
                      className="px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4"
                    >
                      <div className="flex-1">
                        <p className="text-[#dcddde] text-sm">{rule.rule}</p>
                      </div>
                      <div className="flex-shrink-0">
                        <span className="inline-block px-3 py-1 bg-[#0d1117] rounded text-xs text-[#64748b] border border-[#1e2d3d]">
                          处罚: {rule.punishment}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 bg-[#f59e0b]/5 border border-[#f59e0b]/20 rounded-xl p-6"
        >
          <div className="flex items-start gap-3">
            <AlertCircle size={20} className="text-[#f59e0b] mt-0.5" />
            <div>
              <h3 className="text-white font-semibold mb-2">注意事项</h3>
              <ul className="text-[#64748b] text-sm space-y-1">
                <li>• 管理员保留最终解释权</li>
                <li>• 重复违规将加重处罚</li>
                <li>• 如有异议可在 Discord 提出申诉</li>
                <li>• 规则可能随时更新，请定期查看</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
