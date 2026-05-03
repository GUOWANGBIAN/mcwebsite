"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Map, Maximize2, Minimize2, ExternalLink } from "lucide-react";
import { SERVER_CONFIG } from "@/lib/constants";

export default function DynmapEmbed() {
  const [fullscreen, setFullscreen] = useState(false);

  return (
    <div
      className={`bg-[#111820] border border-[#1e2d3d] rounded-xl overflow-hidden ${
        fullscreen ? "fixed inset-0 z-50" : ""
      }`}
    >
      {/* Header */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-[#1e2d3d]">
        <div className="flex items-center gap-2">
          <Map size={16} className="text-[#4ade80]" />
          <span className="text-white text-sm font-medium">服务器地图</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFullscreen(!fullscreen)}
            className="p-1.5 text-[#64748b] hover:text-white rounded transition-colors"
          >
            {fullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
          </button>
          <a
            href={SERVER_CONFIG.dynmapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 text-[#64748b] hover:text-white rounded transition-colors"
          >
            <ExternalLink size={14} />
          </a>
        </div>
      </div>

      {/* Iframe */}
      <div className={fullscreen ? "h-[calc(100vh-48px)]" : "aspect-video"}>
        <iframe
          src={SERVER_CONFIG.dynmapUrl}
          className="w-full h-full border-0"
          title="Dynmap"
          loading="lazy"
        />
      </div>
    </div>
  );
}
