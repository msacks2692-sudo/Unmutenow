import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const coinbaseApiKey = Deno.env.get('COINBASE_COMMERCE_API_KEY');
    
    if (!coinbaseApiKey) {
      throw new Error('Coinbase Commerce API key not configured');
    }

    const { amount, donor_name, message, is_anonymous } = await req.json();

    if (!amount || amount < 1) {
      throw new Error('Invalid amount');
    }

    // Create Coinbase Commerce charge
    const chargeResponse = await fetch('https://api.commerce.coinbase.com/charges', {
      method: 'POST',
      headers: {
        'X-CC-Api-Key': coinbaseApiKey,
        'X-CC-Version': '2018-03-22',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Donation to Unmute Inc.',
        description: message || 'Supporting accessible communication technology',
        pricing_type: 'fixed_price',
        local_price: {
          amount: amount.toFixed(2),
          currency: 'USD',
        },
        metadata: {
          donor_name: is_anonymous ? null : (donor_name || 'Anonymous'),
          message: message || null,
          is_anonymous: is_anonymous ? 'true' : 'false',
        },
        redirect_url: `${req.headers.get('origin')}/?success=true&payment=crypto`,
        cancel_url: `${req.headers.get('origin')}/?canceled=true`,
      }),
    });

    if (!chargeResponse.ok) {
      const errorData = await chargeResponse.json();
      console.error('Coinbase charge error:', errorData);
      throw new Error('Failed to create Coinbase charge');
    }

    const chargeData = await chargeResponse.json();

    return new Response(
      JSON.stringify({ 
        chargeId: chargeData.data.id, 
        hostedUrl: chargeData.data.hosted_url 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Coinbase charge creation error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});
