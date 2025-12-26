-- Create app roles enum
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function for role checking
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
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

-- RLS policies for user_roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
ON public.user_roles
FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Site content table for hero, about sections
CREATE TABLE public.site_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_key TEXT UNIQUE NOT NULL,
  title TEXT,
  subtitle TEXT,
  content TEXT,
  highlights TEXT[],
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view site content"
ON public.site_content FOR SELECT USING (true);

CREATE POLICY "Admins can manage site content"
ON public.site_content FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Services table
CREATE TABLE public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT 'Plane',
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view services"
ON public.services FOR SELECT USING (true);

CREATE POLICY "Admins can manage services"
ON public.services FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Destinations table
CREATE TABLE public.destinations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  flag TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.destinations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view destinations"
ON public.destinations FOR SELECT USING (true);

CREATE POLICY "Admins can manage destinations"
ON public.destinations FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Testimonials table
CREATE TABLE public.testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  content TEXT NOT NULL,
  rating INTEGER NOT NULL DEFAULT 5,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view testimonials"
ON public.testimonials FOR SELECT USING (true);

CREATE POLICY "Admins can manage testimonials"
ON public.testimonials FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- FAQs table
CREATE TABLE public.faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view faqs"
ON public.faqs FOR SELECT USING (true);

CREATE POLICY "Admins can manage faqs"
ON public.faqs FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Contact info table
CREATE TABLE public.contact_info (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone TEXT,
  email TEXT,
  address TEXT,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.contact_info ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view contact info"
ON public.contact_info FOR SELECT USING (true);

CREATE POLICY "Admins can manage contact info"
ON public.contact_info FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Insert default content
INSERT INTO public.site_content (section_key, title, subtitle, content, highlights) VALUES
('hero', 'Your Trusted Partner for Global Visa Services', 'Fast, reliable, and stress-free visa processing for travelers, students, and professionals.', NULL, ARRAY['Expert visa guidance', 'High approval success rate', 'Transparent pricing, no hidden fees', 'End-to-end support']),
('about', 'About VisaGuide', NULL, 'At VisaGuide, we simplify the visa application process for travelers around the world. Whether it''s tourism, business, study, or work visas, our dedicated team ensures every application is handled with care and precision. With years of experience, we''ve successfully guided thousands of clients to their dream destinations.', NULL);

INSERT INTO public.services (title, description, icon, display_order) VALUES
('Tourist Visa Assistance', 'Travel stress-free with our expert guidance on tourist visas for top destinations worldwide.', 'Plane', 1),
('Business Visa Services', 'Support for professionals, entrepreneurs, and corporate travel needs.', 'Briefcase', 2),
('Student Visa Guidance', 'Helping students fulfill their dreams of studying abroad with step-by-step assistance.', 'GraduationCap', 3),
('Work & Freelance Visas', 'Tailored solutions for skilled workers and freelancers seeking international opportunities.', 'Building2', 4),
('Visa Extensions & Renewals', 'Already abroad? We help with extensions and renewals without hassle.', 'RefreshCw', 5);

INSERT INTO public.destinations (name, flag, display_order) VALUES
('USA', '🇺🇸', 1),
('UK', '🇬🇧', 2),
('Canada', '🇨🇦', 3),
('Australia', '🇦🇺', 4),
('Schengen', '🇪🇺', 5),
('UAE', '🇦🇪', 6);

INSERT INTO public.testimonials (name, location, content, rating, display_order) VALUES
('Sarah M.', 'New York, USA', 'Super easy and stress-free process, my Schengen visa was approved in 7 days!', 5, 1),
('James K.', 'London, UK', 'Professional team – helped me get my student visa for Canada.', 5, 2),
('Maria L.', 'Sydney, Australia', 'Best visa service! Transparent, reliable, and supportive throughout.', 5, 3);

INSERT INTO public.faqs (question, answer, display_order) VALUES
('How long does it take to get a visa?', 'Processing times vary by country and visa type. Tourist visas typically take 5-15 business days, while work and student visas may take 2-8 weeks. We provide estimated timelines during your consultation.', 1),
('Can you guarantee visa approval?', 'While we cannot guarantee approvals (as final decisions rest with embassies), our expertise and thorough preparation significantly increase your chances. We have a 95%+ success rate.', 2),
('What documents do I need?', 'Requirements vary by visa type and destination. Generally, you''ll need a valid passport, photos, proof of funds, travel itinerary, and supporting documents. We provide a personalized checklist for your application.', 3),
('Do you provide travel insurance and flight booking?', 'Yes, we offer comprehensive travel assistance including travel insurance, flight bookings, and hotel reservations to complement your visa application.', 4),
('How much do your services cost?', 'Our fees depend on the visa type and destination. We offer transparent pricing with no hidden fees. Contact us for a personalized quote.', 5);

INSERT INTO public.contact_info (phone, email, address) VALUES
('+1 (555) 123-4567', 'info@visaguide.com', '123 Business District, New York, NY 10001');

-- Function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_site_content_updated_at
BEFORE UPDATE ON public.site_content
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_contact_info_updated_at
BEFORE UPDATE ON public.contact_info
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();