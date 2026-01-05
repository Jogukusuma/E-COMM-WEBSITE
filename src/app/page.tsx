import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const featuredProducts = products.slice(0, 4);

  return (
    <>
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center text-center text-white">
        <Image
          src="https://storage.googleapis.com/project-spark-347416-cms-public/cms/02b28929e083403a958a0a8f8883d6a6.png"
          alt="Serene clouds over mountains"
          fill
          className="object-cover -z-10"
          data-ai-hint="clouds mountains"
          priority
        />
        <div className="absolute inset-0 bg-black/30 -z-10" />
        <div className="container mx-auto px-4">
          <h1 className="mb-4 text-5xl md:text-7xl font-bold tracking-tight font-calligraphy text-primary-foreground drop-shadow-lg">
            Welcome to SriComputers
          </h1>
          <p className="mb-8 text-lg md:text-xl text-primary-foreground/90 max-w-3xl mx-auto drop-shadow-md">
            Your ultimate destination for cutting-edge computers, components, and accessories.
          </p>
          <Button asChild size="lg">
            <Link href="#featured-products">Shop Now</Link>
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
