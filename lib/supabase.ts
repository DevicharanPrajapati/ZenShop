import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { products as mockProducts, type Product } from "./products";

function normalizeSupabaseUrl(rawUrl?: string): string {
  if (!rawUrl) return "";
  let url = rawUrl.trim();
  if (!url) return "";

  // Prepend https:// if protocol is missing
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = `https://${url}`;
  }

  // Strip /rest/v1 or trailing slash if user copied the REST endpoint
  url = url.replace(/\/rest\/v1\/?$/, "");
  url = url.replace(/\/+$/, "");

  try {
    const parsed = new URL(url);
    if (parsed.protocol === "http:" || parsed.protocol === "https:") {
      return url;
    }
  } catch {
    // Invalid URL
  }
  return "";
}

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const rawKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

const supabaseUrl = normalizeSupabaseUrl(rawUrl);
const supabaseAnonKey = rawKey.trim();

function initSupabase(): SupabaseClient | null {
  if (!supabaseUrl || !supabaseAnonKey) return null;
  if (supabaseUrl.includes("your-project") || supabaseUrl.includes("placeholder")) {
    return null;
  }

  try {
    return createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
      },
    });
  } catch (err) {
    console.warn("Could not initialize Supabase client:", err);
    return null;
  }
}

export const supabase: SupabaseClient | null = initSupabase();
export const isSupabaseConfigured = Boolean(supabase !== null);

// ==========================================
// SUPABASE DATABASE DATA HELPERS
// ==========================================

export async function getProducts(): Promise<Product[]> {
  if (!supabase) {
    return mockProducts;
  }

  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      return mockProducts;
    }

    // Map database snake_case columns to Product type
    return data.map((item: any) => ({
      id: item.id,
      name: item.name,
      slug: item.slug,
      price: Number(item.price),
      originalPrice: Number(item.original_price),
      category: item.category,
      gender: item.gender,
      fit: item.fit,
      fabric: item.fabric,
      gsm: item.gsm,
      description: item.description,
      features: item.features || [],
      images: item.images || [],
      sizes: item.sizes || [],
      colors: item.colors || [],
      stock: item.stock || {},
      isNewDrop: item.is_new_drop ?? false,
      isBestSeller: item.is_best_seller ?? false,
      dropName: item.drop_name,
      rating: Number(item.rating || 5),
      reviewCount: Number(item.review_count || 0),
    }));
  } catch (err) {
    console.error("Error communicating with Supabase:", err);
    return mockProducts;
  }
}

export async function createOrder(orderPayload: {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  pincode: string;
  city: string;
  state: string;
  address: string;
  items: any[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  paymentMethod: string;
}) {
  if (!supabase) {
    return { success: true, simulated: true, data: orderPayload };
  }

  try {
    const { data, error } = await supabase.from("orders").insert([
      {
        id: orderPayload.id,
        customer_name: orderPayload.customerName,
        customer_email: orderPayload.customerEmail,
        customer_phone: orderPayload.customerPhone,
        pincode: orderPayload.pincode,
        city: orderPayload.city,
        state: orderPayload.state,
        address: orderPayload.address,
        items: orderPayload.items,
        subtotal: orderPayload.subtotal,
        discount: orderPayload.discount,
        shipping_fee: orderPayload.shippingFee,
        total: orderPayload.total,
        payment_method: orderPayload.paymentMethod,
        status: "Processing",
      },
    ]);

    if (error) {
      console.error("Supabase order insert error:", error);
      return { success: false, error: error.message };
    }

    return { success: true, simulated: false, data };
  } catch (err: any) {
    console.error("Supabase unexpected error:", err);
    return { success: false, error: err.message };
  }
}

export async function getOrderById(orderId: string) {
  if (!supabase) return null;

  try {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .single();

    if (error) return null;
    return data;
  } catch {
    return null;
  }
}
