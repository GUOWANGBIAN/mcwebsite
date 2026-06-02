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
          ? "bg-[#0f0e0b]/95 backdrop-blur-xl border-b border-[#2a2520]/60"
          : "bg-transparent"
      )}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 bg-[#d4a853] rounded-lg flex items-center justify-center text-black font-bold text-sm">
              云
            </div>
            <span className="text-lg font-bold text-white group-hover:text-[#d4a853] transition-colors">
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
                      ? "bg-[#d4a853]/10 text-[#d4a853]"
                      : "text-[#8a8279] hover:text-white hover:bg-white/5"
                  )}
                >
                  <Icon size={15} />
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={handleCopyIP}
              className="flex items-center gap-2 px-4 py-2 glass rounded-xl text-sm font-mono text-[#d4a853] hover:bg-[#23201a]/65 transition-colors min-w-[180px] justify-center"
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
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-[#8a8279] hover:text-white"
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
            className="md:hidden bg-[#0f0e0b]/98 backdrop-blur-xl border-b border-[#2a2520]/60 overflow-hidden"
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
                      "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                      isActive
                        ? "bg-[#d4a853]/10 text-[#d4a853]"
                        : "text-[#8a8279] hover:text-white hover:bg-white/5"
                    )}
                  >
                    <Icon size={18} />
                    {link.label}
                  </Link>
                );
              })}
              <div className="pt-3 border-t border-[#2a2520]/40">
                <button
                  onClick={handleCopyIP}
                  className="flex items-center justify-center gap-2 px-4 py-3 glass rounded-xl text-sm font-mono text-[#d4a853] w-full"
                >
                  <Copy size={14} /> {SERVER_CONFIG.serverIP}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
