import { redirect } from 'next/navigation';
import { getUserCart } from '@/lib/data';
import CheckoutForm from '@/components/checkout/CheckoutForm';
import OrderSummary from '@/components/checkout/OrderSummary';

export default async function CheckoutPage() {
  const { success, data: cart } = await getUserCart();

  if (!success || !cart || cart.items.length === 0) {
    redirect('/cart');
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <CheckoutForm cart={cart} />
        </div>
        <div className="lg:col-span-1">
          <OrderSummary items={cart.items} />
        </div>
      </div>
    </div>
  );
}