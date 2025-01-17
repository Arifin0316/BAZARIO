import { getOrderById } from '@/lib/orders';
import { notFound } from 'next/navigation';
import OrderDetail from '@/components/orders/OrderDetail';
import {auth} from "@/auth";
import { redirect } from 'next/navigation';




export default async function OrderDetailPage({ params }: {params: Promise<{ id: string }>}) {
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Order Details</h1>
      {order && <OrderDetail order={{ ...order, shippingCost: order.shippingCost ?? 0, shippingMethod: order.shippingMethod ?? '' }} />}
    </div>
  );
}
