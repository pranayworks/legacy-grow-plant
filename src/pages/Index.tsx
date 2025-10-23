import { Link } from "react-router-dom";
import { ArrowRight, TreePine, Droplets, Wind } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatsCounter } from "@/components/home/StatsCounter";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import heroPlantation from "@/assets/hero-plantation.jpg";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroPlantation})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/90 via-primary/80 to-primary-light/70" />
        </div>
        
        <div className="container relative z-10 mx-auto px-4 py-20 text-center text-white">
          <h1 className="font-heading font-bold text-4xl md:text-6xl lg:text-7xl mb-6 animate-fade-up">
            Turn Every Celebration<br />Into a Forest 
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto font-light animate-fade-up opacity-90" style={{ animationDelay: "0.1s" }}>
            Transform your celebrations into meaningful tree plantation rituals.<br />
            Every birthday, wedding, and special moment can become a lasting gift to our planet.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <Button 
              asChild 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 hover:scale-105 font-heading font-semibold text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all"
            >
              <Link to="/donate">
                Plant My Tree <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button 
              asChild 
              size="lg" 
              variant="outline"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary hover:scale-105 font-heading font-semibold text-lg px-8 py-6 transition-all"
            >
              <Link to="/impact">
                Explore Impact
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <StatsCounter />
        </div>
      </section>

      {/* Carousel Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-center mb-4">
            Every Celebration Counts
          </h2>
          <p className="text-center text-muted-foreground text-lg mb-12 max-w-2xl mx-auto">
            See how families and organizations are making their special moments even more meaningful
          </p>
          <HeroCarousel />
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-primary-light/5">
        <div className="container mx-auto px-4">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-center mb-12">
            Your Impact Matters
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-card p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TreePine className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-xl mb-3">Real Trees Planted</h3>
              <p className="text-muted-foreground">
                Every donation directly funds the planting and maintenance of real trees with geo-tagged locations.
              </p>
            </div>
            
            <div className="bg-card p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wind className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="font-heading font-semibold text-xl mb-3">Climate Action</h3>
              <p className="text-muted-foreground">
                Combat climate change while creating meaningful memories. Track CO₂ absorption in real-time.
              </p>
            </div>
            
            <div className="bg-card p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Droplets className="h-8 w-8 text-accent" />
              </div>
              <h3 className="font-heading font-semibold text-xl mb-3">Water Conservation</h3>
              <p className="text-muted-foreground">
                Each tree helps conserve thousands of liters of water and restore natural ecosystems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-light text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading font-bold text-3xl md:text-5xl mb-6">
            Ready to Make Your Celebration Count?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of people who've transformed their special moments into lasting environmental impact
          </p>
          <Button 
            asChild 
            size="lg"
            className="bg-white text-primary hover:bg-white/90 font-heading font-semibold text-lg px-8 py-6 shadow-lg"
          >
            <Link to="/donate">
              Plant Your First Tree <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
