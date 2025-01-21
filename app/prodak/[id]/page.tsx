// app/prodak/[id]/page.tsx
import Image from 'next/image';
import { GetAllProdakById, Prodak } from '@/lib/data';
import AddToCartButton from '../../../components/product/AddToCartButton';
import { notFound } from 'next/navigation';
import ReviewList from '@/components/reviews/ReviewList';
import ProductsRecomet from '@/components/product/prodakrekomdasi';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { ProdakInterface1 } from '@/types';

export default async function ProductDetail({ params }: {params: Promise<{ id: string }>}) {
  const id = (await params).id
  const session = await auth();
    const prodak = await Prodak()
  const product = await GetAllProdakById(id) as unknown as ProdakInterface1;
  const grtCatagori = product.categoryId
  const catagori = prodak?.filter((prodak) => prodak.categoryId === grtCatagori) as unknown as ProdakInterface1[]
 
  if (!product) {
    notFound();
  }
  const userReview = session?.user?.id 
  ? await prisma.review.findFirst({
      where: {
        userId: session.user.id,
        prodakId: id
      },
      include: {
        user: {
          select: {
            name: true,
            image: true
          }
        }
      }
    })
  : null;

  return (
    <div className="min-h-screen px-4 md:px-20 py-12 bg-gray-50 pb-17 dark:bg-gray-900">
      <div className="max-w-7xl container mx-auto space-y-8">
        <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg dark:shadow-xl overflow-hidden">
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
                <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <span className="text-gray-400 dark:text-gray-500 text-lg">No Image Available</span>
                </div>
              )}
            </div>

            {/* Product Info Section */}
            <div className="p-6 md:p-8 flex flex-col">
              <div className="flex-grow">
                <div className="mb-6">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    {product.name}
                  </h1>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Rp {product.price.toLocaleString()}
                  </p>
                </div>

                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Description</h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    {product.description || 'No description available'}
                  </p>
                </div>

                <div className="mb-8">
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-600 dark:text-gray-400">Stock:</span>
                    <span className={`font-medium ${
                      product.stock > 0 
                        ? 'text-green-600 dark:text-green-400' 
                        : 'text-red-600 dark:text-red-400'
                    }`}>
                      {product.stock > 0 ? `${product.stock} units available` : 'Out of stock'}
                    </span>
                  </div>
                </div>
              </div>

              <AddToCartButton product={product} />
            </div>
          </div>
        </div>
        <div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-xl overflow-hidden'>
        <ReviewList 
            productId={id}
            reviews={product.reviews || []}
            userReview={userReview}
            userId={session?.user?.id || null}
        />
        </div>
        <ProductsRecomet products={catagori}/>
      </div>
    </div>
  );
}