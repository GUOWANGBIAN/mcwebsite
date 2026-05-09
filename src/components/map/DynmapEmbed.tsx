"use client";

import { useState, useRef, useEffect } from "react";
import { Map, Maximize2, Minimize2, ExternalLink, Loader2 } from "lucide-react";
import { SERVER_CONFIG } from "@/lib/constants";

export default function DynmapEmbed() {
  const [fullscreen, setFullscreen] = useState(false);
  const [loading, setLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && fullscreen) {
        setFullscreen(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [fullscreen]);

  const handleLoad = () => {
    setLoading(false);
  };

  return (
    <div
      className={`bg-[#111820] border border-[#1e2d3d] rounded-xl overflow-hidden transition-all duration-300 ${
        fullscreen ? "fixed inset-0 z-50 rounded-none" : ""
      }`}
    >
      {/* Header */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-[#1e2d3d] bg-[#0d1117]">
        <div className="flex items-center gap-2">
          <Map size={16} className="text-[#4ade80]" />
          <span className="text-white text-sm font-medium">服务器地图</span>
          <span className="text-[10px] px-1.5 py-0.5 bg-[#1e2d3d] text-[#64748b] rounded">BlueMap</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setFullscreen(!fullscreen)}
            className="p-2 text-[#64748b] hover:text-white hover:bg-[#1e2d3d] rounded-lg transition-colors"
            title={fullscreen ? "退出全屏" : "全屏"}
          >
            {fullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
          </button>
          <a
            href={SERVER_CONFIG.blueMapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-[#64748b] hover:text-white hover:bg-[#1e2d3d] rounded-lg transition-colors"
            title="在新窗口打开"
          >
            <ExternalLink size={14} />
          </a>
        </div>
      </div>

      {/* Map Container */}
      <div
        className={`relative ${
          fullscreen ? "h-[calc(100vh-49px)]" : "aspect-video"
        }`}
      >
        {/* Loading State */}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#0a0e14]">
            <div className="flex flex-col items-center gap-3">
              <Loader2 size={24} className="text-[#4ade80] animate-spin" />
              <span className="text-[#64748b] text-sm">加载地图中...</span>
            </div>
          </div>
        )}

        {/* BlueMap Iframe */}
        <iframe
          ref={iframeRef}
          src={SERVER_CONFIG.blueMapUrl}
          className="w-full h-full border-0"
          title="BlueMap - 服务器地图"
          loading="lazy"
          onLoad={handleLoad}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        />
      </div>
    </div>
  );
}
