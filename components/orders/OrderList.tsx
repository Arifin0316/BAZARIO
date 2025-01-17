'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { OrderStatus, PaymentStatus } from '@prisma/client';
import toast from 'react-hot-toast';
import Image from 'next/image';
import { cancelOrder } from '@/lib/data'; // Pastikan path sesuai
import router from 'next/router';

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
  orderItems: OrderItem[];
}

export default function OrderList({ orders }: { orders: Order[] }) {
  const [filter, setFilter] = useState<OrderStatus | 'ALL'>('ALL');
   const [isClient, setIsClient] = useState(false);
   const [cancellingOrder, setCancellingOrder] = useState<string | null>(null);
  
    useEffect(() => {
      setIsClient(true);
    }, []);
  
    if (!isClient) return null;

  const filteredOrders = filter === 'ALL' 
    ? orders 
    : orders.filter(order => order.status === filter);

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
  const handleCancelOrder = async (orderId: string) => {
    if (!confirm('Are you sure you want to cancel this order?')) {
      return;
    }

    setCancellingOrder(orderId);
    try {
      const result = await cancelOrder(orderId);
      
      if (result.success) {
        toast.success('Order cancelled successfully');
        router.reload(); // Refresh the page to get updated data
      } else {
        toast.error(result.message || 'Failed to cancel order');
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setCancellingOrder(null);
    }
  };  

  return (
    <div className="space-y-6">
      {/* Filter */}
      <div className="flex gap-2">
        <button
          onClick={() => setFilter('ALL')}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            filter === 'ALL' 
              ? 'bg-gray-900 text-white' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          All
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
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <div>
                <Link 
                  href={`/orders/${order.id}`}
                  className="text-lg font-medium text-blue-600 hover:text-blue-800"
                >
                  Order #{order.id.slice(-8)}
                </Link>
                <p className="text-sm text-gray-500 mt-1">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex gap-2 mt-2 md:mt-0">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
                  {order.paymentStatus}
                </span>
              </div>
            </div>

            {order.status === 'PENDING' && order.paymentStatus === 'UNPAID' && (
                  <button
                    onClick={() => handleCancelOrder(order.id)}
                    disabled={cancellingOrder === order.id}
                    className={`px-3 py-1 text-xs font-medium rounded-md 
                      ${cancellingOrder === order.id
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-red-50 text-red-600 hover:bg-red-100 transition-colors'
                      }`}
                  >
                    {cancellingOrder === order.id ? 'Cancelling...' : 'Cancel Order'}
                  </button>
                )}

            <div className="border-t border-gray-200 pt-4">
              <div className="flow-root">
                <ul className="-my-4 divide-y divide-gray-200">
                  {order.orderItems.map((item) => (
                    <li key={item.id} className="py-4 flex items-center">
                      <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-md overflow-hidden relative">
                        {item.prodak.image ? (
                          <Image
                            src={item.prodak.image}
                            alt={item.prodak.name}
                            width={100}
                            height={100}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            No Image
                          </div>
                        )}
                      </div>
                      <div className="ml-4 flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {item.prodak.name}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          Quantity: {item.quantity} × Rp {item.price.toLocaleString()}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4 mt-4">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-gray-600">Total Amount</span>
                <span className="font-bold text-gray-900">
                  Rp {order.totalAmount.toLocaleString()}
                </span>
              </div>
              {order.trackingNumber && (
                <div className="flex justify-between text-sm mt-2">
                  <span className="font-medium text-gray-600">Tracking Number</span>
                  <span className="text-gray-900">{order.trackingNumber}</span>
                </div>
              )}
              <div className="flex justify-between text-sm mt-2">
                <span className="font-medium text-gray-600">Shipping Method</span>
                <span className="text-gray-900">{order.shippingMethod}</span>
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