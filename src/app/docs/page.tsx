"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  BookOpen,
  Rocket,
  Server,
  Terminal,
  HelpCircle,
  Puzzle,
  Search,
  ChevronRight,
  FileText,
} from "lucide-react";
import docs from "@/data/docs.json";
import { DOC_CATEGORIES } from "@/lib/constants";

const categoryIcons: Record<string, React.ElementType> = {
  Rocket,
  Server,
  Terminal,
  HelpCircle,
  Puzzle,
};

export default function DocsPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredDocs = docs.filter((doc) => {
    const matchesSearch =
      !search ||
      doc.title.toLowerCase().includes(search.toLowerCase()) ||
      doc.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      !activeCategory || doc.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <BookOpen size={28} className="text-[#4ade80]" />
            文档中心
          </h1>
          <p className="text-[#64748b]">
            查找服务器使用指南、命令说明和常见问题
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="relative max-w-lg">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748b]"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="搜索文档..."
              className="w-full pl-11 pr-4 py-3 bg-[#111820] border border-[#1e2d3d] rounded-xl text-white text-sm placeholder-[#475569] focus:border-[#4ade80]/50 focus:outline-none transition-colors"
            />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Categories */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-[#111820] border border-[#1e2d3d] rounded-xl p-4 sticky top-24">
              <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
                分类
              </h3>
              <div className="space-y-1">
                <button
                  onClick={() => setActiveCategory(null)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                    !activeCategory
                      ? "bg-[#4ade80]/10 text-[#4ade80]"
                      : "text-[#64748b] hover:text-white hover:bg-white/5"
                  }`}
                >
                  <FileText size={16} />
                  全部文档
                </button>
                {DOC_CATEGORIES.map((cat) => {
                  const Icon = categoryIcons[cat.icon] || FileText;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                        activeCategory === cat.id
                          ? "bg-[#4ade80]/10 text-[#4ade80]"
                          : "text-[#64748b] hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <Icon size={16} />
                      {cat.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Docs Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-3"
          >
            {filteredDocs.length === 0 ? (
              <div className="text-center py-16">
                <BookOpen
                  size={48}
                  className="mx-auto mb-4 text-[#1e2d3d]"
                />
                <p className="text-[#64748b]">未找到匹配的文档</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredDocs.map((doc, i) => {
                  const category = DOC_CATEGORIES.find(
                    (c) => c.id === doc.category
                  );
                  const Icon = category
                    ? categoryIcons[category.icon] || FileText
                    : FileText;
                  return (
                    <motion.div
                      key={doc.slug}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        href={`/docs/${doc.slug}`}
                        className="block bg-[#111820] border border-[#1e2d3d] rounded-xl p-5 hover:border-[#4ade80]/30 transition-all duration-300 group card-glow"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-[#4ade80]/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-[#4ade80]/20 transition-colors">
                            <Icon size={20} className="text-[#4ade80]" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-white font-semibold group-hover:text-[#4ade80] transition-colors truncate">
                                {doc.title}
                              </h3>
                              <ChevronRight
                                size={14}
                                className="text-[#64748b] group-hover:text-[#4ade80] transition-colors flex-shrink-0"
                              />
                            </div>
                            <p className="text-[#64748b] text-sm line-clamp-2">
                              {doc.description}
                            </p>
                            {category && (
                              <span className="inline-block mt-2 px-2 py-0.5 bg-[#0d1117] rounded text-xs text-[#64748b]">
                                {category.name}
                              </span>
                            )}
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
