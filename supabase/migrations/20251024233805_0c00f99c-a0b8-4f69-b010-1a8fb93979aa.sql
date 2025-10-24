-- Create role system for admin access
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  UNIQUE(user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles (avoids RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Allow users to view their own roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
USING (auth.uid() = user_id);

-- Only admins can manage roles
CREATE POLICY "Admins can manage all roles"
ON public.user_roles
FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Fix donations table: Remove public SELECT access
DROP POLICY IF EXISTS "Anyone can view donations" ON public.donations;

-- Create admin-only SELECT policy for donations
CREATE POLICY "Admins can view all donations"
ON public.donations
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- Create public view for aggregated donation statistics (safe to expose)
CREATE VIEW public.donation_statistics AS
SELECT 
  COUNT(*) as total_donors,
  COALESCE(SUM(amount), 0) as total_raised,
  COUNT(*) FILTER (WHERE is_anonymous = true) as anonymous_donors,
  COUNT(*) FILTER (WHERE is_anonymous = false) as named_donors
FROM public.donations;

-- Create view for recent anonymous donations (no PII exposed)
CREATE VIEW public.recent_donations AS
SELECT
  CASE 
    WHEN is_anonymous THEN 'Anonymous'
    ELSE donor_name
  END as display_name,
  CASE
    WHEN is_anonymous THEN NULL
    ELSE amount
  END as display_amount,
  message,
  created_at
FROM public.donations
WHERE is_anonymous = true
ORDER BY created_at DESC
LIMIT 10;