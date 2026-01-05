"use client"

import { useSearchParams } from "next/navigation";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { Suspense } from "react";
import { SearchX } from "lucide-react";

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(query.toLowerCase()) ||
    product.description.toLowerCase().includes(query.toLowerCase()) ||
    product.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 font-headline">
        Search Results for "{query}"
      </h1>
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border-2 border-dashed rounded-lg">
          <SearchX className="mx-auto h-16 w-16 text-muted-foreground" />
          <h2 className="mt-4 text-xl font-semibold">No products found</h2>
          <p className="mt-2 text-muted-foreground">
            We couldn't find any products matching your search for "{query}".
          </p>
        </div>
      )}
    </div>
  );
}


export default function SearchPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SearchResults />
        </Suspense>
    )
}
