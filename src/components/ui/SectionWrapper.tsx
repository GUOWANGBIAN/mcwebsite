"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  title?: string;
  subtitle?: string;
}

export default function SectionWrapper({
  children,
  className,
  id,
  title,
  subtitle,
}: SectionWrapperProps) {
  return (
    <section id={id} className={cn("py-20 px-4", className)}>
      <div className="max-w-6xl mx-auto">
        {(title || subtitle) && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-center mb-14"
          >
            {title && (
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-[#8a8279] text-lg max-w-2xl mx-auto leading-relaxed">
                {subtitle}
              </p>
            )}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
}
