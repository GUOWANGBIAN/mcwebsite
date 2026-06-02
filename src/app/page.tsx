import HeroSection from "@/components/home/HeroSection";
import ServerStatusCard from "@/components/home/ServerStatusCard";
import ServerFeatures from "@/components/home/ServerFeatures";
import PlayerWorksGallery from "@/components/home/PlayerWorksGallery";
import ServerTimeline from "@/components/home/ServerTimeline";
import CommunityModule from "@/components/home/CommunityModule";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServerStatusCard />
      <ServerFeatures />
      <PlayerWorksGallery />
      <ServerTimeline />
      <CommunityModule />
    </>
  );
}
