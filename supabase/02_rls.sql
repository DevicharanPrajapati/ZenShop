-- ========================================================
-- 02_RLS.SQL: ROW LEVEL SECURITY & ACCESS POLICIES
-- Run this SECOND in your Supabase SQL Editor
-- ========================================================

-- 1. Enable RLS on all tables
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- 2. Drop existing policies to prevent conflicts if re-running
DROP POLICY IF EXISTS "Public can view products" ON public.products;
DROP POLICY IF EXISTS "Admins can manage products" ON public.products;

DROP POLICY IF EXISTS "Public can insert orders" ON public.orders;
DROP POLICY IF EXISTS "Public can view orders" ON public.orders;
DROP POLICY IF EXISTS "Admins can update orders" ON public.orders;

DROP POLICY IF EXISTS "Public can view reviews" ON public.reviews;
DROP POLICY IF EXISTS "Public can insert reviews" ON public.reviews;

-- ========================================================
-- PRODUCTS POLICIES
-- ========================================================

-- Allow everyone (anonymous or authenticated) to view products in the catalog
CREATE POLICY "Public can view products"
ON public.products
FOR SELECT
TO public
USING (true);

-- Allow product mutations (insert, update, delete) ONLY for authenticated admins
CREATE POLICY "Admins can manage products"
ON public.products
FOR ALL
TO authenticated
USING (
  (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin' OR
  auth.jwt() ->> 'email' LIKE 'admin@%' OR
  auth.jwt() ->> 'email' LIKE 'byteadmin@%'
)
WITH CHECK (
  (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin' OR
  auth.jwt() ->> 'email' LIKE 'admin@%' OR
  auth.jwt() ->> 'email' LIKE 'byteadmin@%'
);

-- ========================================================
-- ORDERS POLICIES
-- ========================================================

-- Allow any customer to place an order during checkout
CREATE POLICY "Public can insert orders"
ON public.orders
FOR INSERT
TO public
WITH CHECK (true);

-- Allow reading orders (for checkout confirmation and order tracking)
CREATE POLICY "Public can view orders"
ON public.orders
FOR SELECT
TO public
USING (true);

-- Allow order fulfillment status updates ONLY for authenticated admins
CREATE POLICY "Admins can update orders"
ON public.orders
FOR UPDATE
TO authenticated
USING (
  (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin' OR
  auth.jwt() ->> 'email' LIKE 'admin@%' OR
  auth.jwt() ->> 'email' LIKE 'byteadmin@%'
)
WITH CHECK (
  (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin' OR
  auth.jwt() ->> 'email' LIKE 'admin@%' OR
  auth.jwt() ->> 'email' LIKE 'byteadmin@%'
);

-- ========================================================
-- REVIEWS POLICIES
-- ========================================================

-- Allow anyone to read verified garment reviews
CREATE POLICY "Public can view reviews"
ON public.reviews
FOR SELECT
TO public
USING (true);

-- Allow users to submit product reviews
CREATE POLICY "Public can insert reviews"
ON public.reviews
FOR INSERT
TO public
WITH CHECK (true);
