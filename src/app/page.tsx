import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold tracking-tight text-center font-headline">
        Welcome to SriComputers
      </h1>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
