"use client"

import React, { useEffect, useState } from 'react';
import { getProductRecommendations } from '@/ai/flows/product-recommendations';
import { useCart } from '@/hooks/use-cart';
import { products } from '@/lib/products';
import { ProductCard } from './ProductCard';
import { Skeleton } from './ui/skeleton';
import type { Product } from '@/lib/types';

const BROWSING_HISTORY_KEY = 'sri-browsing-history';
const MAX_HISTORY_LENGTH = 10;

interface ProductRecommendationsProps {
  currentProductId: string;
}

export default function ProductRecommendations({ currentProductId }: ProductRecommendationsProps) {
  const { cartItems } = useCart();
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const updateHistoryAndFetch = async () => {
      // Update browsing history
      let history: string[] = JSON.parse(localStorage.getItem(BROWSING_HISTORY_KEY) || '[]');
      history = [currentProductId, ...history.filter(id => id !== currentProductId)];
      if (history.length > MAX_HISTORY_LENGTH) {
        history.pop();
      }
      localStorage.setItem(BROWSING_HISTORY_KEY, JSON.stringify(history));

      // Get cart contents
      const cartProductIds = cartItems.map(item => item.id);

      try {
        setLoading(true);
        const result = await getProductRecommendations({
          browsingHistory: history,
          cartContents: cartProductIds,
        });
        
        const recommendedProducts = result.recommendedProducts
          .map(id => products.find(p => p.id === id))
          .filter((p): p is Product => Boolean(p) && p.id !== currentProductId)
          // Limit to 4 recommendations and remove duplicates
          .filter((p, i, arr) => arr.findIndex(t => t.id === p.id) === i)
          .slice(0, 4);

        setRecommendations(recommendedProducts);
      } catch (error) {
        console.error("Failed to get product recommendations:", error);
        setRecommendations([]);
      } finally {
        setLoading(false);
      }
    };

    updateHistoryAndFetch();
  }, [currentProductId, cartItems]);

  if (loading) {
    return (
      <div>
        <h2 className="mb-6 text-2xl font-bold font-headline tracking-tight">You Might Also Like</h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex flex-col space-y-3">
              <Skeleton className="h-[200px] w-full rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-4 w-3/5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold font-headline tracking-tight">You Might Also Like</h2>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {recommendations.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
