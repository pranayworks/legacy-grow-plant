import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Users, Building2, Heart, Sprout, Download } from "lucide-react";
import { volunteerSchema, csrSchema } from "@/lib/validationSchemas";
import { z } from "zod";

const GetInvolved = () => {
  const [volunteerForm, setVolunteerForm] = useState({
    name: "",
    email: "",
    phone: "",
    skills: "",
  });

  const [csrForm, setCsrForm] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleVolunteerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const validated = volunteerSchema.parse(volunteerForm);
      const res = await fetch("http://localhost:5000/volunteer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: validated.name,
          email: validated.email,
          phone: validated.phone,
          interest: validated.skills || "",
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Failed to submit application");
      }

      toast.success("Thank you for volunteering!", {
        description: "We'll contact you soon about upcoming plantation drives."
      });
      setVolunteerForm({ name: "", email: "", phone: "", skills: "" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error("Validation failed", {
          description: error.errors[0].message
        });
      } else {
        toast.error("Failed to submit application", {
          description: "Please try again later."
        });
      }
    }
  };

  const handleCSRSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const validated = csrSchema.parse({
        company_name: csrForm.companyName,
        contact_person: csrForm.contactPerson,
        email: csrForm.email,
        phone: csrForm.phone,
        message: csrForm.message
      });
      const res = await fetch("http://localhost:5000/csr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company: validated.company_name,
          contactPerson: validated.contact_person,
          email: validated.email,
          phone: validated.phone,
          proposal: validated.message || "",
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Failed to submit inquiry");
      }

      toast.success("Thank you for your interest!", {
        description: "Our CSR team will reach out to discuss partnership opportunities."
      });
      setCsrForm({ companyName: "", contactPerson: "", email: "", phone: "", message: "" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error("Validation failed", {
          description: error.errors[0].message
        });
      } else {
        toast.error("Failed to submit inquiry", {
          description: "Please try again later."
        });
      }
    }
  };

  const exportToExcel = async (type: 'volunteers' | 'csr') => {
    try {
      const endpoint = type === 'volunteers' 
        ? 'http://localhost:5000/export-volunteers' 
        : 'http://localhost:5000/export-csrs';
      const res = await fetch(endpoint);
      if (!res.ok) throw new Error('Failed to export');
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${type}.xlsx`;
      a.click();
      window.URL.revokeObjectURL(url);
      toast.success("Export successful!");
    } catch (error) {
      toast.error("Export failed", {
        description: "Please try again later."
      });
    }
  };

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 animate-fade-up">
            <h1 className="font-heading font-bold text-4xl md:text-5xl mb-4">
              Get Involved
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join our mission to make the planet greener. Whether you want to volunteer 
              or partner with us, there's a place for you in the GREEN LEGACY family.
            </p>
          </div>

          <Tabs defaultValue="volunteer" className="animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="volunteer" className="text-lg">
                <Users className="h-5 w-5 mr-2" />
                Volunteer
              </TabsTrigger>
              <TabsTrigger value="csr" className="text-lg">
                <Building2 className="h-5 w-5 mr-2" />
                Corporate CSR
              </TabsTrigger>
            </TabsList>

            <TabsContent value="volunteer">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Info Card */}
                <Card className="p-8 bg-gradient-to-br from-primary/5 to-primary-light/5">
                  <div className="flex items-start gap-3 mb-6">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Heart className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h2 className="font-heading font-bold text-2xl mb-2">Why Volunteer?</h2>
                      <p className="text-muted-foreground">
                        Be part of something bigger. Make a tangible difference in environmental conservation.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Sprout className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold mb-1">Plantation Drives</h3>
                        <p className="text-sm text-muted-foreground">
                          Join our monthly plantation drives and get your hands dirty for a good cause
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Users className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold mb-1">Community Events</h3>
                        <p className="text-sm text-muted-foreground">
                          Help organize awareness campaigns and community engagement activities
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Heart className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold mb-1">Tree Maintenance</h3>
                        <p className="text-sm text-muted-foreground">
                          Support our team in watering and caring for newly planted trees
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-card rounded-lg">
                    <p className="text-sm font-medium mb-2">Next Volunteer Drive</p>
                    <p className="text-sm text-muted-foreground">
                      📅 Last Saturday of every month<br />
                      📍 Location shared with registered volunteers<br />
                      ⏰ 7:00 AM - 11:00 AM
                    </p>
                  </div>
                </Card>

                {/* Form Card */}
                <Card className="p-8">
                  <h2 className="font-heading font-bold text-2xl mb-6">Volunteer Sign-up</h2>
                  <form onSubmit={handleVolunteerSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="v-name">Full Name *</Label>
                      <Input
                        id="v-name"
                        required
                        value={volunteerForm.name}
                        onChange={(e) => setVolunteerForm({ ...volunteerForm, name: e.target.value })}
                        placeholder="Enter your name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="v-email">Email Address *</Label>
                      <Input
                        id="v-email"
                        type="email"
                        required
                        value={volunteerForm.email}
                        onChange={(e) => setVolunteerForm({ ...volunteerForm, email: e.target.value })}
                        placeholder="your@email.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="v-phone">Phone Number *</Label>
                      <Input
                        id="v-phone"
                        type="tel"
                        required
                        value={volunteerForm.phone}
                        onChange={(e) => setVolunteerForm({ ...volunteerForm, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="v-skills">Skills/Interests (Optional)</Label>
                      <Textarea
                        id="v-skills"
                        value={volunteerForm.skills}
                        onChange={(e) => setVolunteerForm({ ...volunteerForm, skills: e.target.value })}
                        placeholder="e.g., photography, social media, event management, gardening"
                        rows={3}
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full font-heading font-semibold">
                      Sign Up to Volunteer
                    </Button>
                  </form>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="csr">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Info Card */}
                <Card className="p-8 bg-gradient-to-br from-secondary/5 to-accent/5">
                  <div className="flex items-start gap-3 mb-6">
                    <div className="bg-secondary/10 p-3 rounded-full">
                      <Building2 className="h-6 w-6 text-secondary" />
                    </div>
                    <div>
                      <h2 className="font-heading font-bold text-2xl mb-2">Corporate Partnership</h2>
                      <p className="text-muted-foreground">
                        Align your corporate social responsibility with environmental action
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <h3 className="font-heading font-semibold text-lg">Partnership Benefits</h3>
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold mt-1">✓</span>
                        <span>Dedicated plantation drives for your organization</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold mt-1">✓</span>
                        <span>Branded certificates and recognition materials</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold mt-1">✓</span>
                        <span>Regular impact reports and sustainability metrics</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold mt-1">✓</span>
                        <span>Employee engagement opportunities</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold mt-1">✓</span>
                        <span>Media coverage and social media promotion</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold mt-1">✓</span>
                        <span>Logo recognition on our website and materials</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 bg-card rounded-lg">
                    <p className="font-semibold mb-2">Bulk Sponsorship Options</p>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p>🌳 100 trees - ₹25,000</p>
                      <p>🌳 500 trees - ₹1,20,000</p>
                      <p>🌳 1000+ trees - Custom quote</p>
                    </div>
                  </div>
                </Card>

                {/* Form Card */}
                <Card className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-heading font-bold text-2xl">Partnership Inquiry</h2>
                    
                  </div>
                  <form onSubmit={handleCSRSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="c-company">Company Name *</Label>
                      <Input
                        id="c-company"
                        required
                        value={csrForm.companyName}
                        onChange={(e) => setCsrForm({ ...csrForm, companyName: e.target.value })}
                        placeholder="Your company name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="c-contact">Contact Person *</Label>
                      <Input
                        id="c-contact"
                        required
                        value={csrForm.contactPerson}
                        onChange={(e) => setCsrForm({ ...csrForm, contactPerson: e.target.value })}
                        placeholder="Full name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="c-email">Email Address *</Label>
                      <Input
                        id="c-email"
                        type="email"
                        required
                        value={csrForm.email}
                        onChange={(e) => setCsrForm({ ...csrForm, email: e.target.value })}
                        placeholder="contact@company.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="c-phone">Phone Number *</Label>
                      <Input
                        id="c-phone"
                        type="tel"
                        required
                        value={csrForm.phone}
                        onChange={(e) => setCsrForm({ ...csrForm, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="c-message">Message (Optional)</Label>
                      <Textarea
                        id="c-message"
                        value={csrForm.message}
                        onChange={(e) => setCsrForm({ ...csrForm, message: e.target.value })}
                        placeholder="Tell us about your CSR goals and expected scale"
                        rows={4}
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full font-heading font-semibold">
                      Submit Partnership Inquiry
                    </Button>
                  </form>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default GetInvolved;
