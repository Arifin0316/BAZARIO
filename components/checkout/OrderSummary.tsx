'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";

interface CartItem {
  id: string;
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
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Early return if no items
  if (!isClient || items.length === 0) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400 py-6">
        Your cart is empty
      </div>
    );
  }

  // Calculation with more precise rounding
  const subtotal = items.reduce((sum, item) => {
    return sum + (item.prodak.price * item.quantity);
  }, 0);

  const tax = Math.round(subtotal * 0.11); // Rounded tax calculation

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-xl p-6 sticky top-4">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Order Summary</h2>
      
      {/* Improved Items List */}
      <div className="space-y-4 mb-6">
        {items.map((item) => (
          <div 
            key={item.id} 
            className="flex items-center justify-between text-sm"
          >
            {/* Optional Image Display */}
            {item.prodak.image && (
              <Image 
                src={item.prodak.image} 
                alt={item.prodak.name}
                width={40}
                height={40}
                className="rounded-md mr-4"
              />
            )}
            
            <div className="flex-grow">
              <span className="text-gray-800 dark:text-white font-medium">
                {item.prodak.name}
              </span>
              <span className="block text-gray-500 dark:text-gray-400 text-xs">
                 {formatPrice(item.prodak.price)} x {item.quantity}
              </span>
            </div>
            
            <span className="text-gray-900 dark:text-white font-medium">
               {formatPrice(item.prodak.price * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      {/* Calculations Section */}
      <div className="space-y-4 border-t border-gray-200 dark:border-gray-700 pt-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
          <span className="text-gray-900 dark:text-white font-medium">
             {formatPrice(subtotal)}
          </span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Tax (11%)</span>
          <span className="text-gray-900 dark:text-white font-medium">
             {formatPrice(tax)}
          </span>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
          <div className="flex justify-between text-base font-semibold">
            <span className="text-gray-900 dark:text-white">Total</span>
            <span className="text-blue-600 dark:text-blue-400">
              {formatPrice(subtotal + tax)}
            </span>
          </div>
          
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 italic">
            * Shipping costs will be calculated at checkout
          </p>
        </div>
      </div>
    </div>
  );
}