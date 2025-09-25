import Navbar from "@/components/ui/navbar";
import HeroSection from "@/components/ui/hero-section";
import EventsSection from "@/components/ui/events-section";
import ClubsSection from "@/components/ui/clubs-section";
import AboutSection from "@/components/ui/about-section";
import ContactSection from "@/components/ui/contact-section";
import Footer from "@/components/ui/footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <EventsSection />
        <ClubsSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
