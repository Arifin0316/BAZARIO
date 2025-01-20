import { getUserCart } from '@/lib/data';
import CartItems from '@/components/cart/CartItems';
import { redirect } from 'next/navigation';
import CartSummary from '@/components/cart/CartSummary';
import Link from 'next/link';
import { ShoppingCart, ArrowLeft, ShoppingBag } from 'lucide-react';

export default async function CartPage() {
  const { success, data: cart } = await getUserCart();

  if (!success || !cart) {
    redirect('/');
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <ShoppingCart className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              Shopping Cart
              {cart.items.length > 0 && (
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  ({cart.items.length} {cart.items.length === 1 ? 'item' : 'items'})
                </span>
              )}
            </h1>
          </div>
          <Link 
            href="/" 
            className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Continue Shopping
          </Link>
        </div>

        {cart.items.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 md:p-12 text-center max-w-2xl mx-auto">
            <div className="flex justify-center mb-6">
              <ShoppingBag className="w-20 h-20 text-gray-400 dark:text-gray-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
              Looks like you haven&apos;t added anything to your cart yet. Browse our products and find something you love!
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
                <CartItems items={cart.items} />
              </div>
            </div>
            
            {/* Cart Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm sticky top-4">
                <CartSummary items={cart.items} />
              </div>
            </div>
          </div>
        )}

        {/* Trust Badges */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-2">
              <div className="text-blue-600 dark:text-blue-400 flex justify-center">🔒</div>
              <h3 className="font-medium text-gray-900 dark:text-white">Secure Payment</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Your data is protected</p>
            </div>
            <div className="space-y-2">
              <div className="text-blue-600 dark:text-blue-400 flex justify-center">🚚</div>
              <h3 className="font-medium text-gray-900 dark:text-white">Free Shipping</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">On orders over $100</p>
            </div>
            <div className="space-y-2">
              <div className="text-blue-600 dark:text-blue-400 flex justify-center">↩️</div>
              <h3 className="font-medium text-gray-900 dark:text-white">Easy Returns</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">30-day return policy</p>
            </div>
            <div className="space-y-2">
              <div className="text-blue-600 dark:text-blue-400 flex justify-center">💬</div>
              <h3 className="font-medium text-gray-900 dark:text-white">24/7 Support</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Here to help you</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}