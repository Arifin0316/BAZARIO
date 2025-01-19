'use client';

import { OrderStatus, PaymentStatus } from '@prisma/client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Package, Truck, CreditCard, MapPin, Phone, FileText } from 'lucide-react';
import Link from 'next/link';

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
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  if (!isClient) return null;

  const getStatusColor = (status: OrderStatus) => {
    const colors = {
      PENDING: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      PROCESSING: 'bg-blue-100 text-blue-800 border-blue-200',
      SHIPPED: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      DELIVERED: 'bg-green-100 text-green-800 border-green-200',
      CANCELLED: 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[status];
  };

  const getPaymentStatusColor = (status: PaymentStatus) => {
    const colors = {
      UNPAID: 'bg-red-100 text-red-800 border-red-200',
      PENDING: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      PAID: 'bg-green-100 text-green-800 border-green-200',
      FAILED: 'bg-red-100 text-red-800 border-red-200',
      REFUNDED: 'bg-gray-100 text-gray-800 border-gray-200'
    };
    return colors[status];
  };

  const subtotal = order.totalAmount - (order.shippingCost || 0);

  return (
    <div className="bg-white rounded-xl shadow-sm divide-y divide-gray-200">
      {/* Order Header */}
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          <div className="flex flex-wrap gap-2">
            <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
              {order.status}
            </span>
            <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium border ${getPaymentStatusColor(order.paymentStatus)}`}>
              {order.paymentStatus}
            </span>
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
          <Package className="w-5 h-5 text-blue-600" />
          Order Items
        </h3>
        <div className="space-y-6">
          {order.orderItems.map((item) => (
            <div key={item.id} className="flex gap-6 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex-shrink-0 w-24 h-24 relative rounded-lg overflow-hidden bg-white">
                {item.prodak.image ? (
                  <Image
                    src={item.prodak.image}
                    alt={item.prodak.name}
                    fill
                    className="object-cover transition-transform hover:scale-110 duration-300"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                    <Package className="w-8 h-8 text-gray-400" />
                  </div>
                )}
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-1">{item.prodak.name}</h4>
                  <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                </div>
                <div className="flex justify-between items-end">
                  <p className="text-sm text-gray-600">Price per unit: Rp {item.price.toLocaleString()}</p>
                  <p className="text-lg font-semibold text-gray-900">
                    Rp {(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Summary */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-600" />
          Order Summary
        </h3>
        <div className="bg-gray-50 rounded-lg p-6 space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span className="text-gray-900 font-medium">Rp {subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Shipping Cost</span>
            <span className="text-gray-900 font-medium">Rp {(order.shippingCost || 0).toLocaleString()}</span>
          </div>
          <div className="pt-4 border-t border-gray-200">
            <div className="flex justify-between text-lg font-semibold">
              <span className="text-gray-900">Total</span>
              <span className="text-blue-600">Rp {order.totalAmount.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Shipping Information */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
          <Truck className="w-5 h-5 text-blue-600" />
          Shipping Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-gray-400" />
              <div>
                <h4 className="text-sm font-medium text-gray-900">Shipping Address</h4>
                <p className="mt-1 text-sm text-gray-600">{order.shippingAddress}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-gray-400" />
              <div>
                <h4 className="text-sm font-medium text-gray-900">Phone Number</h4>
                <p className="mt-1 text-sm text-gray-600">{order.phoneNumber}</p>
              </div>
            </div>
          </div>
          <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
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
      </div>

      {/* Payment Information */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-blue-600" />
          Payment Information
        </h3>
        <div className="bg-gray-50 rounded-lg p-4 space-y-4">
          <div>
            <h4 className="text-sm font-medium text-gray-900">Payment Method</h4>
            <p className="mt-1 text-sm text-gray-600">
              {order.payment?.paymentMethod || 'Not specified'}
            </p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-900">Payment Status</h4>
            <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium mt-2 border ${getPaymentStatusColor(order.paymentStatus)}`}>
              {order.paymentStatus}
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="p-6 bg-gray-50">
        <div className="flex justify-end">
          <Link
            href="/orders"
            className="inline-flex items-center px-6 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Back to Orders
          </Link>
        </div>
      </div>
    </div>
  );
}