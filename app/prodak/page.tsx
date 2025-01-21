import ProductCard from '@/components/product/ProductCard';
import { allProdak } from '@/lib/data';
import { ProdakInterface1 } from '@/types';
import SearchBar from '@/components/SearchBar';
import { ShoppingBag, Search, Package } from 'lucide-react';
import Link from 'next/link';
import { auth } from '@/auth';

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const search = typeof params.search === 'string' ? params.search : undefined;
  const products = await allProdak(search) as unknown as ProdakInterface1[];
 const session = await auth();
  return (
    <div className="min-h-screen px-4 md:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8 flex flex-col items-center">
  {/* Header Section */}
  <div className="max-w-3xl text-center mb-12">
    <div className="flex justify-center mb-4">
      <Package className="w-12 h-12 text-blue-600 dark:text-blue-400" />
    </div>
    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
      Our Products
    </h1>
    {/* Search Bar */}
    <div className="w-full max-w-xl">
      <SearchBar defaultValue={search} />
    </div>
  </div>
</div>

        {/* Results Section */}
        {products.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 max-w-lg mx-auto text-center">
            <div className="flex justify-center mb-4">
              <Search className="w-16 h-16 text-gray-400 dark:text-gray-500" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No products found
            </h2>
            {search ? (
              <div className="space-y-4">
                <p className="text-gray-600 dark:text-gray-300">
                  We couldn&apos;t find any products matching {search}
                </p>
                <div className="flex flex-col items-center space-y-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Try:</p>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                    <li>• Checking your spelling</li>
                    <li>• Using more general terms</li>
                    <li>• Removing filters</li>
                  </ul>
                  <Link 
                    href="/prodak"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                  >
                    View all products
                  </Link>
                </div>
              </div>
            ) : (
              <p className="text-gray-600 dark:text-gray-300">
                No products are currently available.
              </p>
            )}
          </div>
        ) : (
          <div className="space-y-8">
            {/* Results Count */}
            <div className="flex justify-between items-center">
              <p className="text-gray-600 dark:text-gray-300">
                Showing {products.length} product{products.length !== 1 ? 's' : ''}
                {search && <span> for {search}</span>}
              </p>
              {search && (
                <Link
                  href="/prodak"
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium"
                >
                  Clear search
                </Link>
              )}
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <div key={product.id} className="transform transition duration-200 hover:scale-105">
                  <ProductCard product={product} session={session}/>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Features Section */}
        <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <ShoppingBag className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Quality Products</h3>
              <p className="text-gray-600 dark:text-gray-300">Carefully selected for your satisfaction</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Package className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Fast Delivery</h3>
              <p className="text-gray-600 dark:text-gray-300">Quick and secure shipping</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <ShoppingBag className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">24/7 Support</h3>
              <p className="text-gray-600 dark:text-gray-300">Always here to help you</p>
            </div>
          </div>
        </div>
      </div>
  );
}