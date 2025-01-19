'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { ProdakInterface1 } from '@/types';
import { useEffect, useState } from 'react';
import CartButton from '@/components/product/addCart';
import { ImageOff } from 'lucide-react';

interface ProductCardProps {
  product: ProdakInterface1;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <Link href={`/prodak/${product.id}`} className="block relative">
        <div className="relative w-full pt-[100%] overflow-hidden">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transform transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
              <ImageOff className="w-12 h-12 text-gray-400" />
            </div>
          )}
          {/* Badge Container */}
          <div className="absolute top-2 right-2 flex flex-col gap-2">
            {product.stock <= 0 && (
              <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                Out of Stock
              </div>
            )}
            {product.stock > 0 && product.stock <= 5 && (
              <div className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                Low Stock
              </div>
            )}
          </div>
        </div>
      </Link>

      <div className="p-4 space-y-3">
        <div className="min-h-[2.5rem]">
          <Link href={`/products/${product.id}`} className="block">
            <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-200 truncate">
              {product.name}
            </h3>
          </Link>

          {product.description && (
            <p className="text-gray-600 text-sm mt-1 line-clamp-2 min-h-[2.5rem]">
              {product.description}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="space-y-1">
            <div className="text-xl font-bold text-gray-900">
              Rp {product.price.toLocaleString()}
            </div>
            <div className="text-sm text-gray-500 flex items-center gap-1">
              Stock: <span className="font-medium">{product.stock}</span>
            </div>
          </div>
        </div>

        <div className="pt-2">
          <CartButton product={product} />
        </div>
      </div>
    </div>
  );
}