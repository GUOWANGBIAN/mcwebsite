import dynamic from "next/dynamic";
import HeroSection from "@/components/home/HeroSection";
import ServerFeatures from "@/components/home/ServerFeatures";
import ServerTimeline from "@/components/home/ServerTimeline";
import CommunityModule from "@/components/home/CommunityModule";

// Dynamic imports for heavier sections
const PlayerWorksGallery = dynamic(
  () => import("@/components/home/PlayerWorksGallery"),
  { ssr: false }
);
const RealtimeMonitoring = dynamic(
  () => import("@/components/home/RealtimeMonitoring"),
  { ssr: false }
);

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServerFeatures />
      <PlayerWorksGallery />
      <ServerTimeline />
      <RealtimeMonitoring />
      <CommunityModule />
    </>
  );
}
