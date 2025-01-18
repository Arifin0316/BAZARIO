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
    <div className="bg-white rounded-lg shadow">
      <ul className="divide-y divide-gray-200">
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
                    className="object-cover rounded-md"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 rounded-md flex items-center justify-center">
                    <span className="text-gray-400">No Image</span>
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <Link
                  href={`/products/${item.prodak.id}`}
                  className="text-lg font-medium text-gray-900 hover:text-blue-600"
                >
                  {item.prodak.name}
                </Link>
                <p className="mt-1 text-gray-500">
                  Rp {formatPrice(item.prodak.price)}
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <select
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
                  disabled={loading === item.id}
                  className="form-select border border-gray-300 rounded-md p-2"
                >
                  {[...Array(Math.min(10, item.prodak.stock))].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>

                <button
                  onClick={() => handleRemoveItem(item.id)}
                  disabled={loading === item.id}
                  className="text-red-600 hover:text-red-800 p-2 transition-colors"
                >
                  <FiTrash size={20} />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}