"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ImageIcon, X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import galleryData from "@/data/gallery.json";

const categories = ["全部", "建筑", "风景", "活动", "城镇"];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("全部");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const filtered =
    activeCategory === "全部"
      ? galleryData
      : galleryData.filter((item) => item.category === activeCategory);

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
          <div className="w-16 h-16 bg-[#d4a853]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <ImageIcon size={32} className="text-[#d4a853]" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">玩家画廊</h1>
          <p className="text-[#8a8279] max-w-xl mx-auto">
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
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-[#d4a853]/10 text-[#d4a853] border border-[#d4a853]/20"
                  : "glass text-[#8a8279] hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Masonry Grid */}
        <div className="masonry-grid">
          {filtered.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.04 }}
              className="masonry-item group relative glass rounded-2xl overflow-hidden cursor-pointer hover:border-[#d4a853]/15 transition-all duration-300"
              onClick={() => setSelectedImage(item.id)}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn size={24} className="text-white" />
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-white font-semibold text-sm mb-1">
                  {item.title}
                </h3>
                <p className="text-[#8a8279] text-xs">{item.description}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="px-2 py-0.5 bg-[#0f0e0b]/50 rounded text-xs text-[#8a8279]">
                    {item.category}
                  </span>
                  {item.author && (
                    <span className="text-xs text-[#d4a853]/60">
                      {item.author}
                    </span>
                  )}
                </div>
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
              className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-4 text-white/60 hover:text-white transition-colors"
              >
                <ChevronLeft size={32} />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-4 text-white/60 hover:text-white transition-colors"
              >
                <ChevronRight size={32} />
              </button>

              <motion.div
                key={selectedImage}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="max-w-4xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                {(() => {
                  const item = galleryData.find((g) => g.id === selectedImage);
                  if (!item) return null;
                  return (
                    <div>
                      <div className="relative aspect-video rounded-2xl overflow-hidden">
                        <Image
                          src={item.src}
                          alt={item.title}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div className="mt-4 text-center">
                        <h3 className="text-white text-lg font-semibold">
                          {item.title}
                        </h3>
                        <p className="text-[#8a8279] text-sm mt-1">
                          {item.description}
                        </p>
                        {item.author && (
                          <p className="text-[#d4a853] text-xs mt-2">
                            作者: {item.author}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })()}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
