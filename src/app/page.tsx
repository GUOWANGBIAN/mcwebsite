import HeroSection from "@/components/home/HeroSection";
import ServerStatusCard from "@/components/home/ServerStatusCard";
import FeatureShowcase from "@/components/home/FeatureShowcase";
import QuickStartGuide from "@/components/home/QuickStartGuide";
import LatestNews from "@/components/home/LatestNews";
import DiscordBanner from "@/components/discord/DiscordBanner";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServerStatusCard />
      <FeatureShowcase />
      <QuickStartGuide />
      <LatestNews />
      <DiscordBanner />
    </>
  );
}
