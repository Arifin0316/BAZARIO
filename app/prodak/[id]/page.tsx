// app/prodak/[id]/page.tsx
import Image from 'next/image';
import { GetAllProdakById } from '@/lib/data';
import AddToCartButton from './AddToCartButton';
import { notFound } from 'next/navigation';

export default async function ProductDetail({ params }: {params: Promise<{ id: string }>}) {
  const id = (await params).id
  const product = await GetAllProdakById(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 md:px-20 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Image Section */}
            <div className="relative h-[400px] md:h-[500px]">
              {product.image ? (
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400 text-lg">No Image Available</span>
                </div>
              )}
            </div>

            {/* Product Info Section */}
            <div className="p-6 md:p-8 flex flex-col">
              <div className="flex-grow">
                <div className="mb-6">
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    {product.name}
                  </h1>
                  <p className="text-2xl font-bold text-gray-900 mb-4">
                    Rp {product.price.toLocaleString()}
                  </p>
                </div>

                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">Description</h2>
                  <p className="text-gray-600">
                    {product.description || 'No description available'}
                  </p>
                </div>

                <div className="mb-8">
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-600">Stock:</span>
                    <span className={`font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {product.stock > 0 ? `${product.stock} units available` : 'Out of stock'}
                    </span>
                  </div>
                </div>
              </div>

              <AddToCartButton product={product} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}