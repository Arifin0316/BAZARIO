'use client';

import { useState } from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { ProdakInterface1 } from '@/types';
import { addToCart } from '@/lib/data';
import toast from 'react-hot-toast';
import { useCart } from '@/components/cartContext';


export default function CartButton({ product }: { product: ProdakInterface1 }) {
  const [quantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const { updateCart } = useCart();

  const handleAddToCart = async () => {
    try {
      setLoading(true);
      await updateCart();
      const result = await addToCart(product.id, quantity);
      
      if (result.success) {
        toast.success('Product added to cart successfully');
      } else {
        toast.error(result.message || 'Failed to add product to cart');
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
      console.error('Add to cart error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <button
        onClick={handleAddToCart}
        disabled={product.stock <= 0 || loading}
        className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg text-lg font-medium transition-colors
          ${
            product.stock > 0 && !loading
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
      >
        <FiShoppingCart className="w-5 h-5" />
        {loading ? (
          'Adding to Cart...'
        ) : product.stock > 0 ? (
          'Add to Cart'
        ) : (
          'Out of Stock'
        )}
      </button>
    </div>
  );
}