'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FiShoppingCart } from "react-icons/fi";
import type { ProdakInterface1 } from '@/types';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface ProductCardProps {
  product: ProdakInterface1;
}

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false)
 
  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null

  const handleAddToCart = () => {
    router.push(`/prodak/${product.id}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link href={`/prodak/${product.id}`} className="block">
        <div className="relative w-full h-48">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">No Image</span>
            </div>
          )}
          {product.stock <= 0 && (
            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs">
              Out of Stock
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        <Link href={`/products/${product.id}`} className="block">
          <h3 className="text-lg font-semibold text-gray-800 mb-2 hover:text-gray-600 truncate">
            {product.name}
          </h3>
        </Link>

        {product.description && (
          <p className="text-gray-600 text-sm mb-2 line-clamp-2">
            {product.description}
          </p>
        )}

        <div className="flex items-center justify-between mt-4">
          <div className="text-lg font-bold text-gray-900">
            Rp {product.price.toLocaleString()}
          </div>
          
          <div className="text-sm text-gray-500">
            Stock: {product.stock}
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={product.stock <= 0}
          className={`mt-4 w-full flex items-center justify-center gap-2 py-2 px-4 rounded-md transition-colors
            ${
              product.stock > 0
                ? 'bg-black text-white hover:bg-gray-800'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
        >
          <FiShoppingCart className="w-4 h-4" />
          {product.stock > 0 ? 'View Details' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
}