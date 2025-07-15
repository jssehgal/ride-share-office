import { Calendar, Clock, MapPin, Users, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface RideCardProps {
  ride: {
    id: string;
    driverName: string;
    driverPhone: string;
    startLocation: string;
    destination: string;
    departureTime: string;
    availableSeats: number;
    isRecurring: boolean;
    pricePerSeat?: number;
  };
  onRequestRide?: (rideId: string) => void;
  showActions?: boolean;
}

const RideCard = ({ ride, onRequestRide, showActions = true }: RideCardProps) => {
  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <Card className="bg-gradient-card hover:shadow-card transition-all duration-300 hover:-translate-y-1 animate-scale-in">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold text-foreground">
            {ride.driverName}
          </CardTitle>
          {ride.isRecurring && (
            <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
              Daily
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <div className="flex items-center space-x-2 text-muted-foreground">
          <MapPin className="h-4 w-4 text-primary" />
          <span className="text-sm">{ride.startLocation}</span>
        </div>
        
        <div className="flex items-center space-x-2 text-muted-foreground">
          <MapPin className="h-4 w-4 text-secondary" />
          <span className="text-sm">{ride.destination}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Clock className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">{formatTime(ride.departureTime)}</span>
          </div>
          
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Users className="h-4 w-4 text-secondary" />
            <span className="text-sm">{ride.availableSeats} seats</span>
          </div>
        </div>

        {ride.pricePerSeat && (
          <div className="text-lg font-semibold text-primary">
            ₹{ride.pricePerSeat} per seat
          </div>
        )}
      </CardContent>
      
      {showActions && (
        <CardFooter className="pt-0 flex space-x-2">
          <Button 
            variant="hero" 
            className="flex-1"
            onClick={() => onRequestRide?.(ride.id)}
          >
            Request to Join
          </Button>
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => window.open(`tel:${ride.driverPhone}`)}
          >
            <Phone className="h-4 w-4" />
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default RideCard;