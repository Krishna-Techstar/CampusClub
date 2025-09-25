import { Card } from "@/components/ui/card"; 
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, ExternalLink } from "lucide-react";

const ClubsSection = () => {
  const clubs = [
    {
      id: "1",
      name: "Tech Club",
      description: "Exploring cutting-edge technology through workshops, hackathons, and innovation projects.",
      logo: "🚀",
      members: 120,
      category: "Technology",
      color: "bg-blue-500",
      activeEvents: 3,
    },
    {
      id: "2", 
      name: "Cultural Society",
      description: "Celebrating diversity through music, dance, drama, and cultural exchange programs.",
      logo: "🎭",
      members: 200,
      category: "Cultural",
      color: "bg-pink-500",
      activeEvents: 5,
    },
    {
      id: "3",
      name: "Sports Club", 
      description: "Promoting fitness and sportsmanship through various athletic activities and tournaments.",
      logo: "⚽",
      members: 150,
      category: "Sports",
      color: "bg-green-500",
      activeEvents: 2,
    },
    {
      id: "4",
      name: "Academic Club", 
      description: "Enhancing learning through research projects, study groups, and academic competitions.",
      logo: "📚",
      members: 85,
      category: "Academic",
      color: "bg-purple-500",
      activeEvents: 4,
    },
    {
      id: "5",
      name: "Photography Club",
      description: "Capturing moments and stories through the lens, organizing exhibitions and photo walks.",
      logo: "📸",
      members: 95,
      category: "Arts",
      color: "bg-orange-500",
      activeEvents: 1,
    },
    {
      id: "6",
      name: "Environmental Club",
      description: "Working towards sustainability and environmental awareness through green initiatives.",
      logo: "🌱",
      members: 70,
      category: "Environment",
      color: "bg-emerald-500",
      activeEvents: 2,
    },
  ];

  return (
    <section id="clubs" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl font-bold mb-4">
            Active <span className="text-accent">Clubs</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join vibrant communities and connect with like-minded students. Find your passion and make lasting friendships.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clubs.map((club, index) => (
            <Card
              key={club.id} 
              className="group p-6 hover:shadow-medium transition-all duration-normal hover:-translate-y-1 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 ${club.color} rounded-full flex items-center justify-center text-2xl`}>
                    {club.logo}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold group-hover:text-primary transition-colors duration-fast">
                      {club.name}
                    </h3>
                    <Badge variant="secondary" className="text-xs">
                      {club.category}
                    </Badge>
                  </div>
                </div>
              </div>

              <p className="text-muted-foreground mb-4 line-clamp-3">
                {club.description}
              </p>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{club.members} members</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>{club.activeEvents} active events</span>
                  </div>
                </div>
              </div>

              <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-fast">
                <ExternalLink className="w-4 h-4 mr-2" />
                View Club
              </Button>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" variant="outline">
            View All Clubs
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ClubsSection;