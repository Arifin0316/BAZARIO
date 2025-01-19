'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { createOrders } from '@/lib/data';
import { MapPin, PhoneCall, FileText, Truck, Package, ArrowLeft } from 'lucide-react';

const shippingMethods = [
  { id: 'jne', name: 'JNE Regular', cost: 12000, estimatedDays: '2-3' },
  { id: 'jne_express', name: 'JNE Express', cost: 22000, estimatedDays: '1-2' },
  { id: 'sicepat', name: 'SiCepat Regular', cost: 11000, estimatedDays: '2-3' },
  { id: 'sicepat_express', name: 'SiCepat Express', cost: 20000, estimatedDays: '1' },
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

  const subtotal = cart.items.reduce((sum, item) => {
    return sum + (item.prodak.price * item.quantity);
  }, 0);

  const tax = Math.round(subtotal * 0.11)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
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
          toast.success(`Order #${result.data.id.slice(-8)} has been created`);
          router.push(`/orders/${result.data.id}`);
          router.refresh();
        }
      } else {
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
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Shipping Information */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-6">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-6">
            <MapPin className="w-5 h-5 text-blue-600" />
            Shipping Information
          </h2>
          <div className="space-y-6">
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                Shipping Address <span className="text-red-500">*</span>
              </label>
              <textarea
                id="address"
                name="address"
                required
                rows={3}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter your complete shipping address"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <PhoneCall className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                Order Notes (Optional)
              </label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <textarea
                  id="notes"
                  name="notes"
                  rows={2}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Add any special notes for your order"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Shipping Method */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-6">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-6">
            <Truck className="w-5 h-5 text-blue-600" />
            Shipping Method
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {shippingMethods.map((method) => (
              <label
                key={method.id}
                className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all duration-200
                  ${selectedShipping.id === method.id
                    ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-100'
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
                  <div className="ml-3">
                    <span className="block text-sm font-medium text-gray-900">
                      {method.name}
                    </span>
                    <span className="block text-sm text-gray-500">
                      Est. {method.estimatedDays} days
                    </span>
                  </div>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  Rp {method.cost.toLocaleString()}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-6">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-6">
            <Package className="w-5 h-5 text-blue-600" />
            Order Summary
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">Rp {subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Shipping Cost</span>
              <span className="font-medium">Rp {selectedShipping.cost.toLocaleString()}</span>
            </div>
            <div className="pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-900">Total</span>
                <span className="font-bold text-xl text-blue-600">
                  Rp {(subtotal + selectedShipping.cost + tax).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Order Actions */}
      <div className="flex justify-end gap-4 pt-6">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex items-center px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </button>
        <button
          type="submit"
          disabled={loading}
          className={`px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium
            ${loading
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:bg-blue-700 transform hover:shadow-lg transition-all duration-200'
            }`}
        >
          {loading ? 'Processing...' : 'Place Order'}
        </button>
      </div>
    </form>
  );
}