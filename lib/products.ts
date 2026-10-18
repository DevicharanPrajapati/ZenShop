
export type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
};

export const products: Product[] = [
  {
    id: 1,
    name: "Classic T-Shirt",
    price: 799,
    category: "Clothing",
    description:
      "A comfortable everyday T-shirt with a clean, classic design.",
  },
  {
    id: 2,
    name: "Casual Sneakers",
    price: 2499,
    category: "Footwear",
    description:
      "Versatile sneakers designed for everyday comfort.",
  },
  {
    id: 3,
    name: "Everyday Backpack",
    price: 1499,
    category: "Accessories",
    description:
      "A practical backpack for daily use and travel.",
  },
  {
    id: 4,
    name: "Minimal Watch",
    price: 1999,
    category: "Accessories",
    description:
      "A minimalist watch with a timeless design.",
  },
];
