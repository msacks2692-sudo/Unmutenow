-- Drop existing views that have SECURITY DEFINER
DROP VIEW IF EXISTS public.donation_statistics CASCADE;
DROP VIEW IF EXISTS public.recent_donations CASCADE;

-- Recreate donation_statistics view with SECURITY INVOKER (safer than SECURITY DEFINER)
CREATE VIEW public.donation_statistics 
WITH (security_invoker = true) AS
SELECT 
  count(*) AS total_donors,
  COALESCE(sum(amount), 0::numeric) AS total_raised,
  count(*) FILTER (WHERE is_anonymous = true) AS anonymous_donors,
  count(*) FILTER (WHERE is_anonymous = false) AS named_donors
FROM donations;

-- Recreate recent_donations view with SECURITY INVOKER
CREATE VIEW public.recent_donations
WITH (security_invoker = true) AS
SELECT
  CASE
    WHEN is_anonymous THEN 'Anonymous'::text
    ELSE donor_name
  END AS display_name,
  CASE
    WHEN is_anonymous THEN NULL::numeric
    ELSE amount
  END AS display_amount,
  message,
  created_at
FROM donations
WHERE is_anonymous = true
ORDER BY created_at DESC
LIMIT 10;

-- Grant SELECT access to anonymous users on these views
GRANT SELECT ON public.donation_statistics TO anon;
GRANT SELECT ON public.recent_donations TO anon;