import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-4 text-6xl font-bold tracking-tight text-center font-calligraphy text-primary">
        Welcome to SriComputers
      </h1>
      <p className="mb-8 text-center text-lg text-muted-foreground">
        Your one-stop shop for computers and hardware.
      </p>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
