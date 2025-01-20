'use client';

import { useState } from 'react';
import Image from 'next/image';
import { updateCartItemQuantity, removeFromCart } from '@/lib/data';
import { FiTrash } from 'react-icons/fi';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';

interface CartItem {
  id: string;
  quantity: number;
  prodak: {
    id: string;
    name: string;
    price: number;
    image: string | null;
    stock: number;
  };
}

export default function CartItems({ items }: { items: CartItem[] }) {
  const [loading, setLoading] = useState<string | null>(null);

 
  const handleQuantityChange = async (itemId: string, newQuantity: number) => {
    try {
      setLoading(itemId);
      const result = await updateCartItemQuantity(itemId, newQuantity);
      if (result.success) {
        toast.success('Quantity updated successfully');
        // Refresh the page to get updated data
        window.location.reload();
      } else {
        toast.error(result.message || 'Failed to update quantity');
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setLoading(null);
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    try {
      setLoading(itemId);
      const result = await removeFromCart(itemId);
      if (result.success) {
        toast.success('Item removed from cart');
        // Refresh the page to get updated data
        window.location.reload();
      } else {
        toast.error(result.message || 'Failed to remove item');
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow dark:shadow-xl">
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {items.map((item) => (
          <li key={item.id} className="p-6">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0 w-24 h-24 relative">
                {item.prodak.image ? (
                  <Image
                    src={item.prodak.image}
                    alt={item.prodak.name}
                    width={500}
                    height={500}
                    className="object-cover rounded-md h-24 w-24"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center">
                    <span className="text-gray-400 dark:text-gray-500">No Image</span>
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <Link
                  href={`/products/${item.prodak.id}`}
                  className="text-lg font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
                >
                  {item.prodak.name}
                </Link>
                <p className="mt-1 text-gray-500 dark:text-gray-400">
                   {formatPrice(item.prodak.price)}
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <select
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
                  disabled={loading === item.id}
                  className="form-select border border-gray-300 dark:border-gray-600 rounded-md p-2 
                             bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                             focus:ring-blue-500 focus:border-blue-500"
                >
                  {[...Array(Math.min(10, item.prodak.stock))].map((_, i) => (
                    <option key={i + 1} value={i + 1} className="dark:bg-gray-700 dark:text-white">
                      {i + 1}
                    </option>
                  ))}
                </select>

                <button
                  onClick={() => handleRemoveItem(item.id)}
                  disabled={loading === item.id}
                  className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 
                             p-2 transition-colors disabled:opacity-50"
                >
                  <FiTrash size={20} />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {items.length === 0 && (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          Your cart is empty
        </div>
      )}
    </div>
  );
}