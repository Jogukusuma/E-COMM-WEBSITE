import { products } from '@/lib/products';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import AddToCartButton from './AddToCartButton';
import ProductRecommendations from '@/components/ProductRecommendations';
import { PlaceHolderImages } from '@/lib/placeholder-images';

interface ProductPageProps {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }

  const imagePlaceholder = PlaceHolderImages.find(p => p.id === product.id);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        <div className="relative h-96 w-full overflow-hidden rounded-lg shadow-lg">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            data-ai-hint={imagePlaceholder?.imageHint || 'product'}
          />
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="mb-2 text-4xl font-bold font-headline tracking-tight">{product.name}</h1>
          <p className="mb-4 text-lg text-muted-foreground">{product.category}</p>
          <p className="mb-6 text-base leading-relaxed">{product.description}</p>
          <div className="flex items-center justify-between">
            <p className="text-4xl font-extrabold text-primary">₹{Math.floor(product.price)}</p>
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>

      <div className="mt-24">
        <ProductRecommendations
          currentProductId={product.id}
        />
      </div>
    </div>
  );
}
