import Link from "next/link";
import type { Product } from "@/lib/products";

type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
};

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="overflow-hidden rounded-xl border border-gray-200 bg-white p-5">
      <div className="flex h-48 items-center justify-center rounded-lg bg-gray-100">
        <span className="text-gray-400">Product Image</span>
      </div>

      <p className="mt-4 text-sm text-gray-500">{product.category}</p>

      <h2 className="mt-1 text-lg font-semibold">{product.name}</h2>

      <p className="mt-2 text-xl font-bold">
        ₹{product.price.toLocaleString("en-IN")}
      </p>

      <Link
        href={`/products/${product.id}`}
        className="mt-4 block w-full rounded-lg bg-black px-4 py-3 text-center text-white transition hover:bg-gray-800"
      >
        View Product
      </Link>
    </article>
  );
}
