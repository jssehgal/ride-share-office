import { useState, useEffect } from "react";
import { Car, Plus, Search, Calendar, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/components/auth/AuthContext";
import { useNavigate } from "react-router-dom";
import RideCard from "@/components/RideCard";

interface Ride {
  id: string;
  type: 'offered' | 'requested' | 'joined';
  driverName: string;
  driverPhone: string;
  startLocation: string;
  destination: string;
  departureTime: string;
  availableSeats: number;
  isRecurring: boolean;
  status: 'active' | 'pending' | 'completed';
  pricePerSeat?: number;
}

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [rides, setRides] = useState<Ride[]>([]);

  useEffect(() => {
    // Mock data for demonstration
    const mockRides: Ride[] = [
      {
        id: '1',
        type: 'offered',
        driverName: user?.name || 'You',
        driverPhone: user?.phone || '+91 9876543210',
        startLocation: 'Koramangala',
        destination: 'Tech Park, Bangalore',
        departureTime: '09:00',
        availableSeats: 3,
        isRecurring: true,
        status: 'active',
        pricePerSeat: 150
      },
      {
        id: '2',
        type: 'joined',
        driverName: 'Sarah Wilson',
        driverPhone: '+91 9876543211',
        startLocation: 'Indiranagar',
        destination: 'Tech Park, Bangalore',
        departureTime: '08:30',
        availableSeats: 2,
        isRecurring: false,
        status: 'active',
        pricePerSeat: 120
      },
      {
        id: '3',
        type: 'requested',
        driverName: 'Mike Johnson',
        driverPhone: '+91 9876543212',
        startLocation: 'HSR Layout',
        destination: 'Tech Park, Bangalore',
        departureTime: '09:15',
        availableSeats: 1,
        isRecurring: true,
        status: 'pending',
        pricePerSeat: 180
      }
    ];
    setRides(mockRides);
  }, [user]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-secondary text-secondary-foreground';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const stats = [
    {
      title: 'Rides Offered',
      value: rides.filter(r => r.type === 'offered').length,
      icon: Car,
      color: 'text-primary'
    },
    {
      title: 'Rides Joined',
      value: rides.filter(r => r.type === 'joined').length,
      icon: Users,
      color: 'text-secondary'
    },
    {
      title: 'Pending Requests',
      value: rides.filter(r => r.status === 'pending').length,
      icon: Clock,
      color: 'text-yellow-600'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-muted-foreground">
            Here's an overview of your carpooling activities
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-card transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="hover:shadow-card transition-all duration-300 hover:-translate-y-1 cursor-pointer" onClick={() => navigate('/create-ride')}>
            <CardHeader className="text-center">
              <div className="mx-auto bg-gradient-primary p-3 rounded-full w-fit mb-4">
                <Plus className="h-6 w-6 text-white" />
              </div>
              <CardTitle>Offer a Ride</CardTitle>
              <CardDescription>
                Share your car with colleagues traveling the same route
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-card transition-all duration-300 hover:-translate-y-1 cursor-pointer" onClick={() => navigate('/find-ride')}>
            <CardHeader className="text-center">
              <div className="mx-auto bg-secondary p-3 rounded-full w-fit mb-4">
                <Search className="h-6 w-6 text-white" />
              </div>
              <CardTitle>Find a Ride</CardTitle>
              <CardDescription>
                Search for available rides from your colleagues
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Recent Rides */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">Your Rides</h2>
            <Button variant="outline" onClick={() => navigate('/find-ride')}>
              <Search className="h-4 w-4 mr-2" />
              Find More Rides
            </Button>
          </div>

          {rides.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rides.map((ride) => (
                <div key={ride.id} className="relative">
                  <Badge 
                    className={`absolute -top-2 -right-2 z-10 ${getStatusColor(ride.status)}`}
                  >
                    {ride.status}
                  </Badge>
                  <div className="border-l-4 border-primary pl-1">
                    {ride.type === 'offered' && (
                      <Badge variant="secondary" className="mb-2">Offered by You</Badge>
                    )}
                    {ride.type === 'joined' && (
                      <Badge className="mb-2 bg-secondary text-secondary-foreground">Joined</Badge>
                    )}
                    {ride.type === 'requested' && (
                      <Badge variant="outline" className="mb-2">Requested</Badge>
                    )}
                    <RideCard 
                      ride={ride} 
                      showActions={ride.type === 'requested' && ride.status === 'pending'}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <Card className="text-center py-12">
              <CardContent>
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No rides yet</h3>
                <p className="text-muted-foreground mb-4">
                  Start by offering a ride or finding one to join
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button onClick={() => navigate('/create-ride')}>
                    Offer a Ride
                  </Button>
                  <Button variant="outline" onClick={() => navigate('/find-ride')}>
                    Find a Ride
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;