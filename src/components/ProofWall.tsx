import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar, User } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ProofImage {
  id: string;
  imageUrl: string;
  donorName: string;
  treeType: string;
  location: string;
  date: string;
  geoTag?: string;
}

// Sample data - in production this would come from Supabase
const proofImages: ProofImage[] = [
  {
    id: "1",
    imageUrl: "/placeholder.svg",
    donorName: "Ananya Sharma",
    treeType: "Mango Tree",
    location: "Hyderabad, Telangana",
    date: "Oct 15, 2025",
    geoTag: "17.385,78.4867",
  },
  {
    id: "2",
    imageUrl: "/placeholder.svg",
    donorName: "Rahul & Priya",
    treeType: "Neem Tree",
    location: "Bangalore, Karnataka",
    date: "Oct 10, 2025",
    geoTag: "12.9716,77.5946",
  },
  {
    id: "3",
    imageUrl: "/placeholder.svg",
    donorName: "Tech Corp",
    treeType: "Banyan Tree",
    location: "Mumbai, Maharashtra",
    date: "Oct 5, 2025",
    geoTag: "19.076,72.8777",
  },
  {
    id: "4",
    imageUrl: "/placeholder.svg",
    donorName: "Kavya Reddy",
    treeType: "Guava Tree",
    location: "Chennai, Tamil Nadu",
    date: "Oct 8, 2025",
  },
  {
    id: "5",
    imageUrl: "/placeholder.svg",
    donorName: "Arjun Kumar",
    treeType: "Papaya Tree",
    location: "Pune, Maharashtra",
    date: "Oct 12, 2025",
  },
  {
    id: "6",
    imageUrl: "/placeholder.svg",
    donorName: "Green Warriors",
    treeType: "Tulsi Plant",
    location: "Delhi NCR",
    date: "Oct 14, 2025",
  },
];

export const ProofWall = () => {
  const [selectedImage, setSelectedImage] = useState<ProofImage | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
  };

  return (
    <div className="py-16">
      <div className="text-center mb-12">
        <h2 className="font-heading font-bold text-4xl mb-4">Proof Wall</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Real trees, real impact. Every image shows an actual tree planted by our donors.
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {proofImages.map((proof) => (
          <motion.div
            key={proof.id}
            variants={itemVariants}
            whileHover={{ scale: 1.03, y: -5 }}
            className="cursor-pointer group"
            onClick={() => setSelectedImage(proof)}
          >
            <div className="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-border">
              <div className="aspect-square bg-muted relative overflow-hidden">
                <img
                  src={proof.imageUrl}
                  alt={`${proof.treeType} planted by ${proof.donorName}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <div className="p-4 space-y-2">
                <h3 className="font-heading font-semibold text-lg line-clamp-1">
                  {proof.treeType}
                </h3>
                
                <div className="space-y-1 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span className="line-clamp-1">{proof.donorName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span className="line-clamp-1">{proof.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{proof.date}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-heading text-2xl">
              {selectedImage?.treeType}
            </DialogTitle>
          </DialogHeader>
          
          {selectedImage && (
            <div className="space-y-4">
              <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                <img
                  src={selectedImage.imageUrl}
                  alt={selectedImage.treeType}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <User className="h-5 w-5" />
                  <span className="font-semibold">Planted by:</span>
                  <span>{selectedImage.donorName}</span>
                </div>
                
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-5 w-5" />
                  <span className="font-semibold">Location:</span>
                  <span>{selectedImage.location}</span>
                </div>
                
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-5 w-5" />
                  <span className="font-semibold">Planting Date:</span>
                  <span>{selectedImage.date}</span>
                </div>
                
                {selectedImage.geoTag && (
                  <a
                    href={`https://www.google.com/maps?q=${selectedImage.geoTag}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:underline"
                  >
                    <MapPin className="h-4 w-4" />
                    View on Google Maps
                  </a>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
