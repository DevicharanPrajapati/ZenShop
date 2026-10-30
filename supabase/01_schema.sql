-- ========================================================
-- 01_SCHEMA.SQL: CORE DATABASE TABLES & INDEXES
-- Run this FIRST in your Supabase SQL Editor
-- ========================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PRODUCTS TABLE
-- Stores apparel, fabric GSM weights, categories, sizes, and color swatches
CREATE TABLE IF NOT EXISTS public.products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    price NUMERIC NOT NULL CHECK (price >= 0),
    original_price NUMERIC NOT NULL CHECK (original_price >= 0),
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
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Index for high-speed category & drop filtering
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category);
CREATE INDEX IF NOT EXISTS idx_products_is_new_drop ON public.products(is_new_drop);
CREATE INDEX IF NOT EXISTS idx_products_price ON public.products(price);

-- 2. ORDERS TABLE
-- Stores customer checkout details, Indian addresses, PIN codes, and live tracking status
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
    subtotal NUMERIC NOT NULL CHECK (subtotal >= 0),
    discount NUMERIC DEFAULT 0 CHECK (discount >= 0),
    shipping_fee NUMERIC DEFAULT 0 CHECK (shipping_fee >= 0),
    total NUMERIC NOT NULL CHECK (total >= 0),
    payment_method TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'Processing' CHECK (status IN ('Processing', 'Dispatched', 'Delivered', 'Cancelled')),
    courier TEXT DEFAULT 'Bluedart Express Air',
    awb_number TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Index for tracking lookup
CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON public.orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);

-- 3. REVIEWS TABLE
-- Stores verified customer ratings & comments
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id TEXT NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    author TEXT NOT NULL,
    city TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT NOT NULL,
    verified BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_reviews_product_id ON public.reviews(product_id);
