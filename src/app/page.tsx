import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";
import Image from "next/image";
import Link from "next/link";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function Home() {
  const featuredProducts = products.slice(0, 4);
  const heroImage = PlaceHolderImages.find(p => p.id === 'hexagon-background');

  return (
    <>
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center text-center text-white">
        <Image
          src={heroImage?.imageUrl || "https://storage.googleapis.com/project-spark-347416-cms-public/cms/f7a1f592a88a44dca042784860161474.png"}
          alt="Abstract background with a hexagon pattern"
          fill
          className="object-cover -z-10"
          data-ai-hint={heroImage?.imageHint || 'hexagon abstract'}
          priority
        />
        <div className="absolute inset-0 bg-background/70 -z-10" />
        <div className="container mx-auto px-4">
          <h1 className="mb-4 text-5xl md:text-7xl font-bold tracking-tight text-foreground drop-shadow-lg">
            Find Your Next Rig
          </h1>
          <p className="mb-8 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto drop-shadow-md">
            The best components for high-performance computing.
          </p>
          <Button asChild size="lg">
            <Link href="#featured-products">Explore Products</Link>
          </Button>
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
