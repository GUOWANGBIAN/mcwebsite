"use client";

import { motion } from "framer-motion";
import { Calendar, Rocket, Star, PartyPopper, RefreshCw } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import timelineData from "@/data/timeline.json";

const typeIcons: Record<string, React.ElementType> = {
  founding: Rocket,
  milestone: Star,
  event: PartyPopper,
  update: RefreshCw,
};

const typeColors: Record<string, string> = {
  founding: "text-[#d4a853] bg-[#d4a853]/10 border-[#d4a853]/20",
  milestone: "text-[#e8a94e] bg-[#e8a94e]/10 border-[#e8a94e]/20",
  event: "text-[#7db87b] bg-[#7db87b]/10 border-[#7db87b]/20",
  update: "text-[#d4a853] bg-[#d4a853]/10 border-[#d4a853]/20",
};

export default function ServerTimeline() {
  const events = timelineData.slice(-6);

  return (
    <SectionWrapper
      title="发展历程"
      subtitle="一路走来，感谢有你的陪伴"
    >
      <div className="relative max-w-2xl mx-auto">
        {/* Timeline line */}
        <div className="timeline-line" />

        {/* Events */}
        <div className="space-y-10">
          {events.map((event, i) => {
            const Icon = typeIcons[event.type] || Calendar;
            const colorClass = typeColors[event.type] || typeColors.update;

            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
                className="relative pl-12 md:pl-14"
              >
                {/* Dot */}
                <div className={`absolute left-[0.6rem] md:left-[calc(50%-0.6rem)] top-1 w-5 h-5 rounded-full border-2 flex items-center justify-center ${colorClass}`}>
                  <Icon size={10} />
                </div>

                {/* Content */}
                <div className="glass rounded-xl p-5 transition-all duration-300 hover:border-[#d4a853]/12">
                  <time className="text-[#d4a853] text-xs font-mono">
                    {event.date}
                  </time>
                  <h3 className="text-white font-semibold mt-1.5 mb-2">
                    {event.title}
                  </h3>
                  <p className="text-[#8a8279] text-sm leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
