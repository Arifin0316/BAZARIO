'use client';

import { OrderStatus, PaymentStatus } from '@prisma/client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  prodak: {
    name: string;
    image: string | null;
  };
}

interface Order {
  id: string;
  createdAt: Date;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  totalAmount: number;
  shippingCost: number;
  shippingMethod: string;
  shippingAddress: string;
  phoneNumber: string;
  notes: string | null;
  trackingNumber: string | null;
  orderItems: OrderItem[];
  payment: {
    id: string;
    paymentMethod: string;
    status: PaymentStatus;
  } | null;
}

export default function OrderDetail({ order }: { order: Order }) {
  const router = useRouter();
   const [isClient, setIsClient] = useState(false);
  
    useEffect(() => {
      setIsClient(true);
    }, []);
  
    if (!isClient) return null;

    

  const getStatusColor = (status: OrderStatus) => {
    const colors = {
      PENDING: 'bg-yellow-100 text-yellow-800',
      PROCESSING: 'bg-blue-100 text-blue-800',
      SHIPPED: 'bg-indigo-100 text-indigo-800',
      DELIVERED: 'bg-green-100 text-green-800',
      CANCELLED: 'bg-red-100 text-red-800'
    };
    return colors[status];
  };

  const getPaymentStatusColor = (status: PaymentStatus) => {
    const colors = {
      UNPAID: 'bg-red-100 text-red-800',
      PENDING: 'bg-yellow-100 text-yellow-800',
      PAID: 'bg-green-100 text-green-800',
      FAILED: 'bg-red-100 text-red-800',
      REFUNDED: 'bg-gray-100 text-gray-800'
    };
    return colors[status];
  };

  const subtotal = order.totalAmount - (order.shippingCost || 0);

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Order Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-medium text-gray-900">
              Order #{order.id.slice(-8)}
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Placed on {new Date(order.createdAt).toLocaleDateString()} at{' '}
              {new Date(order.createdAt).toLocaleTimeString()}
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-2">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
              {order.status}
            </span>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
              {order.paymentStatus}
            </span>
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Order Items</h3>
        <div className="flow-root">
          <ul className="-my-6 divide-y divide-gray-200">
            {order.orderItems.map((item) => (
              <li key={item.id} className="py-6 flex">
                <div className="flex-shrink-0 w-24 h-24 relative rounded-md overflow-hidden">
                  {item.prodak.image ? (
                    <Image
                      src={item.prodak.image}
                      alt={item.prodak.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400 text-xs">No Image</span>
                    </div>
                  )}
                </div>
                <div className="ml-4 flex-1 flex flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h4>{item.prodak.name}</h4>
                      <p className="ml-4">Rp {item.price.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="mt-1 flex justify-between text-sm text-gray-500">
                    <p>Quantity: {item.quantity}</p>
                    <p>Subtotal: Rp {(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Order Summary */}
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span className="text-gray-900 font-medium">Rp {subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Shipping Cost</span>
            <span className="text-gray-900 font-medium">Rp {(order.shippingCost || 0).toLocaleString()}</span>
          </div>
          <div className="pt-2 border-t border-gray-200">
            <div className="flex justify-between text-base font-medium">
              <span className="text-gray-900">Total</span>
              <span className="text-gray-900">Rp {order.totalAmount.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Shipping Information */}
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Shipping Information</h3>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-gray-900">Shipping Address</h4>
            <p className="mt-1 text-sm text-gray-600">{order.shippingAddress}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-900">Phone Number</h4>
            <p className="mt-1 text-sm text-gray-600">{order.phoneNumber}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-900">Shipping Method</h4>
            <p className="mt-1 text-sm text-gray-600">{order.shippingMethod}</p>
          </div>
          {order.trackingNumber && (
            <div>
              <h4 className="text-sm font-medium text-gray-900">Tracking Number</h4>
              <p className="mt-1 text-sm text-gray-600">{order.trackingNumber}</p>
            </div>
          )}
          {order.notes && (
            <div>
              <h4 className="text-sm font-medium text-gray-900">Order Notes</h4>
              <p className="mt-1 text-sm text-gray-600">{order.notes}</p>
            </div>
          )}
        </div>
      </div>

      {/* Payment Information */}
      <div className="p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Information</h3>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-gray-900">Payment Method</h4>
            <p className="mt-1 text-sm text-gray-600">
              {order.payment?.paymentMethod || 'Not specified'}
            </p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-900">Payment Status</h4>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mt-1 ${getPaymentStatusColor(order.paymentStatus)}`}>
              {order.paymentStatus}
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="p-6 bg-gray-50 rounded-b-lg">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => router.back()}
            className="text-sm font-medium text-gray-700 hover:text-gray-500"
          >
            Back to Orders
          </button>
        </div>
      </div>
    </div>
  );
}