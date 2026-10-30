export type ProductColor = {
  name: string;
  hex: string;
};

export type ProductCategory =
  | "T-Shirts"
  | "Hoodies & Fleeces"
  | "Jackets & Overshirts"
  | "Pants & Cargos"
  | "Accessories";

export type ProductFit = "Boxy Oversized" | "Relaxed Drop-Shoulder" | "Structured Utility" | "Standard";

export type ProductReview = {
  id: string;
  author: string;
  city: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice: number;
  category: ProductCategory;
  gender: "Unisex" | "Men" | "Women";
  fit: ProductFit;
  fabric: string;
  gsm?: number;
  description: string;
  features: string[];
  images: [string, string, ...string[]]; // At least 2 images for front & reverse hover
  sizes: string[];
  colors: ProductColor[];
  stock: Record<string, number>;
  isNewDrop: boolean;
  isBestSeller: boolean;
  dropName?: string;
  rating: number;
  reviewCount: number;
  reviews?: ProductReview[];
};

export const products: Product[] = [
  {
    id: "zen-tee-01",
    name: "Acid Wash Monolith Boxy T-Shirt",
    slug: "acid-wash-monolith-boxy-tshirt",
    price: 1899,
    originalPrice: 2499,
    category: "T-Shirts",
    gender: "Unisex",
    fit: "Boxy Oversized",
    fabric: "100% Combed Heavy Cotton",
    gsm: 280,
    description:
      "Engineered with a high-density 280 GSM combed cotton jersey. Features a custom mineral acid wash, raw ribbed collar, and signature 'ZEN STUDIO' architectural back graphic.",
    features: [
      "280 GSM Heavyweight French Terry finish",
      "Reinforced double-needle collar stitch",
      "High-density screenprint on reverse",
      "Pre-shrunk to maintain oversized drape",
      "Ethically crafted in Tiruppur, India",
    ],
    images: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1000&auto=format&fit=crop",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Washed Slate", hex: "#3b3f46" },
      { name: "Raw Ecru", hex: "#f0ebe1" },
      { name: "Onyx Black", hex: "#141414" },
    ],
    stock: { S: 5, M: 2, L: 8, XL: 4, XXL: 1 },
    isNewDrop: true,
    isBestSeller: true,
    dropName: "DROP 01: MONOLITH",
    rating: 4.9,
    reviewCount: 38,
    reviews: [
      {
        id: "r1",
        author: "Aarav Sharma",
        city: "Mumbai",
        rating: 5,
        date: "2 days ago",
        comment: "The 280 GSM weight is unreal. Better drape than imported streetwear brands. True boxy fit!",
        verified: true,
      },
      {
        id: "r2",
        author: "Kavya Patel",
        city: "Bangalore",
        rating: 5,
        date: "1 week ago",
        comment: "Loved the washed slate shade. Looks super aesthetic with baggy cargos.",
        verified: true,
      },
    ],
  },
  {
    id: "zen-hoodie-02",
    name: "Architectural Heavyweight Hoodie",
    slug: "architectural-heavyweight-hoodie",
    price: 3499,
    originalPrice: 4499,
    category: "Hoodies & Fleeces",
    gender: "Unisex",
    fit: "Boxy Oversized",
    fabric: "380 GSM Diagonal Loopback Terry",
    gsm: 380,
    description:
      "Crafted from ultra-dense 380 GSM diagonal loopback terry. Double-layered crossover hood without drawstrings for an ultra-clean, sculpted streetwear profile.",
    features: [
      "380 GSM ultra-heavy diagonal loopback cotton",
      "Zero-drawstring architectural hood shape",
      "Concealed side-seam pockets (no bulk kangaroo pouch)",
      "Ribbed side gussets for enhanced mobility",
      "Tonal embossed Zen logo on left sleeve",
    ],
    images: [
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1000&auto=format&fit=crop",
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Cobalt Zen", hex: "#1e3a8a" },
      { name: "Washed Charcoal", hex: "#2b2b2b" },
      { name: "Chalk White", hex: "#f5f5f0" },
    ],
    stock: { S: 3, M: 0, L: 5, XL: 2 },
    isNewDrop: true,
    isBestSeller: true,
    dropName: "DROP 01: MONOLITH",
    rating: 4.8,
    reviewCount: 54,
    reviews: [
      {
        id: "r3",
        author: "Rohan V.",
        city: "Delhi NCR",
        rating: 5,
        date: "3 days ago",
        comment: "The hood holds its shape without slouching. 10/10 structure.",
        verified: true,
      },
    ],
  },
  {
    id: "zen-cargo-03",
    name: "Tactical Bellow-Pocket Cargo Pants",
    slug: "tactical-bellow-pocket-cargo-pants",
    price: 2999,
    originalPrice: 3899,
    category: "Pants & Cargos",
    gender: "Unisex",
    fit: "Relaxed Drop-Shoulder",
    fabric: "High-Density Cotton Ripstop",
    gsm: 260,
    description:
      "Engineered for modern urban utility. 6-pocket modular construction featuring articulated knee pleats, adjustable toggle hems, and an elasticated waistband with industrial drawcord.",
    features: [
      "Military-grade 260 GSM ripstop fabric",
      "Dual bellow thigh cargo pockets with matte snaps",
      "Bungee hem toggles to switch from wide-leg to cuffed",
      "YKK zipper fly with reinforced seat",
    ],
    images: [
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?q=80&w=1000&auto=format&fit=crop",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Tactical Olive", hex: "#3f4634" },
      { name: "Pitch Black", hex: "#0f0f0f" },
      { name: "Desert Khaki", hex: "#b8a37e" },
    ],
    stock: { S: 4, M: 6, L: 3, XL: 1, XXL: 0 },
    isNewDrop: false,
    isBestSeller: true,
    rating: 4.7,
    reviewCount: 29,
  },
  {
    id: "zen-jacket-04",
    name: "Architectural Canvas Workwear Overshirt",
    slug: "architectural-canvas-workwear-overshirt",
    price: 3799,
    originalPrice: 4999,
    category: "Jackets & Overshirts",
    gender: "Unisex",
    fit: "Structured Utility",
    fabric: "12oz Duck Cotton Canvas",
    gsm: 340,
    description:
      "A modern reinterpretation of classic Indian workwear. Structured boxy profile with antique gunmetal buttons, dual chest flap utility pockets, and a soft flannel interior collar.",
    features: [
      "12oz heavy duck cotton canvas",
      "Matte gunmetal branded snap closures",
      "Reinforced elbows for lasting durability",
      "Square hem designed for layering over hoodies",
    ],
    images: [
      "https://images.unsplash.com/photo-1548883354-7622d03aca27?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1000&auto=format&fit=crop",
    ],
    sizes: ["M", "L", "XL"],
    colors: [
      { name: "Raw Umber", hex: "#4a3525" },
      { name: "Washed Black", hex: "#1f1f1f" },
    ],
    stock: { M: 4, L: 7, XL: 2 },
    isNewDrop: true,
    isBestSeller: false,
    dropName: "DROP 01: MONOLITH",
    rating: 4.9,
    reviewCount: 19,
  },
  {
    id: "zen-tee-05",
    name: "Typographic Raw Hem Drop Tee",
    slug: "typographic-raw-hem-drop-tee",
    price: 1799,
    originalPrice: 2299,
    category: "T-Shirts",
    gender: "Unisex",
    fit: "Boxy Oversized",
    fabric: "100% Organic Ring-spun Cotton",
    gsm: 260,
    description:
      "A clean everyday staple inspired by brutalist typography. Features an understated chest moniker and an oversized back typographic grid with raw-edge sleeves.",
    features: [
      "260 GSM organic ring-spun cotton",
      "Drop-shoulder silhouette with wide armholes",
      "Breathable and fade-resistant pigment dye",
    ],
    images: [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=1000&auto=format&fit=crop",
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Bone White", hex: "#ede8db" },
      { name: "Faded Sage", hex: "#6c7a6e" },
    ],
    stock: { S: 7, M: 8, L: 4, XL: 3 },
    isNewDrop: false,
    isBestSeller: true,
    rating: 4.6,
    reviewCount: 41,
  },
  {
    id: "zen-acc-06",
    name: "Cyber Tactical Crossbody Sling Bag",
    slug: "cyber-tactical-crossbody-sling-bag",
    price: 1499,
    originalPrice: 1999,
    category: "Accessories",
    gender: "Unisex",
    fit: "Standard",
    fabric: "Ballistic Cordura® 600D Waterproof",
    description:
      "Compact, modular utility sling engineered for daily essentials. Features a magnetic Fidlock-style buckle, waterproof tape zippers, and an adjustable seatbelt webbing strap.",
    features: [
      "600D ballistic waterproof Cordura nylon",
      "Quick-release magnetic buckle",
      "Padded compartment fits phone, keys & earbuds",
      "Reflective Zen 3M paracord pullers",
    ],
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=1000&auto=format&fit=crop",
    ],
    sizes: ["One Size"],
    colors: [
      { name: "Stealth Black", hex: "#0a0a0a" },
      { name: "Concrete Grey", hex: "#525252" },
    ],
    stock: { "One Size": 14 },
    isNewDrop: true,
    isBestSeller: true,
    dropName: "DROP 01: MONOLITH",
    rating: 4.9,
    reviewCount: 62,
  },
  {
    id: "zen-acc-07",
    name: "Architectonic Heavy Stainless Ring Set (3-Piece)",
    slug: "architectonic-heavy-stainless-ring-set",
    price: 1299,
    originalPrice: 1699,
    category: "Accessories",
    gender: "Unisex",
    fit: "Standard",
    fabric: "316L Surgical Grade Stainless Steel",
    description:
      "A set of three minimalist geometric rings forged from 316L surgical stainless steel. Sweatproof, tarnish-resistant, and hypoallergenic with a hand-brushed matte finish.",
    features: [
      "316L solid surgical steel (Never tarnishes or rusts)",
      "Brushed industrial matte finish",
      "Includes Signet, Beveled Band, and Split Ring",
      "Comes in custom Zen metal presentation tin",
    ],
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=1000&auto=format&fit=crop",
    ],
    sizes: ["Size 8 (18mm)", "Size 9 (19mm)", "Size 10 (20mm)"],
    colors: [
      { name: "Matte Silver", hex: "#c0c0c0" },
      { name: "Gunmetal Smoke", hex: "#43464b" },
    ],
    stock: { "Size 8 (18mm)": 9, "Size 9 (19mm)": 12, "Size 10 (20mm)": 4 },
    isNewDrop: false,
    isBestSeller: true,
    rating: 4.8,
    reviewCount: 31,
  },
  {
    id: "zen-acc-08",
    name: "Washed Heavyweight Cotton Dad Cap",
    slug: "washed-heavyweight-cotton-dad-cap",
    price: 999,
    originalPrice: 1499,
    category: "Accessories",
    gender: "Unisex",
    fit: "Standard",
    fabric: "100% Chino Twill Washed Cotton",
    description:
      "Unstructured 6-panel silhouette with subtle Zen Studio tonal embroidery. Features a pre-curved visor, breathable eyelets, and an antique brass strap buckle.",
    features: [
      "100% vintage washed cotton twill",
      "Tonal 3D micro-embroidery",
      "Antiqued brass slider buckle with tuck-in strap",
      "Sweat-absorbing interior headband",
    ],
    images: [
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?q=80&w=1000&auto=format&fit=crop",
    ],
    sizes: ["One Size"],
    colors: [
      { name: "Faded Olive", hex: "#4b5320" },
      { name: "Washed Charcoal", hex: "#2b2b2b" },
      { name: "Sandstone", hex: "#d2b48c" },
    ],
    stock: { "One Size": 20 },
    isNewDrop: false,
    isBestSeller: false,
    rating: 4.7,
    reviewCount: 18,
  },
];

export const CATEGORIES: ProductCategory[] = [
  "T-Shirts",
  "Hoodies & Fleeces",
  "Jackets & Overshirts",
  "Pants & Cargos",
  "Accessories",
];

export const FITS: ProductFit[] = [
  "Boxy Oversized",
  "Relaxed Drop-Shoulder",
  "Structured Utility",
  "Standard",
];

export const SIZES = ["S", "M", "L", "XL", "XXL", "One Size"];
