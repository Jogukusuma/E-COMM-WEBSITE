import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Laptop, Monitor, HardDrive, Keyboard, Dna } from "lucide-react";
import Link from "next/link";
import React from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const categories = [
  { name: 'Laptops', icon: <Laptop className="h-10 w-10 mx-auto mb-4" />, href: '/products?category=Laptops' },
  { name: 'Desktops', icon: <Monitor className="h-10 w-10 mx-auto mb-4" />, href: '/products?category=Desktops' },
  { name: 'Components', icon: <HardDrive className="h-10 w-10 mx-auto mb-4" />, href: '/products?category=Components' },
  { name: 'Peripherals', icon: <Keyboard className="h-10 w-10 mx-auto mb-4" />, href: '/products?category=Peripherals' },
  { name: 'Monitors', icon: <Dna className="h-10 w-10 mx-auto mb-4" />, href: '/products?category=Monitors' },
];

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'collaborative-night');
  
  return (
    <>
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center text-center bg-background">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover -z-10"
            quality={100}
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-black/60 -z-10" />
        <div className="container mx-auto px-4">
          <h1 className="mb-4 text-5xl md:text-7xl font-bold tracking-tight text-foreground drop-shadow-lg">
            SriComputers
          </h1>
          <p className="mb-8 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto drop-shadow-md">
            Click. Shop. Smile with SriComp.
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/products">Get Started</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-24">
        <div className="container mx-auto px-4">
          <div className="bg-black/20 dark:bg-white/5 backdrop-blur-sm rounded-3xl p-6 md:p-10">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
              {categories.map((category) => (
                <Link href={category.href} key={category.name} className="block group">
                  <Card className="text-center bg-transparent border-2 border-white/10 hover:border-primary/50 hover:bg-white/5 transition-all duration-300 transform hover:-translate-y-2 h-full">
                    <CardContent className="p-6 flex flex-col justify-center items-center h-full">
                      <div className="text-primary group-hover:text-primary transition-colors">
                        {category.icon}
                      </div>
                      <h3 className="text-base md:text-lg font-semibold text-white group-hover:text-primary transition-colors">{category.name}</h3>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
