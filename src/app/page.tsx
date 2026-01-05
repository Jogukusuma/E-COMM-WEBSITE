
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function Home() {

  return (
    <>
      <section className="relative h-screen flex items-center justify-center text-center text-white">
        <Image
          src="https://storage.googleapis.com/project-spark-347416-cms-public/cms/9f9a463283e145f9a622ca5211b6d17b.png"
          alt="Smart camera on a dramatic blue background with lightning"
          fill
          className="object-cover -z-10"
          data-ai-hint="smart camera"
          priority
        />
        <div className="absolute inset-0 bg-black/60 -z-10" />
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
    </>
  );
}
