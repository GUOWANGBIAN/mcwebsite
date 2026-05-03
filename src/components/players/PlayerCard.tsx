"use client";

import { motion } from "framer-motion";
import { getPlayerAvatar, getPlayerBody } from "@/lib/utils";

interface Props {
  uuid: string;
  name: string;
  rank?: string;
  playtime?: string;
  index?: number;
}

export default function PlayerCard({
  uuid,
  name,
  rank,
  playtime,
  index = 0,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group bg-[#111820] border border-[#1e2d3d] rounded-xl overflow-hidden hover:border-[#4ade80]/30 transition-all duration-300 card-glow"
    >
      {/* Player avatar area */}
      <div className="relative h-32 bg-gradient-to-b from-[#1a2332] to-[#111820] flex items-end justify-center">
        <img
          src={getPlayerBody(uuid, 128)}
          alt={name}
          className="h-28 image-rendering-pixelated drop-shadow-lg"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = getPlayerAvatar(uuid, 64);
          }}
        />
      </div>

      {/* Info */}
      <div className="p-4 text-center">
        <h3 className="text-white font-semibold mb-1">{name}</h3>
        {rank && (
          <span className="inline-block px-2 py-0.5 bg-[#4ade80]/10 text-[#4ade80] text-xs rounded-full mb-2">
            {rank}
          </span>
        )}
        {playtime && (
          <p className="text-[#64748b] text-xs">游戏时长: {playtime}</p>
        )}
      </div>
    </motion.div>
  );
}
