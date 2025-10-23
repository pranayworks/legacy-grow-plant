import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { TreePine, ArrowLeft } from "lucide-react";

interface TreeSpecies {
  id: string;
  name: string;
  price: number;
  description: string;
  image_url: string | null;
}

const ChooseTree = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [species, setSpecies] = useState<TreeSpecies[]>([]);
  const [selectedSpecies, setSelectedSpecies] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const donationData = location.state?.donationData;

  useEffect(() => {
    if (!donationData) {
      navigate('/donate');
      return;
    }
    fetchTreeSpecies();
  }, [donationData, navigate]);

  const fetchTreeSpecies = async () => {
    try {
      const { data, error } = await supabase
        .from('tree_species')
        .select('*')
        .lte('price', donationData.amount)
        .order('price', { ascending: false });

      if (error) throw error;
      setSpecies(data || []);
    } catch (error) {
      toast.error("Failed to load tree species");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmTree = async () => {
    if (!selectedSpecies) {
      toast.error("Please select a tree species");
      return;
    }

    try {
      const treeId = `GL-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      
      const { error } = await supabase.from('trees').insert({
        tree_id: treeId,
        donor_name: donationData.name,
        email: donationData.email,
        phone: donationData.phone,
        occasion: donationData.occasion,
        location: donationData.location,
        amount: donationData.amount,
        species_id: selectedSpecies,
      });

      if (error) throw error;

      toast.success("Tree planted successfully!", {
        description: `Your tree ID is: ${treeId}`
      });

      navigate('/impact');
    } catch (error) {
      toast.error("Failed to plant tree", {
        description: "Please try again later."
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <TreePine className="h-12 w-12 text-primary mx-auto mb-4 animate-pulse" />
          <p className="text-muted-foreground">Loading tree species...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => navigate('/donate')}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          <div className="text-center mb-12 animate-fade-up">
            <h1 className="font-heading font-bold text-4xl md:text-5xl mb-4">
              Choose Your Tree
            </h1>
            <p className="text-lg text-muted-foreground">
              Select a tree species within your donation of ₹{donationData?.amount}
            </p>
          </div>

          {species.length === 0 ? (
            <Card className="p-8 text-center">
              <TreePine className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="font-heading font-semibold text-xl mb-2">No Trees Available</h2>
              <p className="text-muted-foreground mb-6">
                No tree species available within your donation of ₹{donationData?.amount}. Please increase your donation amount (minimum ₹400).
              </p>
              <Button onClick={() => navigate('/donate')}>
                Increase Donation Amount
              </Button>
            </Card>
          ) : (
            <>
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {species.map((tree, index) => (
                  <Card
                    key={tree.id}
                    className={`p-6 cursor-pointer transition-all hover:shadow-lg animate-fade-up ${
                      selectedSpecies === tree.id
                        ? "border-primary border-2 bg-primary/5"
                        : "border-border"
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => setSelectedSpecies(tree.id)}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg ${
                        selectedSpecies === tree.id ? "bg-primary text-white" : "bg-primary/10"
                      }`}>
                        <TreePine className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-heading font-semibold text-xl mb-2">{tree.name}</h3>
                        <p className="text-muted-foreground text-sm mb-3">{tree.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="font-heading font-bold text-primary text-lg">
                            ₹{tree.price}
                          </span>
                          {selectedSpecies === tree.id && (
                            <span className="text-sm text-primary font-medium">✓ Selected</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <Card className="p-6 bg-muted/50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium mb-1">Donation Amount</p>
                    <p className="font-heading font-bold text-2xl text-primary">
                      ₹{donationData?.amount}
                    </p>
                  </div>
                  <Button
                    size="lg"
                    onClick={handleConfirmTree}
                    disabled={!selectedSpecies}
                    className="font-heading font-semibold"
                  >
                    Confirm & Plant Tree
                  </Button>
                </div>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChooseTree;
