import { Card } from "@/components/ui/card";
import { Users, Calendar, Trophy, Target } from "lucide-react";

const AboutSection = () => {
  const features = [
    {
      icon: Calendar,
      title: "Easy Registration",
      description: "Register for events with just a few clicks and get instant confirmation."
    },
    {
      icon: Users,
      title: "Club Management", 
      description: "Clubs can easily create and manage their events with our comprehensive tools."
    },
    {
      icon: Trophy,
      title: "Achievement Tracking",
      description: "Track your participation and build your campus involvement portfolio."
    },
    {
      icon: Target,
      title: "Smart Notifications",
      description: "Never miss an event with our intelligent notification system."
    }
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold mb-4">
            About <span className="text-accent">CampusEvents</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your comprehensive platform for campus event management. We connect students with exciting opportunities 
            and help clubs organize memorable events that build lasting communities.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="p-6 text-center hover:shadow-lg transition-shadow duration-normal animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 bg-accent-gradient rounded-lg flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-6 h-6 text-accent-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </Card>
          ))}
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="p-8 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                To create a vibrant campus community where every student can discover, participate in, and 
                contribute to meaningful events. We believe that campus life extends beyond academics, and 
                our platform serves as the bridge connecting students with opportunities for growth, 
                networking, and unforgettable experiences.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;