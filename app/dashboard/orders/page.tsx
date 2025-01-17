import { auth } from "@/auth";
import { getSellerOrders } from '@/lib/data';
import { OrderStatus } from "@prisma/client";
import { redirect } from 'next/navigation';
import SellerOrderList from '@/components/orders/ordersAdmin/SellerOrderList';

export default async function SellerOrdersPage() {
  const session = await auth();
  
  if (!session?.user?.id) {
    redirect('/login');
  }

  let { data: orders } = await getSellerOrders(session.user.id);
  orders = (orders ?? []).map(order => ({
    ...order,
    status: order.status as OrderStatus
  }));

  return (
    <div className="container mx-auto px-20 py-8">
      <h1 className="text-2xl font-bold mb-6">Manage Orders</h1>
      <SellerOrderList orders={orders || []} />
    </div>
  );
}