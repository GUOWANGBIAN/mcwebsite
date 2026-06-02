import HeroSection from "@/components/home/HeroSection";
import ServerFeatures from "@/components/home/ServerFeatures";
import PlayerWorksGallery from "@/components/home/PlayerWorksGallery";
import ServerTimeline from "@/components/home/ServerTimeline";
import RealtimeMonitoring from "@/components/home/RealtimeMonitoring";
import CommunityModule from "@/components/home/CommunityModule";

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
