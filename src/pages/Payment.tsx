import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Copy, CheckCircle, QrCode, CreditCard } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentId, setPaymentId] = useState("");
  const [processing, setProcessing] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCVV, setCardCVV] = useState("");
  const [cardName, setCardName] = useState("");
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

  const handlePaymentConfirm = async (paymentType: 'upi' | 'card') => {
    if (paymentType === 'upi' && !paymentId.trim()) {
      toast.error("Please enter your payment transaction ID");
      return;
    }

    if (paymentType === 'card') {
      if (!cardNumber || !cardExpiry || !cardCVV || !cardName) {
        toast.error("Please fill all card details");
        return;
      }
      // Basic card validation
      if (cardNumber.replace(/\s/g, '').length !== 16) {
        toast.error("Invalid card number");
        return;
      }
    }

    setProcessing(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      const finalPaymentId = paymentType === 'upi' ? paymentId : `CARD_${Date.now()}`;

      // Record donation in backend
      const res = await fetch('http://localhost:5000/donation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: donationData.donor_name,
          email: donationData.email,
          amount: donationData.amount,
          paymentId: finalPaymentId,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || 'Failed to record donation');
      }

      toast.success("Payment recorded successfully!", {
        description: "You'll receive updates on your tree's growth!",
      });

      // Continue flow
      if (session?.user) {
        navigate('/dashboard');
      } else {
        navigate('/choose-tree', { 
          state: { 
            donationData: {
              ...donationData,
              payment_id: finalPaymentId,
              payment_status: 'pending_verification',
              payment_method: paymentType,
            },
            paymentConfirmed: true 
          } 
        });
      }
    } catch (error: any) {
      console.error('Error confirming payment:', error);
      toast.error('Failed to record payment. Please contact support.');
    } finally {
      setProcessing(false);
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.slice(0, 2) + '/' + v.slice(2, 4);
    }
    return v;
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
            <Tabs defaultValue="upi" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="upi" className="font-heading">
                  <QrCode className="h-4 w-4 mr-2" />
                  UPI
                </TabsTrigger>
                <TabsTrigger value="card" className="font-heading">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Card
                </TabsTrigger>
              </TabsList>

              <TabsContent value="upi" className="space-y-6">
                <div className="space-y-4">
                  <h2 className="font-heading font-semibold text-2xl">Pay via UPI</h2>
                  
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
                    <Label htmlFor="paymentId">Enter Transaction/UPI Reference ID *</Label>
                    <Input
                      id="paymentId"
                      placeholder="e.g., 432156789012"
                      value={paymentId}
                      onChange={(e) => setPaymentId(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      You'll find this in your payment app after successful payment
                    </p>
                  </div>

                  <Button 
                    onClick={() => handlePaymentConfirm('upi')} 
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
              </TabsContent>

              <TabsContent value="card" className="space-y-6">
                <div className="space-y-4">
                  <h2 className="font-heading font-semibold text-2xl">Pay with Card</h2>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardName">Cardholder Name *</Label>
                      <Input
                        id="cardName"
                        placeholder="John Doe"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number *</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                        maxLength={19}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardExpiry">Expiry Date *</Label>
                        <Input
                          id="cardExpiry"
                          placeholder="MM/YY"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                          maxLength={5}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cardCVV">CVV *</Label>
                        <Input
                          id="cardCVV"
                          type="password"
                          placeholder="123"
                          value={cardCVV}
                          onChange={(e) => setCardCVV(e.target.value.replace(/\D/g, '').slice(0, 3))}
                          maxLength={3}
                        />
                      </div>
                    </div>

                    <Button 
                      onClick={() => handlePaymentConfirm('card')} 
                      className="w-full font-heading font-semibold text-lg"
                      disabled={processing || !cardNumber || !cardExpiry || !cardCVV || !cardName}
                    >
                      {processing ? (
                        "Processing..."
                      ) : (
                        <>
                          <CreditCard className="h-5 w-5 mr-2" />
                          Pay ₹{donationData.amount}
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="bg-muted/50 p-4 rounded-lg mt-6">
              <p className="text-sm text-muted-foreground">
                🔒 Your payment information is secure. All transactions are encrypted.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Payment;
