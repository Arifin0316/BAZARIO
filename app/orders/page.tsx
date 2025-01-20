import { getUserOrders } from '@/lib/orders';
import OrderList from '@/components/orders/OrderList';
import { auth } from "@/auth";
import { redirect } from 'next/navigation';
import { PackageOpen, ShoppingBag, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export interface Order {
  id: string;
  userId: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  shippingMethod: string | null;
}

export default async function OrdersPage() {
  const session = await auth();
  if (!session) {
    redirect('/login');
  }

  const { data: orders } = await getUserOrders();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-8 lg:px-20 py-8 md:py-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-4 border-b border-gray-200 dark:border-gray-700">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center gap-3 mb-2">
              <PackageOpen className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                My Orders
              </h1>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Track and manage your order history
            </p>
          </div>
          <Link 
            href="/" 
            className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Continue Shopping
          </Link>
        </div>

        {/* Orders Content */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
          {!orders || orders.length === 0 ? (
            <div className="p-8 md:p-12 text-center">
              <div className="flex justify-center mb-6">
                <ShoppingBag className="w-16 h-16 text-gray-400 dark:text-gray-500" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                No orders yet
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
                When you place your first order, it will appear here. Start shopping to find something you love!
              </p>
              <Link 
                href="/" 
                className="inline-flex items-center justify-center bg-blue-600 dark:bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              <OrderList orders={orders} />
            </div>
          )}
        </div>

        {/* Order Status Guide */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Order Status Guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                  <span className="text-yellow-600 dark:text-yellow-500">🕒</span>
                </div>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Processing</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Order has been received and is being processed</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <span className="text-blue-600 dark:text-blue-400">📦</span>
                </div>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Shipped</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Order is on its way to you</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <span className="text-green-600 dark:text-green-500">✓</span>
                </div>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Delivered</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Order has been delivered successfully</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                  <span className="text-red-600 dark:text-red-500">⚠️</span>
                </div>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Cancelled</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Order has been cancelled</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}