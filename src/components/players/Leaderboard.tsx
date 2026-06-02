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
        return <Trophy size={16} className="text-[#e8a94e]" />;
      case 2:
        return <Medal size={16} className="text-[#94a3b8]" />;
      case 3:
        return <Award size={16} className="text-[#cd7f32]" />;
      default:
        return (
          <span className="text-[#8a8279] text-sm w-4 text-center">
            {rank}
          </span>
        );
    }
  };

  return (
    <div className="glass rounded-xl p-6">
      <div className="flex items-center gap-2 mb-5">
        <Icon size={18} className="text-[#e8a94e]" />
        <h3 className="text-white font-semibold">{title}</h3>
      </div>

      <div className="space-y-2">
        {entries.map((entry, i) => (
          <motion.div
            key={entry.uuid}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04, ease: "easeOut" }}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
              entry.rank <= 3
                ? "bg-[#e8a94e]/5 hover:bg-[#e8a94e]/10"
                : "bg-[#0f0e0b]/50 hover:bg-[#23201a]/65"
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
            <span className="text-[#f0ece4]/80 text-sm flex-1">{entry.name}</span>
            <span className="text-[#d4a853] text-sm font-mono font-medium">
              {entry.value.toLocaleString()}
            </span>
            <span className="text-[#8a8279] text-xs">{entry.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
