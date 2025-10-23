import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, TreePine, Sparkles } from "lucide-react";
import { toast } from "sonner";

const plans = [
  {
    name: "Monthly Planter",
    price: "₹249",
    period: "/month",
    trees: "1 tree every month",
    popular: false,
    features: [
      "1 tree planted monthly",
      "Monthly impact report",
      "Digital certificates",
      "Geo-tagged locations",
      "Cancel anytime"
    ]
  },
  {
    name: "Quarterly Forest",
    price: "₹699",
    period: "/3 months",
    trees: "3 trees every 3 months",
    popular: true,
    features: [
      "3 trees planted quarterly",
      "Quarterly impact report",
      "Digital certificates",
      "Geo-tagged locations",
      "Priority tree locations",
      "Cancel anytime"
    ]
  },
  {
    name: "Annual Guardian",
    price: "₹2,499",
    period: "/year",
    trees: "12 trees every year",
    popular: false,
    features: [
      "12 trees planted annually",
      "Comprehensive annual report",
      "Premium certificates",
      "Choose plantation location",
      "Invitation to plantation drives",
      "Recognition on website",
      "Cancel anytime"
    ]
  }
];

const Subscribe = () => {
  const handleSubscribe = (planName: string) => {
    toast.success(`Great choice! Setting up ${planName}...`, {
      description: "You'll be redirected to payment gateway"
    });
  };

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-up">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
              <TreePine className="h-5 w-5 text-primary" />
              <span className="font-medium text-primary">Subscription Plans</span>
            </div>
            <h1 className="font-heading font-bold text-4xl md:text-5xl mb-4">
              Plant Trees Every Month
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Make environmental impact a habit. Subscribe to plant trees automatically 
              and watch your forest grow month after month.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {plans.map((plan, index) => (
              <Card 
                key={plan.name}
                className={`relative p-8 hover:shadow-xl transition-all animate-fade-up ${
                  plan.popular ? "border-2 border-primary shadow-lg scale-105" : ""
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-primary-light text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                    <Sparkles className="h-4 w-4" />
                    Most Popular
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="font-heading font-bold text-2xl mb-2">{plan.name}</h3>
                  <div className="flex items-end justify-center gap-1 mb-2">
                    <span className="font-heading font-bold text-4xl text-primary">{plan.price}</span>
                    <span className="text-muted-foreground mb-1">{plan.period}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{plan.trees}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className="w-full font-heading font-semibold"
                  variant={plan.popular ? "default" : "outline"}
                  onClick={() => handleSubscribe(plan.name)}
                >
                  Subscribe Now
                </Button>
              </Card>
            ))}
          </div>

          {/* Benefits Section */}
          <div className="grid md:grid-cols-2 gap-8 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <Card className="p-8 bg-gradient-to-br from-primary/5 to-primary-light/5">
              <h3 className="font-heading font-bold text-2xl mb-4">Why Subscribe?</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">→</span>
                  <span>Consistent environmental impact without thinking about it</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">→</span>
                  <span>Better value than one-time donations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">→</span>
                  <span>Track your growing forest in your personal dashboard</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">→</span>
                  <span>Cancel or pause anytime, no questions asked</span>
                </li>
              </ul>
            </Card>

            <Card className="p-8 bg-gradient-to-br from-secondary/5 to-accent/5">
              <h3 className="font-heading font-bold text-2xl mb-4">Subscriber Dashboard</h3>
              <p className="text-muted-foreground mb-4">
                All subscribers get access to a personalized dashboard where you can:
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                  <span>View all your planted trees on a map</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                  <span>Track total environmental impact</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                  <span>Download certificates anytime</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                  <span>Manage your subscription settings</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
