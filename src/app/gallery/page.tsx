"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ImageIcon, X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";

// Demo gallery data - replace with your actual screenshots
const galleryItems = [
  {
    id: 1,
    title: "出生点广场",
    description: "服务器主城中心广场",
    category: "建筑",
    src: "/screenshots/spawn.jpg",
  },
  {
    id: 2,
    title: "中世纪城堡",
    description: "玩家建造的大型城堡",
    category: "建筑",
    src: "/screenshots/castle.jpg",
  },
  {
    id: 3,
    title: "现代都市",
    description: "现代化城市区域",
    category: "建筑",
    src: "/screenshots/city.jpg",
  },
  {
    id: 4,
    title: "自然风景",
    description: "服务器内的美丽风景",
    category: "风景",
    src: "/screenshots/landscape.jpg",
  },
  {
    id: 5,
    title: "红石工程",
    description: "复杂的红石机械装置",
    category: "红石",
    src: "/screenshots/redstone.jpg",
  },
  {
    id: 6,
    title: "社区活动",
    description: "玩家聚集参加活动",
    category: "活动",
    src: "/screenshots/event.jpg",
  },
];

const categories = ["全部", "建筑", "风景", "红石", "活动"];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("全部");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const filtered =
    activeCategory === "全部"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  const handlePrev = () => {
    if (selectedImage === null) return;
    const idx = filtered.findIndex((item) => item.id === selectedImage);
    const prevIdx = idx > 0 ? idx - 1 : filtered.length - 1;
    setSelectedImage(filtered[prevIdx].id);
  };

  const handleNext = () => {
    if (selectedImage === null) return;
    const idx = filtered.findIndex((item) => item.id === selectedImage);
    const nextIdx = idx < filtered.length - 1 ? idx + 1 : 0;
    setSelectedImage(filtered[nextIdx].id);
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="w-16 h-16 bg-[#06b6d4]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <ImageIcon size={32} className="text-[#06b6d4]" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">服务器画廊</h1>
          <p className="text-[#64748b] max-w-xl mx-auto">
            欣赏服务器内的精彩建筑和风景截图
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-[#4ade80]/10 text-[#4ade80] border border-[#4ade80]/20"
                  : "bg-[#111820] text-[#64748b] border border-[#1e2d3d] hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="group relative bg-[#111820] border border-[#1e2d3d] rounded-xl overflow-hidden cursor-pointer hover:border-[#4ade80]/30 transition-all duration-300"
              onClick={() => setSelectedImage(item.id)}
            >
              {/* Placeholder for image */}
              <div className="aspect-video bg-gradient-to-br from-[#1a2332] to-[#0d1117] flex items-center justify-center">
                <div className="text-center">
                  <ImageIcon
                    size={40}
                    className="mx-auto mb-2 text-[#1e2d3d]"
                  />
                  <p className="text-[#475569] text-xs">{item.title}</p>
                </div>
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn size={24} className="text-white" />
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="text-white font-semibold text-sm mb-1">
                  {item.title}
                </h3>
                <p className="text-[#64748b] text-xs">{item.description}</p>
                <span className="inline-block mt-2 px-2 py-0.5 bg-[#0d1117] rounded text-xs text-[#64748b]">
                  {item.category}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 text-white/60 hover:text-white"
              >
                <X size={24} />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-4 text-white/60 hover:text-white"
              >
                <ChevronLeft size={32} />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-4 text-white/60 hover:text-white"
              >
                <ChevronRight size={32} />
              </button>

              <motion.div
                key={selectedImage}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="max-w-4xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="aspect-video bg-[#111820] rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <ImageIcon
                      size={64}
                      className="mx-auto mb-4 text-[#1e2d3d]"
                    />
                    <p className="text-[#64748b]">
                      {galleryItems.find((g) => g.id === selectedImage)?.title}
                    </p>
                    <p className="text-[#475569] text-sm mt-1">
                      请替换为实际截图
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
