import { auth } from '@/auth';
import ProductCard from '@/components/product/ProductCard';
import { ProdakInterface1 } from '@/types';
import { ShoppingBag } from 'lucide-react';

export default async function ProductsRecomet({products}: {products: ProdakInterface1[]}) {
  const session = await auth();

  if (!products) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
          <p className="text-xl text-gray-500 dark:text-gray-400">Failed to load products</p>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">related products</h1>
          <ShoppingBag className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
          <p className="text-xl text-gray-500 dark:text-gray-400">No related products available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {/* Header Section */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">related products</h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Discover our collection of high-quality products that cater to your needs
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 sm:gap-6">
            {products.map((product) => (
              <div 
                key={product.id} 
                className="transform transition duration-200 hover:scale-105"
              >
                <ProductCard product={product} session={session} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}