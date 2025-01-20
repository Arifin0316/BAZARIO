'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { OrderStatus, PaymentStatus } from '@prisma/client';
import toast from 'react-hot-toast';
import Image from 'next/image';
import { cancelOrder } from '@/lib/data';
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
      PENDING: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300',
      PROCESSING: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300',
      SHIPPED: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300',
      DELIVERED: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300',
      CANCELLED: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
    };
    return colors[status];
  };

  const getStatusIcon = (status: OrderStatus) => {
    const icons = {
      PENDING: '⏳',
      PROCESSING: '⚙️',
      SHIPPED: '📦',
      DELIVERED: '✅',
      CANCELLED: '❌'
    };
    return icons[status];
  };

  const getPaymentStatusColor = (status: PaymentStatus) => {
    const colors = {
      UNPAID: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300',
      PENDING: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300',
      PAID: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300',
      FAILED: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300',
      REFUNDED: 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300'
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
        router.reload();
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
      {/* Scrollable Filter Buttons */}
      <div className="overflow-x-auto py-4">
        <div className="flex space-x-3 min-w-max px-2">
          <button
            onClick={() => setFilter('ALL')}
            className={`
              flex items-center space-x-2 px-5 py-2.5 rounded-lg
              transform transition-all duration-200
              shadow-sm hover:shadow-md
              text-sm font-medium whitespace-nowrap
              ${filter === 'ALL'
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white scale-[1.02]'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 hover:scale-[1.02]'
              }
            `}
          >
            <span>All Orders</span>
          </button>

          {Object.values(OrderStatus).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`
                flex items-center space-x-2 px-5 py-2.5 rounded-lg
                transform transition-all duration-200
                shadow-sm hover:shadow-md
                text-sm font-medium whitespace-nowrap
                ${filter === status
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white scale-[1.02]'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 hover:scale-[1.02]'
                }
              `}
            >
              <span>{getStatusIcon(status)}</span>
              <span>{status.charAt(0) + status.slice(1).toLowerCase()}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <div key={order.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <Link 
                    href={`/orders/${order.id}`}
                    className="text-lg font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    Order #{order.id.slice(-8)}
                  </Link>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)} {order.status}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
                    {order.paymentStatus}
                  </span>
                </div>
              </div>

              {order.status === 'PENDING' && order.paymentStatus === 'UNPAID' && (
                <div className="mt-4">
                  <button
                    onClick={() => handleCancelOrder(order.id)}
                    disabled={cancellingOrder === order.id}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all
                      ${cancellingOrder === order.id
                        ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                        : 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/50'
                      }`}
                  >
                    {cancellingOrder === order.id ? 'Cancelling...' : 'Cancel Order'}
                  </button>
                </div>
              )}

              {/* Order Items */}
              <div className="mt-6 border-t border-gray-100 dark:border-gray-700 pt-6">
                <ul className="divide-y divide-gray-100 dark:divide-gray-700">
                  {order.orderItems.map((item) => (
                    <li key={item.id} className="py-4 flex items-center">
                      <div className="flex-shrink-0 w-16 h-16 bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden">
                        {item.prodak.image ? (
                          <Image
                            src={item.prodak.image}
                            alt={item.prodak.name}
                            width={100}
                            height={100}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-500">
                            No Image
                          </div>
                        )}
                      </div>
                      <div className="ml-4 flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {item.prodak.name}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {item.quantity} × Rp {item.price.toLocaleString()}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Order Summary */}
              <div className="mt-6 border-t border-gray-100 dark:border-gray-700 pt-6">
                <dl className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <dt className="font-medium text-gray-500 dark:text-gray-400">Total Amount</dt>
                    <dd className="font-bold text-gray-900 dark:text-white">
                      Rp {order.totalAmount.toLocaleString()}
                    </dd>
                  </div>
                  {order.trackingNumber && (
                    <div className="flex justify-between">
                      <dt className="font-medium text-gray-500 dark:text-gray-400">Tracking Number</dt>
                      <dd className="text-gray-900 dark:text-white">{order.trackingNumber}</dd>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <dt className="font-medium text-gray-500 dark:text-gray-400">Shipping Method</dt>
                    <dd className="text-gray-900 dark:text-white">{order.shippingMethod}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        ))}

        {filteredOrders.length === 0 && (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
            <p className="text-gray-500 dark:text-gray-400">No orders found</p>
          </div>
        )}
      </div>
    </div>
  );
}