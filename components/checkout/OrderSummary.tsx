'use client';

import { useState, useEffect } from "react";

interface CartItem {
  quantity: number;
  prodak: {
    name: string;
    price: number;
    image: string | null;
  };
}

export default function OrderSummary({
  items
}: {
  items: CartItem[];
}) {
  const subtotal = items.reduce((sum, item) => {
    return sum + (item.prodak.price * item.quantity);
  }, 0);

  const tax = subtotal * 0.11; // 11% tax
  const [isClient, setIsClient] = useState(false)
   
    useEffect(() => {
      setIsClient(true)
    }, [])
  
    if (!isClient) return null

  return (
    <div className="bg-white rounded-lg shadow p-6 sticky top-4">
      <h2 className="text-lg font-medium text-gray-900 mb-6">Order Summary</h2>
      
      {/* Items List */}
      <div className="space-y-4 mb-6">
        {items.map((item, index) => (
          <div key={index} className="flex justify-between text-sm">
            <span className="text-gray-600">
              {item.prodak.name} x {item.quantity}
            </span>
            <span className="text-gray-900 font-medium">
              Rp {(item.prodak.price * item.quantity).toLocaleString()}
            </span>
          </div>
        ))}
      </div>

      {/* Calculations */}
      <div className="space-y-4 border-t border-gray-200 pt-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="text-gray-900 font-medium">
            Rp {subtotal.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Tax (11%)</span>
          <span className="text-gray-900 font-medium">
            Rp {tax.toLocaleString()}
          </span>
        </div>
        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between text-base font-medium">
            <span className="text-gray-900">Total</span>
            <span className="text-blue-600">
              Rp {(subtotal + tax).toLocaleString()}
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            *Shipping cost will be added based on your selected shipping method
          </p>
        </div>
      </div>
    </div>
  );
}