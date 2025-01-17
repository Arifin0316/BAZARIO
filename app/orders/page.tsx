import { getUserOrders } from '@/lib/orders';
import OrderList from '@/components/orders/OrderList';
import { auth } from "@/auth";
import { redirect } from 'next/navigation';

export interface Order {
  id: string;
  userId: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  shippingMethod: string | null;
  // other properties...

}

export default async function OrdersPage() {
  const session = await auth();
  if (!session) {
    redirect('/login');
  }

  const { data: orders } = await getUserOrders();

  return (
    <div className="container mx-auto px-20 py-8">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>
      <OrderList orders={orders || []} />
    </div>
  );
}