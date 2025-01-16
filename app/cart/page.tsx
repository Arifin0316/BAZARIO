import { getUserCart } from '@/lib/data';
import CartItems from '@/components/cart/CartItems';
import { redirect } from 'next/navigation';
import CartSummary from '@/components/cart/CartSummary';
import Link from 'next/link';

export default async function CartPage() {
  const { success, data: cart } = await getUserCart();

  if (!success || !cart) {
    redirect('/');
  }

  return (
    <div className="container mx-auto px-20 py-8">
      <h1 className="text-2xl font-bold mb-8">Shopping Cart</h1>

      {cart.items.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-medium text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-500 mb-8">Add some items to your cart and they will appear here</p>
          <Link href="/" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CartItems items={cart.items} />
          </div>
          <div className="lg:col-span-1">
            <CartSummary items={cart.items} />
          </div>
        </div>
      )}
    </div>
  );
}