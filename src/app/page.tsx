import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";
import Image from "next/image";
import Link from "next/link";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function Home() {
  const featuredProducts = products.slice(0, 4);

  return (
    <>
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center text-center bg-background">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background -z-10" />
        <div className="container mx-auto px-4">
          <h1 className="mb-4 text-5xl md:text-7xl font-bold tracking-tight text-foreground drop-shadow-lg">
            Secure & Intuitive Trading
          </h1>
          <p className="mb-8 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto drop-shadow-md">
            The best components for high-performance computing.
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild size="lg">
              <Link href="#featured-products">Get Started</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="#featured-products">Start Trading</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="featured-products" className="container mx-auto px-4 py-16">
        <h2 className="mb-8 text-3xl font-bold tracking-tight text-center font-headline">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center mt-12">
           <Button asChild variant="outline">
              <Link href="/#">View All Products</Link>
            </Button>
        </div>
      </section>
    </>
  );
}
