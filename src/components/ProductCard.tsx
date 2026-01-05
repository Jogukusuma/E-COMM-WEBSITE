"use client"

import Image from "next/image"
import Link from "next/link"
import { ShoppingCart } from "lucide-react"

import type { Product } from "@/lib/types"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import React from "react"
import { PlaceHolderImages } from "@/lib/placeholder-images"

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const imagePlaceholder = PlaceHolderImages.find(p => p.id === product.id);

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <Link href={`/product/${product.id}`} className="group block">
      <Card className="flex h-full flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
        <CardHeader className="p-0">
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              data-ai-hint={imagePlaceholder?.imageHint || 'product'}
            />
          </div>
        </CardHeader>
        <CardContent className="flex-1 p-4">
          <CardTitle className="mb-1 text-lg font-semibold font-headline tracking-tight">{product.name}</CardTitle>
          <CardDescription className="line-clamp-2 text-sm">{product.description}</CardDescription>
        </CardContent>
        <CardFooter className="flex items-center justify-between p-4 pt-0">
          <p className="text-lg font-bold text-primary">₹{product.price.toFixed(2)}</p>
          <Button size="sm" onClick={handleAddToCart}>
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
