"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight } from "lucide-react";
import Link from "next/link";
import SectionWrapper from "@/components/ui/SectionWrapper";
import galleryData from "@/data/gallery.json";

export default function PlayerWorksGallery() {
  const [selected, setSelected] = useState<number | null>(null);
  const items = galleryData.slice(0, 6);

  return (
    <SectionWrapper
      title="玩家作品"
      subtitle="每一份作品，都是社区共同的回忆"
    >
      {/* Masonry Grid */}
      <div className="masonry-grid">
        {items.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.06, ease: "easeOut" }}
            className="masonry-item"
          >
            <button
              onClick={() => setSelected(item.id)}
              className="group block w-full text-left rounded-2xl overflow-hidden bg-[#1a1814]/55 border border-[#2a2520]/60 transition-all duration-300 hover:border-[#d4a853]/12 hover:shadow-lg hover:shadow-[#d4a853]/[0.03]"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-4">
                <h3 className="text-white font-medium text-sm mb-1">
                  {item.title}
                </h3>
                <p className="text-[#8a8279] text-xs">
                  {item.author && `${item.author} · `}{item.category}
                </p>
              </div>
            </button>
          </motion.div>
        ))}
      </div>

      {/* View More */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mt-10"
      >
        <Link
          href="/gallery"
          className="inline-flex items-center gap-2 px-6 py-3 glass glass-hover rounded-xl text-[#d4a853] text-sm font-medium transition-all duration-300"
        >
          查看更多作品
          <ChevronRight size={16} />
        </Link>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute -top-12 right-0 text-white/60 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
              {(() => {
                const item = galleryData.find((g) => g.id === selected);
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
    </SectionWrapper>
  );
}
