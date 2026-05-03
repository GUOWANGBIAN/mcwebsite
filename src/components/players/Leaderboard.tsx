"use client";

import { motion } from "framer-motion";
import { Trophy, Medal, Award } from "lucide-react";
import { getPlayerAvatar } from "@/lib/utils";

interface LeaderboardEntry {
  rank: number;
  uuid: string;
  name: string;
  value: number;
  label: string;
}

interface Props {
  title: string;
  entries: LeaderboardEntry[];
  icon?: React.ElementType;
}

export default function Leaderboard({
  title,
  entries,
  icon: Icon = Trophy,
}: Props) {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy size={16} className="text-[#f59e0b]" />;
      case 2:
        return <Medal size={16} className="text-[#94a3b8]" />;
      case 3:
        return <Award size={16} className="text-[#cd7f32]" />;
      default:
        return (
          <span className="text-[#64748b] text-sm w-4 text-center">
            {rank}
          </span>
        );
    }
  };

  return (
    <div className="bg-[#111820] border border-[#1e2d3d] rounded-xl p-6">
      <div className="flex items-center gap-2 mb-5">
        <Icon size={18} className="text-[#f59e0b]" />
        <h3 className="text-white font-semibold">{title}</h3>
      </div>

      <div className="space-y-2">
        {entries.map((entry, i) => (
          <motion.div
            key={entry.uuid}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
              entry.rank <= 3
                ? "bg-[#f59e0b]/5 hover:bg-[#f59e0b]/10"
                : "bg-[#0d1117] hover:bg-[#1a2332]"
            }`}
          >
            <div className="w-6 flex justify-center">
              {getRankIcon(entry.rank)}
            </div>
            <img
              src={getPlayerAvatar(entry.uuid, 24)}
              alt={entry.name}
              className="w-6 h-6 rounded"
              loading="lazy"
            />
            <span className="text-[#dcddde] text-sm flex-1">{entry.name}</span>
            <span className="text-[#4ade80] text-sm font-mono font-medium">
              {entry.value.toLocaleString()}
            </span>
            <span className="text-[#64748b] text-xs">{entry.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
