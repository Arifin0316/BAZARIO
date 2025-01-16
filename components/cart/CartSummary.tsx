'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface CartItem {
  quantity: number;
  prodak: {
    price: number;
  };
}

export default function CartSummary({ items }: { items: CartItem[] }) {
  const router = useRouter();
   const [isClient, setIsClient] = useState(false)
   
    useEffect(() => {
      setIsClient(true)
    }, [])
  
    if (!isClient) return null

  const subtotal = items.reduce((sum, item) => {
    return sum + (item.prodak.price * item.quantity);
  }, 0);

  const tax = subtotal * 0.11; // 11% tax
  const total = subtotal + tax;

  return (
    <div className="bg-white rounded-lg shadow p-6 sticky top-4">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
      
      <div className="space-y-4">
        <div className="flex justify-between text-base text-gray-600">
          <span>Subtotal</span>
          <span>Rp {subtotal.toLocaleString()}</span>
        </div>

        <div className="flex justify-between text-base text-gray-600">
          <span>Tax (11%)</span>
          <span>Rp {tax.toLocaleString()}</span>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between text-lg font-medium text-gray-900">
            <span>Total</span>
            <span>Rp {total.toLocaleString()}</span>
          </div>
        </div>

        <button
          onClick={() => router.push('/checkout')}
          className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors mt-6"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
