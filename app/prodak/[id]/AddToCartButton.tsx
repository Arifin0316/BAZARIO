'use client';

import { useState } from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { ProdakInterface1 } from '@/types';
import { addToCart } from '@/lib/data';
import toast from 'react-hot-toast';

export default function AddToCartButton({ product }: { product: ProdakInterface1 }) {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    try {
      setLoading(true);
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
      <div className="flex items-center space-x-4">
        <label htmlFor="quantity" className="text-gray-700">
          Quantity:
        </label>
        <select
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="form-select border border-gray-300 rounded-md px-3 py-2"
          disabled={product.stock <= 0 || loading}
        >
          {[...Array(Math.min(10, product.stock))].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleAddToCart}
        disabled={product.stock <= 0 || loading}
        className={`w-full flex items-center justify-center gap-2 py-3 px-6 rounded-lg text-lg font-medium transition-colors
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