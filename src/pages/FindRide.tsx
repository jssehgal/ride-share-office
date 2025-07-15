import { useState, useEffect } from "react";
import { Search, MapPin, Clock, Filter, Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import RideCard from "@/components/RideCard";
import { useToast } from "@/hooks/use-toast";

interface Ride {
  id: string;
  driverName: string;
  driverPhone: string;
  startLocation: string;
  destination: string;
  departureTime: string;
  availableSeats: number;
  isRecurring: boolean;
  pricePerSeat?: number;
  rating?: number;
}

const FindRide = () => {
  const { toast } = useToast();
  const [searchFilters, setSearchFilters] = useState({
    startLocation: "",
    destination: "",
    departureTime: "",
    maxPrice: ""
  });
  const [rides, setRides] = useState<Ride[]>([]);
  const [filteredRides, setFilteredRides] = useState<Ride[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Mock data
  useEffect(() => {
    const mockRides: Ride[] = [
      {
        id: '1',
        driverName: 'Rajesh Kumar',
        driverPhone: '+91 9876543210',
        startLocation: 'Koramangala',
        destination: 'Tech Park, Bangalore',
        departureTime: '08:30',
        availableSeats: 2,
        isRecurring: true,
        pricePerSeat: 150,
        rating: 4.8
      },
      {
        id: '2',
        driverName: 'Priya Sharma',
        driverPhone: '+91 9876543211',
        startLocation: 'Indiranagar',
        destination: 'Tech Park, Bangalore',
        departureTime: '09:00',
        availableSeats: 3,
        isRecurring: false,
        pricePerSeat: 120,
        rating: 4.9
      },
      {
        id: '3',
        driverName: 'Amit Patel',
        driverPhone: '+91 9876543212',
        startLocation: 'HSR Layout',
        destination: 'Tech Park, Bangalore',
        departureTime: '08:45',
        availableSeats: 1,
        isRecurring: true,
        pricePerSeat: 180,
        rating: 4.7
      },
      {
        id: '4',
        driverName: 'Sneha Reddy',
        driverPhone: '+91 9876543213',
        startLocation: 'Whitefield',
        destination: 'Tech Park, Bangalore',
        departureTime: '09:15',
        availableSeats: 2,
        isRecurring: true,
        pricePerSeat: 200,
        rating: 4.6
      },
      {
        id: '5',
        driverName: 'Karthik Iyer',
        driverPhone: '+91 9876543214',
        startLocation: 'Jayanagar',
        destination: 'Tech Park, Bangalore',
        departureTime: '08:15',
        availableSeats: 1,
        isRecurring: false,
        pricePerSeat: 140,
        rating: 4.8
      }
    ];
    setRides(mockRides);
    setFilteredRides(mockRides);
  }, []);

  const handleSearch = () => {
    setIsLoading(true);
    
    // Simulate search delay
    setTimeout(() => {
      let filtered = rides;
      
      if (searchFilters.startLocation) {
        filtered = filtered.filter(ride => 
          ride.startLocation.toLowerCase().includes(searchFilters.startLocation.toLowerCase())
        );
      }
      
      if (searchFilters.destination) {
        filtered = filtered.filter(ride => 
          ride.destination.toLowerCase().includes(searchFilters.destination.toLowerCase())
        );
      }
      
      if (searchFilters.departureTime) {
        filtered = filtered.filter(ride => ride.departureTime === searchFilters.departureTime);
      }
      
      if (searchFilters.maxPrice) {
        filtered = filtered.filter(ride => 
          !ride.pricePerSeat || ride.pricePerSeat <= parseInt(searchFilters.maxPrice)
        );
      }
      
      setFilteredRides(filtered);
      setIsLoading(false);
    }, 800);
  };

  const handleRequestRide = (rideId: string) => {
    const ride = rides.find(r => r.id === rideId);
    toast({
      title: "Ride request sent!",
      description: `Your request to join ${ride?.driverName}'s ride has been sent. They will contact you soon.`,
    });
  };

  const timeSlots = [
    "06:00", "06:30", "07:00", "07:30", "08:00", "08:30", 
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00"
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto bg-secondary p-4 rounded-full w-fit mb-4">
            <Search className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Find a Ride</h1>
          <p className="text-muted-foreground">
            Discover available rides from your colleagues
          </p>
        </div>

        {/* Search Filters */}
        <Card className="mb-8 shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Filter className="h-5 w-5" />
              <span>Search Filters</span>
            </CardTitle>
            <CardDescription>
              Filter rides based on your preferences
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div className="space-y-2">
                <Label htmlFor="startLocation">From</Label>
                <Input
                  id="startLocation"
                  placeholder="Starting location"
                  value={searchFilters.startLocation}
                  onChange={(e) => setSearchFilters(prev => ({ ...prev, startLocation: e.target.value }))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="destination">To</Label>
                <Input
                  id="destination"
                  placeholder="Destination"
                  value={searchFilters.destination}
                  onChange={(e) => setSearchFilters(prev => ({ ...prev, destination: e.target.value }))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="departureTime">Departure Time</Label>
                <Select onValueChange={(value) => setSearchFilters(prev => ({ ...prev, departureTime: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Any time</SelectItem>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        {new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
                          hour: 'numeric',
                          minute: '2-digit',
                          hour12: true
                        })}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="maxPrice">Max Price (₹)</Label>
                <Input
                  id="maxPrice"
                  type="number"
                  placeholder="Max price per seat"
                  value={searchFilters.maxPrice}
                  onChange={(e) => setSearchFilters(prev => ({ ...prev, maxPrice: e.target.value }))}
                />
              </div>
            </div>
            
            <div className="flex space-x-3">
              <Button onClick={handleSearch} disabled={isLoading} className="flex-1">
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4 mr-2" />
                    Search Rides
                  </>
                )}
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchFilters({ startLocation: "", destination: "", departureTime: "", maxPrice: "" });
                  setFilteredRides(rides);
                }}
              >
                Clear
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">
            Available Rides ({filteredRides.length})
          </h2>
          {filteredRides.length > 0 && (
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Car className="h-4 w-4" />
              <span className="text-sm">All rides verified with office employees</span>
            </div>
          )}
        </div>

        {/* Ride Results */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-4 bg-muted rounded mb-4"></div>
                  <div className="h-3 bg-muted rounded mb-2"></div>
                  <div className="h-3 bg-muted rounded mb-2"></div>
                  <div className="h-8 bg-muted rounded mt-4"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredRides.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRides.map((ride) => (
              <div key={ride.id} className="relative">
                {ride.isRecurring && (
                  <Badge className="absolute -top-2 -right-2 z-10 bg-secondary text-secondary-foreground">
                    Daily
                  </Badge>
                )}
                {ride.rating && (
                  <Badge className="absolute -top-2 -left-2 z-10 bg-primary text-primary-foreground">
                    ⭐ {ride.rating}
                  </Badge>
                )}
                <RideCard 
                  ride={ride} 
                  onRequestRide={handleRequestRide}
                />
              </div>
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <Car className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No rides found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search filters or check back later
              </p>
              <Button variant="outline" onClick={() => {
                setSearchFilters({ startLocation: "", destination: "", departureTime: "", maxPrice: "" });
                setFilteredRides(rides);
              }}>
                Show All Rides
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Call to Action */}
        {filteredRides.length === 0 && !isLoading && (
          <Card className="mt-8 bg-gradient-card">
            <CardContent className="text-center py-8">
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Can't find a ride?
              </h3>
              <p className="text-muted-foreground mb-4">
                Why not offer one yourself and help your colleagues?
              </p>
              <Button variant="hero" onClick={() => window.location.href = '/create-ride'}>
                Offer a Ride
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default FindRide;