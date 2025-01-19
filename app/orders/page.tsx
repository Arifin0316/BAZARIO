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
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 md:px-8 lg:px-20 py-8 md:py-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-4 border-b border-gray-200">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center gap-3 mb-2">
              <PackageOpen className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                My Orders
              </h1>
            </div>
            <p className="text-gray-600">
              Track and manage your order history
            </p>
          </div>
          <Link 
            href="/" 
            className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Continue Shopping
          </Link>
        </div>

        {/* Orders Content */}
        <div className="bg-white rounded-xl shadow-sm">
          {!orders || orders.length === 0 ? (
            <div className="p-8 md:p-12 text-center">
              <div className="flex justify-center mb-6">
                <ShoppingBag className="w-16 h-16 text-gray-400" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                No orders yet
              </h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                When you place your first order, it will appear here. Start shopping to find something you love!
              </p>
              <Link 
                href="/" 
                className="inline-flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              <OrderList orders={orders} />
            </div>
          )}
        </div>

        {/* Order Status Guide */}
        <div className="mt-12 bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-900">Order Status Guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
                  <span className="text-yellow-600">🕒</span>
                </div>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Processing</h3>
                <p className="text-sm text-gray-600">Order has been received and is being processed</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600">📦</span>
                </div>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Shipped</h3>
                <p className="text-sm text-gray-600">Order is on its way to you</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-green-600">✓</span>
                </div>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Delivered</h3>
                <p className="text-sm text-gray-600">Order has been delivered successfully</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                  <span className="text-red-600">⚠️</span>
                </div>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Cancelled</h3>
                <p className="text-sm text-gray-600">Order has been cancelled</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}