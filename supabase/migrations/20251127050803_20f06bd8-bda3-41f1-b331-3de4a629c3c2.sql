-- Fix security definer view warning by making it a security invoker view
DROP VIEW IF EXISTS public.trees_public;

CREATE VIEW public.trees_public 
WITH (security_invoker = true) AS
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