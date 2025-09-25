import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Clock } from "lucide-react";

interface EventCardProps {
  event: {
    id: string;
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    club: string;
    attendees: number;
    maxCapacity: number;
    image: string;
    status: "upcoming" | "ongoing" | "completed";
    category: string;
  };
}

const EventCard = ({ event }: EventCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "ongoing":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "completed":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      tech: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      cultural: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
      sports: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      academic: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      workshop: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
    };
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  return (
    <Card className="group overflow-hidden hover:shadow-medium transition-all duration-normal hover:-translate-y-1">
      <div className="relative">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-normal"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge className={getStatusColor(event.status)} variant="secondary">
            {event.status}
          </Badge>
          <Badge className={getCategoryColor(event.category)} variant="secondary">
            {event.category}
          </Badge>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold line-clamp-2 group-hover:text-primary transition-colors duration-fast">
            {event.title}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-2">
            {event.description}
          </p>
          <p className="text-sm font-medium text-accent">
            by {event.club}
          </p>
        </div>

        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-accent" />
            {event.date}
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-accent" />
            {event.time}
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-accent" />
            {event.location}
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-accent" />
            {event.attendees}/{event.maxCapacity} registered
          </div>
        </div>

        <div className="pt-2">
          {event.status === "upcoming" ? (
            <Button className="w-full" disabled={event.attendees >= event.maxCapacity}>
              {event.attendees >= event.maxCapacity ? "Event Full" : "Register"}
            </Button>
          ) : event.status === "ongoing" ? (
            <Button variant="outline" className="w-full">
              View Details
            </Button>
          ) : (
            <Button variant="secondary" className="w-full" disabled>
              Event Ended
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default EventCard;