-- ========================================================
-- 04_SEED_USERS.SQL: SEED USERS FOR ADMIN & USER ROLES
-- Reference & setup script for Supabase Authentication
-- ========================================================

-- These accounts are configured for testing the RBAC system:

-- 1. ADMIN ACCOUNT
-- Email:       byteadmin@zenstudio.in
-- Password:    Password@123
-- Full Name:   byteAdmin
-- Role:        admin
-- Access:      Full access to /admin, inventory telemetry, order dispatch pipeline

-- 2. USER (CUSTOMER) ACCOUNT
-- Email:       patron@zenstudio.in
-- Password:    Password@123
-- Full Name:   Rahul Sharma
-- Role:        user
-- Access:      Full shopping bag, checkout simulator, live order tracking (/orders),
--              Blocked from /admin with a 403 Forbidden Gate.

-- --------------------------------------------------------
-- OPTIONAL DIRECT SQL FOR SUPABASE SQL EDITOR
-- (If provisioning directly in a new Supabase project's auth.users table)
-- --------------------------------------------------------
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Check and insert byteAdmin if not present
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'byteadmin@zenstudio.in') THEN
    INSERT INTO auth.users (
      instance_id,
      id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      raw_app_meta_data,
      raw_user_meta_data,
      created_at,
      updated_at
    ) VALUES (
      '00000000-0000-00-00-000000000000',
      gen_random_uuid(),
      'authenticated',
      'authenticated',
      'byteadmin@zenstudio.in',
      crypt('Password@123', gen_salt('bf')),
      now(),
      '{"provider":"email","providers":["email"]}'::jsonb,
      '{"full_name":"byteAdmin","role":"admin"}'::jsonb,
      now(),
      now()
    );
  END IF;

  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'patron@zenstudio.in') THEN
    INSERT INTO auth.users (
      instance_id,
      id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      raw_app_meta_data,
      raw_user_meta_data,
      created_at,
      updated_at
    ) VALUES (
      '00000000-0000-00-00-000000000000',
      gen_random_uuid(),
      'authenticated',
      'authenticated',
      'patron@zenstudio.in',
      crypt('Password@123', gen_salt('bf')),
      now(),
      '{"provider":"email","providers":["email"]}'::jsonb,
      '{"full_name":"Rahul Sharma","role":"user"}'::jsonb,
      now(),
      now()
    );
  END IF;
END $$;
