// app/cek/[slug]/page.tsx
import { Suspense } from 'react';
import EditProdakForm from '@/components/EditProdakForm';
import { GetProdakById } from '@/lib/data';
import { notFound } from 'next/navigation';
import { unstable_noStore as noStore } from 'next/cache';

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function Page({ params }: Props) {
  // Tunggu resolve dari params
  const { slug } = await params;

  // Pastikan caching dinonaktifkan
  noStore();

  // Ambil data produk berdasarkan slug
  const product = await GetProdakById(slug);

  // Jika produk tidak ditemukan, arahkan ke halaman 404
  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto">
      <Suspense fallback={<div>Loading...</div>}>
        <EditProdakForm initialProduct={product} />
      </Suspense>
    </div>
  );
}
