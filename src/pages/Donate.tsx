import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Gift, Heart, Cake, Users, TreePine, Sparkles, Leaf, Apple, Flower } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface TreeSpecies {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string | null;
}

const occasions = [
  { value: "birthday", label: "Birthday", icon: Cake },
  { value: "wedding", label: "Wedding", icon: Heart },
  { value: "anniversary", label: "Anniversary", icon: Sparkles },
  { value: "corporate", label: "Corporate Event", icon: Users },
  { value: "memorial", label: "Memorial", icon: TreePine },
  { value: "other", label: "Other Celebration", icon: Gift },
];

const categoryConfig = {
  fruit: { label: "Fruit Trees", icon: Apple, color: "text-orange-500" },
  vegetable: { label: "Vegetable Plants", icon: Leaf, color: "text-green-600" },
  herb: { label: "Herbs", icon: Flower, color: "text-purple-500" },
  indoor: { label: "Indoor/Decorative", icon: TreePine, color: "text-blue-500" },
};

const Donate = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    occasion: "",
    treeCount: "1",
    message: "",
    selectedTree: "",
    customAmount: "",
  });
  const [treeSpecies, setTreeSpecies] = useState<TreeSpecies[]>([]);
  const [filteredTrees, setFilteredTrees] = useState<TreeSpecies[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTreeSpecies();
  }, []);

  useEffect(() => {
    filterTrees();
  }, [formData.customAmount, selectedCategory, treeSpecies]);

  const fetchTreeSpecies = async () => {
    try {
      const { data, error } = await supabase
        .from('tree_species')
        .select('*')
        .order('price', { ascending: true });

      if (error) throw error;
      setTreeSpecies(data || []);
      setFilteredTrees(data || []);
    } catch (error) {
      console.error('Error fetching tree species:', error);
      toast.error('Failed to load tree options');
    } finally {
      setLoading(false);
    }
  };

  const filterTrees = () => {
    let filtered = [...treeSpecies];

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(tree => tree.category === selectedCategory);
    }

    // Filter by custom amount
    if (formData.customAmount) {
      const amount = parseInt(formData.customAmount);
      if (!isNaN(amount)) {
        filtered = filtered.filter(tree => tree.price <= amount);
      }
    }

    setFilteredTrees(filtered);
  };

  const handleTreeSelection = (treeId: string) => {
    const selectedTree = treeSpecies.find(t => t.id === treeId);
    if (selectedTree) {
      setFormData({
        ...formData,
        selectedTree: treeId,
        customAmount: selectedTree.price.toString(),
        treeCount: "1",
      });
    }
  };

  const handleCustomAmountChange = (amount: string) => {
    setFormData({
      ...formData,
      customAmount: amount,
      selectedTree: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.selectedTree) {
      toast.error('Please select a tree to plant');
      return;
    }

    const selectedTree = treeSpecies.find(t => t.id === formData.selectedTree);
    if (!selectedTree) {
      toast.error('Invalid tree selection');
      return;
    }

    try {
      // Check if user is logged in
      const { data: { session } } = await supabase.auth.getSession();

      const donationData = {
        donor_name: formData.name,
        email: formData.email,
        phone: "",
        occasion: formData.occasion,
        amount: selectedTree.price,
        species_id: selectedTree.id,
        species_name: selectedTree.name,
        tree_id: `TREE-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`.toUpperCase(),
        user_id: session?.user?.id || null,
        location: formData.message,
      };

      // Navigate to payment page with donation data
      navigate('/payment', { state: { donationData } });
    } catch (error: any) {
      console.error('Error processing donation:', error);
      toast.error('Failed to process donation. Please try again.');
    }
  };

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-up">
            <h1 className="font-heading font-bold text-4xl md:text-5xl mb-4">
              Celebrate with a Tree
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Make your special occasion even more meaningful by planting trees. 
              Each tree comes with a personalized certificate and geo-tagged location.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Occasion Selection */}
            <Card className="p-8 animate-fade-up" style={{ animationDelay: "0.1s" }}>
              <h2 className="font-heading font-semibold text-2xl mb-6">Choose Your Occasion</h2>
              <div className="grid grid-cols-2 gap-4">
                {occasions.map((occasion) => {
                  const Icon = occasion.icon;
                  return (
                    <button
                      key={occasion.value}
                      onClick={() => setFormData({ ...formData, occasion: occasion.value })}
                      className={`p-4 rounded-xl border-2 transition-all text-left hover:shadow-md ${
                        formData.occasion === occasion.value
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <Icon className={`h-6 w-6 mb-2 ${
                        formData.occasion === occasion.value ? "text-primary" : "text-muted-foreground"
                      }`} />
                      <div className="font-medium">{occasion.label}</div>
                    </button>
                  );
                })}
              </div>
            </Card>

            {/* Pricing */}
            <Card className="p-4 sm:p-8 bg-gradient-to-br from-primary/5 to-primary-light/5 animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <h2 className="font-heading font-semibold text-xl sm:text-2xl mb-4 sm:mb-6">Your Contribution</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="customAmount">Enter Amount (Optional)</Label>
                  <Input
                    id="customAmount"
                    type="number"
                    min="0"
                    value={formData.customAmount}
                    onChange={(e) => handleCustomAmountChange(e.target.value)}
                    placeholder="Enter amount in ₹"
                    className="text-lg"
                  />
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {formData.customAmount 
                      ? `Showing trees up to ₹${formData.customAmount}`
                      : "Or select a tree below to auto-fill amount"}
                  </p>
                </div>
                
                {formData.selectedTree && (
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-primary text-white rounded-lg gap-2">
                    <div>
                      <span className="font-semibold block sm:inline">Selected Tree:</span>
                      <span className="font-medium block sm:inline sm:ml-2">
                        {treeSpecies.find(t => t.id === formData.selectedTree)?.name}
                      </span>
                    </div>
                    <span className="font-heading font-bold text-xl sm:text-2xl">
                      ₹{treeSpecies.find(t => t.id === formData.selectedTree)?.price.toLocaleString()}
                    </span>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Tree Selection */}
          <Card className="p-4 sm:p-8 animate-fade-up mb-8" style={{ animationDelay: "0.25s" }}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <h2 className="font-heading font-semibold text-xl sm:text-2xl">Select Your Tree</h2>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent className="bg-background border-border">
                  <SelectItem value="all">All Categories</SelectItem>
                  {Object.entries(categoryConfig).map(([key, config]) => (
                    <SelectItem key={key} value={key}>
                      {config.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <TreePine className="h-8 w-8 animate-pulse text-primary" />
              </div>
            ) : filteredTrees.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <p>No trees available in this price range or category.</p>
                <p className="text-sm mt-2">Try adjusting your filters or amount.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredTrees.map((tree) => {
                  const CategoryIcon = categoryConfig[tree.category as keyof typeof categoryConfig]?.icon || TreePine;
                  const categoryColor = categoryConfig[tree.category as keyof typeof categoryConfig]?.color || "text-green-500";
                  const isSelected = formData.selectedTree === tree.id;
                  
                  return (
                    <button
                      key={tree.id}
                      onClick={() => handleTreeSelection(tree.id)}
                      className={`p-4 rounded-xl border-2 transition-all text-left hover:shadow-md ${
                        isSelected
                          ? "border-primary bg-primary/5 shadow-md"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <CategoryIcon className={`h-6 w-6 ${isSelected ? "text-primary" : categoryColor}`} />
                        <span className="font-heading font-bold text-lg text-primary">
                          ₹{tree.price}
                        </span>
                      </div>
                      <h3 className="font-semibold mb-1">{tree.name}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
                        {tree.description}
                      </p>
                      <span className="text-xs text-muted-foreground capitalize mt-2 block">
                        {categoryConfig[tree.category as keyof typeof categoryConfig]?.label || tree.category}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </Card>

          {/* Donation Form */}
          <Card className="p-8 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name *</Label>
                  <Input
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your full name"
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
                <Label htmlFor="message">Personal Message (Optional)</Label>
                <Input
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Add a special message for your certificate"
                />
              </div>

              <div className="bg-muted/50 p-6 rounded-lg space-y-3">
                <h3 className="font-heading font-semibold text-lg">What You'll Receive:</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>Personalized tree certificate with unique Tree ID</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>Geo-tagged location of your planted tree</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>Regular updates on your tree's growth</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>Environmental impact report (CO₂ saved, water conserved)</span>
                  </li>
                </ul>
              </div>

              <Button 
                type="submit" 
                size="lg" 
                className="w-full font-heading font-semibold text-base sm:text-lg"
                disabled={!formData.occasion || !formData.name || !formData.email || !formData.selectedTree}
              >
                Proceed to Payment
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Donate;
