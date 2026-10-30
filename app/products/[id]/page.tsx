import { notFound } from "next/navigation";
import { products } from "@/lib/products";
import ProductDetailsClient from "./ProductDetailsClient";

type Props = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);
  if (!product) {
    return { title: "Garment Not Found" };
  }
  return {
    title: `${product.name} | ZEN / STUDIO`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  // Get related products from same category or drop
  const relatedProducts = products
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  return <ProductDetailsClient product={product} relatedProducts={relatedProducts} />;
}
