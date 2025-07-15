import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Car, MapPin, Clock, Users, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/components/auth/AuthContext";
import { useToast } from "@/hooks/use-toast";

const CreateRide = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    startLocation: "",
    destination: user?.officeLocation || "",
    departureTime: "",
    availableSeats: 1,
    isRecurring: false,
    pricePerSeat: "",
    notes: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'availableSeats' ? parseInt(value) || 1 : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.startLocation || !formData.destination || !formData.departureTime) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Ride created successfully!",
      description: "Your ride has been posted and colleagues can now request to join.",
    });
    
    navigate("/dashboard");
  };

  const timeSlots = [
    "06:00", "06:30", "07:00", "07:30", "08:00", "08:30", 
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00"
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto bg-gradient-primary p-4 rounded-full w-fit mb-4">
              <Car className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Offer a Ride</h1>
            <p className="text-muted-foreground">
              Share your journey with colleagues and make commuting more sustainable
            </p>
          </div>

          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Ride Details</CardTitle>
              <CardDescription>
                Fill in the details of your ride offer
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Route Information */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-lg font-semibold text-foreground">
                    <MapPin className="h-5 w-5 text-primary" />
                    <span>Route Information</span>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="startLocation">From (Starting Point) *</Label>
                      <Input
                        id="startLocation"
                        name="startLocation"
                        placeholder="e.g., Koramangala, Bangalore"
                        value={formData.startLocation}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="destination">To (Destination) *</Label>
                      <Input
                        id="destination"
                        name="destination"
                        placeholder="e.g., Tech Park, Bangalore"
                        value={formData.destination}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>

                {/* Timing */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-lg font-semibold text-foreground">
                    <Clock className="h-5 w-5 text-primary" />
                    <span>Timing</span>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="departureTime">Departure Time *</Label>
                      <Select onValueChange={(value) => setFormData(prev => ({ ...prev, departureTime: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select departure time" />
                        </SelectTrigger>
                        <SelectContent>
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
                      <div className="flex items-center justify-between">
                        <Label htmlFor="isRecurring">Daily Recurring Ride</Label>
                        <Switch
                          id="isRecurring"
                          checked={formData.isRecurring}
                          onCheckedChange={(checked) => 
                            setFormData(prev => ({ ...prev, isRecurring: checked }))
                          }
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Enable if this is a regular daily commute
                      </p>
                    </div>
                  </div>
                </div>

                {/* Capacity & Pricing */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-lg font-semibold text-foreground">
                    <Users className="h-5 w-5 text-primary" />
                    <span>Capacity & Pricing</span>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="availableSeats">Available Seats *</Label>
                      <Select onValueChange={(value) => setFormData(prev => ({ ...prev, availableSeats: parseInt(value) }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select seats" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4].map((seats) => (
                            <SelectItem key={seats} value={seats.toString()}>
                              {seats} {seats === 1 ? 'seat' : 'seats'}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="pricePerSeat">Price per Seat (₹)</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="pricePerSeat"
                          name="pricePerSeat"
                          type="number"
                          placeholder="e.g., 150"
                          className="pl-10"
                          value={formData.pricePerSeat}
                          onChange={handleInputChange}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Optional: Cost sharing for fuel/tolls
                      </p>
                    </div>
                  </div>
                </div>

                {/* Additional Notes */}
                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Input
                    id="notes"
                    name="notes"
                    placeholder="Any specific pickup points, preferences, or instructions..."
                    value={formData.notes}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Submit Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button type="submit" variant="hero" className="flex-1">
                    Post Ride Offer
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => navigate("/dashboard")}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Tips */}
          <Card className="mt-6 bg-muted/30">
            <CardContent className="pt-6">
              <h3 className="font-semibold text-foreground mb-3">Tips for a great ride offer:</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Be specific about pickup/drop points to help colleagues find you</li>
                <li>• Update your availability if plans change</li>
                <li>• Share your contact number for easy coordination</li>
                <li>• Consider cost-sharing for longer routes</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreateRide;