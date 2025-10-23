-- Create volunteers table
CREATE TABLE public.volunteers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  skills TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create CSR inquiries table
CREATE TABLE public.csr_inquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name TEXT NOT NULL,
  contact_person TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create tree species table
CREATE TABLE public.tree_species (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  price INTEGER NOT NULL,
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create donations/trees table
CREATE TABLE public.trees (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tree_id TEXT NOT NULL UNIQUE,
  donor_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  occasion TEXT NOT NULL,
  location TEXT,
  amount INTEGER NOT NULL,
  species_id UUID REFERENCES public.tree_species(id),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  planted_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.volunteers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.csr_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tree_species ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trees ENABLE ROW LEVEL SECURITY;

-- Public read access for tree species
CREATE POLICY "Anyone can view tree species"
ON public.tree_species FOR SELECT
USING (true);

-- Public read access for trees (for map display)
CREATE POLICY "Anyone can view trees"
ON public.trees FOR SELECT
USING (true);

-- Allow anyone to insert volunteers
CREATE POLICY "Anyone can submit volunteer application"
ON public.volunteers FOR INSERT
WITH CHECK (true);

-- Allow anyone to insert CSR inquiries
CREATE POLICY "Anyone can submit CSR inquiry"
ON public.csr_inquiries FOR INSERT
WITH CHECK (true);

-- Allow anyone to insert trees
CREATE POLICY "Anyone can plant trees"
ON public.trees FOR INSERT
WITH CHECK (true);

-- Insert sample tree species
INSERT INTO public.tree_species (name, price, description, image_url) VALUES
('Neem', 400, 'Sacred tree known for its medicinal properties and air purification capabilities', NULL),
('Peepal', 400, 'Holy tree that releases oxygen 24/7, excellent for urban areas', NULL),
('Mango', 600, 'Fruit-bearing tree that provides shade and sustenance', NULL),
('Banyan', 600, 'Majestic tree symbolizing longevity and strength', NULL),
('Gulmohar', 1000, 'Beautiful flowering tree with vibrant red-orange blooms', NULL),
('Jackfruit', 1000, 'Large fruit-bearing tree native to South India', NULL);