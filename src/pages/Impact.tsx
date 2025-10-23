import { MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { StatsCounter } from "@/components/home/StatsCounter";
import { ProofWall } from "@/components/ProofWall";

const plantations = [
  {
    id: "GL1234",
    location: "Hyderabad, Telangana",
    donor: "Ananya",
    occasion: "Birthday",
    date: "October 2025",
    lat: 17.385,
    lng: 78.4867,
  },
  {
    id: "GL1235",
    location: "Bangalore, Karnataka",
    donor: "Rahul & Priya",
    occasion: "Wedding",
    date: "September 2025",
    lat: 12.9716,
    lng: 77.5946,
  },
  {
    id: "GL1236",
    location: "Mumbai, Maharashtra",
    donor: "Tech Corp",
    occasion: "Corporate CSR",
    date: "November 2025",
    lat: 19.076,
    lng: 72.8777,
  },
];

const Impact = () => {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-up">
            <h1 className="font-heading font-bold text-4xl md:text-5xl mb-4">
              Our Growing Impact
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Every tree tells a story. See the real-time impact of our community's 
              dedication to environmental conservation.
            </p>
          </div>

          {/* Stats Section */}
          <div className="mb-16 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <StatsCounter />
          </div>

          {/* Map Section */}
          <Card className="p-8 mb-16 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <h2 className="font-heading font-bold text-2xl mb-6">Plantation Locations</h2>
            <div className="bg-muted/30 rounded-xl h-[400px] flex items-center justify-center mb-6">
              <div className="text-center">
                <MapPin className="h-16 w-16 text-primary mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Interactive map with geo-tagged tree locations
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  (Map integration will be enabled with backend setup)
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              {plantations.map((plantation) => (
                <div 
                  key={plantation.id}
                  className="flex items-start gap-4 p-4 bg-card border rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="bg-primary/10 p-3 rounded-full">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="font-heading font-semibold text-lg">
                        Tree ID #{plantation.id}
                      </h3>
                      <span className="text-sm text-muted-foreground">{plantation.date}</span>
                    </div>
                    <p className="text-muted-foreground">
                      Planted by <span className="font-semibold text-foreground">{plantation.donor}</span> for their{" "}
                      <span className="font-semibold text-foreground">{plantation.occasion}</span>
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      📍 {plantation.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Pilot Drive Story */}
          <Card className="p-8 bg-gradient-to-br from-primary/5 to-primary-light/5 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <h2 className="font-heading font-bold text-3xl mb-6">Pilot Plantation Drive</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-heading font-semibold text-xl mb-4">The Beginning</h3>
                <p className="text-muted-foreground mb-4">
                  Our journey started with a vision: to transform how people celebrate life's 
                  special moments. On a sunny morning in October 2025, we brought together 
                  150 volunteers for our first major plantation drive.
                </p>
                <p className="text-muted-foreground mb-4">
                  In just one day, we planted over 500 trees across 5 acres, setting the 
                  foundation for what would become GREEN LEGACY's mission.
                </p>
              </div>
              <div>
                <h3 className="font-heading font-semibold text-xl mb-4">Impact Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-card rounded-lg">
                    <span className="font-medium">Trees Planted</span>
                    <span className="font-heading font-bold text-primary text-xl">500+</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-card rounded-lg">
                    <span className="font-medium">Volunteers</span>
                    <span className="font-heading font-bold text-primary text-xl">150</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-card rounded-lg">
                    <span className="font-medium">Area Covered</span>
                    <span className="font-heading font-bold text-primary text-xl">5 acres</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-card rounded-lg">
                    <span className="font-medium">CO₂ to be Absorbed</span>
                    <span className="font-heading font-bold text-primary text-xl">3 tons/year</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Proof Wall Section */}
          <div className="animate-fade-up" style={{ animationDelay: "0.4s" }}>
            <ProofWall />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Impact;
