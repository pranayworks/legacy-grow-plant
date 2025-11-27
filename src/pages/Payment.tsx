import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Copy, CheckCircle, QrCode } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentId, setPaymentId] = useState("");
  const [processing, setProcessing] = useState(false);
  const donationData = location.state?.donationData;

  const UPI_ID = "8074935169@ybl";

  useEffect(() => {
    if (!donationData) {
      toast.error("Invalid payment session");
      navigate("/donate");
    }
  }, [donationData, navigate]);

  const copyUPI = () => {
    navigator.clipboard.writeText(UPI_ID);
    toast.success("UPI ID copied to clipboard");
  };

  const handlePaymentConfirm = async () => {
    const trimmedPaymentId = paymentId.trim();
    
    // Validation: Check if payment ID is entered
    if (!trimmedPaymentId) {
      toast.error("Please enter your payment transaction ID");
      return;
    }

    // Validation: Check UPI transaction ID format (typically 12 digits)
    if (!/^\d{12}$/.test(trimmedPaymentId)) {
      toast.error("Invalid UPI transaction ID format. It should be 12 digits.");
      return;
    }

    setProcessing(true);

    try {
      // Check for duplicate transaction IDs
      const { data: existingPayment, error: checkError } = await supabase
        .from("trees")
        .select("id")
        .eq("payment_id", trimmedPaymentId)
        .maybeSingle();

      if (checkError) {
        console.error("Error checking duplicate payment:", checkError);
        toast.error("Failed to verify payment. Please try again.");
        setProcessing(false);
        return;
      }

      if (existingPayment) {
        toast.error("This transaction ID has already been used. Please use a unique transaction ID.");
        setProcessing(false);
        return;
      }

      const { data: { session } } = await supabase.auth.getSession();

      const treeData = {
        tree_id: `TREE${Date.now()}`,
        donor_name: donationData.name,
        email: donationData.email,
        phone: donationData.phone || "",
        occasion: donationData.occasion,
        amount: donationData.amount,
        species_id: donationData.selectedTree?.id || null,
        user_id: session?.user?.id || null,
        payment_id: trimmedPaymentId,
      };

      console.log("Saving tree data:", treeData);

      const { data, error } = await supabase
        .from("trees")
        .insert([treeData])
        .select()
        .single();

      if (error) {
        console.error("Error saving tree data:", error);
        toast.error("Failed to process donation. Please try again.");
        return;
      }

      console.log("Tree data saved successfully:", data);

      toast.success("🎉 Congratulations! We have received your payment successfully!", {
        duration: 4000,
      });

      // Delay navigation to allow user to see the success message
      setTimeout(() => {
        if (session?.user) {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
      }, 2000);
    } catch (error) {
      console.error("Error processing payment:", error);
      toast.error("An unexpected error occurred. Please contact support.");
    } finally {
      setProcessing(false);
    }
  };

  if (!donationData) return null;

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="font-heading font-bold text-4xl mb-4">Complete Payment</h1>
            <p className="text-lg text-muted-foreground">
              Pay ₹{donationData.amount} to plant your {donationData.species_name || "tree"}
            </p>
          </div>

          <Card className="p-8">
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="font-heading font-semibold text-2xl flex items-center gap-2">
                  <QrCode className="h-6 w-6 text-primary" />
                  Pay via UPI
                </h2>
                
                <div className="bg-primary/5 p-6 rounded-lg space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">UPI ID</p>
                      <p className="font-mono text-lg font-semibold">{UPI_ID}</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={copyUPI}>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                  </div>

                  <div className="border-t pt-4">
                    <p className="text-sm text-muted-foreground mb-2">Scan QR Code</p>
                    <div className="bg-white p-4 rounded-lg inline-block">
                      <img 
                        src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=8074935169@ybl%26pn=GREEN%20LEGACY%26am=" 
                        alt="UPI QR Code"
                        className="w-48 h-48"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Use any UPI app (Google Pay, PhonePe, Paytm) to scan and pay ₹{donationData.amount}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-heading font-semibold text-lg">After Payment</h3>
                <div className="space-y-2">
                  <Label htmlFor="paymentId">
                    Enter Transaction/UPI Reference ID <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="paymentId"
                    placeholder="Enter 12-digit transaction ID (e.g., 432156789012)"
                    value={paymentId}
                    onChange={(e) => setPaymentId(e.target.value)}
                    maxLength={12}
                    className="font-mono"
                  />
                  <p className="text-xs text-muted-foreground">
                    You'll find this 12-digit ID in your UPI payment app after successful payment
                  </p>
                </div>

                <Button 
                  onClick={handlePaymentConfirm} 
                  className="w-full font-heading font-semibold text-lg"
                  disabled={processing || !paymentId.trim()}
                >
                  {processing ? (
                    "Processing..."
                  ) : (
                    <>
                      <CheckCircle className="h-5 w-5 mr-2" />
                      Confirm Payment
                    </>
                  )}
                </Button>
              </div>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg mt-6">
              <p className="text-sm text-muted-foreground">
                🔒 Your payment information is secure. All transactions are verified before processing.
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                💳 Card payments coming soon with secure payment gateway integration
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Payment;
