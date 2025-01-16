/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useEffect, useState } from 'react';
import { createOrder } from '@/lib/orders';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const shippingMethods = [
  { id: 'jne', name: 'JNE Regular', cost: 12000 },
  { id: 'jne_express', name: 'JNE Express', cost: 22000 },
  { id: 'sicepat', name: 'SiCepat Regular', cost: 11000 },
  { id: 'sicepat_express', name: 'SiCepat Express', cost: 20000 },
];

export default function CheckoutForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedShipping, setSelectedShipping] = useState(shippingMethods[0]);
  const [isClient, setIsClient] = useState(false)
   
    useEffect(() => {
      setIsClient(true)
    }, [])
  
    if (!isClient) return null
  
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      
      const orderData = {
        shippingAddress: formData.get('address') as string,
        phoneNumber: formData.get('phone') as string,
        notes: formData.get('notes') as string,
        shippingMethod: selectedShipping.name,
        shippingCost: selectedShipping.cost,
      };

      const result = await createOrder(orderData);

      if (result.success) {
        toast.success('Order created successfully!');
        if (result.data) {
          router.push(`/orders/${result.data.id}`);
        } else {
          toast.error('Order data is missing.');
        }
      } else {
        toast.error(result.message || 'Failed to create order');
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Shipping Information */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-6">Shipping Information</h2>
        <div className="space-y-6">
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
              Shipping Address
            </label>
            <textarea
              id="address"
              name="address"
              required
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your complete shipping address"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your phone number"
            />
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
              Order Notes (Optional)
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={2}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Add any special notes for your order"
            />
          </div>
        </div>
      </div>

      {/* Shipping Method */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-6">Shipping Method</h2>
        <div className="space-y-4">
          {shippingMethods.map((method) => (
            <label
              key={method.id}
              className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors
                ${selectedShipping.id === method.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-200'
                }`}
            >
              <div className="flex items-center">
                <input
                  type="radio"
                  name="shipping_method"
                  value={method.id}
                  checked={selectedShipping.id === method.id}
                  onChange={() => setSelectedShipping(method)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-3 text-sm font-medium text-gray-900">
                  {method.name}
                </span>
              </div>
              <span className="text-sm font-medium text-gray-900">
                Rp {method.cost.toLocaleString()}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Order Actions */}
      <div className="flex justify-end space-x-4 pt-6">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Back
        </button>
        <button
          type="submit"
          disabled={loading}
          className={`px-6 py-2 bg-blue-600 text-white rounded-md font-medium
            ${loading
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:bg-blue-700 transition-colors'
            }`}
        >
          {loading ? 'Processing...' : 'Place Order'}
        </button>
      </div>
    </form>
  );
}