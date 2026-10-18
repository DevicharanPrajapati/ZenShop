
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products } from "@/lib/products";

type ProductPageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({
    id: String(product.id),
  }));
}

export default function ProductDetailsPage({
  params,
}: ProductPageProps) {
  return (
    <Suspense
      fallback={
        <main className="mx-auto w-full max-w-5xl px-6 py-12">
          <p>Loading product...</p>
        </main>
      }
    >
      <ProductDetails params={params} />
    </Suspense>
  );
}

async function ProductDetails({ params }: ProductPageProps) {
  const { id } = await params;

  const product = products.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-12">
      <Link
        href="/products"
        className="text-sm text-gray-500 hover:text-black"
      >
        ← Back to products
      </Link>

      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="flex min-h-80 items-center justify-center rounded-2xl bg-gray-100">
          <span className="text-gray-400">Product Image</span>
        </div>

        <div className="min-w-0">
          <p className="text-sm text-gray-500">
            {product.category}
          </p>

          <h1 className="mt-2 break-words text-3xl font-bold">
            {product.name}
          </h1>

          <p className="mt-4 text-2xl font-semibold">
            ₹{product.price.toLocaleString("en-IN")}
          </p>

          <p className="mt-5 leading-7 text-gray-600">
            {product.description}
          </p>

          <button
            type="button"
            className="mt-8 w-full rounded-lg bg-black px-6 py-3 text-white hover:bg-gray-800"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </main>
  );
}
