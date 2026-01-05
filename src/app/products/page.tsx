"use client"

import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function ProductsGrid() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');

  const filteredProducts = category 
    ? products.filter(p => p.category === category)
    : products;
  
  const title = category ? `${category}` : "All Products";

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 font-headline">{title}</h1>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductsGrid />
    </Suspense>
  )
}