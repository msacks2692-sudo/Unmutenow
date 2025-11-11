import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

serve(async (req) => {
  const signature = req.headers.get('x-cc-webhook-signature');
  const webhookSecret = Deno.env.get('COINBASE_COMMERCE_WEBHOOK_SECRET');

  if (!signature || !webhookSecret) {
    return new Response('Missing signature or webhook secret', { status: 400 });
  }

  try {
    const body = await req.text();
    
    // Verify webhook signature
    const crypto = await import('https://deno.land/std@0.168.0/crypto/mod.ts');
    const encoder = new TextEncoder();
    const key = await crypto.crypto.subtle.importKey(
      'raw',
      encoder.encode(webhookSecret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );
    
    const signatureBuffer = await crypto.crypto.subtle.sign(
      'HMAC',
      key,
      encoder.encode(body)
    );
    
    const computedSignature = Array.from(new Uint8Array(signatureBuffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');

    if (computedSignature !== signature) {
      console.error('Invalid webhook signature');
      return new Response('Invalid signature', { status: 401 });
    }

    const event = JSON.parse(body);

    // Handle charge:confirmed event
    if (event.event.type === 'charge:confirmed') {
      const charge = event.event.data;
      const metadata = charge.metadata || {};
      
      // Insert donation into database
      const { error } = await supabase
        .from('donations')
        .insert([{
          amount: parseFloat(charge.pricing.local.amount),
          donor_name: metadata.is_anonymous === 'true' 
            ? null 
            : (metadata.donor_name || 'Anonymous'),
          message: metadata.message || null,
          is_anonymous: metadata.is_anonymous === 'true',
        }]);

      if (error) {
        console.error('Error inserting donation:', error);
        throw error;
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Webhook error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 400 }
    );
  }
});
