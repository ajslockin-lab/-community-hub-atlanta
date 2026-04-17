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
      <ParallaxSection bgImage="/images/atlanta-morning.jpg" className="pt-20">
        <div id="home">
          <HeroSection />
        </div>
      </ParallaxSection>

      {/* Afternoon Background */}
      <ParallaxSection bgImage="/images/atlanta-afternoon.jpg">
        <ResourceDirectory />
      </ParallaxSection>

      {/* Sunset Background */}
      <ParallaxSection bgImage="/images/atlanta-sunset.jpg">
        <SpotlightSection />
        <EventsCalendar />
      </ParallaxSection>

      {/* Night Background */}
      <ParallaxSection bgImage="/images/atlanta-night.jpg">
        <CommunityForums />
        <SubmitResource />
        <SiteFooter />
      </ParallaxSection>
    </main>
  );
}
