import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import EventCard from "./event-card";
import { Search, Filter } from "lucide-react";

const EventsSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", label: "All Events" },
    { id: "tech", label: "Tech" },
    { id: "cultural", label: "Cultural" },
    { id: "sports", label: "Sports" },
    { id: "academic", label: "Academic" },
    { id: "workshop", label: "Workshop" },
  ];

  // Mock event data
  const events = [
    {
      id: "1",
      title: "AI & Machine Learning Workshop",
      description: "Learn the fundamentals of AI and ML with hands-on projects and real-world applications.",
      date: "Dec 20, 2024",
      time: "10:00 AM - 4:00 PM",
      location: "Computer Lab A",
      club: "Tech Club",
      attendees: 45,
      maxCapacity: 60,
      image: "/api/placeholder/400/300",
      status: "upcoming" as const,
      category: "tech",
    },
    {
      id: "2",
      title: "Cultural Night 2024",
      description: "A spectacular evening of music, dance, and cultural performances from various communities.",
      date: "Dec 22, 2024",
      time: "6:00 PM - 10:00 PM",
      location: "Main Auditorium",
      club: "Cultural Society",
      attendees: 180,
      maxCapacity: 200,
      image: "/api/placeholder/400/300",
      status: "upcoming" as const,
      category: "cultural",
    },
    {
      id: "3",
      title: "Basketball Tournament",
      description: "Inter-college basketball championship with exciting matches and prizes.",
      date: "Dec 18, 2024",
      time: "9:00 AM - 6:00 PM",
      location: "Sports Complex",
      club: "Sports Club",
      attendees: 32,
      maxCapacity: 32,
      image: "/api/placeholder/400/300",
      status: "ongoing" as const,
      category: "sports",
    },
    {
      id: "4",
      title: "Research Paper Writing Workshop",
      description: "Learn how to write effective research papers and improve your academic writing skills.",
      date: "Dec 16, 2024",
      time: "2:00 PM - 5:00 PM",
      location: "Library Hall",
      club: "Academic Club",
      attendees: 25,
      maxCapacity: 40,
      image: "/api/placeholder/400/300",
      status: "upcoming" as const,
      category: "academic",
    },
    {
      id: "5",
      title: "Web Development Bootcamp",
      description: "Intensive 3-day bootcamp covering modern web development technologies and frameworks.",
      date: "Dec 25-27, 2024",
      time: "9:00 AM - 5:00 PM",
      location: "Tech Lab",
      club: "Coding Club",
      attendees: 38,
      maxCapacity: 50,
      image: "/api/placeholder/400/300",
      status: "upcoming" as const,
      category: "workshop",
    },
    {
      id: "6",
      title: "Photography Exhibition",
      description: "Showcase of stunning photography work by students, featuring various themes and styles.",
      date: "Dec 12, 2024",
      time: "10:00 AM - 6:00 PM",
      location: "Art Gallery",
      club: "Photography Club",
      attendees: 120,
      maxCapacity: 150,
      image: "/api/placeholder/400/300",
      status: "completed" as const,
      category: "cultural",
    },
  ];

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.club.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section id="events" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl font-bold mb-4">
            Upcoming <span className="text-accent">Events</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover amazing events happening on campus. From tech workshops to cultural nights, there's something for everyone.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8 animate-slide-up">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search events, clubs, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="lg:w-auto">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-8 animate-slide-up">
          {categories.map((category) => (
            <Badge
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "secondary"}
              className="cursor-pointer hover:scale-105 transition-transform duration-fast px-4 py-2"
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.label}
            </Badge>
          ))}
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-up">
          {filteredEvents.map((event, index) => (
            <div
              key={event.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <EventCard event={event} />
            </div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No events found matching your criteria.
            </p>
          </div>
        )}

        {/* Load More Button */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Events
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;