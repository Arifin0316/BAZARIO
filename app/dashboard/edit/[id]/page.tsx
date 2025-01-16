import EditProdakForm from '@/components/EditProdakForm';
import { GetProdakById } from '@/lib/data';
import { notFound } from 'next/navigation';

export default async function editPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const id = (await params).id
 
  const product = await GetProdakById(id);

  if (!product) {
    notFound();
  }

  return (
    <div>
      <EditProdakForm initialProduct={product} />
    </div>
  )
}