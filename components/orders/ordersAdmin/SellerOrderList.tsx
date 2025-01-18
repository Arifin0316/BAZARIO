/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState } from 'react';
import { OrderStatus, PaymentStatus } from '@prisma/client';
import { updateOrderStatus } from '@/lib/data';
import {formatPrice} from '@/lib/utils';
import toast from 'react-hot-toast';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns'
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
  shippingMethod: string | null;
  trackingNumber: string | null;
  phoneNumber: string;
  shippingAddress: string;
  notes: string | null;
  orderItems: OrderItem[];
  user: {
    name: string | null;
    email: string | null;
  };
}

export default function SellerOrderList({ orders }: { orders: Order[] }) {
  const router = useRouter();
  const [filter, setFilter] = useState<OrderStatus | 'ALL'>('ALL');
  const [isUpdating, setIsUpdating] = useState<string | null>(null);
  const [trackingNumber, setTrackingNumber] = useState<string>('');
    
  const formatDate = (date: Date) => {
    return format(new Date(date), 'dd/MM/yyyy HH:mm');
  };

  const filteredOrders = filter === 'ALL' 
    ? orders 
    : orders.filter(order => order.status === filter);

  const handleStatusUpdate = async (orderId: string, newStatus: OrderStatus) => {
    setIsUpdating(orderId);
    try {
      const result = await updateOrderStatus({
        orderId,
        status: newStatus,
        trackingNumber: newStatus === 'SHIPPED' ? trackingNumber : undefined
      });

      if (result.success) {
        toast.success('Order status updated successfully');
        router.refresh();
      } else {
        toast.error(result.message || 'Failed to update order status');
      }
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsUpdating(null);
      setTrackingNumber('');
    }
  };

  return (
    <div className="space-y-6">
      {/* Filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilter('ALL')}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            filter === 'ALL' 
              ? 'bg-gray-900 text-white' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          All Orders
        </button>
        {Object.values(OrderStatus).map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              filter === status 
                ? 'bg-gray-900 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow p-6">
            {/* Order Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
              <div>
                <div className="flex items-center gap-4">
                  <h3 className="text-lg font-semibold">Order #{order.id.slice(-8)}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium 
                    ${order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : 
                      order.status === 'PROCESSING' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'SHIPPED' ? 'bg-purple-100 text-purple-800' :
                      order.status === 'DELIVERED' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'}`}
                  >
                    {order.status}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium 
                    ${order.paymentStatus === 'PAID' ? 'bg-green-100 text-green-800' : 
                      order.paymentStatus === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'}`}
                  >
                    {order.paymentStatus}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  { formatDate(order.createdAt)}
                </p>
              </div>

              {/* Status Update Controls */}
              {order.paymentStatus === 'PAID' && (
                <div className="mt-4 lg:mt-0 flex items-center gap-4">
                  {order.status === 'PENDING' && (
                    <button
                      onClick={() => handleStatusUpdate(order.id, OrderStatus.PROCESSING)}
                      disabled={isUpdating === order.id}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                    >
                      Process Order
                    </button>
                  )}
                  
                  {order.status === 'PROCESSING' && (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Enter tracking number"
                        value={trackingNumber}
                        onChange={(e) => setTrackingNumber(e.target.value)}
                        className="px-3 py-2 border rounded-md text-sm"
                      />
                      <button
                        onClick={() => handleStatusUpdate(order.id, OrderStatus.SHIPPED)}
                        disabled={isUpdating === order.id || !trackingNumber}
                        className="px-4 py-2 bg-purple-600 text-white rounded-md text-sm font-medium hover:bg-purple-700 transition-colors disabled:bg-gray-300"
                      >
                        Mark as Shipped
                      </button>
                    </div>
                  )}

                  {order.status === 'SHIPPED' && (
                    <button
                      onClick={() => handleStatusUpdate(order.id, OrderStatus.DELIVERED)}
                      disabled={isUpdating === order.id}
                      className="px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 transition-colors"
                    >
                      Mark as Delivered
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Customer Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Customer Information</h4>
                <p className="text-sm text-gray-600">{order.user.name || 'N/A'}</p>
                <p className="text-sm text-gray-600">{order.user.email || 'N/A'}</p>
                <p className="text-sm text-gray-600">{order.phoneNumber}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Shipping Information</h4>
                <p className="text-sm text-gray-600">{order.shippingAddress}</p>
                <p className="text-sm text-gray-600">Method: {order.shippingMethod}</p>
                {order.trackingNumber && (
                  <p className="text-sm text-gray-600">Tracking: {order.trackingNumber}</p>
                )}
              </div>
            </div>

            {/* Order Items */}
            <div className="border-t border-gray-200 pt-4">
              <h4 className="text-sm font-medium text-gray-900 mb-4">Order Items</h4>
              <div className="space-y-4">
                {order.orderItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="w-16 h-16 relative rounded-md overflow-hidden">
                      {item.prodak.image ? (
                        <Image
                          src={item.prodak.image}
                          alt={item.prodak.name}
                          width={100}
                          height={100}
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-400 text-xs">No Image</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{item.prodak.name}</p>
                      <p className="text-sm text-gray-500">
                        {item.quantity} x Rp {formatPrice(item.price)}
                      </p>
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      Rp {formatPrice(item.quantity * item.price)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between text-sm font-medium text-gray-900">
                  <span>Total Amount</span>
                  <span>Rp {formatPrice(order.totalAmount)}</span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredOrders.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-500">No orders found</p>
          </div>
        )}
      </div>
    </div>
  );
}
