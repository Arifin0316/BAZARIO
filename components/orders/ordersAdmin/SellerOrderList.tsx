'use client';

import { useState } from 'react';
import { OrderStatus, PaymentStatus } from '@prisma/client';
import { updateOrderStatus } from '@/lib/data';
import { formatPrice } from '@/lib/utils';
import toast from 'react-hot-toast';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { Package, User, Truck, MapPin, Phone, Mail, CreditCard, Box } from 'lucide-react';

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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsUpdating(null);
      setTrackingNumber('');
    }
  };

  const getStatusColor = (status: OrderStatus) => {
    const colors = {
      PENDING: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      PROCESSING: 'bg-blue-100 text-blue-800 border-blue-200',
      SHIPPED: 'bg-purple-100 text-purple-800 border-purple-200',
      DELIVERED: 'bg-green-100 text-green-800 border-green-200',
      CANCELLED: 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[status];
  };

  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter('ALL')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
              ${filter === 'ALL' 
                ? 'bg-gray-900 text-white' 
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
          >
            All Orders
          </button>
          {Object.values(OrderStatus).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                ${filter === status 
                  ? 'bg-gray-900 text-white' 
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            {/* Order Header */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <Package className="w-5 h-5 text-gray-400" />
                    <h3 className="text-lg font-semibold text-gray-900">Order #{order.id.slice(-8)}</h3>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium 
                      ${order.paymentStatus === 'PAID' ? 'bg-green-100 text-green-800 border border-green-200' : 
                        order.paymentStatus === 'PENDING' ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' :
                        'bg-red-100 text-red-800 border border-red-200'}`}
                    >
                      {order.paymentStatus}
                    </span>
                    <span className="text-sm text-gray-500">
                      {formatDate(order.createdAt)}
                    </span>
                  </div>
                </div>

                {/* Status Update Controls */}
                {order.paymentStatus === 'PAID' && (
                  <div className="flex flex-wrap items-center gap-3">
                    {order.status === 'PENDING' && (
                      <button
                        onClick={() => handleStatusUpdate(order.id, OrderStatus.PROCESSING)}
                        disabled={isUpdating === order.id}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium 
                                 hover:bg-blue-700 transition-colors disabled:bg-gray-300"
                      >
                        Process Order
                      </button>
                    )}
                    
                    {order.status === 'PROCESSING' && (
                      <div className="flex flex-wrap items-center gap-2">
                        <input
                          type="text"
                          placeholder="Enter tracking number"
                          value={trackingNumber}
                          onChange={(e) => setTrackingNumber(e.target.value)}
                          className="px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <button
                          onClick={() => handleStatusUpdate(order.id, OrderStatus.SHIPPED)}
                          disabled={isUpdating === order.id || !trackingNumber}
                          className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium 
                                   hover:bg-purple-700 transition-colors disabled:bg-gray-300"
                        >
                          Mark as Shipped
                        </button>
                      </div>
                    )}

                    {order.status === 'SHIPPED' && (
                      <button
                        onClick={() => handleStatusUpdate(order.id, OrderStatus.DELIVERED)}
                        disabled={isUpdating === order.id}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium 
                                 hover:bg-green-700 transition-colors disabled:bg-gray-300"
                      >
                        Mark as Delivered
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Customer & Shipping Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 border-b border-gray-100 bg-gray-50">
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-gray-900 flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-400" />
                  Customer Information
                </h4>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-400" />
                    {order.user.name || 'N/A'}
                  </p>
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    {order.user.email || 'N/A'}
                  </p>
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    {order.phoneNumber}
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-gray-900 flex items-center gap-2">
                  <Truck className="w-4 h-4 text-gray-400" />
                  Shipping Information
                </h4>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    {order.shippingAddress}
                  </p>
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    <Truck className="w-4 h-4 text-gray-400" />
                    Method: {order.shippingMethod}
                  </p>
                  {order.trackingNumber && (
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <Box className="w-4 h-4 text-gray-400" />
                      Tracking: {order.trackingNumber}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="p-6">
              <h4 className="text-sm font-medium text-gray-900 mb-4 flex items-center gap-2">
                <Package className="w-4 h-4 text-gray-400" />
                Order Items
              </h4>
              <div className="space-y-4">
                {order.orderItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                    <div className="w-16 h-16 relative rounded-md overflow-hidden bg-white">
                      {item.prodak.image ? (
                        <Image
                          src={item.prodak.image}
                          alt={item.prodak.name}
                          width={100}
                          height={100}
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                          <Package className="w-6 h-6 text-gray-400" />
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

              <div className="mt-6 pt-4 border-t border-gray-100">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-900 flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-gray-400" />
                    Total Amount
                  </span>
                  <span className="text-lg font-semibold text-gray-900">
                    Rp {formatPrice(order.totalAmount)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredOrders.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-100">
            <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No orders found for this status</p>
          </div>
        )}
      </div>
    </div>
  );
}