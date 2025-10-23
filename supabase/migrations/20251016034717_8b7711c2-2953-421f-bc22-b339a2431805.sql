-- Add category column to tree_species table
ALTER TABLE public.tree_species
ADD COLUMN IF NOT EXISTS category text NOT NULL DEFAULT 'other';

-- Insert sample tree species with categories and prices
INSERT INTO public.tree_species (name, category, price, description) VALUES
-- Fruit Trees
('Mango Tree', 'fruit', 500, 'A tropical fruit tree that provides delicious mangoes and shade'),
('Guava Tree', 'fruit', 450, 'Hardy fruit tree with vitamin C-rich fruits'),
('Papaya Tree', 'fruit', 350, 'Fast-growing tree with nutritious papayas'),
('Lemon Tree', 'fruit', 400, 'Citrus tree perfect for fresh lemons year-round'),
('Coconut Tree', 'fruit', 600, 'Versatile tropical tree providing coconuts and shade'),

-- Vegetable Plants
('Drumstick Tree', 'vegetable', 400, 'Moringa tree with nutritious leaves and drumsticks'),
('Curry Leaf Plant', 'vegetable', 300, 'Aromatic plant essential for Indian cuisine'),

-- Herbs
('Tulsi Plant', 'herb', 250, 'Sacred basil with medicinal properties'),
('Neem Tree', 'herb', 400, 'Medicinal tree with multiple health benefits'),
('Aloe Vera Plant', 'herb', 300, 'Succulent with healing and cosmetic properties'),

-- Indoor/Decorative Trees
('Areca Palm', 'indoor', 350, 'Air-purifying indoor palm for homes and offices'),
('Money Plant', 'indoor', 200, 'Lucky indoor vine plant for prosperity'),
('Ficus Tree', 'indoor', 450, 'Elegant indoor tree for decoration'),
('Bamboo Plant', 'indoor', 280, 'Lucky bamboo for positive energy'),
('Snake Plant', 'indoor', 250, 'Hardy air-purifying plant for indoors')
ON CONFLICT DO NOTHING;