"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  BookOpen,
  ChevronLeft,
  Clock,
  Tag,
  List,
} from "lucide-react";
import docs from "@/data/docs.json";
import { DOC_CATEGORIES } from "@/lib/constants";

export default function DocDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [doc, setDoc] = useState(docs.find((d) => d.slug === slug));
  const [toc, setToc] = useState<Array<{ id: string; text: string; level: number }>>([]);

  useEffect(() => {
    if (doc) {
      // Parse headings from markdown content
      const headings: Array<{ id: string; text: string; level: number }> = [];
      const lines = doc.content.split("\n");
      for (const line of lines) {
        const match = line.match(/^(#{1,3})\s+(.+)/);
        if (match) {
          const level = match[1].length;
          const text = match[2];
          const id = text
            .toLowerCase()
            .replace(/[^\w一-鿿]+/g, "-")
            .replace(/^-|-$/g, "");
          headings.push({ id, text, level });
        }
      }
      setToc(headings);
    }
  }, [doc]);

  if (!doc) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <BookOpen size={48} className="mx-auto mb-4 text-[#1e2d3d]" />
          <h2 className="text-xl text-white mb-2">文档未找到</h2>
          <Link
            href="/docs"
            className="text-[#4ade80] hover:underline text-sm"
          >
            返回文档中心
          </Link>
        </div>
      </div>
    );
  }

  const category = DOC_CATEGORIES.find((c) => c.id === doc.category);

  // Simple markdown renderer
  const renderContent = (content: string) => {
    return content.split("\n").map((line, i) => {
      // Headings
      if (line.startsWith("# ")) {
        const text = line.slice(2);
        const id = text
          .toLowerCase()
          .replace(/[^\w一-鿿]+/g, "-")
          .replace(/^-|-$/g, "");
        return (
          <h1
            key={i}
            id={id}
            className="text-3xl font-bold text-white mb-6 mt-8 scroll-mt-24"
          >
            {text}
          </h1>
        );
      }
      if (line.startsWith("## ")) {
        const text = line.slice(3);
        const id = text
          .toLowerCase()
          .replace(/[^\w一-鿿]+/g, "-")
          .replace(/^-|-$/g, "");
        return (
          <h2
            key={i}
            id={id}
            className="text-2xl font-bold text-white mb-4 mt-8 scroll-mt-24 border-b border-[#1e2d3d] pb-2"
          >
            {text}
          </h2>
        );
      }
      if (line.startsWith("### ")) {
        const text = line.slice(4);
        const id = text
          .toLowerCase()
          .replace(/[^\w一-鿿]+/g, "-")
          .replace(/^-|-$/g, "");
        return (
          <h3
            key={i}
            id={id}
            className="text-xl font-semibold text-white mb-3 mt-6 scroll-mt-24"
          >
            {text}
          </h3>
        );
      }

      // Table
      if (line.includes("|") && line.trim().startsWith("|")) {
        const cells = line
          .split("|")
          .filter(Boolean)
          .map((c) => c.trim());
        if (cells.every((c) => /^[-:]+$/.test(c))) {
          return null; // Skip table separator
        }
        const isHeader = i > 0 && content.split("\n")[i - 1]?.includes("|");
        return (
          <div
            key={i}
            className={`grid gap-4 px-3 py-2 text-sm border-b border-[#1e2d3d] ${
              isHeader ? "text-[#64748b] font-medium" : "text-[#dcddde]"
            }`}
            style={{ gridTemplateColumns: `repeat(${cells.length}, 1fr)` }}
          >
            {cells.map((cell, j) => {
              // Inline code
              const formatted = cell.replace(
                /`([^`]+)`/g,
                '<code class="px-1.5 py-0.5 bg-[#0d1117] rounded text-[#4ade80] font-mono text-xs">$1</code>'
              );
              return (
                <span
                  key={j}
                  dangerouslySetInnerHTML={{ __html: formatted }}
                />
              );
            })}
          </div>
        );
      }

      // List items
      if (line.trim().startsWith("- ")) {
        return (
          <li
            key={i}
            className="text-[#dcddde] ml-4 mb-1 list-disc text-sm leading-relaxed"
          >
            {line.trim().slice(2)}
          </li>
        );
      }
      if (/^\d+\.\s/.test(line.trim())) {
        return (
          <li
            key={i}
            className="text-[#dcddde] ml-4 mb-1 list-decimal text-sm leading-relaxed"
          >
            {line.trim().replace(/^\d+\.\s/, "")}
          </li>
        );
      }

      // Code block markers
      if (line.trim() === "```") return null;

      // Inline code for regular paragraphs
      if (line.trim()) {
        const formatted = line
          .replace(
            /`([^`]+)`/g,
            '<code class="px-1.5 py-0.5 bg-[#0d1117] rounded text-[#4ade80] font-mono text-xs">$1</code>'
          )
          .replace(
            /\*\*(.+?)\*\*/g,
            '<strong class="text-white font-semibold">$1</strong>'
          );
        return (
          <p
            key={i}
            className="text-[#dcddde] mb-3 text-sm leading-relaxed"
            dangerouslySetInnerHTML={{ __html: formatted }}
          />
        );
      }

      return <br key={i} />;
    });
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Link
            href="/docs"
            className="inline-flex items-center gap-2 text-[#64748b] hover:text-[#4ade80] transition-colors text-sm"
          >
            <ChevronLeft size={16} />
            返回文档中心
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-3"
          >
            <article className="bg-[#111820] border border-[#1e2d3d] rounded-xl p-6 sm:p-8">
              {/* Meta */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                {category && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-[#4ade80]/10 text-[#4ade80] text-xs rounded-full">
                    <Tag size={12} />
                    {category.name}
                  </span>
                )}
                <span className="inline-flex items-center gap-1 text-[#64748b] text-xs">
                  <Clock size={12} />
                  阅读约 5 分钟
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl font-bold text-white mb-2">
                {doc.title}
              </h1>
              <p className="text-[#64748b] mb-8">{doc.description}</p>

              {/* Content */}
              <div className="prose-custom">{renderContent(doc.content)}</div>
            </article>
          </motion.div>

          {/* TOC Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-[#111820] border border-[#1e2d3d] rounded-xl p-4 sticky top-24">
              <div className="flex items-center gap-2 mb-4">
                <List size={16} className="text-[#64748b]" />
                <h3 className="text-white font-semibold text-sm">目录</h3>
              </div>
              <nav className="space-y-1">
                {toc.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`block text-sm py-1 transition-colors hover:text-[#4ade80] ${
                      item.level === 1
                        ? "text-white font-medium"
                        : item.level === 2
                          ? "text-[#94a3b8] pl-4"
                          : "text-[#64748b] pl-8"
                    }`}
                  >
                    {item.text}
                  </a>
                ))}
              </nav>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
