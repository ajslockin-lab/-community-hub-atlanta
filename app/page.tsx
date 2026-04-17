import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { ResourceDirectory } from "@/components/resource-directory";
import { SpotlightSection } from "@/components/spotlight-section";
import { EventsCalendar } from "@/components/events-calendar";
import { CommunityForums } from "@/components/community-forums";
import { SubmitResource } from "@/components/submit-resource";
import { SiteFooter } from "@/components/site-footer";
import { ParallaxSection } from "@/components/ui/parallax-section";

export default function Home() {
  return (
    <main className="relative w-full">
      <Navigation />

      {/* Morning Background */}
      <ParallaxSection bgImage="/atlanta-morning.webp" className="pt-20">
        <div id="home">
          <HeroSection />
        </div>
      </ParallaxSection>

      {/* Afternoon Background */}
      <ParallaxSection bgImage="/atlanta-afternoon.webp">
        <ResourceDirectory />
      </ParallaxSection>

      {/* Sunset Background */}
      <ParallaxSection bgImage="/atlanta-sunset.webp">
        <SpotlightSection />
        <EventsCalendar />
      </ParallaxSection>

      {/* Night Background */}
      <ParallaxSection bgImage="/atlanta-night.webp">
        <CommunityForums />
        <SubmitResource />
        <SiteFooter />
      </ParallaxSection>
    </main>
  );
}
