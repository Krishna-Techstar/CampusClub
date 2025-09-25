import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, MapPin, Users, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import heroEventImage from "@/assets/hero-event.jpg";

const HeroSection = () => {
  const [currentEventIndex, setCurrentEventIndex] = useState(0);

  const featuredEvents = [
    {
      title: "Annual Tech Symposium 2024",
      date: "Dec 15, 2024",
      location: "Main Auditorium",
      attendees: 250,
      description: "Join us for the biggest tech event of the year featuring industry leaders and innovative workshops."
    },
    {
      title: "Cultural Fest 2024",
      date: "Dec 18, 2024",
      location: "Open Ground",
      attendees: 320,
      description: "Experience the vibrant diversity of our campus through music, dance, and cultural performances."
    },
    {
      title: "Hackathon Championship",
      date: "Dec 22, 2024", 
      location: "Tech Lab",
      attendees: 180,
      description: "48-hour coding marathon with exciting prizes and opportunities to showcase your technical skills."
    }
  ];

  const currentEvent = featuredEvents[currentEventIndex];

  const handleExploreEvents = () => {
    const eventsSection = document.querySelector('#events');
    if (eventsSection) {
      eventsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLoginDashboard = () => {
    // TODO: Implement login functionality
    console.log('Login to Dashboard clicked');
  };

  const nextEvent = () => {
    setCurrentEventIndex((prev) => (prev + 1) % featuredEvents.length);
  };

  const prevEvent = () => {
    setCurrentEventIndex((prev) => (prev - 1 + featuredEvents.length) % featuredEvents.length);
  };

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(nextEvent, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-hero-gradient opacity-10" />
      
      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Discover, Register &{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Participate
                </span>{" "}
                in Campus Events
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Your one-stop platform for all campus events. Connect with clubs, attend amazing events, and never miss out on campus life.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-lg px-8 py-6 group" onClick={handleExploreEvents}>
                Explore Events
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-fast" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6" onClick={handleLoginDashboard}>
                Login to Dashboard
              </Button>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground">Active Clubs</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent">200+</div>
                <div className="text-sm text-muted-foreground">Events This Year</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">2K+</div>
                <div className="text-sm text-muted-foreground">Active Students</div>
              </div>
            </div>
          </div>

          {/* Right content - Featured Events Carousel */}
          <div className="animate-slide-up relative">
            <Card className="p-0 overflow-hidden shadow-large hover:shadow-2xl transition-shadow duration-normal group">
              <div className="relative">
                <img
                  src={heroEventImage}
                  alt={currentEvent.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-normal"
                />
                <div className="absolute top-4 right-4">
                  <div className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-medium">
                    Featured
                  </div>
                </div>
                
                {/* Navigation arrows */}
                <button
                  onClick={prevEvent}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-fast opacity-0 group-hover:opacity-100"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextEvent}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-fast opacity-0 group-hover:opacity-100"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <h3 className="text-2xl font-bold text-card-foreground">
                  {currentEvent.title}
                </h3>
                <p className="text-muted-foreground">
                  {currentEvent.description}
                </p>

                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-accent" />
                    {currentEvent.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-accent" />
                    {currentEvent.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-accent" />
                    {currentEvent.attendees} registered
                  </div>
                </div>

                <Button className="w-full mt-4 bg-accent-gradient hover:opacity-90 transition-opacity">
                  Register Now
                </Button>
              </div>
            </Card>
            
            {/* Carousel indicators */}
            <div className="flex justify-center mt-4 gap-2">
              {featuredEvents.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentEventIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-fast ${
                    index === currentEventIndex ? 'bg-accent w-6' : 'bg-muted-foreground/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;