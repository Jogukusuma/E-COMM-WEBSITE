import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center text-center bg-background">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background -z-10" />
        <div className="container mx-auto px-4">
          <h1 className="mb-4 text-5xl md:text-7xl font-bold tracking-tight text-foreground drop-shadow-lg">
            SriComputers
          </h1>
          <p className="mb-8 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto drop-shadow-md">
            
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/products">Get Started</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
