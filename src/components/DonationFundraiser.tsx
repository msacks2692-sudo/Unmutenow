import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";
import { DollarSign, Heart, Users } from "lucide-react";
import { stripePromise } from "@/lib/stripe";

const donationSchema = z.object({
  amount: z.number().min(1, "Amount must be at least $1"),
  donor_name: z.string().trim().max(100, "Name must be less than 100 characters").optional(),
  message: z.string().trim().max(500, "Message must be less than 500 characters").optional(),
});

interface RecentDonation {
  display_name: string | null;
  display_amount: number | null;
  message: string | null;
  created_at: string | null;
}

interface DonationStats {
  total_donors: number | null;
  total_raised: number | null;
  anonymous_donors: number | null;
  named_donors: number | null;
}

export const DonationFundraiser = () => {
  const [donations, setDonations] = useState<RecentDonation[]>([]);
  const [totalRaised, setTotalRaised] = useState(0);
  const [donorCount, setDonorCount] = useState(0);
  const [formData, setFormData] = useState({
    amount: "",
    donor_name: "",
    message: "",
    is_anonymous: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const goal = 50000; // $50,000 goal

  useEffect(() => {
    fetchDonations();
    
    // Set up real-time subscription
    const channel = supabase
      .channel('donations-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'donations'
        },
        () => {
          fetchDonations();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchDonations = async () => {
    // Fetch recent donations from public view
    const { data: recentData, error: recentError } = await supabase
      .from("recent_donations")
      .select("*");

    if (!recentError && recentData) {
      setDonations(recentData);
    }
    
    // Fetch donation statistics from public view
    const { data: statsData, error: statsError } = await supabase
      .from("donation_statistics")
      .select("*")
      .single();
    
    if (!statsError && statsData) {
      setTotalRaised(Number(statsData.total_raised) || 0);
      setDonorCount(Number(statsData.total_donors) || 0);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const amount = parseFloat(formData.amount);
      
      const validatedData = donationSchema.parse({
        amount,
        donor_name: formData.donor_name,
        message: formData.message,
      });
      
      setIsSubmitting(true);

      // Call edge function to create Stripe checkout session
      const { data, error } = await supabase.functions.invoke('create-checkout-session', {
        body: {
          amount: validatedData.amount,
          donor_name: formData.is_anonymous ? null : validatedData.donor_name || "Anonymous",
          message: validatedData.message || null,
          is_anonymous: formData.is_anonymous,
        }
      });

      if (error) throw error;

      // Redirect to Stripe Checkout
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe failed to load');

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      } else {
        toast.error("Failed to process donation. Please try again.");
        console.error('Donation error:', error);
      }
      setIsSubmitting(false);
    }
  };

  const progressPercentage = Math.min((totalRaised / goal) * 100, 100);

  return (
    <div className="space-y-8">
      {/* Fundraising Progress */}
      <Card className="glass-card">
        <CardContent className="p-10">
          <div className="text-center mb-8">
            <div className="text-5xl font-black text-primary mb-4">
              ${totalRaised.toLocaleString()}
            </div>
            <p className="text-xl text-muted-foreground mb-6">
              raised of ${goal.toLocaleString()} goal
            </p>
            <Progress value={progressPercentage} className="h-4 mb-4" />
            <div className="flex justify-center gap-8 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>{donorCount} donors</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-primary" />
                <span>{progressPercentage.toFixed(0)}% funded</span>
              </div>
            </div>
          </div>

          {/* Recent Donations */}
          {donations.length > 0 && (
            <div className="border-t border-primary/10 pt-8">
              <h4 className="text-lg font-bold mb-4">Recent Donations</h4>
              <div className="space-y-4 max-h-[300px] overflow-y-auto">
                {donations.map((donation, index) => (
                  <div key={index} className="flex justify-between items-start p-4 bg-background/30 rounded-lg">
                    <div>
                      <p className="font-semibold">
                        {donation.display_name || "Anonymous"}
                      </p>
                      {donation.message && (
                        <p className="text-sm text-muted-foreground mt-1">{donation.message}</p>
                      )}
                      {donation.created_at && (
                        <p className="text-xs text-muted-foreground/60 mt-1">
                          {new Date(donation.created_at).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                    {donation.display_amount && (
                      <div className="text-primary font-bold">
                        ${Number(donation.display_amount).toLocaleString()}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Donation Form */}
      <Card className="glass-card">
        <CardContent className="p-10">
          <h3 className="text-3xl font-bold mb-8 text-center">Make a Donation</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="number"
                placeholder="Amount"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="pl-12 bg-background/50 border-primary/20 focus:border-primary/40"
                required
                min="1"
                step="0.01"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="anonymous"
                checked={formData.is_anonymous}
                onChange={(e) => setFormData({ ...formData, is_anonymous: e.target.checked })}
                className="w-4 h-4"
              />
              <label htmlFor="anonymous" className="text-sm text-muted-foreground">
                Make this donation anonymous
              </label>
            </div>
            
            {!formData.is_anonymous && (
              <Input
                placeholder="Your Name (Optional)"
                value={formData.donor_name}
                onChange={(e) => setFormData({ ...formData, donor_name: e.target.value })}
                className="bg-background/50 border-primary/20 focus:border-primary/40"
                maxLength={100}
              />
            )}
            
            <Textarea
              placeholder="Leave a message (Optional)"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="bg-background/50 border-primary/20 focus:border-primary/40"
              maxLength={500}
            />
            
            <Button 
              type="submit" 
              className="w-full underglow shadow-[0_0_40px_hsl(var(--primary)/0.4)] hover:shadow-[0_0_60px_hsl(var(--primary)/0.6)]"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Continue to Payment" : "Donate Now"}
            </Button>
            
            <p className="text-xs text-center text-muted-foreground">
              Secure payment powered by Stripe
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};