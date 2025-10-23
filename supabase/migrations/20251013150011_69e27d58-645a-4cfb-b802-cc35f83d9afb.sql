-- Create role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
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
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Add SELECT policies for volunteers table (admin only)
CREATE POLICY "Admins can view volunteers"
ON public.volunteers
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- Add SELECT policies for csr_inquiries table (admin only)
CREATE POLICY "Admins can view CSR inquiries"
ON public.csr_inquiries
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- Create contact_submissions table
CREATE TABLE public.contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (length(name) >= 2 AND length(name) <= 100),
  email text NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  subject text NOT NULL CHECK (length(subject) >= 2 AND length(subject) <= 200),
  message text NOT NULL CHECK (length(message) >= 10 AND length(message) <= 2000),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit contact form"
ON public.contact_submissions
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admins can view contact submissions"
ON public.contact_submissions
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- Add database-level constraints for data validation
ALTER TABLE public.volunteers
ADD CONSTRAINT volunteers_email_format 
  CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
ADD CONSTRAINT volunteers_name_length
  CHECK (length(name) >= 2 AND length(name) <= 100),
ADD CONSTRAINT volunteers_phone_format
  CHECK (phone ~* '^\+?[1-9]\d{9,14}$');

ALTER TABLE public.csr_inquiries
ADD CONSTRAINT csr_email_format
  CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
ADD CONSTRAINT csr_company_length
  CHECK (length(company_name) >= 2 AND length(company_name) <= 200),
ADD CONSTRAINT csr_contact_length
  CHECK (length(contact_person) >= 2 AND length(contact_person) <= 100),
ADD CONSTRAINT csr_phone_format
  CHECK (phone ~* '^\+?[1-9]\d{9,14}$');

ALTER TABLE public.trees
ADD CONSTRAINT trees_donor_name_length
  CHECK (length(donor_name) >= 2 AND length(donor_name) <= 100),
ADD CONSTRAINT trees_email_format
  CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
ADD CONSTRAINT trees_amount_positive
  CHECK (amount > 0);