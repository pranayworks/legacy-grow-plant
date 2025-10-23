import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter, Linkedin } from "lucide-react";
import { contactSchema } from "@/lib/validationSchemas";
import { z } from "zod";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const validated = contactSchema.parse(formData);
      const res = await fetch("http://localhost:5000/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: validated.name,
          email: validated.email,
          message: validated.message,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Failed to send message");
      }

      toast.success("Message sent successfully!", {
        description: "We'll get back to you within 24 hours."
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error("Validation failed", {
          description: error.errors[0].message
        });
      } else {
        toast.error("Failed to send message", {
          description: "Please try again later."
        });
      }
    }
  };

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 animate-fade-up">
            <h1 className="font-heading font-bold text-4xl md:text-5xl mb-4">
              Get in Touch
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have questions, suggestions, or want to learn more about GREEN LEGACY? 
              We'd love to hear from you!
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-8">
            {/* Contact Info */}
            <div className="md:col-span-2 space-y-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
              <Card className="p-6">
                <h2 className="font-heading font-bold text-2xl mb-6">Contact Information</h2>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold mb-1">Email</p>
                      <a href="mailto:info@greenlegacy.org" className="text-muted-foreground hover:text-primary transition-colors">
                        info@greenlegacy.org
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold mb-1">Phone</p>
                      <a href="tel:+919876543210" className="text-muted-foreground hover:text-primary transition-colors">
                        +91 98765 43210
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold mb-1">Office</p>
                      <p className="text-muted-foreground">
                        Hyderabad, Telangana<br />
                        India
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-primary/5 to-primary-light/5">
                <h3 className="font-heading font-semibold text-lg mb-4">Follow Us</h3>
                <div className="flex gap-3">
                  <a href="#" className="bg-card p-3 rounded-lg hover:bg-primary hover:text-white transition-all shadow-sm hover:shadow-md">
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a href="#" className="bg-card p-3 rounded-lg hover:bg-primary hover:text-white transition-all shadow-sm hover:shadow-md">
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a href="#" className="bg-card p-3 rounded-lg hover:bg-primary hover:text-white transition-all shadow-sm hover:shadow-md">
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a href="#" className="bg-card p-3 rounded-lg hover:bg-primary hover:text-white transition-all shadow-sm hover:shadow-md">
                    <Linkedin className="h-5 w-5" />
                  </a>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  Stay updated with our latest plantation drives, impact stories, and green initiatives
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="font-heading font-semibold text-lg mb-3">Office Hours</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Monday - Friday</span>
                    <span className="font-medium">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Saturday</span>
                    <span className="font-medium">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sunday</span>
                    <span className="font-medium">Closed</span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Contact Form */}
            <Card className="md:col-span-3 p-8 animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <h2 className="font-heading font-bold text-2xl mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name *</Label>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter your name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="What's this about?"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us more..."
                    rows={6}
                  />
                </div>

                <Button type="submit" size="lg" className="w-full font-heading font-semibold">
                  Send Message
                </Button>

                <p className="text-sm text-muted-foreground text-center">
                  We typically respond within 24 hours during business days
                </p>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
