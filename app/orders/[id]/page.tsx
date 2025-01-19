import { getOrderById, OrderStatus } from '@/lib/orders';
import { notFound } from 'next/navigation';
import OrderDetail from '@/components/orders/OrderDetail';
import { auth } from "@/auth";
import { redirect } from 'next/navigation';
import { Package, ArrowLeft, } from 'lucide-react';
import Link from 'next/link';

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) {
    redirect('/login');
  }

  const id = (await params).id;
  const { data: order } = await getOrderById(id);

  if (!order) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 md:px-8 lg:px-20 py-8 md:py-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-4 border-b border-gray-200">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center gap-3 mb-2">
              <Package className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Order Details
              </h1>
            </div>
            <p className="text-gray-600">
              Order ID: {id}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link 
              href="/orders" 
              className="flex items-center justify-center text-blue-600 hover:text-blue-700 font-medium px-4 py-2 rounded-lg border border-blue-600 hover:border-blue-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Orders
            </Link>
            
          </div>
        </div>

        {/* Order Content */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {order && (
            <OrderDetail 
              order={{
                ...order,
                shippingCost: order.shippingCost ?? 0,
                shippingMethod: order.shippingMethod ?? ''
              }}
            />
          )}
        </div>

        {/* Order Timeline */}
        <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Order Timeline</h2>
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-green-600">✓</span>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-900">Order Placed</h3>
                  <time className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </time>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Your order has been confirmed and is being processed
                </p>
              </div>
            </div>

            {order.status !== OrderStatus.PENDING && (
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600">📦</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900">
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </h3>
                    <time className="text-sm text-gray-500">
                      {new Date(order.updatedAt).toLocaleDateString()}
                    </time>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {order.status === OrderStatus.SHIPPED && 'Your order is on its way'}
                    {order.status === OrderStatus.DELIVERED && 'Your order has been delivered'}
                    {order.status === OrderStatus.CANCELLED && 'Your order has been cancelled'}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Need Help Section */}
        <div className="mt-8 bg-blue-50 rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-2 text-gray-900">Need Help?</h2>
          <p className="text-gray-600 mb-4">
            If you have any questions about your order, we&apos;re here to help.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors">
              Contact Support
            </button>
            <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors">
              Return Policy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}