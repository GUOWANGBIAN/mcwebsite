"use client";

import { motion } from "framer-motion";
import { Users, Clock } from "lucide-react";
import { getPlayerAvatar } from "@/lib/utils";

interface Player {
  uuid: string;
  name: string;
}

interface Props {
  players: Player[];
}

export default function PlayerList({ players }: Props) {
  if (!players || players.length === 0) {
    return (
      <div className="bg-[#111820] border border-[#1e2d3d] rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Users size={18} className="text-[#06b6d4]" />
          <h3 className="text-white font-semibold">在线玩家</h3>
        </div>
        <div className="text-center py-8">
          <Users size={48} className="mx-auto mb-3 text-[#1e2d3d]" />
          <p className="text-[#64748b] text-sm">暂无在线玩家</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#111820] border border-[#1e2d3d] rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Users size={18} className="text-[#06b6d4]" />
          <h3 className="text-white font-semibold">在线玩家</h3>
        </div>
        <span className="text-[#64748b] text-sm">{players.length} 人</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {players.map((player, i) => (
          <motion.div
            key={player.uuid}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-center gap-3 px-3 py-2.5 bg-[#0d1117] rounded-lg hover:bg-[#1a2332] transition-colors group"
          >
            <img
              src={getPlayerAvatar(player.uuid, 32)}
              alt={player.name}
              className="w-8 h-8 rounded"
              loading="lazy"
            />
            <span className="text-[#dcddde] text-sm font-medium group-hover:text-white transition-colors">
              {player.name}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
