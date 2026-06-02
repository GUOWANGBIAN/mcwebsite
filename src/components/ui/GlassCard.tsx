"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  hover?: boolean;
}

export default function GlassCard({
  children,
  className,
  delay = 0,
  hover = true,
}: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={cn(
        "rounded-2xl p-6",
        "bg-[#1a1814]/55 backdrop-blur-xl border border-[#2a2520]/60",
        hover && "transition-all duration-300 hover:bg-[#23201a]/65 hover:border-[#d4a853]/12 hover:shadow-lg hover:shadow-[#d4a853]/[0.03]",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
