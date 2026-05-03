"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Activity,
  Users,
  BookOpen,
  Shield,
  ImageIcon,
  Info,
  Menu,
  X,
  Copy,
  Check,
  ExternalLink,
} from "lucide-react";
import { cn, copyToClipboard } from "@/lib/utils";
import { SERVER_CONFIG, NAV_LINKS } from "@/lib/constants";

const iconMap: Record<string, React.ElementType> = {
  Home,
  Activity,
  Users,
  BookOpen,
  Shield,
  Image: ImageIcon,
  Info,
};

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleCopyIP = async () => {
    await copyToClipboard(SERVER_CONFIG.serverIP);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[#0a0e14]/95 backdrop-blur-xl border-b border-[#1e2d3d]"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 bg-[#4ade80] rounded flex items-center justify-center text-black font-bold text-sm mc-btn">
              M
            </div>
            <span className="text-lg font-bold text-white group-hover:text-[#4ade80] transition-colors">
              {SERVER_CONFIG.serverName}
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const Icon = iconMap[link.icon] || Home;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-[#4ade80]/10 text-[#4ade80]"
                      : "text-[#64748b] hover:text-white hover:bg-white/5"
                  )}
                >
                  <Icon size={16} />
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={handleCopyIP}
              className="flex items-center gap-2 px-4 py-2 bg-[#111820] border border-[#1e2d3d] rounded-lg text-sm font-mono text-[#4ade80] hover:bg-[#1a2332] transition-colors mc-btn"
            >
              {copied ? (
                <>
                  <Check size={14} /> 已复制
                </>
              ) : (
                <>
                  <Copy size={14} /> {SERVER_CONFIG.serverIP}
                </>
              )}
            </button>
            <a
              href={SERVER_CONFIG.discordInvite}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-[#5865f2] rounded-lg text-sm font-medium text-white hover:bg-[#4752c4] transition-colors mc-btn"
            >
              <ExternalLink size={14} /> Discord
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-[#64748b] hover:text-white"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0a0e14]/98 backdrop-blur-xl border-b border-[#1e2d3d] overflow-hidden"
          >
            <div className="px-4 py-4 space-y-2">
              {NAV_LINKS.map((link) => {
                const Icon = iconMap[link.icon] || Home;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all",
                      isActive
                        ? "bg-[#4ade80]/10 text-[#4ade80]"
                        : "text-[#64748b] hover:text-white hover:bg-white/5"
                    )}
                  >
                    <Icon size={18} />
                    {link.label}
                  </Link>
                );
              })}
              <div className="pt-3 border-t border-[#1e2d3d] flex flex-col gap-2">
                <button
                  onClick={handleCopyIP}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-[#111820] border border-[#1e2d3d] rounded-lg text-sm font-mono text-[#4ade80]"
                >
                  <Copy size={14} /> {SERVER_CONFIG.serverIP}
                </button>
                <a
                  href={SERVER_CONFIG.discordInvite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-[#5865f2] rounded-lg text-sm font-medium text-white"
                >
                  <ExternalLink size={14} /> 加入 Discord
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
