'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import {createOrders} from '@/lib/data' // Pastikan path sesuai

const shippingMethods = [
  { id: 'jne', name: 'JNE Regular', cost: 12000 },
  { id: 'jne_express', name: 'JNE Express', cost: 22000 },
  { id: 'sicepat', name: 'SiCepat Regular', cost: 11000 },
  { id: 'sicepat_express', name: 'SiCepat Express', cost: 20000 },
];

interface CartProp {
  cart: {
    items: {
      id: string;
      quantity: number;
      prodak: {
        id: string;
        name: string;
        price: number;
      };
    }[];
  };
}

export default function CheckoutForm({ cart }: CartProp) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedShipping, setSelectedShipping] = useState(shippingMethods[0]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  // Calculate subtotal
  const subtotal = cart.items.reduce((sum, item) => {
    return sum + (item.prodak.price * item.quantity);
  }, 0);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      
      // Validate inputs
      const shippingAddress = formData.get('address') as string;
      const phoneNumber = formData.get('phone') as string;

      if (!shippingAddress.trim() || !phoneNumber.trim()) {
        toast.error('Please fill in all required fields');
        return;
      }

      const orderData = {
        shippingAddress,
        phoneNumber,
        notes: formData.get('notes') as string,
        shippingMethod: selectedShipping.name,
        shippingCost: selectedShipping.cost,
      };

      const result = await createOrders(orderData);

      if (result.success) {
        toast.success('Order created successfully!');
        if (result.data) {
          // Optionally show success message with order details
          toast.success(`Order #${result.data.id.slice(-8)} has been created`);
          router.push(`/orders/${result.data.id}`);
          router.refresh(); // Refresh server components
        } else {
          toast.error('Order data is missing.');
        }
      } else {
        // Show specific error message
        toast.error(result.message || 'Failed to create order');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
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

        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">Rp {subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping Cost</span>
              <span className="font-medium">Rp {selectedShipping.cost.toLocaleString()}</span>
            </div>
            <div className="pt-4 border-t border-gray-200">
              <div className="flex justify-between">
                <span className="font-semibold">Total</span>
                <span className="font-bold text-lg">
                  Rp {(subtotal + selectedShipping.cost).toLocaleString()}
                </span>
              </div>
            </div>
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
    </div>
  );
}