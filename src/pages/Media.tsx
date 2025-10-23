import { Card } from "@/components/ui/card";
import { Play } from "lucide-react";
import celebrationTrees from "@/assets/celebration-trees.jpg";
import volunteersPlanting from "@/assets/volunteers-planting.jpg";
import forestAerial from "@/assets/forest-aerial.jpg";
import heroPlantation from "@/assets/hero-plantation.jpg";

const galleryItems = [
  {
    type: "image",
    src: heroPlantation,
    title: "Pilot Plantation Drive 2025",
    description: "Our first major drive with 150 volunteers planting 500+ trees"
  },
  {
    type: "image",
    src: volunteersPlanting,
    title: "Community in Action",
    description: "Volunteers from all walks of life coming together for a greener future"
  },
  {
    type: "image",
    src: celebrationTrees,
    title: "Birthday Celebration",
    description: "Making birthdays meaningful with tree plantations"
  },
  {
    type: "image",
    src: forestAerial,
    title: "Growing Forest",
    description: "Aerial view of our thriving plantation site"
  },
  {
    type: "video",
    src: "",
    title: "Plantation Drive Highlights",
    description: "Watch our community in action"
  },
  {
    type: "video",
    src: "",
    title: "Impact Story: Ananya's Forest",
    description: "How one birthday celebration started a green legacy"
  }
];

const Media = () => {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-up">
            <h1 className="font-heading font-bold text-4xl md:text-5xl mb-4">
              Media Gallery
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Witness the growth of our green movement through photos and videos 
              from our plantation drives and community events.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.map((item, index) => (
              <Card 
                key={index}
                className="group overflow-hidden cursor-pointer hover:shadow-xl transition-all animate-fade-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="relative aspect-video overflow-hidden">
                  {item.type === "image" ? (
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary-light/20 flex items-center justify-center">
                      <div className="text-center">
                        <div className="bg-white/90 rounded-full p-4 inline-flex mb-2 group-hover:scale-110 transition-transform">
                          <Play className="h-8 w-8 text-primary" />
                        </div>
                        <p className="text-sm text-muted-foreground px-4">
                          Video will be available soon
                        </p>
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-4">
                  <h3 className="font-heading font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>

          {/* Call to Action */}
          <Card className="mt-12 p-8 bg-gradient-to-br from-primary/5 to-primary-light/5 text-center animate-fade-up">
            <h2 className="font-heading font-bold text-2xl mb-3">
              Want to be Featured?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Plant trees with us and share your celebration story! 
              The best stories get featured in our media gallery and social channels.
            </p>
            <p className="text-sm text-muted-foreground">
              Tag us on social media with #GreenLegacy #PlantAMemory
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Media;
