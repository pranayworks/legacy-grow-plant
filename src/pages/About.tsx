import { Card } from "@/components/ui/card";
import { Leaf, Target, Heart, Users } from "lucide-react";
import { AnimatedTimeline } from "@/components/AnimatedTimeline";

const About = () => {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 animate-fade-up">
            <h1 className="font-heading font-bold text-4xl md:text-5xl mb-4">
              Our Story
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              GREEN LEGACY was born from a simple yet powerful idea: 
              What if every celebration could leave a lasting positive impact on our planet?
            </p>
          </div>

          {/* Vision Card */}
          <Card className="p-8 mb-8 bg-gradient-to-br from-primary/5 to-primary-light/5 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <div className="flex items-start gap-4 mb-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="font-heading font-bold text-2xl mb-2">Our Vision</h2>
                <p className="text-muted-foreground">
                  To create a world where every celebration becomes a step towards environmental restoration. 
                  We envision a future where planting trees is as natural a part of celebrations as cutting cakes, 
                  and where every special moment contributes to a greener, healthier planet for generations to come.
                </p>
              </div>
            </div>
          </Card>

          {/* Mission Card */}
          <Card className="p-8 mb-8 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <div className="flex items-start gap-4 mb-4">
              <div className="bg-secondary/10 p-3 rounded-full">
                <Leaf className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <h2 className="font-heading font-bold text-2xl mb-2">Our Mission</h2>
                <p className="text-muted-foreground mb-4">
                  Transform celebrations into tree plantation rituals by:
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold mt-1">•</span>
                    <span>Making tree planting accessible, meaningful, and memorable for everyone</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold mt-1">•</span>
                    <span>Creating a transparent system where donors can track their environmental impact</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold mt-1">•</span>
                    <span>Building a community of environmental champions who celebrate responsibly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold mt-1">•</span>
                    <span>Combating climate change one celebration at a time</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Founder Story */}
          <Card className="p-8 mb-8 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <div className="flex items-start gap-4 mb-4">
              <div className="bg-accent/10 p-3 rounded-full">
                <Heart className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h2 className="font-heading font-bold text-2xl mb-2">Founder's Vision</h2>
                <p className="text-muted-foreground mb-4">
                  <span className="font-semibold text-foreground">Pranay</span>, the founder of GREEN LEGACY, 
                  has always been passionate about environmental conservation. The idea for GREEN LEGACY came 
                  during his own birthday celebration when he wondered:
                </p>
                <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground mb-4">
                  "What if instead of just celebrating for a day, we could create something that grows and 
                  gives back to the planet for years to come? What if every birthday, wedding, and special 
                  moment could become a seed of hope for our environment?"
                </blockquote>
                <p className="text-muted-foreground">
                  This simple question led to the creation of GREEN LEGACY - a social startup that bridges 
                  the gap between personal celebrations and environmental action.
                </p>
              </div>
            </div>
          </Card>

          {/* Team Section */}
          <Card className="p-8 bg-gradient-to-br from-primary/5 to-secondary/5 animate-fade-up" style={{ animationDelay: "0.4s" }}>
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="font-heading font-bold text-2xl mb-4">Our Team</h2>
                <p className="text-muted-foreground mb-6">
                  GREEN LEGACY is powered by a passionate team of environmentalists, tech enthusiasts, 
                  and community organizers who believe in the power of collective action.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-4 bg-card rounded-lg">
                    <h3 className="font-heading font-semibold text-lg mb-1">Pranay</h3>
                    <p className="text-sm text-primary mb-2">Founder & CEO</p>
                    <p className="text-sm text-muted-foreground">
                      Visionary leader driving GREEN LEGACY's mission to transform celebrations into environmental action.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-card rounded-lg">
                    <h3 className="font-heading font-semibold text-lg mb-1">Operations Team</h3>
                    <p className="text-sm text-primary mb-2">Field & Logistics</p>
                    <p className="text-sm text-muted-foreground">
                      Managing plantation drives, tree maintenance, and ensuring every tree thrives.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-card rounded-lg">
                    <h3 className="font-heading font-semibold text-lg mb-1">Technology Team</h3>
                    <p className="text-sm text-primary mb-2">Platform & Innovation</p>
                    <p className="text-sm text-muted-foreground">
                      Building the tech infrastructure for seamless donations and impact tracking.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-card rounded-lg">
                    <h3 className="font-heading font-semibold text-lg mb-1">Community Team</h3>
                    <p className="text-sm text-primary mb-2">Engagement & Support</p>
                    <p className="text-sm text-muted-foreground">
                      Connecting with donors, organizing events, and growing our green community.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Journey Timeline */}
          <div className="mt-16 animate-fade-up" style={{ animationDelay: "0.5s" }}>
            <h2 className="font-heading font-bold text-3xl text-center mb-12">Our Journey</h2>
            <AnimatedTimeline />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
