-- Fix 1: Add RLS policies for user_roles table
CREATE POLICY "Users can view own roles"
ON public.user_roles 
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
ON public.user_roles 
FOR ALL
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Fix 2: Protect trees table PII
-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can view trees" ON public.trees;
DROP POLICY IF EXISTS "Users can view their own trees" ON public.trees;

-- Recreate with proper restrictions
CREATE POLICY "Users can view their own trees only"
ON public.trees
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all trees"
ON public.trees
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Create public view with only non-PII data for maps/stats
CREATE OR REPLACE VIEW public.trees_public AS
SELECT 
  id,
  tree_id,
  species_id,
  latitude,
  longitude,
  planted_date,
  occasion,
  created_at,
  CASE 
    WHEN location IS NOT NULL 
    THEN regexp_replace(location, '[0-9]+', '', 'g')
    ELSE NULL 
  END as region
FROM public.trees;

GRANT SELECT ON public.trees_public TO anon, authenticated;

-- Add payment_id column and unique constraint to prevent duplicate transaction IDs
ALTER TABLE public.trees ADD COLUMN IF NOT EXISTS payment_id text;
CREATE UNIQUE INDEX IF NOT EXISTS trees_payment_id_unique ON public.trees(payment_id) WHERE payment_id IS NOT NULL;