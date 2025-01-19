import { redirect } from 'next/navigation';
import { getUserCart } from '@/lib/data';
import CheckoutForm from '@/components/checkout/CheckoutForm';
import OrderSummary from '@/components/checkout/OrderSummary';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default async function CheckoutPage() {
  const { success, data: cart } = await getUserCart();

  if (!success || !cart || cart.items.length === 0) {
    redirect('/cart');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShoppingCart className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Checkout</h1>
                <p className="mt-1 text-gray-600">Complete your order</p>
              </div>
            </div>
            <Link 
              href="/cart" 
              className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Cart
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <CheckoutForm cart={cart} />
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 lg:sticky lg:top-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
              <OrderSummary items={cart.items} />
            </div>

            {/* Security Notice */}
            <div className="mt-6 bg-green-50 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="text-green-600">🔒</div>
                <div>
                  <h3 className="text-sm font-medium text-green-900">Secure Checkout</h3>
                  <p className="mt-1 text-sm text-green-700">
                    Your payment information is encrypted and secure. We never store your credit card details.
                  </p>
                </div>
              </div>
            </div>

            {/* Help Section */}
            <div className="mt-4 text-sm text-gray-600">
              <p>Need help? Contact our support:</p>
              <p className="mt-1 font-medium">support@example.com</p>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <div className="text-gray-600 flex justify-center">🔒</div>
              <p className="text-sm font-medium text-gray-900">Secure Payment</p>
              <p className="text-xs text-gray-600">SSL Encrypted Checkout</p>
            </div>
            <div className="space-y-1">
              <div className="text-gray-600 flex justify-center">🚚</div>
              <p className="text-sm font-medium text-gray-900">Fast Delivery</p>
              <p className="text-xs text-gray-600">2-3 Business Days</p>
            </div>
            <div className="space-y-1">
              <div className="text-gray-600 flex justify-center">💯</div>
              <p className="text-sm font-medium text-gray-900">Satisfaction</p>
              <p className="text-xs text-gray-600">30-Day Money Back</p>
            </div>
            <div className="space-y-1">
              <div className="text-gray-600 flex justify-center">💬</div>
              <p className="text-sm font-medium text-gray-900">24/7 Support</p>
              <p className="text-xs text-gray-600">Always Here to Help</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}