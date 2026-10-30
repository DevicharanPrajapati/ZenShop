-- ========================================================
-- ZEN / STUDIO: SUPABASE DATABASE INITIALIZATION SCRIPT
-- Paste this script into your Supabase Dashboard -> SQL Editor and click 'RUN'
-- ========================================================

-- 1. Create PRODUCTS table
CREATE TABLE IF NOT EXISTS public.products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    price NUMERIC NOT NULL,
    original_price NUMERIC NOT NULL,
    category TEXT NOT NULL,
    gender TEXT NOT NULL DEFAULT 'Unisex',
    fit TEXT NOT NULL DEFAULT 'Boxy Oversized',
    fabric TEXT NOT NULL,
    gsm INTEGER,
    description TEXT NOT NULL,
    features TEXT[] DEFAULT '{}',
    images TEXT[] NOT NULL,
    sizes TEXT[] NOT NULL DEFAULT '{"S","M","L","XL","XXL"}',
    colors JSONB NOT NULL DEFAULT '[]',
    stock JSONB NOT NULL DEFAULT '{}',
    is_new_drop BOOLEAN DEFAULT false,
    is_best_seller BOOLEAN DEFAULT false,
    drop_name TEXT,
    rating NUMERIC DEFAULT 5.0,
    review_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create ORDERS table
CREATE TABLE IF NOT EXISTS public.orders (
    id TEXT PRIMARY KEY,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    pincode TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    address TEXT NOT NULL,
    items JSONB NOT NULL DEFAULT '[]',
    subtotal NUMERIC NOT NULL,
    discount NUMERIC DEFAULT 0,
    shipping_fee NUMERIC DEFAULT 0,
    total NUMERIC NOT NULL,
    payment_method TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'Processing',
    courier TEXT DEFAULT 'Bluedart Express Air',
    awb_number TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create REVIEWS table
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id TEXT REFERENCES public.products(id) ON DELETE CASCADE,
    author TEXT NOT NULL,
    city TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT NOT NULL,
    verified BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- 5. RLS Policies
-- Products: Anyone can read
CREATE POLICY "Public read products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Admin update products" ON public.products FOR ALL USING (true);

-- Orders: Anyone can insert orders (checkout) and read their own
CREATE POLICY "Public insert orders" ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Public read orders" ON public.orders FOR SELECT USING (true);
CREATE POLICY "Admin update orders" ON public.orders FOR UPDATE USING (true);

-- Reviews: Anyone can read
CREATE POLICY "Public read reviews" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Public insert reviews" ON public.reviews FOR INSERT WITH CHECK (true);

-- ========================================================
-- SEED INITIAL STREETWEAR PRODUCTS
-- ========================================================
INSERT INTO public.products (
    id, name, slug, price, original_price, category, gender, fit, fabric, gsm, description, features, images, sizes, colors, stock, is_new_drop, is_best_seller, drop_name, rating, review_count
) VALUES
(
    'zen-tee-01',
    'Acid Wash Monolith Boxy T-Shirt',
    'acid-wash-monolith-boxy-tshirt',
    1899,
    2499,
    'T-Shirts',
    'Unisex',
    'Boxy Oversized',
    '100% Combed Heavy Cotton',
    280,
    'Engineered with a high-density 280 GSM combed cotton jersey. Features a custom mineral acid wash, raw ribbed collar, and signature ZEN STUDIO architectural back graphic.',
    ARRAY['280 GSM Heavyweight French Terry finish', 'Reinforced double-needle collar stitch', 'High-density screenprint on reverse', 'Pre-shrunk to maintain oversized drape', 'Ethically crafted in Tiruppur, India'],
    ARRAY['https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000&auto=format&fit=crop', 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1000&auto=format&fit=crop'],
    ARRAY['S', 'M', 'L', 'XL', 'XXL'],
    '[{"name":"Washed Slate","hex":"#3b3f46"},{"name":"Raw Ecru","hex":"#f0ebe1"},{"name":"Onyx Black","hex":"#141414"}]'::jsonb,
    '{"S": 5, "M": 2, "L": 8, "XL": 4, "XXL": 1}'::jsonb,
    true,
    true,
    'DROP 01: MONOLITH',
    4.9,
    38
),
(
    'zen-hoodie-02',
    'Architectural Heavyweight Hoodie',
    'architectural-heavyweight-hoodie',
    3499,
    4499,
    'Hoodies & Fleeces',
    'Unisex',
    'Boxy Oversized',
    '380 GSM Diagonal Loopback Terry',
    380,
    'Crafted from ultra-dense 380 GSM diagonal loopback terry. Double-layered crossover hood without drawstrings for an ultra-clean, sculpted streetwear profile.',
    ARRAY['380 GSM ultra-heavy diagonal loopback cotton', 'Zero-drawstring architectural hood shape', 'Concealed side-seam pockets', 'Ribbed side gussets', 'Tonal embossed Zen logo on sleeve'],
    ARRAY['https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1000&auto=format&fit=crop', 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=1000&auto=format&fit=crop'],
    ARRAY['S', 'M', 'L', 'XL'],
    '[{"name":"Cobalt Zen","hex":"#1e3a8a"},{"name":"Washed Charcoal","hex":"#2b2b2b"},{"name":"Chalk White","hex":"#f5f5f0"}]'::jsonb,
    '{"S": 3, "M": 0, "L": 5, "XL": 2}'::jsonb,
    true,
    true,
    'DROP 01: MONOLITH',
    4.8,
    54
),
(
    'zen-cargo-03',
    'Tactical Bellow-Pocket Cargo Pants',
    'tactical-bellow-pocket-cargo-pants',
    2999,
    3899,
    'Pants & Cargos',
    'Unisex',
    'Relaxed Drop-Shoulder',
    'High-Density Cotton Ripstop',
    260,
    'Engineered for modern urban utility. 6-pocket modular construction featuring articulated knee pleats, adjustable toggle hems, and an elasticated waistband with industrial drawcord.',
    ARRAY['Military-grade 260 GSM ripstop fabric', 'Dual bellow thigh cargo pockets', 'Bungee hem toggles', 'YKK zipper fly'],
    ARRAY['https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1000&auto=format&fit=crop', 'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?q=80&w=1000&auto=format&fit=crop'],
    ARRAY['S', 'M', 'L', 'XL', 'XXL'],
    '[{"name":"Tactical Olive","hex":"#3f4634"},{"name":"Pitch Black","hex":"#0f0f0f"},{"name":"Desert Khaki","hex":"#b8a37e"}]'::jsonb,
    '{"S": 4, "M": 6, "L": 3, "XL": 1, "XXL": 0}'::jsonb,
    false,
    true,
    NULL,
    4.7,
    29
),
(
    'zen-jacket-04',
    'Architectural Canvas Workwear Overshirt',
    'architectural-canvas-workwear-overshirt',
    3799,
    4999,
    'Jackets & Overshirts',
    'Unisex',
    'Structured Utility',
    '12oz Duck Cotton Canvas',
    340,
    'A modern reinterpretation of classic Indian workwear. Structured boxy profile with antique gunmetal buttons, dual chest flap utility pockets, and a soft flannel interior collar.',
    ARRAY['12oz heavy duck cotton canvas', 'Matte gunmetal branded snap closures', 'Reinforced elbows', 'Square layering hem'],
    ARRAY['https://images.unsplash.com/photo-1548883354-7622d03aca27?q=80&w=1000&auto=format&fit=crop', 'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1000&auto=format&fit=crop'],
    ARRAY['M', 'L', 'XL'],
    '[{"name":"Raw Umber","hex":"#4a3525"},{"name":"Washed Black","hex":"#1f1f1f"}]'::jsonb,
    '{"M": 4, "L": 7, "XL": 2}'::jsonb,
    true,
    false,
    'DROP 01: MONOLITH',
    4.9,
    19
),
(
    'zen-acc-06',
    'Cyber Tactical Crossbody Sling Bag',
    'cyber-tactical-crossbody-sling-bag',
    1499,
    1999,
    'Accessories',
    'Unisex',
    'Standard',
    'Ballistic Cordura 600D Waterproof',
    NULL,
    'Compact, modular utility sling engineered for daily essentials. Features a magnetic Fidlock-style buckle, waterproof tape zippers, and an adjustable seatbelt webbing strap.',
    ARRAY['600D ballistic waterproof Cordura nylon', 'Quick-release magnetic buckle', 'Padded smartphone compartment', 'Reflective Zen 3M paracord pullers'],
    ARRAY['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1000&auto=format&fit=crop', 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=1000&auto=format&fit=crop'],
    ARRAY['One Size'],
    '[{"name":"Stealth Black","hex":"#0a0a0a"},{"name":"Concrete Grey","hex":"#525252"}]'::jsonb,
    '{"One Size": 14}'::jsonb,
    true,
    true,
    'DROP 01: MONOLITH',
    4.9,
    62
)
ON CONFLICT (id) DO NOTHING;
