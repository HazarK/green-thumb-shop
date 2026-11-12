import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductView } from "@/components/ProductView";
import { getProduct, products } from "@/data/products";

type Props = { params: Promise<{ productId: string }> };

/** Only known ids exist; anything else is a real 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ productId: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProduct((await params).productId);
  return { title: product ? product.name : "Product not found", description: product?.short };
}

export default async function ProductPage({ params }: Props) {
  const product = getProduct((await params).productId);
  if (!product) notFound();
  return <ProductView product={product} />;
}
